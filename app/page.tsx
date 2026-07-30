"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Chrome, Apple, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
      <Navbar />

      {/* Main Hero Split Section - Exact Strava 3-Column Layout */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-4rem)]">
        {/* Left Column Image (Cyclists on Scenic Route) */}
        <div className="hidden lg:block lg:col-span-4 relative overflow-hidden bg-slate-100">
          <img
            src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1000&q=80"
            alt="Athletes Cycling"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Middle Column Content (Registration & Value Proposition) */}
        <div className="lg:col-span-4 flex flex-col justify-center items-center p-8 sm:p-12 text-center max-w-md mx-auto space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Community-Powered Motivation
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              Track your progress and cheer each other on. Join over 100 million active people on Fit Zone+ for free.
            </p>
          </div>

          <p className="text-xs font-semibold text-slate-700">
            Already a Member?{" "}
            <Link href="/login" className="text-[#FC4C02] font-bold hover:underline">
              Log In
            </Link>
          </p>

          {/* Social Sign Up Action Buttons */}
          <div className="w-full space-y-3 pt-2">
            <Link
              href="/register"
              className="flex items-center justify-center gap-2.5 w-full rounded-md border border-slate-400 py-3 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <Chrome className="h-4 w-4 text-rose-500" />
              Sign Up With Google
            </Link>

            <Link
              href="/register"
              className="flex items-center justify-center gap-2.5 w-full rounded-md border border-slate-400 py-3 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <Apple className="h-4 w-4 text-slate-900" />
              Sign Up With Apple
            </Link>

            <Link
              href="/register"
              className="flex items-center justify-center gap-2 w-full rounded-md bg-[#FC4C02] py-3 text-xs font-bold text-white hover:bg-[#e04300] transition-colors shadow-sm"
            >
              Sign Up With Email
            </Link>
          </div>

          <p className="text-[10px] text-slate-500 leading-normal pt-2">
            By continuing, you are agreeing to our{" "}
            <Link href="/terms" className="text-slate-700 underline">Terms of Service</Link> and{" "}
            <Link href="/privacy" className="text-slate-700 underline">Privacy Policy</Link>.
          </p>
        </div>

        {/* Right Column Image (Runners & Smart Watch App Overlay) */}
        <div className="hidden lg:block lg:col-span-4 relative overflow-hidden bg-slate-100">
          <img
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80"
            alt="Runners Training"
            className="w-full h-full object-cover"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
