import { WorkoutPlan, WorkoutLog, Exercise } from "@/types";
import { SAMPLE_EXERCISES } from "@/lib/constants";

export const workoutService = {
  getExercises: async (): Promise<Exercise[]> => {
    return SAMPLE_EXERCISES;
  },

  getWorkoutPlans: async (): Promise<WorkoutPlan[]> => {
    return [
      {
        id: "wp-1",
        title: "AI Hypertrophy Power Routine",
        goal: "MUSCLE_GAIN",
        level: "INTERMEDIATE",
        daysPerWeek: 4,
        durationMin: 60,
        estimatedCals: 450,
        isAiGenerated: true,
        createdAt: new Date().toISOString(),
        schedule: [
          {
            dayName: "Day 1 - Chest & Triceps Focus",
            focus: "Upper Push",
            exercises: [
              { name: "Barbell Bench Press", category: "Chest", sets: 4, reps: "8-10", restSec: 90 },
              { name: "Incline Dumbbell Press", category: "Chest", sets: 3, reps: "10-12", restSec: 75 },
              { name: "Tricep Rope Pushdowns", category: "Arms", sets: 3, reps: "12-15", restSec: 60 },
            ],
          },
          {
            dayName: "Day 2 - Back & Biceps Focus",
            focus: "Upper Pull",
            exercises: [
              { name: "Barbell Deadlift", category: "Back", sets: 4, reps: "6-8", restSec: 120 },
              { name: "Lat Pulldown", category: "Back", sets: 4, reps: "10-12", restSec: 75 },
              { name: "Dumbbell Bicep Curls", category: "Arms", sets: 3, reps: "12-15", restSec: 60 },
            ],
          },
        ],
      },
    ];
  },

  getWorkoutHistory: async (): Promise<WorkoutLog[]> => {
    return [
      {
        id: "log-1",
        userId: "user-1",
        workoutName: "Chest & Triceps Blast",
        durationMin: 55,
        caloriesBurned: 480,
        notes: "Felt strong on bench press today!",
        completedAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: "log-2",
        userId: "user-1",
        workoutName: "Leg Day Crusher",
        durationMin: 65,
        caloriesBurned: 540,
        notes: "Pushed 100kg squats for 4 sets.",
        completedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      },
    ];
  },
};
