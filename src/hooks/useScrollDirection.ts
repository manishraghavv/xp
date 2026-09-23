"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export interface ScrollDirectionOptions {
  threshold?: number;
  topThreshold?: number;
  downThreshold?: number;
}

export function useScrollDirection({
  threshold = 8,
  topThreshold = 24,
  downThreshold = 80,
}: ScrollDirectionOptions = {}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    // Reset to visible on route change
    setIsVisible(true);
    lastScrollY.current = typeof window !== "undefined" ? window.scrollY : 0;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      const prevScrollY = lastScrollY.current;
      const diff = currentScrollY - prevScrollY;

      setIsScrolled(currentScrollY > 30);

      // At top of the page (< 24px), always show
      if (currentScrollY < topThreshold) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        ticking.current = false;
        return;
      }

      // Check delta threshold to avoid micro-jitter
      if (Math.abs(diff) < threshold) {
        ticking.current = false;
        return;
      }

      // Scrolling DOWN past 80px: hide
      if (diff > 0 && currentScrollY > downThreshold) {
        setIsVisible(false);
      } else if (diff < 0) {
        // Scrolling UP by any amount: show immediately
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, threshold, topThreshold, downThreshold]);

  return { isVisible, isScrolled, setIsVisible };
}
