"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Award, Flame, Zap, Droplets, Dumbbell, Apple, Lock } from "lucide-react";
import { Badge as BadgeType } from "@/types";
import { gamificationService } from "@/services/gamificationService";
import { Badge } from "@/components/ui/badge";

const ICON_MAP: Record<string, any> = {
  Flame,
  Zap,
  Droplets,
  Dumbbell,
  Apple,
};

export function BadgeGrid() {
  const [badges, setBadges] = useState<BadgeType[]>([]);

  useEffect(() => {
    gamificationService.getBadges().then(setBadges);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base text-white flex items-center gap-2">
          <Award className="h-5 w-5 text-amber-400" />
          Achievements & Badges Library
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((b) => {
            const IconComponent = ICON_MAP[b.icon] || Award;
            const isUnlocked = !!b.unlockedAt;

            return (
              <div
                key={b.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  isUnlocked
                    ? "bg-slate-900/90 border-amber-500/40 shadow-lg shadow-amber-500/10"
                    : "bg-slate-950/40 border-slate-800 opacity-60"
                }`}
              >
                <div
                  className={`p-3 rounded-2xl shrink-0 ${
                    isUnlocked ? "bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950" : "bg-slate-800 text-slate-500"
                  }`}
                >
                  {isUnlocked ? <IconComponent className="h-6 w-6" /> : <Lock className="h-6 w-6" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-white truncate">{b.name}</h5>
                    {isUnlocked ? (
                      <Badge variant="warning" className="text-[9px]">Unlocked</Badge>
                    ) : (
                      <Badge variant="default" className="text-[9px]">Locked</Badge>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{b.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
