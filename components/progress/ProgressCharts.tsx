"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, AreaChart, Area } from "recharts";
import { TrendingDown, Moon, Droplets } from "lucide-react";
import { progressService } from "@/services/progressService";
import { ProgressLog } from "@/types";

export function ProgressCharts() {
  const [data, setData] = useState<ProgressLog[]>([]);

  useEffect(() => {
    progressService.getProgressLogs().then(setData);
  }, []);

  const chartData = data.map((d) => ({
    date: new Date(d.createdAt).toLocaleDateString("en-US", { weekday: "short" }),
    weight: d.weight,
    bodyFat: d.bodyFat,
    sleep: d.sleepHours,
    water: d.waterLiters,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Weight & Body Fat Trend */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base text-white flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-emerald-400" /> Weight & Body Fat % Trend
          </CardTitle>
          <span className="text-xs text-emerald-400 font-bold">-1.7 kg in 7 days</span>
        </CardHeader>
        <CardContent className="h-64 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
              <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", fontSize: "12px" }}
              />
              <Line type="monotone" dataKey="weight" stroke="#818cf8" strokeWidth={3} dot={{ r: 4 }} name="Weight (kg)" />
              <Line type="monotone" dataKey="bodyFat" stroke="#f43f5e" strokeWidth={2} dot={{ r: 3 }} name="Body Fat %" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Sleep & Water Tracker Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base text-white flex items-center gap-2">
            <Moon className="h-4 w-4 text-purple-400" /> Sleep Hours & Water Intake
          </CardTitle>
          <span className="text-xs text-sky-400 font-bold">Avg: 7.9 hrs sleep</span>
        </CardHeader>
        <CardContent className="h-64 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", fontSize: "12px" }}
              />
              <Bar dataKey="sleep" fill="#a855f7" radius={[6, 6, 0, 0]} name="Sleep (hrs)" />
              <Bar dataKey="water" fill="#38bdf8" radius={[6, 6, 0, 0]} name="Water (L)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
