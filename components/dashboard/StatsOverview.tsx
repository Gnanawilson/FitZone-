"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Flame, Scale, Activity, Droplets, TrendingUp } from "lucide-react";
import { useProgressStore } from "@/hooks/useProgressStore";

export function StatsOverview() {
  const { todayWaterLiters, waterGoalLiters } = useProgressStore();

  const stats = [
    {
      title: "Calories Burned",
      value: "480 kcal",
      subtext: "Target: 500 kcal",
      icon: Flame,
      color: "text-[#FC4C02]",
      bg: "bg-[#FC4C02]/15 border-[#FC4C02]/40",
    },
    {
      title: "Current Weight",
      value: "76.8 kg",
      subtext: "-1.7 kg this month",
      icon: Scale,
      color: "text-amber-400",
      bg: "bg-amber-500/15 border-amber-500/40",
    },
    {
      title: "BMI Score",
      value: "24.2",
      subtext: "Normal Healthy Range",
      icon: Activity,
      color: "text-emerald-400",
      bg: "bg-emerald-500/15 border-emerald-500/40",
    },
    {
      title: "Water Intake",
      value: `${todayWaterLiters} / ${waterGoalLiters} L`,
      subtext: `${Math.round((todayWaterLiters / waterGoalLiters) * 100)}% of daily goal`,
      icon: Droplets,
      color: "text-sky-400",
      bg: "bg-sky-500/15 border-sky-500/40",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Card key={idx} className="bg-[#1B1B1F] border-[#32323A] hover:border-[#FC4C02]/60 transition-all">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl border ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <TrendingUp className="h-3 w-3" /> +12%
                </span>
              </div>
              <div className="mt-4">
                <p className="text-xs font-bold text-[#A0A0AA]">{stat.title}</p>
                <h4 className="text-2xl font-black text-white tracking-tight mt-1">{stat.value}</h4>
                <p className="text-[11px] text-[#A0A0AA] mt-1 font-medium">{stat.subtext}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
