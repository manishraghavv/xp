"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";
import { D3_ConversionDiagram } from "@/components/visuals/D3_ConversionDiagram";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { homeData } from "@/content/home";

export function MigrationPromo() {
  const { urgencyBadge, headline, description, stats, features, ctaPrimary, urgencyStrip } =
    homeData.migrationPromo;

  return (
    <section
      data-theme="dark"
      className="text-white py-24 sm:py-32 border-b border-slate-800/80 relative overflow-hidden"
    >
      <SectionBackground variant="cta" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-cyan bg-cyan-950/70 px-4 py-1.5 rounded-full border border-cyan-500/35 mb-4 shadow-lg shadow-cyan-950/50">
            {urgencyBadge}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            {headline}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {description}
          </p>
        </div>

        {/* 3 Core Impact Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-14">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white/[0.05] border border-white/15 backdrop-blur-xl text-center shadow-xl hover:border-cyan-400/40 transition-all"
            >
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-white mb-1">
                {stat.val}
              </div>
              <div className="text-sm font-bold text-brand-cyan mb-1">{stat.lbl}</div>
              <div className="text-xs text-slate-300">Guaranteed Benchmark</div>
            </div>
          ))}
        </div>

        {/* Animated Conversion Diagram (D3) */}
        <div className="mb-14">
          <D3_ConversionDiagram />
        </div>

        {/* 4 Benefit Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((card, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-3 hover:border-brand-blue/50 hover:bg-white/[0.07] transition-all"
            >
              <span className="block text-xs font-mono font-bold tracking-widest text-brand-cyan/80">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h4 className="text-base font-bold text-white">{card.title}</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Urgency Strip and CTA Button */}
        <div className="p-8 pl-7 rounded-3xl bg-white/[0.05] border border-white/15 border-l-4 border-l-amber-400 backdrop-blur-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-sm font-bold text-amber-300">
              <span>{urgencyStrip}</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-300">
              Preserve all historical records, eliminate custom code debt, and lock in guaranteed timelines.
            </div>
          </div>

          <PillButton
            href={ctaPrimary.href}
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {ctaPrimary.label}
          </PillButton>
        </div>
      </div>
    </section>
  );
}
