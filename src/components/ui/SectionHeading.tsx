import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  theme = "light",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl mb-12",
        align === "center" ? "text-center mx-auto" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase mb-4",
            theme === "dark" ? "text-brand-cyan" : "text-brand-blue"
          )}
        >
          <span className="w-5 h-[1.5px] bg-current" />
          {eyebrow}
        </div>
      )}

      <h2
        className={cn(
          "font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-5",
          theme === "dark" ? "text-white" : "text-slate-900"
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "text-base sm:text-lg leading-relaxed",
            theme === "dark" ? "text-slate-300" : "text-slate-600"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
