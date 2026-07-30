import { NextResponse } from "next/server";
import { aiService } from "@/services/aiService";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message) return NextResponse.json({ success: false, error: "Message is required" }, { status: 400 });

    const reply = await aiService.askAiCoach(message);
    return NextResponse.json({ success: true, reply });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to ask coach" }, { status: 500 });
  }
}
