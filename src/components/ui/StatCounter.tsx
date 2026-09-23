"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface StatCounterProps {
  number: string;
  label: string;
  theme?: "light" | "dark";
  className?: string;
}

export function StatCounter({
  number,
  label,
  theme = "light",
  className,
}: StatCounterProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div
        className={cn(
          "font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none mb-2",
          theme === "dark"
            ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400"
            : "text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-cyan-600"
        )}
      >
        {number}
      </div>
      <div
        className={cn(
          "text-xs sm:text-sm font-semibold tracking-wider uppercase",
          theme === "dark" ? "text-slate-400" : "text-slate-500"
        )}
      >
        {label}
      </div>
    </div>
  );
}
