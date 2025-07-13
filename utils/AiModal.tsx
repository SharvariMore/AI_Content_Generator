import { GoogleGenAI } from "@google/genai";

export async function runGeminiStream(
  userInput: string,
  onChunk: (chunk: string) => void
) {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "",
  });

  const model = "gemini-2.5-pro";
  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    responseMimeType: "text/plain",
  };

  const contents = [
    {
      role: "user",
      parts: [{ text: userInput }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  for await (const chunk of response) {
    onChunk(chunk.text || "");
  }
}
