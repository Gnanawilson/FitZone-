"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dumbbell, Utensils, Award, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ActivityFeed() {
  const activities = [
    {
      id: "a-1",
      title: "Completed Chest & Triceps Blast",
      category: "Workout",
      time: "2 hours ago",
      details: "55 mins • 480 kcal burned • 4 exercises logged",
      icon: Dumbbell,
      badge: "success",
    },
    {
      id: "a-2",
      title: "Logged High Protein Lunch",
      category: "Nutrition",
      time: "4 hours ago",
      details: "Grilled Chicken & Rice • 600 kcal • 50g Protein",
      icon: Utensils,
      badge: "info",
    },
    {
      id: "a-3",
      title: "Unlocked Badge: Hydration Master",
      category: "Achievement",
      time: "Yesterday",
      details: "Logged 3.5L water 5 days in a row! (+150 XP)",
      icon: Award,
      badge: "purple",
    },
  ];

  return (
    <Card className="bg-[#1B1B1F] border-[#32323A]">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base flex items-center gap-2 text-white font-bold">
          <Clock className="h-4 w-4 text-[#FC4C02]" />
          Strava Feed Sync & Activity
        </CardTitle>
        <Badge variant="warning" className="bg-[#FC4C02]/15 text-[#FC4C02] border-[#FC4C02]/30 text-[10px]">
          Live Feed
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <div key={act.id} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#121215] border border-[#2A2A30] hover:border-[#FC4C02]/50 transition-all">
              <div className="p-2.5 rounded-xl bg-[#2A2A30] text-[#FC4C02] shrink-0 mt-0.5">
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="text-xs font-bold text-white truncate">{act.title}</h5>
                  <span className="text-[10px] text-[#A0A0AA] shrink-0 font-medium">{act.time}</span>
                </div>
                <p className="text-[11px] text-[#A0A0AA] mt-0.5 font-medium">{act.details}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
