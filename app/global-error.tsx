"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-950 text-slate-100 text-center space-y-4">
        <div className="p-4 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <AlertTriangle className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold text-white">Application Global Error</h2>
        <p className="text-xs text-slate-400 max-w-md">A root layout error occurred.</p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
        >
          <RefreshCw className="h-4 w-4" /> Reset Application
        </button>
      </body>
    </html>
  );
}
