"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-950 text-slate-100 text-center space-y-4">
      <div className="p-4 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
        <Compass className="h-10 w-10 animate-spin" />
      </div>
      <h1 className="text-4xl font-black text-white">404 - Page Not Found</h1>
      <p className="text-xs text-slate-400 max-w-sm">
        The route you are trying to access does not exist or has been moved.
      </p>
      <Link href="/dashboard">
        <Button variant="gradient" className="gap-2">
          <Home className="h-4 w-4" /> Return to Dashboard
        </Button>
      </Link>
    </div>
  );
}
