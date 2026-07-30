"use client";

import { useAuth } from "@/hooks/useAuth";
import { Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function WelcomeCard() {
  const { user } = useAuth();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#1B1B1F] border border-[#32323A] p-6 sm:p-8 shadow-xl">
      {/* Decorative Glow background elements */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#FC4C02]/15 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#FF6B00]/15 blur-3xl" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FC4C02]/15 border border-[#FC4C02]/40 px-3 py-1 text-xs font-bold text-[#FC4C02]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Athletic Performance Tracking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FC4C02] via-[#FF6B00] to-[#FF8800]">{user?.name || "Athlete"}</span>! 👋
          </h1>
          <p className="text-xs sm:text-sm text-[#D1D5DB] max-w-xl font-medium">
            You are currently on a <strong className="text-[#FC4C02] font-extrabold">{user?.streak || 7}-day workout streak</strong>. Keep up the high intensity today to earn your next achievement badge!
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link href="/workout-planner">
            <Button variant="gradient" size="lg" className="gap-2 text-xs sm:text-sm">
              <Zap className="h-4 w-4 fill-white" />
              Workout Planner
            </Button>
          </Link>
          <Link href="/workout-logger">
            <Button variant="secondary" size="lg" className="gap-2 text-xs sm:text-sm">
              Start Workout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
