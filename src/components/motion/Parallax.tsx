"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** Pixels of travel across the element's pass through the viewport */
  distance?: number;
  /** Optional scale over the same range, e.g. [1.08, 1] */
  scale?: [number, number];
}

/** Scroll-linked vertical drift (and optional scale) for images and layers. */
export function Parallax({ children, className, distance = 60, scale }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const s = useTransform(scrollYProgress, [0, 1], scale ?? [1, 1]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y, scale: s }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
