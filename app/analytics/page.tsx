"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { ProgressCharts } from "@/components/progress/ProgressCharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart3, TrendingUp, Target, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-indigo-400" />
                Performance & Goal Analytics
              </h1>
              <p className="text-xs text-slate-400 mt-1">Deep analytics on volume, consistency, and physical metrics.</p>
            </div>
            <Badge variant="purple">Monthly Report Ready</Badge>
          </div>

          <ProgressCharts />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4 border-indigo-500/30">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-indigo-400" />
                <div>
                  <p className="text-xs text-slate-400">Total Workout Volume</p>
                  <p className="text-xl font-bold text-white">42,500 kg lifted</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-emerald-500/30">
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-emerald-400" />
                <div>
                  <p className="text-xs text-slate-400">Goal Completion Rate</p>
                  <p className="text-xl font-bold text-white">94% Target Hit</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-amber-500/30">
              <div className="flex items-center gap-3">
                <Award className="h-6 w-6 text-amber-400" />
                <div>
                  <p className="text-xs text-slate-400">Monthly Calorie Burn</p>
                  <p className="text-xl font-bold text-white">14,200 kcal</p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
