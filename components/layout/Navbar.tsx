"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Flame, Search, Command, LogOut, LayoutDashboard, Sparkles, Utensils, Calculator, LineChart, Dumbbell, PlayCircle, Apple, Trophy, BarChart3 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { BrandLogo } from "@/components/ui/brand-logo";

const QUICK_SEARCH_ITEMS = [
  { label: "Dashboard Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Workout Planner", href: "/workout-planner", icon: Sparkles },
  { label: "Diet & Macro Calculator", href: "/diet-calculator", icon: Utensils },
  { label: "BMI Calculator", href: "/bmi-calculator", icon: Calculator },
  { label: "Progress Tracker", href: "/progress-tracker", icon: LineChart },
  { label: "Fitness Coach", href: "/ai-coach", icon: Sparkles },
  { label: "Exercise Library", href: "/exercise-library", icon: Dumbbell },
  { label: "Workout Logger & Timer", href: "/workout-logger", icon: PlayCircle },
  { label: "Nutrition Tracker", href: "/nutrition-tracker", icon: Apple },
  { label: "Gamification & Leaderboard", href: "/gamification", icon: Trophy },
  { label: "Analytics & Trends", href: "/analytics", icon: BarChart3 },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  // Global Ctrl+K / Cmd+K listener for instant workflow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[#2A2A30] bg-[#101012] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <BrandLogo size="md" href={isAuthenticated ? "/dashboard" : "/"} />

          {/* Quick Search Launcher Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-[#1B1B1F] border border-[#32323A] hover:border-[#FC4C02]/50 text-[#A0A0AA] px-3.5 py-1.5 rounded-xl text-xs transition-colors"
          >
            <Search className="h-3.5 w-3.5 text-[#FC4C02]" />
            <span>Search features...</span>
            <kbd className="hidden lg:inline-block bg-[#25252C] border border-[#3A3A42] text-[10px] font-mono text-slate-300 px-1.5 py-0.5 rounded">
              ⌘K
            </kbd>
          </button>

          {/* Center Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#D1D5DB]">
            <div className="relative flex items-center gap-1 cursor-pointer hover:text-[#FC4C02] transition-colors">
              <span>Activities</span>
              <ChevronDown className="h-4 w-4 text-[#A0A0AA]" />
            </div>
            <Link href="/workout-planner" className="hover:text-[#FC4C02] transition-colors">Features</Link>
            <Link href="/exercise-library" className="hover:text-[#FC4C02] transition-colors">Maps</Link>
            <Link href="/gamification" className="hover:text-[#FC4C02] transition-colors">Challenges</Link>
            <Link href="/analytics" className="hover:text-[#FC4C02] transition-colors">Subscription</Link>
          </nav>

          {/* Top Right User Profile / Log In Button */}
          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2.5 bg-[#1B1B1F] border border-[#32323A] px-3 py-1.5 rounded-full">
                  <div className="flex items-center gap-1.5 text-xs font-black text-[#FC4C02]">
                    <Flame className="h-4 w-4 fill-[#FC4C02] text-[#FC4C02] animate-pulse" />
                    <span>{user.streak} Days</span>
                  </div>
                  <div className="h-3.5 w-[1px] bg-[#32323A]" />
                  <span className="text-xs font-extrabold text-white">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  title="Sign Out"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1B1B1F] border border-[#32323A] text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-md border border-[#3A3A42] bg-[#1A1A1F] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#25252C] transition-colors"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Quick Navigation Command Palette Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#1B1B1F] border border-[#32323A] p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-[#32323A] pb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Command className="h-4 w-4 text-[#FC4C02]" />
                <span>Quick Workflow Navigation</span>
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-xs text-[#A0A0AA] hover:text-white bg-[#25252C] px-2 py-1 rounded-md"
              >
                ESC
              </button>
            </div>

            <div className="space-y-1 max-h-80 overflow-y-auto">
              {QUICK_SEARCH_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    onClick={() => {
                      setSearchOpen(false);
                      router.push(item.href);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl p-2.5 text-xs font-bold text-white hover:bg-[#FC4C02]/15 hover:text-[#FC4C02] transition-colors text-left"
                  >
                    <Icon className="h-4 w-4 text-[#FC4C02]" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
