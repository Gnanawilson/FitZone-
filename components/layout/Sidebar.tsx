"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  Utensils,
  Calculator,
  LineChart,
  Bot,
  Dumbbell,
  PlayCircle,
  Apple,
  Trophy,
  BarChart3,
  ShieldAlert,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Workout Planner", href: "/workout-planner", icon: Sparkles },
  { label: "Diet Calculator", href: "/diet-calculator", icon: Utensils },
  { label: "BMI Calculator", href: "/bmi-calculator", icon: Calculator },
  { label: "Progress Tracker", href: "/progress-tracker", icon: LineChart },
  { label: "Fitness Coach", href: "/ai-coach", icon: Bot },
  { label: "Exercise Library", href: "/exercise-library", icon: Dumbbell },
  { label: "Workout Logger", href: "/workout-logger", icon: PlayCircle },
  { label: "Nutrition Tracker", href: "/nutrition-tracker", icon: Apple },
  { label: "Gamification", href: "/gamification", icon: Trophy },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Admin Dashboard", href: "/admin", icon: ShieldAlert },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="w-64 shrink-0 border-r border-[#2A2A30] bg-[#121215] hidden md:flex flex-col min-h-[calc(100vh-4rem)] p-4 justify-between">
      <div className="space-y-1">
        <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-[#A0A0AA] mb-2">Athletic Menu</p>
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 group",
                  isActive
                    ? "bg-[#FC4C02]/15 text-[#FC4C02] border border-[#FC4C02]/40 font-bold shadow-md shadow-[#FC4C02]/10"
                    : "text-[#D1D5DB] hover:text-white hover:bg-[#1E1E24]"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", isActive ? "text-[#FC4C02]" : "text-[#A0A0AA]")} />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout button */}
      <div className="pt-4 border-t border-slate-200">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
