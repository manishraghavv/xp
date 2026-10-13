"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Counts the first number inside a value up when it scrolls into view, keeping any
 * prefix or suffix ("16wks*", "~40%", "200+"). Non-numeric values ("S/4HANA", "Remote")
 * render as-is. An invisible copy of the final text reserves the width so nothing shifts.
 */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  const match = value.match(/^(\D*?)(\d+(?:\.\d+)?)(.*)$/);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!match || !inView) return;
    const target = parseFloat(match[2]);
    if (reduced) {
      setShown(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(Math.round(v * 10) / 10),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value]);

  if (!match) return <span className={className}>{value}</span>;

  const decimals = match[2].includes(".") ? match[2].split(".")[1].length : 0;
  const live = `${match[1]}${shown.toFixed(decimals)}${match[3]}`;

  return (
    <span ref={ref} className={className} style={{ position: "relative", display: "inline-block" }}>
      <span aria-hidden="true" style={{ visibility: "hidden" }}>
        {value}
      </span>
      <span style={{ position: "absolute", left: 0, top: 0 }} aria-label={value}>
        <span aria-hidden="true">{inView || reduced ? live : `${match[1]}0${match[3]}`}</span>
      </span>
    </span>
  );
}
