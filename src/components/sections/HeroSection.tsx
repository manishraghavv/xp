"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Activity, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { homeData } from "@/content/home";
import { GlassButton } from "@/components/ui/GlassButton";
import { StatCounter } from "@/components/ui/StatCounter";
import { GetInTouchModal } from "@/components/layout/GetInTouchModal";

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative min-h-[92vh] flex items-center pt-32 pb-20 dark-mesh-bg overflow-hidden text-white">
      {/* Ambient background light orbs */}
      <div
        className="absolute top-1/4 -left-48 w-96 h-96 bg-brand-blue/20 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -right-48 w-[32rem] h-[32rem] bg-brand-cyan/15 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Hero Copy (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_8px_#06B6D4]" />
              <span>{homeData.hero.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-black tracking-tight leading-[1.05]">
              Enterprise SAP®{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-light via-cyan-300 to-brand-cyan">
                Solutions That
              </span>{" "}
              Drive Growth.
            </h1>

            {/* Subheadline paragraph */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              {homeData.hero.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <GlassButton
                href={homeData.hero.primaryCta.href}
                size="lg"
                variant="primary"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {homeData.hero.primaryCta.label}
              </GlassButton>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3.5 rounded-lg border border-slate-700 bg-navy-800/40 text-slate-200 hover:border-brand-cyan hover:text-brand-cyan transition-all duration-300 text-base font-medium backdrop-blur-md hover:bg-navy-800/70"
              >
                {homeData.hero.secondaryCta.label}
              </button>
            </div>

            {/* Key stats strip */}
            <div className="pt-10 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {homeData.hero.stats.map((stat, idx) => (
                <StatCounter
                  key={idx}
                  number={stat.number}
                  label={stat.label}
                  theme="dark"
                />
              ))}
            </div>
          </div>

          {/* Floating Live Ticker / Highlights (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-2 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
              <span>Live Delivery & Milestones</span>
            </div>

            {homeData.tickerItems.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl glass-card-dark border border-slate-700/60 transition-all duration-300 hover:border-cyan-500/40 group hover:translate-x-1"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-brand-cyan px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">
                    {item.status}
                  </span>
                  <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                    {idx === 0 ? "Active" : idx === 1 ? "100% Success" : "Continuous"}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1">{item.tag}</p>

                {/* Progress highlight bar */}
                <div className="w-full h-1 bg-navy-800 rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-blue to-brand-cyan rounded-full transition-all duration-1000"
                    style={{ width: idx === 0 ? "85%" : idx === 1 ? "100%" : "99.9%" }}
                  />
                </div>
              </div>
            ))}

            {/* Quick S/4HANA conversion trigger box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border border-amber-500/30 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Mandatory ECC Cutover 2027</span>
                </div>
                <p className="text-xs text-slate-300">
                  Fixed-scope 16-week Brownfield migration with zero data loss.
                </p>
              </div>
              <Link
                href="/s4hana-migration"
                className="px-4 py-2 rounded-lg bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 transition-colors flex-shrink-0"
              >
                Details →
              </Link>
            </div>
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
