"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollRailProps {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
  showControls?: boolean;
}

export function ScrollRail({
  children,
  className = "",
  showControls = true,
}: ScrollRailProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative group">
      {/* Scrollable Track */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className={cn(
          "flex items-stretch gap-6 overflow-x-auto snap-x snap-mandatory py-4 px-2 no-scrollbar scroll-smooth",
          className
        )}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {children}
      </div>

      {/* Floating Prev/Next Buttons */}
      {showControls && (
        <>
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border",
              canScrollLeft
                ? "bg-white text-navy-950 border-slate-200 hover:scale-110 hover:shadow-2xl cursor-pointer"
                : "bg-white/40 text-slate-400 border-transparent opacity-0 pointer-events-none cursor-default"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border",
              canScrollRight
                ? "bg-white text-navy-950 border-slate-200 hover:scale-110 hover:shadow-2xl cursor-pointer"
                : "bg-white/40 text-slate-400 border-transparent opacity-0 pointer-events-none cursor-default"
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
}
