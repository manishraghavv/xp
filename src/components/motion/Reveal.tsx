"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "article";
}

/** Fade + lift when scrolled into view. Renders static content for reduced motion. */
export function Reveal({ children, className, delay = 0, y = 28, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const Comp = motion[as];
  if (reduced) return React.createElement(as, { className }, children);
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
    >
      {children}
    </Comp>
  );
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "0.6em", rotateX: -70, z: -60 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    z: 0,
    transition: { duration: 0.9, delay: i * 0.055, ease: EASE_OUT },
  }),
};

interface SplitWordsProps {
  text: string;
  className?: string;
  /** Start index offset so several headings can stagger one after another */
  startAt?: number;
  /** Substring rendered with the accent gradient (words overlapping it are highlighted) */
  highlight?: string;
  highlightClassName?: string;
}

/**
 * Word-by-word reveal with an X-axis rotation and depth. The full string stays available
 * as one aria-label so screen readers read the heading normally.
 */
export function SplitWords({
  text,
  className,
  startAt = 0,
  highlight,
  highlightClassName = "gradient-heading-accent",
}: SplitWordsProps) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{text}</span>;
  const words = text.split(" ");
  const hStart = highlight ? text.indexOf(highlight) : -1;
  const hEnd = hStart >= 0 && highlight ? hStart + highlight.length : -1;
  let offset = 0;
  return (
    <span
      className={className}
      aria-label={text}
      style={{ perspective: "800px", display: "inline-block" }}
    >
      {words.map((w, i) => {
        const start = offset;
        offset += w.length + 1;
        const hot = hStart >= 0 && start >= hStart && start < hEnd;
        return (
          <motion.span
            key={i}
            aria-hidden="true"
            custom={startAt + i}
            variants={wordVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            className={hot ? highlightClassName : undefined}
            style={{ display: "inline-block", transformOrigin: "50% 100%", willChange: "transform" }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        );
      })}
    </span>
  );
}
