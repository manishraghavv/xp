"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import { getGsap } from "@/lib/gsap";

/**
 * Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger stays in sync.
 * Native scrolling is kept on touch devices (Lenis default) and when the visitor
 * prefers reduced motion. Scroll is paused while a modal/menu locks the page.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const { gsap, ScrollTrigger } = getGsap();

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: { offset: -96 },
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Pause smooth scrolling while an overlay locks the page
    const syncLock = () => {
      if (document.body.dataset.overlayOpen === "true") lenis.stop();
      else lenis.start();
    };
    const mo = new MutationObserver(syncLock);
    mo.observe(document.body, { attributes: true, attributeFilter: ["data-overlay-open"] });

    return () => {
      mo.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}
