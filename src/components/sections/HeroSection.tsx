"use client";

import React, { useEffect, useState } from "react";
import { PromptBox } from "@/components/ui/PromptBox";
import { D1_HeroDashboard } from "@/components/visuals/D1_HeroDashboard";
import { homeData } from "@/content/home";

export function HeroSection() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    // <source media> is ignored by most browsers for <video>, so the file is
    // picked by breakpoint: mobile square, tablet 720p, desktop 1080p.
    const mobile = window.matchMedia("(max-width: 767px)");
    const desktop = window.matchMedia("(min-width: 1024px)");
    const update = () =>
      setVideoSrc(
        mobile.matches ? "/videos/xp2.mp4" : desktop.matches ? "/videos/s1.mp4" : "/videos/xp.mp4"
      );
    update();
    mobile.addEventListener("change", update);
    desktop.addEventListener("change", update);
    return () => {
      mobile.removeEventListener("change", update);
      desktop.removeEventListener("change", update);
    };
  }, []);

  return (
    <>
      {/* Hero: exactly one viewport block. Video + overlay are absolutely
          positioned inside it and clipped by overflow-hidden. */}
      <section data-theme="dark" className="hero-block text-white">
        <div className="hero-video-wrap" aria-hidden="true">
          {videoSrc && (
            <video
              key={videoSrc}
              className="hero-video"
              src={videoSrc}
              poster="/images/backgrounds/sap-hero.webp"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            />
          )}
        </div>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-sweep" aria-hidden="true" />

        <div className="hero-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="text-center max-w-6xl mx-auto mb-6 sm:mb-8">
            <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md text-[0.75rem] sm:text-[0.8125rem] font-semibold tracking-[0.08em] uppercase text-brand-cyan mb-4 sm:mb-5 shadow-xl shadow-cyan-950/40">
              <span>{homeData.hero.badge}</span>
            </div>

            <h1 className="hero-title font-display font-bold mb-4 sm:mb-5">
              <span className="hero-line hero-line-1">Enterprise SAP® Solutions</span>
              <span className="hero-line hero-line-2">
                That <span className="gradient-heading-accent hero-shimmer">Drive Real Growth.</span>
              </span>
            </h1>

            <p className="hero-para text-base md:text-lg text-slate-200 max-w-[68ch] mx-auto leading-relaxed">
              {homeData.hero.subheadline}
            </p>
          </div>

          <div className="w-full hero-prompt">
            <PromptBox />
          </div>
        </div>
      </section>

      {/* Below the hero: telemetry and stats on a plain dark band */}
      <section data-theme="dark" className="glass-orbs relative bg-[#04080F] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-16 sm:pb-20 pt-10 sm:pt-14">
          <div className="mb-12 sm:mb-16">
            <D1_HeroDashboard />
          </div>

          <div className="pt-8 sm:pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
            {[
              { value: "20+", label: "Years Experience", sub: "Senior CA & SAP® Leadership" },
              { value: "50+", label: "Projects Delivered", sub: "Enterprise & Global Groups" },
              { value: "9", label: "Specialist Practices", sub: "S/4HANA, Cloud, GRC, AMS" },
              { value: "100%", label: "S/4HANA Certified", sub: "Zero Historical Data Loss" },
            ].map((stat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
                <div className="stat-num text-3xl sm:text-4xl font-display text-white">{stat.value}</div>
                <div className="text-sm font-semibold text-slate-200 mt-1">{stat.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
