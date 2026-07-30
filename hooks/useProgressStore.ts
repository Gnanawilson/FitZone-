import { create } from "zustand";
import { ProgressLog } from "@/types";

interface ProgressState {
  todayWaterLiters: number;
  waterGoalLiters: number;
  addWater: (amount: number) => void;
  resetWater: () => void;
  logs: ProgressLog[];
  addProgressLog: (log: ProgressLog) => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  todayWaterLiters: 2.2,
  waterGoalLiters: 3.5,
  addWater: (amount) => set((state) => ({ todayWaterLiters: Number((state.todayWaterLiters + amount).toFixed(1)) })),
  resetWater: () => set({ todayWaterLiters: 0 }),
  logs: [],
  addProgressLog: (log) => set((state) => ({ logs: [log, ...state.logs] })),
}));
