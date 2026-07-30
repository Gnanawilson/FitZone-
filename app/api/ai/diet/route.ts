import { NextResponse } from "next/server";
import { calculateMacros } from "@/utils/macros";
import { dietService } from "@/services/dietService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const macros = calculateMacros(
      body.height,
      body.weight,
      body.age,
      body.gender,
      body.goal,
      body.activityLevel
    );
    const dietPlan = await dietService.getLatestDietPlan();
    return NextResponse.json({ success: true, macros, dietPlan });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to calculate diet" }, { status: 500 });
  }
}
