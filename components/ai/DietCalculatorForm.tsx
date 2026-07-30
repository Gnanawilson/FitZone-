"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Utensils, Flame, Droplets, Apple, CheckCircle } from "lucide-react";
import { calculateMacros, MacroResult } from "@/utils/macros";
import { dietService } from "@/services/dietService";
import { DietPlan, MealItem } from "@/types";
import { useToast } from "@/components/ui/toast";

const schema = z.object({
  height: z.coerce.number().min(100).max(250),
  weight: z.coerce.number().min(30).max(300),
  age: z.coerce.number().min(12).max(99),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  goal: z.enum(["WEIGHT_LOSS", "MUSCLE_GAIN", "MAINTAIN", "ENDURANCE", "STRENGTH"]),
  activityLevel: z.enum(["SEDENTARY", "LIGHTLY_ACTIVE", "MODERATELY_ACTIVE", "VERY_ACTIVE", "EXTRA_ACTIVE"]),
  dietPreference: z.string(),
});

type FormValues = z.infer<typeof schema>;

export function DietCalculatorForm() {
  const [results, setResults] = useState<{ macros: MacroResult; dietPlan: DietPlan } | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      height: 178,
      weight: 76,
      age: 26,
      gender: "MALE",
      goal: "MUSCLE_GAIN",
      activityLevel: "MODERATELY_ACTIVE",
      dietPreference: "High Protein / Clean Bulking",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const macros = calculateMacros(
      values.height,
      values.weight,
      values.age,
      values.gender,
      values.goal,
      values.activityLevel
    );
    const dietPlan = await dietService.getLatestDietPlan();
    setResults({ macros, dietPlan });
    setLoading(false);
    toast("Macros Calculated!", "Your custom nutrition targets are ready.", "success");
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#FC4C02]">
            <Utensils className="h-5 w-5" />
            Diet & Macro Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input label="Height (cm)" type="number" {...register("height")} error={errors.height?.message} />
            <Input label="Weight (kg)" type="number" {...register("weight")} error={errors.weight?.message} />
            <Input label="Age" type="number" {...register("age")} error={errors.age?.message} />

            <Select
              label="Gender"
              options={[
                { label: "Male", value: "MALE" },
                { label: "Female", value: "FEMALE" },
                { label: "Other", value: "OTHER" },
              ]}
              {...register("gender")}
            />

            <Select
              label="Fitness Goal"
              options={[
                { label: "Fat Loss (Caloric Deficit)", value: "WEIGHT_LOSS" },
                { label: "Muscle Gain (Caloric Surplus)", value: "MUSCLE_GAIN" },
                { label: "Maintain Weight", value: "MAINTAIN" },
                { label: "Strength Training", value: "STRENGTH" },
              ]}
              {...register("goal")}
            />

            <Select
              label="Daily Activity Level"
              options={[
                { label: "Sedentary (Desk Job)", value: "SEDENTARY" },
                { label: "Lightly Active (1-3 days/wk)", value: "LIGHTLY_ACTIVE" },
                { label: "Moderately Active (3-5 days/wk)", value: "MODERATELY_ACTIVE" },
                { label: "Very Active (6-7 days/wk)", value: "VERY_ACTIVE" },
              ]}
              {...register("activityLevel")}
            />

            <Input label="Diet Preference" placeholder="e.g. High Protein, Keto, Vegan, Mediterranean" {...register("dietPreference")} />

            <div className="sm:col-span-2 lg:col-span-3 pt-4">
              <Button type="submit" variant="gradient" size="lg" isLoading={loading} className="w-full gap-2">
                <Flame className="h-5 w-5" /> Calculate Macro Targets & Meal Plan
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {results && (
        <div className="space-y-6">
          {/* Target Macro Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="p-4 border-amber-500/30">
              <p className="text-xs text-slate-400">Daily Target Calories</p>
              <p className="text-2xl font-black text-amber-400 mt-1">{results.macros.targetCalories} kcal</p>
              <p className="text-[10px] text-slate-500 mt-1">BMR: {results.macros.bmr} | TDEE: {results.macros.tdee}</p>
            </Card>

            <Card className="p-4 border-indigo-500/30">
              <p className="text-xs text-slate-400">Protein (30-35%)</p>
              <p className="text-2xl font-black text-indigo-400 mt-1">{results.macros.proteinGrams} g</p>
              <p className="text-[10px] text-slate-500 mt-1">4 kcal / gram</p>
            </Card>

            <Card className="p-4 border-emerald-500/30">
              <p className="text-xs text-slate-400">Carbohydrates</p>
              <p className="text-2xl font-black text-emerald-400 mt-1">{results.macros.carbsGrams} g</p>
              <p className="text-[10px] text-slate-500 mt-1">Fiber target: {results.macros.fiberGrams}g</p>
            </Card>

            <Card className="p-4 border-purple-500/30">
              <p className="text-xs text-slate-400">Healthy Fats</p>
              <p className="text-2xl font-black text-purple-400 mt-1">{results.macros.fatGrams} g</p>
              <p className="text-[10px] text-slate-500 mt-1">Water target: {results.macros.waterLiters}L</p>
            </Card>
          </div>

          {/* AI Meal Plan Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-white flex items-center gap-2">
                <Apple className="h-5 w-5 text-emerald-400" />
                AI Daily Meal Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(results.dietPlan.mealPlan).map(([mealType, items]) => (
                <div key={mealType} className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-indigo-400 tracking-wider flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5" />
                    {mealType}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {items.map((food: MealItem, fIdx: number) => (
                      <div key={fIdx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between items-center">
                        <div>
                          <p className="text-xs font-semibold text-white">{food.name}</p>
                          <p className="text-[10px] text-slate-400">{food.portion}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-amber-400">{food.calories} kcal</p>
                          <p className="text-[10px] text-indigo-300">P:{food.protein}g C:{food.carbs}g F:{food.fat}g</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
