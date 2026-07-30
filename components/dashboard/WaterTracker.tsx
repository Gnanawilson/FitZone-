"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Droplets, Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProgressStore } from "@/hooks/useProgressStore";
import { useToast } from "@/components/ui/toast";

export function WaterTracker() {
  const { todayWaterLiters, waterGoalLiters, addWater, resetWater } = useProgressStore();
  const { toast } = useToast();

  const handleAdd = (amt: number) => {
    addWater(amt);
    toast("Hydration Updated!", `Added +${amt}L of water to your daily log.`, "success");
  };

  const percentage = Math.round((todayWaterLiters / waterGoalLiters) * 100);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Droplets className="h-4 w-4 text-sky-400" />
          Daily Water Intake
        </CardTitle>
        <button onClick={resetWater} className="text-slate-500 hover:text-slate-300 p-1" title="Reset Water">
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline justify-between">
          <span className="text-3xl font-black text-white">{todayWaterLiters} <span className="text-sm font-normal text-slate-400">/ {waterGoalLiters} L</span></span>
          <span className="text-xs font-bold text-sky-400">{percentage}% Goal</span>
        </div>

        <Progress value={percentage} color="#38bdf8" />

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex-1 text-xs gap-1" onClick={() => handleAdd(0.25)}>
            <Plus className="h-3 w-3" /> +250 ml
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-xs gap-1" onClick={() => handleAdd(0.5)}>
            <Plus className="h-3 w-3" /> +500 ml
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-xs gap-1" onClick={() => handleAdd(1.0)}>
            <Plus className="h-3 w-3" /> +1.0 L
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
