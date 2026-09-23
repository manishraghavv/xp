"use client";

import React from "react";
import { CheckCircle2, TrendingUp, ShieldCheck, Activity, Database, ArrowUpRight } from "lucide-react";

export function D1_HeroDashboard() {
  return (
    <div className="relative w-full max-w-4xl mx-auto my-4 select-none">
      {/* Ambient background glow behind dashboard */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 via-brand-cyan/15 to-brand-violet/20 rounded-[32px] blur-2xl -z-10" />

      {/* Main Glass Dashboard Window */}
      <div className="rounded-3xl bg-navy-950/75 backdrop-blur-2xl border border-white/15 shadow-2xl p-5 sm:p-7 text-white overflow-hidden relative">
        {/* Window Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-3 text-xs font-mono text-slate-400 hidden sm:inline">
              XPMIND // SAP® S/4HANA Executive Telemetry
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-emerald-400">
              HANA In-Memory · Live
            </span>
          </div>
        </div>

        {/* 3 KPI Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
              <span>Universal Journal (ACDOCA)</span>
              <Database className="w-3.5 h-3.5 text-brand-cyan" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-display text-white">
              2,840,120
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>Real-time postings synchronized</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
              <span>AMS Response Time</span>
              <Activity className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-display text-white">
              99.98%
            </div>
            <div className="text-[11px] text-cyan-400 flex items-center gap-1 mt-1 font-medium">
              <CheckCircle2 className="w-3 h-3" />
              <span>Priority 1 SLA adhered</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
              <span>Automated Clearing</span>
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-display text-white">
              94.6%
            </div>
            <div className="text-[11px] text-amber-300 flex items-center gap-1 mt-1 font-medium">
              <ArrowUpRight className="w-3 h-3" />
              <span>MT940 statements auto-cleared</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Main Throughput Chart (SVG) */}
          <div className="md:col-span-8 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center justify-between text-xs mb-3 text-slate-300">
              <span className="font-semibold">S/4HANA System Conversion Velocity</span>
              <span className="text-slate-400">16-Week Trajectory</span>
            </div>
            <div className="h-28 sm:h-32 w-full">
              <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Horizontal grid lines */}
                <line x1="0" y1="20" x2="400" y2="20" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

                {/* Shaded Area */}
                <path
                  d="M 0 85 Q 70 70, 130 55 T 260 30 T 400 12 L 400 100 L 0 100 Z"
                  fill="url(#areaGradient)"
                />
                {/* Curve Line */}
                <path
                  d="M 0 85 Q 70 70, 130 55 T 260 30 T 400 12"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Current Milestone Dot */}
                <circle cx="260" cy="30" r="4.5" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="2" />
                <text x="260" y="20" fill="#06B6D4" fontSize="9" fontWeight="bold" textAnchor="middle">
                  Week 09
                </text>
              </svg>
            </div>
          </div>

          {/* Module Distribution Mini-Bars */}
          <div className="md:col-span-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5">
            <span className="text-xs font-semibold text-slate-300 block mb-1">Module Health Index</span>
            {[
              { mod: "FI / CO", pct: 98, color: "bg-blue-500" },
              { mod: "MM / SD", pct: 95, color: "bg-cyan-500" },
              { mod: "PP / QM", pct: 92, color: "bg-violet-500" },
              { mod: "BTP / CPI", pct: 99, color: "bg-amber-400" },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-300">
                  <span>{item.mod}</span>
                  <span className="font-mono text-slate-400">{item.pct}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Badge 1: S/4HANA Migration Ring */}
      <div className="hidden md:flex items-center gap-3.5 absolute -top-5 -right-4 p-3.5 px-4 rounded-2xl bg-navy-900/90 backdrop-blur-xl border border-white/20 shadow-2xl animate-bounce-slow">
        <div className="relative w-10 h-10 flex items-center justify-center">
          <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-white/10"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-brand-cyan"
              strokeDasharray="62, 100"
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="absolute text-[10px] font-bold text-white">62%</span>
        </div>
        <div>
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Migration Phase</div>
          <div className="text-xs font-bold text-white">Week 9 of 16 Complete</div>
        </div>
      </div>

      {/* Floating Badge 2: MT940 Bank Recon Match */}
      <div className="hidden md:flex items-center gap-2.5 absolute -bottom-5 -left-4 p-3 px-4 rounded-2xl bg-navy-900/90 backdrop-blur-xl border border-white/20 shadow-2xl">
        <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">MT940 Automation</div>
          <div className="text-xs font-bold text-white">100% Statement Auto-Matched</div>
        </div>
      </div>
    </div>
  );
}
