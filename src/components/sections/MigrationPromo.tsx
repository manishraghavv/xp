"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Database, Code, Users, Clock } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";
import { D3_ConversionDiagram } from "@/components/visuals/D3_ConversionDiagram";
import { homeData } from "@/content/home";

const iconMap: Record<string, React.ReactNode> = {
  Database: <Database className="w-5 h-5 text-blue-400" />,
  Code: <Code className="w-5 h-5 text-brand-cyan" />,
  Users: <Users className="w-5 h-5 text-emerald-400" />,
  Clock: <Clock className="w-5 h-5 text-amber-400" />,
};

export function MigrationPromo() {
  const { urgencyBadge, headline, description, stats, features, ctaPrimary, urgencyStrip } =
    homeData.migrationPromo;

  return (
    <section data-theme="dark" className="dark-mesh-bg text-white py-24 sm:py-32 border-b border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-cyan bg-cyan-950/60 px-4 py-1.5 rounded-full border border-cyan-500/30 mb-4">
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
              className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl text-center shadow-xl"
            >
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-white mb-1">
                {stat.val}
              </div>
              <div className="text-sm font-bold text-brand-cyan mb-1">{stat.lbl}</div>
              <div className="text-xs text-slate-400">Guaranteed Benchmark</div>
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
              className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-brand-cyan/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  {iconMap[card.icon] || <ShieldCheck className="w-5 h-5 text-brand-cyan" />}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{card.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{card.desc}</p>
              </div>
              <div className="pt-3 border-t border-white/5 text-[11px] font-semibold text-brand-cyan">
                ✓ Verified Migration Protocol
              </div>
            </div>
          ))}
        </div>

        {/* CTA and Footnote */}
        <div className="text-center space-y-3">
          <PillButton
            href={ctaPrimary.href}
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {ctaPrimary.label}
          </PillButton>
          <div className="text-xs text-slate-400 max-w-lg mx-auto">
            {urgencyStrip}
          </div>
        </div>
      </div>
    </section>
  );
}
