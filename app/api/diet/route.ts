import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { weight = 70, height = 175, age = 25, gender = "MALE", goal = "WEIGHT_LOSS", activityLevel = "MODERATELY_ACTIVE" } = body;

    // BMR Calculation (Mifflin-St Jeor)
    let bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age);
    bmr += gender === "MALE" ? 5 : -161;

    // Activity Multiplier
    const activityMap: Record<string, number> = {
      SEDENTARY: 1.2,
      LIGHTLY_ACTIVE: 1.375,
      MODERATELY_ACTIVE: 1.55,
      VERY_ACTIVE: 1.725,
    };
    const tdee = Math.round(bmr * (activityMap[activityLevel] || 1.55));

    // Goal Caloric Adjustments
    let targetCalories = tdee;
    if (goal === "WEIGHT_LOSS") targetCalories = Math.round(tdee - 500);
    if (goal === "MUSCLE_GAIN") targetCalories = Math.round(tdee + 350);

    // Macro Split
    const proteinGrams = Math.round(Number(weight) * 2.2);
    const fatGrams = Math.round((targetCalories * 0.25) / 9);
    const carbGrams = Math.round((targetCalories - (proteinGrams * 4 + fatGrams * 9)) / 4);

    return NextResponse.json({
      success: true,
      data: {
        bmr: Math.round(bmr),
        tdee,
        targetCalories,
        macros: {
          proteinGrams,
          fatGrams,
          carbGrams,
        },
        sampleMealPlan: [
          { name: "Breakfast", item: "Oatmeal with Whey Protein & Berries", calories: 450, protein: 35 },
          { name: "Lunch", item: "Grilled Chicken Breast with Brown Rice & Broccoli", calories: 650, protein: 50 },
          { name: "Snack", item: "Greek Yogurt with Almonds", calories: 250, protein: 20 },
          { name: "Dinner", item: "Baked Salmon with Quinoa & Asparagus", calories: 550, protein: 40 },
        ],
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to calculate diet metrics", details: String(error) }, { status: 500 });
  }
}
