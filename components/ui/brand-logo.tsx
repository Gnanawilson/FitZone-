"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function BrandLogo({ className, size = "md", href = "/dashboard" }: BrandLogoProps) {
  const iconSizes = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-12 w-12",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-3xl",
  };

  const badgeSizes = {
    sm: "text-[9px] px-1 py-0.5",
    md: "text-xs px-1.5 py-0.5",
    lg: "text-sm px-2 py-1",
  };

  const content = (
    <div className={cn("inline-flex items-center gap-2.5 group cursor-pointer", className)}>
      {/* Creative Athletic Emblem Logo */}
      <div className={cn(
        "relative flex items-center justify-center rounded-2xl bg-gradient-to-tr from-[#FC4C02] via-[#FF5500] to-[#FF8800] p-2 shadow-lg shadow-[#FC4C02]/30 group-hover:scale-105 group-hover:shadow-[#FC4C02]/50 transition-all duration-300",
        iconSizes[size]
      )}>
        {/* Flame & Pulse Interlocking Graphic */}
        <svg className="w-full h-full text-white fill-current drop-shadow-sm" viewBox="0 0 24 24">
          <path d="M13.5 1.5s0 2.25-1.5 3.75c-1.5 1.5-3.75 2.25-3.75 5.25 0 3.31 2.69 6 6 6 3.31 0 6-2.69 6-6 0-3.75-3-6-3-6s.75 3-1.5 4.5c-1.5 1.5-2.25 0-2.25 0zM7.5 10.5C6.12 10.5 5 11.62 5 13c0 2.21 1.79 4 4 4 1.38 0 2.5-1.12 2.5-2.5 0-1.66-1.34-3-3-3-1 0-1 1-1 1s-.5-.5-1-1zm5 8c-3.87 0-7 3.13-7 7h14c0-3.87-3.13-7-7-7z" />
          <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.428 0 5.5 9.769h4.172z" opacity="0.85" />
        </svg>
        {/* Subtle Inner Glow Dot */}
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-white animate-ping opacity-75" />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <span className={cn("font-black tracking-tighter text-white uppercase font-sans flex items-center gap-1.5", textSizes[size])}>
          FIT ZONE
          <span className={cn("font-extrabold text-[#FC4C02] bg-[#FC4C02]/15 border border-[#FC4C02]/40 rounded-lg shadow-xs", badgeSizes[size])}>
            +
          </span>
        </span>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
