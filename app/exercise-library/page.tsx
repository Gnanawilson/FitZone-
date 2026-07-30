"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ExerciseCard } from "@/components/workout/ExerciseCard";
import { workoutService } from "@/services/workoutService";
import { Exercise } from "@/types";
import { Search, Dumbbell } from "lucide-react";
import { MUSCLE_GROUPS, EQUIPMENT_LIST } from "@/lib/constants";

export default function ExerciseLibraryPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [equipment, setEquipment] = useState("ALL");

  useEffect(() => {
    workoutService.getExercises().then(setExercises);
  }, []);

  const filtered = exercises.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "ALL" || ex.category === category;
    const matchesEquipment = equipment === "ALL" || ex.equipment === equipment;
    return matchesSearch && matchesCategory && matchesEquipment;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Dumbbell className="h-6 w-6 text-indigo-400" />
                Comprehensive Exercise Library
              </h1>
              <p className="text-xs text-slate-400 mt-1">Browse, filter, and master exercise technique guides.</p>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <Input
                placeholder="Search exercise..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
            </div>

            <Select
              options={[{ label: "All Muscle Groups", value: "ALL" }, ...MUSCLE_GROUPS.map((m) => ({ label: m, value: m }))]}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <Select
              options={[{ label: "All Equipment", value: "ALL" }, ...EQUIPMENT_LIST.map((eq) => ({ label: eq, value: eq }))]}
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((ex) => (
              <ExerciseCard key={ex.id} exercise={ex} />
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
