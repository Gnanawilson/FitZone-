export type Role = "USER" | "ADMIN";
export type Gender = "MALE" | "FEMALE" | "OTHER";
export type FitnessGoal = "WEIGHT_LOSS" | "MUSCLE_GAIN" | "MAINTAIN" | "ENDURANCE" | "STRENGTH";
export type ActivityLevel = "SEDENTARY" | "LIGHTLY_ACTIVE" | "MODERATELY_ACTIVE" | "VERY_ACTIVE" | "EXTRA_ACTIVE";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: Role;
  age?: number;
  gender?: Gender;
  height?: number;
  weight?: number;
  goal?: FitnessGoal;
  activityLevel?: ActivityLevel;
  streak: number;
  xp: number;
  level: number;
  units: "METRIC" | "IMPERIAL";
  theme: "DARK" | "LIGHT";
}
