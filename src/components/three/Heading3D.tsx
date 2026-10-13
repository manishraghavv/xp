"use client";

import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useInView, useRenderTier } from "@/hooks/useRenderTier";
import { cn } from "@/lib/utils";

const HeroTextCanvas = dynamic(() => import("./HeroTextCanvas"), { ssr: false });

/**
 * Accent phrase of a hero heading. The real text always stays in the DOM (SEO, screen
 * readers, selection) and keeps the layout size. On capable desktops a real extruded,
 * bevelled 3D version is drawn over it and the DOM copy fades out once the model is
 * ready. Everyone else sees the existing gradient text.
 */
export function Heading3D({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const tier = useRenderTier();
  const inView = useInView(ref);
  const [ready, setReady] = useState(false);
  const on = tier === "full";

  return (
    <span
      ref={ref}
      className={cn(on ? "relative inline-block whitespace-nowrap" : "", className)}
    >
      <span className={cn("gradient-heading-accent", on && ready && "opacity-0")}>{text}</span>
      {on && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-4 -inset-y-6 block"
        >
          <HeroTextCanvas text={text} active={inView} onReady={() => setReady(true)} />
        </span>
      )}
    </span>
  );
}
