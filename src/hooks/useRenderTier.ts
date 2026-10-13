"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * "full" : desktop with WebGL, 3D text and rich scenes
 * "lite" : touch / small / low-power devices, lighter scenes, no 3D text
 * "none" : no WebGL or reduced motion, show static fallbacks only
 *
 * Starts as "none" so server markup and the first client render match (no hydration drift).
 */
export type RenderTier = "full" | "lite" | "none";

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function useRenderTier(): RenderTier {
  const reduced = useReducedMotion();
  const [tier, setTier] = useState<RenderTier>("none");

  useEffect(() => {
    if (reduced || !hasWebGL()) {
      setTier("none");
      return;
    }
    const nav = navigator as Navigator & { deviceMemory?: number };
    const small = window.matchMedia("(max-width: 1023px)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const weak =
      (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 4) ||
      (nav.deviceMemory !== undefined && nav.deviceMemory <= 4);
    setTier(small || coarse || weak ? "lite" : "full");
  }, [reduced]);

  return tier;
}

/** True once the element has come within `margin` of the viewport (stays true afterwards). */
export function useNearViewport<T extends Element>(
  ref: React.RefObject<T | null>,
  margin = "300px"
) {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);
  return near;
}

/** Live "is currently on screen" flag, used to pause render loops off-screen. */
export function useInView<T extends Element>(ref: React.RefObject<T | null>) {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return inView;
}
