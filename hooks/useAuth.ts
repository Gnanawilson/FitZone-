import { create } from "zustand";
import { UserProfile } from "@/types";

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, customName?: string) => void;
  logout: () => void;
  updateUser: (data: Partial<UserProfile>) => void;
}

// Format email or string to title case name
function formatDisplayName(email: string): string {
  const prefix = email.split("@")[0] || "Athlete";
  return prefix
    .split(/[._-]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export const useAuth = create<AuthState>((set) => ({
  user: {
    id: "usr_demo123",
    name: "Alex Morgan",
    email: "alex.morgan@fitpulse.ai",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    role: "USER",
    age: 26,
    gender: "MALE",
    height: 178,
    weight: 76.8,
    goal: "MUSCLE_GAIN",
    activityLevel: "MODERATELY_ACTIVE",
    streak: 7,
    xp: 2450,
    level: 5,
    units: "METRIC",
    theme: "DARK",
  },
  isAuthenticated: true,
  login: (email: string, customName?: string) =>
    set((state) => {
      const displayName = customName || formatDisplayName(email);
      const existingUser = state.user;

      if (existingUser) {
        return {
          isAuthenticated: true,
          user: {
            ...existingUser,
            email,
            name: displayName,
          },
        };
      }

      return {
        isAuthenticated: true,
        user: {
          id: `usr_${Date.now()}`,
          name: displayName,
          email,
          role: "USER",
          streak: 1,
          xp: 100,
          level: 1,
          units: "METRIC",
          theme: "DARK",
        },
      };
    }),
  logout: () => set({ user: null, isAuthenticated: false }),
  updateUser: (data) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    })),
}));
