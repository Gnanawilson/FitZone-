import { ProgressLog, BmiRecord } from "@/types";

export const progressService = {
  getProgressLogs: async (): Promise<ProgressLog[]> => {
    const now = Date.now();
    const day = 86400000;
    return [
      { id: "p-1", userId: "u-1", weight: 78.5, bodyFat: 16.2, sleepHours: 7.5, waterLiters: 3.2, mood: "Great", createdAt: new Date(now - day * 6).toISOString() },
      { id: "p-2", userId: "u-1", weight: 78.2, bodyFat: 16.0, sleepHours: 8.0, waterLiters: 3.5, mood: "Good", createdAt: new Date(now - day * 5).toISOString() },
      { id: "p-3", userId: "u-1", weight: 77.9, bodyFat: 15.8, sleepHours: 7.0, waterLiters: 3.0, mood: "Tired", createdAt: new Date(now - day * 4).toISOString() },
      { id: "p-4", userId: "u-1", weight: 77.6, bodyFat: 15.6, sleepHours: 8.2, waterLiters: 3.8, mood: "Great", createdAt: new Date(now - day * 3).toISOString() },
      { id: "p-5", userId: "u-1", weight: 77.3, bodyFat: 15.4, sleepHours: 7.8, waterLiters: 3.5, mood: "Great", createdAt: new Date(now - day * 2).toISOString() },
      { id: "p-6", userId: "u-1", weight: 77.0, bodyFat: 15.2, sleepHours: 8.0, waterLiters: 3.6, mood: "Good", createdAt: new Date(now - day * 1).toISOString() },
      { id: "p-7", userId: "u-1", weight: 76.8, bodyFat: 15.0, sleepHours: 8.5, waterLiters: 4.0, mood: "Great", createdAt: new Date(now).toISOString() },
    ];
  },

  getBmiHistory: async (): Promise<BmiRecord[]> => {
    return [
      { id: "bmi-1", userId: "u-1", height: 178, weight: 82.0, bmi: 25.9, category: "Overweight", createdAt: new Date(Date.now() - 86400000 * 30).toISOString() },
      { id: "bmi-2", userId: "u-1", height: 178, weight: 78.5, bmi: 24.8, category: "Normal weight", createdAt: new Date(Date.now() - 86400000 * 15).toISOString() },
      { id: "bmi-3", userId: "u-1", height: 178, weight: 76.8, bmi: 24.2, category: "Normal weight", createdAt: new Date().toISOString() },
    ];
  },
};
