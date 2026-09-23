"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { homeData } from "@/content/home";
import { GlassButton } from "@/components/ui/GlassButton";
import { GetInTouchModal } from "@/components/layout/GetInTouchModal";

export function HomeCtaBand() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = homeData.finalCta;

  return (
    <section className="py-24 dark-mesh-bg text-white relative overflow-hidden border-t border-slate-800/80">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[20rem] bg-brand-blue/20 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-10 sm:p-14 rounded-3xl glass-card-dark border border-slate-700/80 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Start Your Transformation</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1]">
            {data.headline}
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {data.subheadline}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-base font-semibold shadow-lg shadow-brand-blue/30 hover:shadow-brand-blue/50 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
            >
              <span>{data.primaryCta.label}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <GlassButton
              href={data.secondaryCta.href}
              variant="outline-dark"
              size="lg"
            >
              {data.secondaryCta.label}
            </GlassButton>
          </div>
        </div>
      </div>

      <GetInTouchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
