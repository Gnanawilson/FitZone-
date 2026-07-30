"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { WaterTracker } from "@/components/dashboard/WaterTracker";
import { StreakCard } from "@/components/dashboard/StreakCard";
import { ProgressCharts } from "@/components/progress/ProgressCharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MOTIVATIONAL_QUOTES } from "@/lib/constants";
import { Quote, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const quote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">
          {/* Welcome Banner */}
          <WelcomeCard />

          {/* Key Metrics Stats */}
          <StatsOverview />

          {/* Grid Layout: Activity & Trackers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ActivityFeed />
              <ProgressCharts />
            </div>

            <div className="space-y-6">
              <StreakCard />
              <WaterTracker />

              {/* Motivational Quote Widget */}
              <Card className="bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-900 border-purple-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                    <Quote className="h-4 w-4" /> Daily Motivation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-slate-200 italic font-medium leading-relaxed">&ldquo;{quote.text}&rdquo;</p>
                  <p className="text-[10px] text-purple-300 font-bold text-right">— {quote.author}</p>
                </CardContent>
              </Card>

              {/* AI Assistant Quick Launcher */}
              <Card className="p-5 border-indigo-500/30 text-center space-y-3">
                <Sparkles className="h-8 w-8 text-indigo-400 mx-auto animate-bounce" />
                <h4 className="text-sm font-bold text-white">Need Live Workout Advice?</h4>
                <p className="text-xs text-slate-400">Ask your AI Fitness Assistant anything in real-time.</p>
                <Link href="/ai-coach" className="block">
                  <Button variant="gradient" size="sm" className="w-full">
                    Open AI Coach
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
