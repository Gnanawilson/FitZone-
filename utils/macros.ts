export interface MacroResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  fiberGrams: number;
  waterLiters: number;
}

export function calculateMacros(
  heightCm: number,
  weightKg: number,
  age: number,
  gender: "MALE" | "FEMALE" | "OTHER",
  goal: "WEIGHT_LOSS" | "MUSCLE_GAIN" | "MAINTAIN" | "ENDURANCE" | "STRENGTH",
  activityLevel: "SEDENTARY" | "LIGHTLY_ACTIVE" | "MODERATELY_ACTIVE" | "VERY_ACTIVE" | "EXTRA_ACTIVE"
): MacroResult {
  // Mifflin-St Jeor Equation
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (gender === "MALE") {
    bmr += 5;
  } else if (gender === "FEMALE") {
    bmr -= 161;
  } else {
    bmr -= 78;
  }

  // Activity multipliers
  const activityMultipliers = {
    SEDENTARY: 1.2,
    LIGHTLY_ACTIVE: 1.375,
    MODERATELY_ACTIVE: 1.55,
    VERY_ACTIVE: 1.725,
    EXTRA_ACTIVE: 1.9,
  };

  const tdee = Math.round(bmr * (activityMultipliers[activityLevel] || 1.4));

  // Goal adjustments
  let targetCalories = tdee;
  if (goal === "WEIGHT_LOSS") {
    targetCalories = Math.round(tdee * 0.8); // 20% deficit
  } else if (goal === "MUSCLE_GAIN" || goal === "STRENGTH") {
    targetCalories = Math.round(tdee * 1.15); // 15% surplus
  }

  // Macro distribution based on goal
  let proteinRatio = 0.3;
  let carbRatio = 0.45;
  let fatRatio = 0.25;

  if (goal === "WEIGHT_LOSS") {
    proteinRatio = 0.35;
    carbRatio = 0.35;
    fatRatio = 0.3;
  } else if (goal === "MUSCLE_GAIN" || goal === "STRENGTH") {
    proteinRatio = 0.3;
    carbRatio = 0.5;
    fatRatio = 0.2;
  }

  const proteinGrams = Math.round((targetCalories * proteinRatio) / 4);
  const carbsGrams = Math.round((targetCalories * carbRatio) / 4);
  const fatGrams = Math.round((targetCalories * fatRatio) / 9);
  const fiberGrams = Math.round((targetCalories / 1000) * 14); // 14g per 1000 kcal
  const waterLiters = Number(((weightKg * 0.035) + 0.5).toFixed(1));

  return {
    bmr: Math.round(bmr),
    tdee,
    targetCalories,
    proteinGrams,
    carbsGrams,
    fatGrams,
    fiberGrams,
    waterLiters,
  };
}
