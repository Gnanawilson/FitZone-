"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  color?: string;
}

export function Progress({ className, value, color, ...props }: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("relative h-2.5 w-full overflow-hidden rounded-full bg-slate-800", className)} {...props}>
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{
          width: `${percentage}%`,
          backgroundColor: color || "hsl(var(--primary, 239 84% 67%))",
        }}
      />
    </div>
  );
}
