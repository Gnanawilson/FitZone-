import { Badge, Challenge, LeaderboardUser } from "@/types";

export const gamificationService = {
  getBadges: async (): Promise<Badge[]> => {
    return [
      { id: "b-1", name: "First Step", description: "Completed your first workout log", icon: "Flame", category: "workout", unlockedAt: new Date().toISOString() },
      { id: "b-2", name: "7-Day Streak", description: "Maintained a 7-day workout streak", icon: "Zap", category: "streak", unlockedAt: new Date().toISOString() },
      { id: "b-3", name: "Hydration Master", description: "Logged 3.5L+ water for 5 consecutive days", icon: "Droplets", category: "water", unlockedAt: new Date().toISOString() },
      { id: "b-4", name: "Iron Lifter", description: "Log 50 total completed exercises", icon: "Dumbbell", category: "workout" },
      { id: "b-5", name: "Macro Genius", description: "Hit exact protein targets 3 days in a row", icon: "Apple", category: "nutrition" },
    ];
  },

  getDailyChallenges: async (): Promise<Challenge[]> => {
    return [
      { id: "c-1", title: "Hydration Hero", description: "Log at least 3.0 Liters of water today", xpReward: 100, progress: 80, completed: false },
      { id: "c-2", title: "Core Crusher", description: "Complete a workout with 3+ core exercises", xpReward: 150, progress: 100, completed: true },
      { id: "c-3", title: "Sleep Recovery", description: "Log 8 or more hours of sleep", xpReward: 120, progress: 100, completed: true },
    ];
  },

  getLeaderboard: async (): Promise<LeaderboardUser[]> => {
    return [
      { id: "u-1", name: "Alex Rivers", xp: 3450, level: 12, streak: 14, rank: 1 },
      { id: "u-2", name: "Sarah Vance", xp: 3120, level: 11, streak: 9, rank: 2 },
      { id: "u-3", name: "Marcus Chen", xp: 2890, level: 10, streak: 7, rank: 3 },
      { id: "u-4", name: "Elena Rostova", xp: 2400, level: 9, streak: 5, rank: 4 },
      { id: "u-5", name: "David Kim", xp: 2150, level: 8, streak: 3, rank: 5 },
    ];
  },
};
