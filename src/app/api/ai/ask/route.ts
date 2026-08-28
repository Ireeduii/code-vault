import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { auth } from "@clerk/nextjs/server";

const ai = new GoogleGenAI();

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { prompt, code, language, title } = await request.json();

    const finalPrompt = code
      ? `Analyze this code snippet and provide a clear explanation and insights:
         Title: ${title || "Untitled"}
         Language: ${language || "text"}
         Code:
         ${code}
         
         User question/request: ${prompt || "Explain how this works and suggest improvements."}`
      : prompt;

    if (!finalPrompt) {
      return NextResponse.json(
        { error: "Prompt or code is required" },
        { status: 400 },
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: finalPrompt,
    });

    const resultText =
      typeof response.text === "function" ? response.text : response.text;

    return NextResponse.json({ result: resultText });
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json(
      { error: "Failed to generate AI response" },
      { status: 500 },
    );
  }
}
