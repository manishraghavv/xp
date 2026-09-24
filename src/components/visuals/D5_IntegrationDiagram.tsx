"use client";

import React from "react";
export function D5_IntegrationDiagram() {
  const nodes = [
    { label: "Banking & MT940", desc: "Auto-Reconciliation" },
    { label: "Vendor Portal (VRF)", desc: "Bi-directional Onboarding" },
    { label: "SAP® CPI / PI/PO", desc: "Enterprise Middleware" },
    { label: "Hyperscalers (AWS/Azure/GCP)", desc: "Rise with SAP® BTP" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 sm:p-10 rounded-4xl bg-navy-950/85 backdrop-blur-2xl border border-white/15 text-white shadow-2xl relative overflow-hidden">
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan">
          Enterprise Connectivity
        </span>
        <h3 className="text-2xl font-bold font-display text-white mt-1">
          Zero-Data-Entry SAP® Integration Architecture
        </h3>
      </div>

      <div className="relative min-h-[360px] flex items-center justify-center p-4">
        {/* Animated Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 360">
          <line x1="120" y1="80" x2="300" y2="180" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
          <line x1="480" y1="80" x2="300" y2="180" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
          <line x1="120" y1="280" x2="300" y2="180" stroke="#818CF8" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
          <line x1="480" y1="280" x2="300" y2="180" stroke="#A78BFA" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
        </svg>

        {/* Central SAP Hub */}
        <div className="z-10 p-6 rounded-3xl bg-gradient-to-br from-brand-blue/30 via-navy-900 to-brand-cyan/20 border border-brand-cyan/50 shadow-2xl text-center max-w-[220px]">
          <div className="text-sm font-bold text-white">SAP® Core Engine</div>
          <div className="text-[11px] text-slate-300 mt-1 font-mono">S/4HANA & ECC</div>
          <div className="mt-2 text-[10px] text-cyan-300 font-semibold bg-cyan-950/60 px-2.5 py-0.5 rounded-full inline-block">
            REST · BAPI · RFC · MT940
          </div>
        </div>

        {/* Surrounding Nodes */}
        <div className="absolute top-2 left-2 sm:left-6 p-3 sm:p-4 rounded-2xl bg-navy-900/90 border border-white/10 shadow-lg text-left max-w-[190px]">
          <span className="block text-[10px] font-mono font-bold tracking-widest text-emerald-400/80 mb-1">01</span>
          <div className="text-xs font-bold text-slate-100">{nodes[0].label}</div>
          <div className="text-[10px] text-slate-400">{nodes[0].desc}</div>
        </div>

        <div className="absolute top-2 right-2 sm:right-6 p-3 sm:p-4 rounded-2xl bg-navy-900/90 border border-white/10 shadow-lg text-left max-w-[190px]">
          <span className="block text-[10px] font-mono font-bold tracking-widest text-cyan-400/80 mb-1">02</span>
          <div className="text-xs font-bold text-slate-100">{nodes[1].label}</div>
          <div className="text-[10px] text-slate-400">{nodes[1].desc}</div>
        </div>

        <div className="absolute bottom-2 left-2 sm:left-6 p-3 sm:p-4 rounded-2xl bg-navy-900/90 border border-white/10 shadow-lg text-left max-w-[190px]">
          <span className="block text-[10px] font-mono font-bold tracking-widest text-blue-400/80 mb-1">03</span>
          <div className="text-xs font-bold text-slate-100">{nodes[2].label}</div>
          <div className="text-[10px] text-slate-400">{nodes[2].desc}</div>
        </div>

        <div className="absolute bottom-2 right-2 sm:right-6 p-3 sm:p-4 rounded-2xl bg-navy-900/90 border border-white/10 shadow-lg text-left max-w-[190px]">
          <span className="block text-[10px] font-mono font-bold tracking-widest text-violet-400/80 mb-1">04</span>
          <div className="text-xs font-bold text-slate-100">{nodes[3].label}</div>
          <div className="text-[10px] text-slate-400">{nodes[3].desc}</div>
        </div>
      </div>
    </div>
  );
}
