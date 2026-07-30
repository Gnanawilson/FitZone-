"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { MetricsForm } from "@/components/progress/MetricsForm";
import { ProgressCharts } from "@/components/progress/ProgressCharts";

export default function ProgressTrackerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">
          <MetricsForm />
          <ProgressCharts />
        </main>
      </div>
      <Footer />
    </div>
  );
}
