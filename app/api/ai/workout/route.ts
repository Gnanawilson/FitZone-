import { NextResponse } from "next/server";
import { aiService } from "@/services/aiService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const plan = await aiService.generateWorkoutPlan(body);
    return NextResponse.json({ success: true, plan });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to generate workout plan" }, { status: 500 });
  }
}
