import React from "react";
import { cn } from "@/lib/utils";
import { AnimatedText } from "@/components/ui/AnimatedText";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  highlight?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

/**
 * The single section header (eyebrow, h2, description). Plain strings get the
 * scroll-triggered word-drop; rich (JSX) content falls back to a fade-up reveal.
 * Browsers without scroll-driven animations simply show the text.
 */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  highlight,
  align = "center",
  theme = "light",
  className,
}: SectionHeaderProps) {
  const h2Class = cn(
    "font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] mb-5",
    theme === "dark" ? "text-white" : "text-slate-900"
  );
  const pClass = cn(
    "text-base sm:text-lg leading-relaxed max-w-2xl",
    align === "center" ? "mx-auto" : "",
    theme === "dark" ? "text-slate-300" : "text-slate-600"
  );

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
            <AnimatedText text={eyebrow} scroll stagger={0.04} />
          </span>
        </div>
      )}

      {typeof title === "string" ? (
        <AnimatedText
          as="h2"
          text={title}
          highlight={highlight}
          scroll
          startIndex={0}
          className={h2Class}
        />
      ) : (
        <h2 className={cn(h2Class, "reveal-1")}>{title}</h2>
      )}

      {subtitle &&
        (typeof subtitle === "string" ? (
          <AnimatedText
            as="p"
            text={subtitle}
            scroll
            tier={2}
            startIndex={0}
            className={pClass}
          />
        ) : (
          <p className={cn(pClass, "reveal-3")}>{subtitle}</p>
        ))}
    </div>
  );
}
