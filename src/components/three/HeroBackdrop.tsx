"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { useInView, useNearViewport, useRenderTier } from "@/hooks/useRenderTier";
import { cn } from "@/lib/utils";

// Separate chunk: three / r3f / postprocessing are only downloaded when a scene is needed
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

interface HeroBackdropProps {
  variant?: "home" | "migration" | "calm";
  className?: string;
}

/**
 * Absolutely positioned 3D layer for dark hero sections. Mounts the WebGL scene only when
 * near the viewport, pauses rendering while off-screen, and renders nothing (so the
 * existing CSS backgrounds show) when WebGL is unavailable or motion is reduced.
 */
export function HeroBackdrop({ variant = "home", className }: HeroBackdropProps) {
  const ref = useRef<HTMLDivElement>(null);
  const tier = useRenderTier();
  const near = useNearViewport(ref, "200px");
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 z-[1]", className)}
    >
      {tier !== "none" && near && <HeroScene variant={variant} tier={tier} active={inView} />}
    </div>
  );
}
