"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Settings, User, Bell, Shield, Moon, Save } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/toast";

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();

  const [name, setName] = useState(user?.name || "Alex Morgan");
  const [email, setEmail] = useState(user?.email || "alex.morgan@fitpulse.ai");
  const [units, setUnits] = useState(user?.units || "METRIC");
  const [workoutReminder, setWorkoutReminder] = useState(true);
  const [waterReminder, setWaterReminder] = useState(true);
  const [mealReminder, setMealReminder] = useState(true);
  const [sleepReminder, setSleepReminder] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email, units: units as any });
    toast("Settings Saved!", "Your profile preferences have been updated.", "success");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Settings className="h-6 w-6 text-indigo-400" />
                Account & Preference Settings
              </h1>
              <p className="text-xs text-slate-400 mt-1">Manage profile parameters, notification triggers, and units.</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Profile Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base text-white flex items-center gap-2">
                  <User className="h-4 w-4 text-indigo-400" /> Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <Select
                  label="Measurement Units"
                  options={[
                    { label: "Metric (kg, cm, Liters)", value: "METRIC" },
                    { label: "Imperial (lbs, feet/inches, oz)", value: "IMPERIAL" },
                  ]}
                  value={units}
                  onChange={(e) => setUnits(e.target.value as "METRIC" | "IMPERIAL")}
                />

                <Select
                  label="Interface Theme"
                  options={[
                    { label: "Dark Mode (Glassmorphism)", value: "DARK" },
                    { label: "Light Mode", value: "LIGHT" },
                  ]}
                  defaultValue="DARK"
                />
              </CardContent>
            </Card>

            {/* Notification Reminders */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base text-white flex items-center gap-2">
                  <Bell className="h-4 w-4 text-purple-400" /> Push Notifications & Reminders
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                  <div>
                    <p className="text-xs font-bold text-white">Daily Workout Reminder</p>
                    <p className="text-[10px] text-slate-400">Receive alert 30 mins before scheduled routine time</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={workoutReminder}
                    onChange={(e) => setWorkoutReminder(e.target.checked)}
                    className="h-4 w-4 rounded accent-indigo-600"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                  <div>
                    <p className="text-xs font-bold text-white">Hydration Water Alerts</p>
                    <p className="text-[10px] text-slate-400">Periodic reminders to hit your 3.5L water goal</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={waterReminder}
                    onChange={(e) => setWaterReminder(e.target.checked)}
                    className="h-4 w-4 rounded accent-indigo-600"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                  <div>
                    <p className="text-xs font-bold text-white">Meal & Macro Tracker Reminders</p>
                    <p className="text-[10px] text-slate-400">Prompt for logging breakfast, lunch, and dinner</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={mealReminder}
                    onChange={(e) => setMealReminder(e.target.checked)}
                    className="h-4 w-4 rounded accent-indigo-600"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                  <div>
                    <p className="text-xs font-bold text-white">Sleep & Recovery Prompts</p>
                    <p className="text-[10px] text-slate-400">Reminds you to log sleep duration every morning</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={sleepReminder}
                    onChange={(e) => setSleepReminder(e.target.checked)}
                    className="h-4 w-4 rounded accent-indigo-600"
                  />
                </label>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" variant="gradient" size="lg" className="gap-2 px-8">
                <Save className="h-4 w-4" /> Save All Preferences
              </Button>
            </div>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
}
