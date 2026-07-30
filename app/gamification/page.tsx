"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { BadgeGrid } from "@/components/gamification/BadgeGrid";
import { Leaderboard } from "@/components/gamification/Leaderboard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trophy, CheckCircle2, Zap } from "lucide-react";
import { Challenge } from "@/types";
import { gamificationService } from "@/services/gamificationService";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";

export default function GamificationPage() {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    gamificationService.getDailyChallenges().then(setChallenges);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Trophy className="h-6 w-6 text-amber-400" />
                Gamification & Fitness Quests
              </h1>
              <p className="text-xs text-slate-400 mt-1">Unlock badges, gain XP, and climb the global leaderboard.</p>
            </div>
          </div>

          {/* User XP Header */}
          <Card className="bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-900 border-purple-500/30 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-purple-400 uppercase tracking-wider">Level {user?.level || 5} Athlete</p>
                <h3 className="text-2xl font-black text-white mt-1">{user?.xp || 2450} Total XP</h3>
                <p className="text-xs text-slate-400 mt-1">550 XP remaining until Level 6</p>
              </div>
              <div className="w-full sm:w-64 space-y-2">
                <Progress value={80} color="#a855f7" />
                <p className="text-[10px] text-slate-400 text-right">80% Progress to Level 6</p>
              </div>
            </div>
          </Card>

          {/* Daily Challenges */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-white flex items-center gap-2">
                <Zap className="h-4 w-4 text-indigo-400" />
                Daily Fitness Quests
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {challenges.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-white">{c.title}</h5>
                      <p className="text-[11px] text-slate-400 mt-0.5">{c.description}</p>
                    </div>
                    <span className="text-xs font-bold text-amber-400 shrink-0">+{c.xpReward} XP</span>
                  </div>
                  <Progress value={c.progress} color={c.completed ? "#10b981" : "#818cf8"} />
                  {c.completed && (
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BadgeGrid />
            <Leaderboard />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
