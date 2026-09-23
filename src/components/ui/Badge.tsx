import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "cyan" | "gold" | "blue" | "neutral" | "green";
  size?: "sm" | "md";
  className?: string;
  pulse?: boolean;
}

export function Badge({
  children,
  variant = "cyan",
  size = "md",
  className,
  pulse = false,
}: BadgeProps) {
  const sizeClasses = size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3.5 py-1.5 text-xs";

  const variantClasses = {
    cyan: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/25",
    gold: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30",
    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/25",
    neutral: "bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-300/60 dark:border-slate-700/60",
    green: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25",
  }[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-semibold tracking-wider uppercase rounded-full backdrop-blur-md",
        sizeClasses,
        variantClasses,
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
