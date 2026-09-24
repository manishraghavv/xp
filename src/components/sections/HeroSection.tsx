"use client";

import React from "react";
import { PromptBox } from "@/components/ui/PromptBox";
import { D1_HeroDashboard } from "@/components/visuals/D1_HeroDashboard";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { homeData } from "@/content/home";

export function HeroSection() {
  return (
    <section
      data-theme="dark"
      className="relative text-white overflow-hidden"
    >
      {/* Multi-layered cinematic navy-indigo background */}
      <SectionBackground
        variant="hero"
        image="/images/backgrounds/sap-hero.webp"
        priority
      />

      {/* 1. Above-The-Fold Viewport (100svh framing for 1366x768 & 1440x900) */}
      <div className="min-h-[100svh] flex flex-col justify-center pt-36 sm:pt-40 md:pt-44 pb-10 sm:pb-14 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Centered Benefit-Led Headline & Eyebrow */}
          <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md text-xs sm:text-sm font-semibold text-brand-cyan mb-4 sm:mb-5 shadow-xl shadow-cyan-950/40">
              <span>{homeData.hero.badge}</span>
            </div>

            <h1 className="font-display text-[clamp(2.2rem,4.5vw,4.25rem)] font-extrabold tracking-tight leading-[1.08] mb-4 sm:mb-5">
              Enterprise SAP® Solutions That{" "}
              <span className="gradient-heading-accent">Drive Real Growth.</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-[60ch] mx-auto leading-relaxed">
              {homeData.hero.subheadline}
            </p>
          </div>

          {/* Hostinger-style Interactive Prompt Input Box & Suggestion Chips */}
          <div className="w-full">
            <PromptBox />
          </div>
        </div>
      </div>

      {/* 2. Below-The-Fold Telemetry & Stats Flow */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-20 pt-4">
        {/* Live Product Telemetry Visual (D1) */}
        <div className="mb-16">
          <D1_HeroDashboard />
        </div>

        {/* Trust & Stat Strip Right Under Hero */}
        <div className="pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "20+", label: "Years Experience", sub: "Senior CA & SAP® Leadership" },
            { value: "50+", label: "Projects Delivered", sub: "Enterprise & Global Groups" },
            { value: "9", label: "Specialist Practices", sub: "S/4HANA, Cloud, GRC, AMS" },
            { value: "100%", label: "S/4HANA Certified", sub: "Zero Historical Data Loss" },
          ].map((stat, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-slate-200 mt-1">{stat.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
