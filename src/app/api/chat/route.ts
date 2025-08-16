import { NextRequest, NextResponse } from "next/server";

// Set your OpenAI API key in environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Toggle mock mode for testing without hitting OpenAI
const USE_MOCK = true;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "No message provided." }, { status: 400 });
    }

    if (USE_MOCK) {
      // Mock GPT response for testing
      const reply = `Mock reply: "${message}"`;
      return NextResponse.json({ reply });
    }

    // Real GPT call
    const systemPrompt = `
        You are an HR assistant AI that only answers questions about Ming Chuan Tey.
        Answer questions regarding his education, work experience, projects, and background.
        If the question is technical (like coding, assessments, algorithms) or you are unsure, politely say you are not confident and the person should contact Ming Chuan directly.
        Keep answers concise and professional.
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
    const reply = data?.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ reply: "An error occurred. Please try again later." }, { status: 500 });
    }
}
