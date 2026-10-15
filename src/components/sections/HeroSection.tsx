"use client";

import React from "react";
import { PromptBox } from "@/components/ui/PromptBox";
import { D1_HeroDashboard } from "@/components/visuals/D1_HeroDashboard";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { HeroBackgroundVideo } from "@/components/ui/HeroBackgroundVideo";
import { SplitWords } from "@/components/ui/SplitWords";
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
      <div data-no-reveal className="min-h-[100svh] flex flex-col justify-center pt-24 sm:pt-36 md:pt-44 pb-10 sm:pb-14 relative z-10 overflow-hidden">
        {/* Looping background video, confined to the first viewport so it is not over-zoomed.
            The poster layer stays visible until the correct tier is picked, so there is no
            empty flash while the source is being selected. */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            backgroundImage: "url('/images/backgrounds/sap-hero.webp')",
            backgroundSize: "cover",
            backgroundPosition: "50% 40%",
            backgroundRepeat: "no-repeat",
          }}
          aria-hidden="true"
        >
          <HeroBackgroundVideo
            poster="/images/backgrounds/sap-hero.webp"
            className="hero-video animate-hero-breathe"
          />
        </div>
        <div className="absolute inset-0 bg-[#04080F]/60" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04080F]/50 via-transparent to-[#0A1030]" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Centered Benefit-Led Headline & Eyebrow */}
          <div className="text-center max-w-4xl mx-auto mb-5 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md text-[0.7rem] sm:text-sm font-semibold text-brand-cyan mb-3.5 sm:mb-5 shadow-xl shadow-cyan-950/40">
              <span>{homeData.hero.badge}</span>
            </div>

            <h1
              className="hero-headline font-display"
              aria-label="Enterprise SAP® Solutions That Drive Real Growth."
            >
              <span className="split-line">
                <SplitWords text="Enterprise SAP® Solutions" />
              </span>
              <span className="split-line">
                <SplitWords text="That" startIndex={3} />{" "}
                <SplitWords
                  text="Drive Real Growth."
                  startIndex={4}
                  gradient
                  gradientStart={0}
                />
              </span>
            </h1>

            <p
              className="hero-sub text-base md:text-lg text-slate-300 max-w-[65ch] mx-auto"
              aria-label={homeData.hero.subheadline}
            >
              <SplitWords
                text={homeData.hero.subheadline}
                base={1.0}
                stagger={0.024}
              />
            </p>
          </div>

          {/* Hostinger-style Interactive Prompt Input Box & Suggestion Chips */}
          <div className="w-full">
            <PromptBox />
          </div>
        </div>
      </div>

      {/* 2. Below-The-Fold Telemetry & Stats Flow */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-16 sm:pb-20 pt-4">
        {/* Live Product Telemetry Dashboard */}
        <div className="mb-12 sm:mb-16">
          <D1_HeroDashboard />
        </div>

        {/* Trust & Stat Strip Right Under Hero — 2x2 on phones */}
        <div className="pt-8 sm:pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
          {[
            { value: "20+", label: "Years Experience", sub: "Senior CA & SAP® Leadership" },
            { value: "50+", label: "Projects Delivered", sub: "Enterprise & Global Groups" },
            { value: "9", label: "Specialist Practices", sub: "S/4HANA, Cloud, GRC, AMS" },
            { value: "100%", label: "S/4HANA Certified", sub: "Zero Historical Data Loss" },
          ].map((stat, idx) => (
            <div key={idx} className="card-interactive p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
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
