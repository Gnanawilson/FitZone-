"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Apple, Plus, Search, Flame } from "lucide-react";
import { dietService } from "@/services/dietService";
import { NutritionLog } from "@/types";
import { useToast } from "@/components/ui/toast";
import { Select } from "@/components/ui/select";

export default function NutritionTrackerPage() {
  const [logs, setLogs] = useState<NutritionLog[]>([]);
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState(350);
  const [protein, setProtein] = useState(30);
  const [carbs, setCarbs] = useState(40);
  const [fat, setFat] = useState(10);
  const [mealType, setMealType] = useState<"Breakfast" | "Lunch" | "Dinner" | "Snack">("Breakfast");
  const { toast } = useToast();

  useEffect(() => {
    dietService.getNutritionLogs().then(setLogs);
  }, []);

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodName) return;

    const newLog: NutritionLog = {
      id: `n-${Date.now()}`,
      userId: "u-1",
      foodName,
      mealType,
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fat: Number(fat),
      loggedAt: new Date().toISOString(),
    };

    setLogs((prev) => [newLog, ...prev]);
    setFoodName("");
    toast("Meal Logged!", `Added ${foodName} (${calories} kcal) to ${mealType}.`, "success");
  };

  const totalCalories = logs.reduce((sum, item) => sum + item.calories, 0);
  const totalProtein = logs.reduce((sum, item) => sum + item.protein, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Apple className="h-6 w-6 text-emerald-400" />
                Nutrition Tracker & Food Logger
              </h1>
              <p className="text-xs text-slate-400 mt-1">Monitor daily calories, macro ratios, and meal history.</p>
            </div>
          </div>

          {/* Target Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-4 border-amber-500/30">
              <p className="text-xs text-slate-400">Total Logged Calories Today</p>
              <p className="text-3xl font-black text-amber-400 mt-1">{totalCalories} / 2,400 kcal</p>
            </Card>
            <Card className="p-4 border-indigo-500/30">
              <p className="text-xs text-slate-400">Total Logged Protein</p>
              <p className="text-3xl font-black text-indigo-400 mt-1">{totalProtein} / 180 g</p>
            </Card>
          </div>

          {/* Log Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-white flex items-center gap-2">
                <Plus className="h-4 w-4 text-emerald-400" />
                Quick Log Meal Item
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddLog} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                <Input label="Food Item Name" value={foodName} onChange={(e) => setFoodName(e.target.value)} required />
                <Select
                  label="Meal Type"
                  options={[
                    { label: "Breakfast", value: "Breakfast" },
                    { label: "Lunch", value: "Lunch" },
                    { label: "Dinner", value: "Dinner" },
                    { label: "Snack", value: "Snack" },
                  ]}
                  value={mealType}
                  onChange={(e: any) => setMealType(e.target.value)}
                />
                <Input label="Calories (kcal)" type="number" value={calories} onChange={(e) => setCalories(Number(e.target.value))} required />
                <Input label="Protein (g)" type="number" value={protein} onChange={(e) => setProtein(Number(e.target.value))} required />
                <Input label="Carbs (g)" type="number" value={carbs} onChange={(e) => setCarbs(Number(e.target.value))} required />
                <Input label="Fat (g)" type="number" value={fat} onChange={(e) => setFat(Number(e.target.value))} required />

                <div className="sm:col-span-2 lg:col-span-6 pt-2">
                  <Button type="submit" variant="gradient" size="md" className="w-full gap-2">
                    <Plus className="h-4 w-4" /> Add Food to Daily Journal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Today's Meal Journal */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-white flex items-center gap-2">
                <Flame className="h-4 w-4 text-amber-400" />
                Today&apos;s Nutrition Journal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {logs.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div>
                    <h5 className="text-xs font-bold text-white">{item.foodName}</h5>
                    <p className="text-[10px] text-indigo-400 font-semibold mt-0.5">{item.mealType}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-amber-400">{item.calories} kcal</p>
                    <p className="text-[10px] text-slate-400">P:{item.protein}g | C:{item.carbs}g | F:{item.fat}g</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
      <Footer />
    </div>
  );
}
