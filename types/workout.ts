import { FitnessGoal } from "./user";

export interface ExerciseItem {
  name: string;
  category: string;
  sets: number;
  reps: string;
  restSec: number;
  notes?: string;
}

export interface DayRoutine {
  dayName: string; // e.g. Day 1 - Chest & Triceps
  focus: string;
  exercises: ExerciseItem[];
}

export interface WorkoutPlan {
  id: string;
  title: string;
  goal: FitnessGoal;
  level: string;
  daysPerWeek: number;
  durationMin: number;
  estimatedCals: number;
  isAiGenerated: boolean;
  schedule: DayRoutine[];
  createdAt: string;
}

export interface WorkoutLog {
  id: string;
  userId: string;
  workoutName: string;
  durationMin: number;
  caloriesBurned: number;
  notes?: string;
  completedAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  equipment: string;
  difficulty: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
}
