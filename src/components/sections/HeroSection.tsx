"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, CheckCircle2, ShieldCheck, Award, Users } from "lucide-react";
import { PromptBox } from "@/components/ui/PromptBox";
import { D1_HeroDashboard } from "@/components/visuals/D1_HeroDashboard";
import { homeData } from "@/content/home";

export function HeroSection() {
  return (
    <section
      data-theme="dark"
      className="relative text-white pt-32 sm:pt-36 pb-20 overflow-hidden border-b border-slate-800/80"
    >
      {/* Cinematic Enterprise Photo Background with Navy Gradient Scrim */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-enterprise.jpg"
          alt="Enterprise SAP Datacenter Architecture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.35] contrast-125"
        />
        {/* Navy duotone gradient overlay (60-75% opacity) */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-950/75 to-navy-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centered Benefit-Led Headline & Eyebrow */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md text-xs sm:text-sm font-semibold text-brand-cyan mb-6 shadow-xl shadow-cyan-950/40">
            <Sparkles className="w-4 h-4 text-brand-cyan" />
            <span>{homeData.hero.badge}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6">
            Enterprise SAP® Solutions That{" "}
            <span className="gradient-heading-accent">Drive Real Growth.</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {homeData.hero.subheadline}
          </p>
        </div>

        {/* Hostinger-style Interactive Prompt Input Box */}
        <div className="mb-14">
          <PromptBox />
        </div>

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
            <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
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
