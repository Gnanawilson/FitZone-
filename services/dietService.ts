import { DietPlan, NutritionLog } from "@/types";

export const dietService = {
  getLatestDietPlan: async (): Promise<DietPlan> => {
    return {
      id: "diet-1",
      title: "AI Optimized High Protein Lean Plan",
      calories: 2400,
      proteinGrams: 180,
      carbsGrams: 240,
      fatGrams: 67,
      fiberGrams: 32,
      waterLiters: 3.5,
      createdAt: new Date().toISOString(),
      mealPlan: {
        breakfast: [
          { name: "Oatmeal with Protein Powder & Berries", portion: "1 Bowl", calories: 450, protein: 35, carbs: 55, fat: 8 },
          { name: "Whole Eggs & Egg Whites", portion: "3 Eggs", calories: 220, protein: 22, carbs: 2, fat: 14 },
        ],
        lunch: [
          { name: "Grilled Chicken Breast with Brown Rice", portion: "200g Chicken, 1 Cup Rice", calories: 600, protein: 50, carbs: 60, fat: 10 },
          { name: "Steamed Broccoli & Olive Oil", portion: "1 Bowl", calories: 120, protein: 4, carbs: 12, fat: 6 },
        ],
        dinner: [
          { name: "Baked Salmon with Quinoa & Asparagus", portion: "180g Salmon, 1 Cup Quinoa", calories: 580, protein: 42, carbs: 45, fat: 20 },
        ],
        snacks: [
          { name: "Greek Yogurt with Honey & Almonds", portion: "200g", calories: 280, protein: 20, carbs: 25, fat: 9 },
          { name: "Whey Protein Shake", portion: "1 Scoop", calories: 150, protein: 27, carbs: 4, fat: 2 },
        ],
      },
    };
  },

  getNutritionLogs: async (): Promise<NutritionLog[]> => {
    return [
      { id: "n-1", userId: "u-1", foodName: "Oatmeal & Protein", mealType: "Breakfast", calories: 450, protein: 35, carbs: 55, fat: 8, loggedAt: new Date().toISOString() },
      { id: "n-2", userId: "u-1", foodName: "Grilled Chicken & Rice", mealType: "Lunch", calories: 600, protein: 50, carbs: 60, fat: 10, loggedAt: new Date().toISOString() },
    ];
  },
};
