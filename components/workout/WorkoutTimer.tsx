"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square, Flame, Clock } from "lucide-react";
import { useWorkoutStore } from "@/hooks/useWorkoutStore";
import { formatTime } from "@/utils/formatting";
import { useToast } from "@/components/ui/toast";

export function WorkoutTimer() {
  const { isWorkoutActive, activeSeconds, startWorkout, stopWorkout, incrementSeconds, addLog } = useWorkoutStore();
  const [isPaused, setIsPaused] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isWorkoutActive && !isPaused) {
      timer = setInterval(() => {
        incrementSeconds();
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isWorkoutActive, isPaused, incrementSeconds]);

  const estimatedCalories = Math.round((activeSeconds / 60) * 8.5);

  const handleFinish = () => {
    const mins = Math.max(1, Math.round(activeSeconds / 60));
    addLog({
      id: `wlog-${Date.now()}`,
      userId: "u-1",
      workoutName: "Live Fitness Session",
      durationMin: mins,
      caloriesBurned: estimatedCalories,
      completedAt: new Date().toISOString(),
    });
    toast("Workout Complete!", `Logged ${mins} mins and ${estimatedCalories} kcal burned (+100 XP)`, "success");
  };

  return (
    <Card className="bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-900 border-indigo-500/30">
      <CardHeader>
        <CardTitle className="text-base text-indigo-300 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-indigo-400" />
            Live Workout Controller
          </span>
          {isWorkoutActive && (
            <span className="flex items-center gap-1 text-xs text-rose-400 font-semibold bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" /> Recording
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-center">
        <div className="space-y-1">
          <p className="text-5xl font-black text-white tracking-widest font-mono">{formatTime(activeSeconds)}</p>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
            <Flame className="h-4 w-4 text-amber-400" />
            <span>Est. Burned: <strong className="text-amber-300 font-bold">{estimatedCalories} kcal</strong></span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          {!isWorkoutActive ? (
            <Button variant="gradient" size="lg" onClick={startWorkout} className="gap-2 px-8">
              <Play className="h-5 w-5 fill-white" /> Start Workout
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                size="md"
                onClick={() => setIsPaused(!isPaused)}
                className="gap-2"
              >
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                {isPaused ? "Resume" : "Pause"}
              </Button>

              <Button variant="danger" size="md" onClick={handleFinish} className="gap-2">
                <Square className="h-4 w-4 fill-white" /> Finish & Log
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
