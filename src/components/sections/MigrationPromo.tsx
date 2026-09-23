"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Database, Code, Users, Clock, Zap, ShieldCheck } from "lucide-react";
import { homeData } from "@/content/home";
import { GlassButton } from "@/components/ui/GlassButton";
import { GetInTouchModal } from "@/components/layout/GetInTouchModal";

export function MigrationPromo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = homeData.migrationPromo;

  const iconMap: Record<string, React.ReactNode> = {
    Database: <Database className="w-5 h-5 text-brand-cyan" />,
    Code: <Code className="w-5 h-5 text-brand-cyan" />,
    Users: <Users className="w-5 h-5 text-brand-cyan" />,
    Clock: <Clock className="w-5 h-5 text-brand-cyan" />,
  };

  return (
    <section className="py-24 dark-mesh-bg text-white border-y border-slate-800/80 relative overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <span>{data.urgencyBadge}</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]">
              {data.headline}
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              {data.description}
            </p>

            {/* Quick 3 metrics strip */}
            <div className="p-6 rounded-2xl bg-navy-900/60 border border-slate-800 backdrop-blur-md grid grid-cols-3 gap-4">
              {data.stats.map((s, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="font-display text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300">
                    {s.val}
                  </div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    {s.lbl}
                  </div>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <GlassButton
                href={data.ctaPrimary.href}
                size="md"
                variant="primary"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {data.ctaPrimary.label}
              </GlassButton>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 rounded-lg border border-slate-700 bg-navy-800/40 text-slate-200 hover:border-brand-cyan hover:text-brand-cyan transition-colors text-sm font-medium"
              >
                {data.ctaSecondary.label}
              </button>
            </div>
          </div>

          {/* Right Column: 4 Benefit Cards + Urgency Strip */}
          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl glass-card-dark border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {iconMap[feat.icon] || <ShieldCheck className="w-5 h-5 text-brand-cyan" />}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Urgency Highlight Banner */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs sm:text-sm font-semibold text-center flex items-center justify-center gap-2">
              <span>{data.urgencyStrip}</span>
            </div>
          </div>
        </div>
      </div>

      <GetInTouchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService="S/4HANA Upgrade & Migration"
      />
    </section>
  );
}
