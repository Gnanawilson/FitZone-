"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { WorkoutTimer } from "@/components/workout/WorkoutTimer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PlayCircle, Dumbbell, Calendar, Flame } from "lucide-react";
import { useWorkoutStore } from "@/hooks/useWorkoutStore";

export default function WorkoutLoggerPage() {
  const { history } = useWorkoutStore();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <PlayCircle className="h-6 w-6 text-indigo-400" />
                Live Workout Logger
              </h1>
              <p className="text-xs text-slate-400 mt-1">Track active sets, reps, time duration, and calorie burn.</p>
            </div>
          </div>

          <WorkoutTimer />

          {/* Workout History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-white flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-400" />
                Completed Workout History Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs space-y-2">
                  <Dumbbell className="h-8 w-8 mx-auto text-slate-600" />
                  <p>No completed workouts logged yet today. Click &quot;Start Workout&quot; above!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {history.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Dumbbell className="h-4 w-4 text-indigo-400" /> {log.workoutName}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">{new Date(log.completedAt).toLocaleString()}</p>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-semibold">
                        <span className="text-purple-300">{log.durationMin} mins</span>
                        <span className="text-amber-400 flex items-center gap-1">
                          <Flame className="h-3.5 w-3.5 fill-amber-400" /> {log.caloriesBurned} kcal
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
      <Footer />
    </div>
  );
}
