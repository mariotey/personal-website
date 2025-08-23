import { NextRequest, NextResponse } from "next/server";
import faqList from "../../../data/faq.json";
import resumeData from "../../../data/masterResumeChunks.json";

interface ResumeChunk {
  text: string;
  embedding?: number[];
  section?: string;
  description?: any;
}

// Set OpenAI API key in environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// FAQ database
const FAQ_LIST: { question: string; answer: string }[] = faqList;

// Resume Chunks
const nestedResumeData = resumeData;
const RESUME_CHUNKS: ResumeChunk[] = Object.entries(nestedResumeData).flatMap(
  ([section, items]: [string, any[]]) =>
    items.map(item => ({
      ...item,
      section
    }))
);

// Toggle mock mode for testing without hitting OpenAI
const USE_MOCK = true;

/////////////////////////////////////////////////////////////////////////////////////////////////

// Helper function to check if the user's question matches a common FAQ
function matchFAQ(question: string): string | null {
  const q = question.toLowerCase().trim();
  for (const faq of FAQ_LIST) {
    if (faq.question.toLowerCase().trim() === q) return faq.answer;
  }
  return null;
}

// Helper function for calculating cosine similarity
function cosineSimilarity(vecA: number[], vecB: number[]) {
  const dot = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}

// Helper function to get the top resume chunks
function findTopChunks(questionEmbedding: number[], topK = 3): ResumeChunk[] {
  const scored = RESUME_CHUNKS.map((chunk) => ({
    chunk,
    score: cosineSimilarity(questionEmbedding, chunk.embedding),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).map((s) => s.chunk);
}

// Helper function to invoke OpenAI embeddings API for the user's message
async function getEmbedding(text: string): Promise<number[]> {
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      input: text,
      model: "text-embedding-3-small",
    }),
  });
  const data = await res.json();
  return data.data[0].embedding;
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "No message provided." }, { status: 400 });
    }

    if (USE_MOCK) {
      // Mock GPT response for testing
      const reply = `"${message}"`;
      return NextResponse.json({ reply });
    }

    // Check FAQ first
    const faqAnswer = matchFAQ(message);
    if (faqAnswer) return NextResponse.json({ reply: faqAnswer });

    // Embed question
    const questionEmbedding = await getEmbedding(message);

    // Find top relevant chunks through cosine similarity
    const topChunks = findTopChunks(questionEmbedding);

    // Construct system prompt
    const systemPrompt = `
      You are an HR assistant AI. Use the following resume excerpts to answer the user's question.
      Answer ONLY based on the provided content. If unsure, reply:
      "I am not confident about this. Please contact Ming Chuan directly."

      Resume excerpts:
      ${topChunks.map((c) => c.text).join("\n\n")}
    `;

    const payload = {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      max_tokens: 300,
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content ||
                  "Sorry, I am not confident about this. Please contact Ming Chuan directly.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ reply: "An error occurred. Please try again later." }, { status: 500 });
  }
}
