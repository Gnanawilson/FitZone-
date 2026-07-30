import { create } from "zustand";
import { WorkoutPlan, WorkoutLog } from "@/types";

interface WorkoutState {
  activePlan: WorkoutPlan | null;
  history: WorkoutLog[];
  isWorkoutActive: boolean;
  activeSeconds: number;
  setActivePlan: (plan: WorkoutPlan) => void;
  startWorkout: () => void;
  stopWorkout: () => void;
  incrementSeconds: () => void;
  addLog: (log: WorkoutLog) => void;
}

export const useWorkoutStore = create<WorkoutState>((set) => ({
  activePlan: null,
  history: [],
  isWorkoutActive: false,
  activeSeconds: 0,
  setActivePlan: (plan) => set({ activePlan: plan }),
  startWorkout: () => set({ isWorkoutActive: true, activeSeconds: 0 }),
  stopWorkout: () => set({ isWorkoutActive: false }),
  incrementSeconds: () => set((state) => ({ activeSeconds: state.activeSeconds + 1 })),
  addLog: (log) => set((state) => ({ history: [log, ...state.history], isWorkoutActive: false, activeSeconds: 0 })),
}));
