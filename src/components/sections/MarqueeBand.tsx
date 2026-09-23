import React from "react";
import { homeData } from "@/content/home";

export function MarqueeBand() {
  return (
    <div className="py-4 bg-navy-950 border-y border-slate-800/80 overflow-hidden select-none">
      <div className="flex w-max animate-marquee space-x-12">
        {/* Double the list for infinite loop */}
        {[...homeData.marqueeServices, ...homeData.marqueeServices].map((service, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-widest uppercase text-slate-400 whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan flex-shrink-0" />
            <span>{service}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
