import fs from "fs";
import path from "path";

interface ResumeChunk {
  text: string;
  embedding: number[];
}

// 1. Load resume text (can also be JSON)
const resumePath = path.join(process.cwd(), "data/resume.json");
const resumeSections: { section: string; text: string }[] = JSON.parse(
  fs.readFileSync(resumePath, "utf-8")
);

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");

async function getEmbedding(text: string) {
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
  return data.data[0].embedding as number[];
}

async function main() {
  const chunks: ResumeChunk[] = [];

  for (const section of resumeSections) {
    const embedding = await getEmbedding(section.text);
    chunks.push({
      text: section.text,
      embedding,
    });
  }

  // Save chunks + embeddings to JSON
  const outputPath = path.join(process.cwd(), "data/masterResumeChunks.json");
  fs.writeFileSync(outputPath, JSON.stringify(chunks, null, 2), "utf-8");
  console.log("Resume embeddings saved to data/masterResumeChunks.json");
}

main().catch(console.error);
