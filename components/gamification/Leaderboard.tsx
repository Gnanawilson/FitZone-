"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trophy, Flame, Crown } from "lucide-react";
import { LeaderboardUser } from "@/types";
import { gamificationService } from "@/services/gamificationService";
import { Badge } from "@/components/ui/badge";

export function Leaderboard() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    gamificationService.getLeaderboard().then(setUsers);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base text-white flex items-center gap-2">
          <Crown className="h-5 w-5 text-amber-400" />
          Global Fitness Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {users.map((u) => (
            <div
              key={u.id}
              className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                u.rank === 1
                  ? "bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border-amber-500/40"
                  : "bg-slate-950/40 border-slate-800"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl font-black text-xs ${
                    u.rank === 1
                      ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30"
                      : u.rank === 2
                      ? "bg-slate-300 text-slate-950"
                      : u.rank === 3
                      ? "bg-amber-700 text-white"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  #{u.rank}
                </div>
                <div>
                  <p className="text-xs font-bold text-white flex items-center gap-1.5">
                    {u.name}
                    {u.rank === 1 && <Trophy className="h-3.5 w-3.5 text-amber-400" />}
                  </p>
                  <p className="text-[10px] text-slate-400">Level {u.level} Athlete</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-xs font-semibold text-amber-400">
                  <Flame className="h-3.5 w-3.5 fill-amber-400" />
                  <span>{u.streak}d</span>
                </div>
                <Badge variant="purple" className="text-xs">
                  {u.xp} XP
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
