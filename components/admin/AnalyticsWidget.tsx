"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Activity, Server, Zap } from "lucide-react";

export function AnalyticsWidget() {
  const metrics = [
    { title: "Total Registered Users", value: "12,480", change: "+14% this week", icon: Users, color: "text-indigo-400" },
    { title: "AI Workouts Generated", value: "48,920", change: "+22% this week", icon: Zap, color: "text-purple-400" },
    { title: "Active Daily Sessions", value: "3,210", change: "+8% today", icon: Activity, color: "text-emerald-400" },
    { title: "API Health & Uptime", value: "99.98%", change: "Optimal status", icon: Server, color: "text-sky-400" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <Card key={idx}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-slate-800">
                  <Icon className={`h-5 w-5 ${m.color}`} />
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {m.change}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-xs text-slate-400">{m.title}</p>
                <h4 className="text-2xl font-black text-white tracking-tight mt-1">{m.value}</h4>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
