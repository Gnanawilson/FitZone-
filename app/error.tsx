"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Next.js Error Boundary caught error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-950 text-slate-100 text-center space-y-4">
      <div className="p-4 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
        <AlertTriangle className="h-10 w-10" />
      </div>
      <h2 className="text-2xl font-bold text-white">Something went wrong!</h2>
      <p className="text-xs text-slate-400 max-w-md">
        An unexpected error occurred. Click below to re-render the page or reset state.
      </p>
      <Button variant="gradient" onClick={() => reset()} className="gap-2">
        <RefreshCw className="h-4 w-4" /> Try Again
      </Button>
    </div>
  );
}
