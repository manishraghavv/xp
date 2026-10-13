"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollLineProps {
  children: React.ReactNode;
  className?: string;
  /** "vertical" draws top-to-bottom along the left edge, "horizontal" along the top */
  orientation?: "vertical" | "horizontal";
  /** Extra classes for the track (position / thickness) */
  lineClassName?: string;
}

/**
 * Wraps a timeline and draws a gradient line along it as the wrapper scrolls through the
 * viewport. The track stays faintly visible; reduced motion shows it fully drawn.
 */
export function ScrollLine({
  children,
  className,
  orientation = "vertical",
  lineClassName,
}: ScrollLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const p = useTransform(smooth, (v) => (reduced ? 1 : v));
  const vertical = orientation === "vertical";

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute bg-slate-500/20 rounded-full",
          vertical ? "left-0 top-0 h-full w-px" : "left-0 top-0 w-full h-px",
          lineClassName
        )}
      >
        <motion.div
          className={cn(
            "absolute inset-0 rounded-full shadow-[0_0_14px_rgba(6,182,212,0.7)]",
            vertical
              ? "origin-top bg-gradient-to-b from-brand-blue via-brand-violet to-brand-cyan"
              : "origin-left bg-gradient-to-r from-brand-blue via-brand-violet to-brand-cyan"
          )}
          style={vertical ? { scaleY: p } : { scaleX: p }}
        />
      </div>
      {children}
    </div>
  );
}
