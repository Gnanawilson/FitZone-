export interface BmiResult {
  score: number;
  category: "Underweight" | "Normal weight" | "Overweight" | "Obese";
  healthyRangeMin: number;
  healthyRangeMax: number;
  weightSuggestion: string;
  color: string;
}

export function calculateBMI(heightCm: number, weightKg: number): BmiResult {
  if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
    return {
      score: 0,
      category: "Normal weight",
      healthyRangeMin: 0,
      healthyRangeMax: 0,
      weightSuggestion: "Please provide valid height and weight measurements.",
      color: "#94a3b8",
    };
  }

  const heightMeters = heightCm / 100;
  const bmi = Number((weightKg / (heightMeters * heightMeters)).toFixed(1));

  const minHealthyWeight = Number((18.5 * heightMeters * heightMeters).toFixed(1));
  const maxHealthyWeight = Number((24.9 * heightMeters * heightMeters).toFixed(1));

  let category: BmiResult["category"] = "Normal weight";
  let color = "#10b981"; // green
  let weightSuggestion = "Your weight is within the optimal healthy range!";

  if (bmi < 18.5) {
    category = "Underweight";
    color = "#3b82f6"; // blue
    const diff = (minHealthyWeight - weightKg).toFixed(1);
    weightSuggestion = `Consider gaining approximately ${diff} kg to reach a healthy weight threshold.`;
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = "Normal weight";
    color = "#10b981"; // emerald
    weightSuggestion = "Great job! Maintain your current balanced lifestyle and strength regimen.";
  } else if (bmi >= 25 && bmi <= 29.9) {
    category = "Overweight";
    color = "#f59e0b"; // amber
    const diff = (weightKg - maxHealthyWeight).toFixed(1);
    weightSuggestion = `A gradual reduction of around ${diff} kg will put you in the optimal healthy range.`;
  } else {
    category = "Obese";
    color = "#ef4444"; // red
    const diff = (weightKg - maxHealthyWeight).toFixed(1);
    weightSuggestion = `We recommend aiming for a ${diff} kg reduction through structured nutrition and cardio workouts.`;
  }

  return {
    score: bmi,
    category,
    healthyRangeMin: minHealthyWeight,
    healthyRangeMax: maxHealthyWeight,
    weightSuggestion,
    color,
  };
}
