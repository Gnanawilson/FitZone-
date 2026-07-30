import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";

export const aiClient = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function generateAiContent(prompt: string, systemInstruction?: string): Promise<string> {
  if (!aiClient) {
    console.warn("GEMINI_API_KEY is not configured. Falling back to local smart generation.");
    return "";
  }

  try {
    const model = aiClient.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction ? { role: "system", parts: [{ text: systemInstruction }] } : undefined,
    });

    const response = await model.generateContent(prompt);
    return response.response.text() || "";
  } catch (error) {
    console.error("AI Generation error:", error);
    return "";
  }
}
