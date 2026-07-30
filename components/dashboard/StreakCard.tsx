"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Flame, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function StreakCard() {
  const { user } = useAuth();
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const completed = [true, true, true, true, true, true, false]; // mock week

  return (
    <Card className="bg-[#1B1B1F] border-[#32323A] shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base flex items-center gap-2 text-white font-bold">
          <Flame className="h-5 w-5 fill-[#FC4C02] text-[#FC4C02] animate-bounce" />
          Active Athletic Streak
        </CardTitle>
        <span className="text-xs font-black text-[#FC4C02] bg-[#FC4C02]/15 px-2.5 py-1 rounded-full border border-[#FC4C02]/40">
          {user?.streak || 7} Days Fire
        </span>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-[#A0A0AA] font-medium">Complete today&apos;s workout to maintain your Strava streak!</p>
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {days.map((day, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold transition-all ${
                  completed[idx]
                    ? "bg-[#FC4C02] text-white shadow-md shadow-[#FC4C02]/30"
                    : "bg-[#25252C] text-[#6E6E78] border border-[#3A3A42]"
                }`}
              >
                {completed[idx] ? <CheckCircle2 className="h-4 w-4" /> : day}
              </div>
              <span className="text-[10px] font-bold text-[#A0A0AA]">{day}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
