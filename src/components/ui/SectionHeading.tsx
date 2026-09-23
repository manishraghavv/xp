import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  highlight?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  highlight,
  align = "center",
  theme = "light",
  className,
}: SectionHeadingProps) {
  // If highlight is provided and title is a string, replace highlight with gradient span
  const renderTitle = () => {
    if (typeof title === "string" && highlight && title.includes(highlight)) {
      const parts = title.split(highlight);
      return (
        <>
          {parts[0]}
          <span className="gradient-heading-accent">{highlight}</span>
          {parts[1]}
        </>
      );
    }
    return title;
  };

  return (
    <div
      className={cn(
        "max-w-3xl mb-12 sm:mb-16",
        align === "center" ? "text-center mx-auto" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <div className="mb-4">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border",
              theme === "dark"
                ? "bg-blue-500/10 text-brand-cyan border-cyan-500/20"
                : "bg-blue-50 text-brand-blue border-blue-100"
            )}
          >
            {eyebrow}
          </span>
        </div>
      )}

      <h2
        className={cn(
          "font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] mb-5",
          theme === "dark" ? "text-white" : "text-slate-900"
        )}
      >
        {renderTitle()}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "text-base sm:text-lg leading-relaxed max-w-2xl",
            align === "center" ? "mx-auto" : "",
            theme === "dark" ? "text-slate-300" : "text-slate-600"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
