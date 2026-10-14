"use client";

import React, { useEffect, useState } from "react";

/**
 * The <source media> attribute is ignored by most browsers for <video>, so the
 * tier must be chosen in JS. This helper runs exactly once on mount (no scroll,
 * no per-frame logic) and re-renders the <video> with the correct single file.
 *
 * Width tiers:
 *   >= 1280      -> 1080p
 *   768 - 1279   -> 720p
 *   < 768        -> mobile square (720x720)
 */
const VIDEO_TIERS = {
  desktop: "/videos/sap-cloud-erp-bg-1080p.mp4",
  tablet: "/videos/sap-cloud-erp-bg-720p.mp4",
  mobile: "/videos/sap-cloud-erp-bg-mobile-square.mp4",
} as const;

function pickVideoSource(): string {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return VIDEO_TIERS.desktop;
  }
  if (window.matchMedia("(min-width: 1280px)").matches) return VIDEO_TIERS.desktop;
  if (window.matchMedia("(min-width: 768px)").matches) return VIDEO_TIERS.tablet;
  return VIDEO_TIERS.mobile;
}

interface HeroBackgroundVideoProps {
  poster: string;
  className?: string;
}

export function HeroBackgroundVideo({ poster, className }: HeroBackgroundVideoProps) {
  // `null` until the source is chosen, so the poster stays visible and there is
  // no empty flash on first paint.
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    setSrc(pickVideoSource());
  }, []);

  if (!src) return null;

  return (
    <video
      className={className}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}
