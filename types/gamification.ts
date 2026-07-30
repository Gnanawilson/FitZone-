export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "workout" | "streak" | "nutrition" | "water" | "social";
  unlockedAt?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  progress: number; // 0 to 100
  completed: boolean;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatarUrl?: string;
  xp: number;
  level: number;
  streak: number;
  rank: number;
}
