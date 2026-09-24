"use client";

import React from "react";

export function D3_ConversionDiagram() {
  return (
    <div className="w-full max-w-5xl mx-auto my-8 p-6 sm:p-10 rounded-4xl bg-navy-950/80 backdrop-blur-2xl border border-white/15 shadow-2xl text-white relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
        <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-brand-cyan bg-cyan-950/60 px-3.5 py-1 rounded-full border border-cyan-500/30 mb-3">
          Automated Migration Pipeline
        </span>
        <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
          ECC 6.0 to SAP® S/4HANA Conversion Flow
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          End-to-end database, code adaptation, and Universal Journal simplification with zero data loss.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 sm:gap-6 items-center">
        {/* Step 1: Legacy ECC 6.0 (3 cols) */}
        <div className="lg:col-span-3 p-5 sm:p-6 rounded-3xl bg-white/[0.04] border border-white/10 flex flex-col justify-between h-full">
          <div>
            <span className="block text-xs font-mono font-bold tracking-widest text-amber-400/80 mb-3">
              01
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
              Legacy Core
            </span>
            <h4 className="text-lg font-bold text-white mt-1 mb-3">SAP® ECC 6.0</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Dispersed relational tables (BSEG, BSIS, BSAS), disk bottlenecks, and non-HANA custom ABAP code.
            </p>
          </div>
          <div className="pt-3 border-t border-white/10 space-y-1.5 text-[11px] text-slate-400 font-mono">
            <div>• AnyDB (Oracle/SQL/DB2)</div>
            <div>• Classical GUI transactions</div>
            <div>• Redundant index tables</div>
          </div>
        </div>

        {/* Step 2: XPMIND Conversion Engine (5 cols) */}
        <div className="lg:col-span-5 p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-blue-900/30 via-navy-900/80 to-cyan-900/30 border border-brand-cyan/40 shadow-xl relative">
          <div className="text-center mb-5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-cyan">
              XPMIND 16-Week Accelerated Engine
            </span>
          </div>

          <div className="space-y-3">
            {[
              { title: "SUM with DMO Execution", desc: "One-step database migration & Unicode conversion" },
              { title: "Custom ABAP HANA Optimization", desc: "Quick-fix syntax adaptation & SQL tuning" },
              { title: "Finance Simplification (ACDOCA)", desc: "Consolidation of FI + CO into single source of truth" },
              { title: "Business Partner (BP) CVI", desc: "Automated Customer-Vendor Integration mapping" },
            ].map((step, idx) => (
              <div
                key={idx}
                className="p-2.5 px-3.5 rounded-xl bg-white/[0.05] border border-white/10 flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-brand-cyan flex items-center justify-center flex-shrink-0 text-[10px] font-bold">
                  {idx + 1}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-200">{step.title}</div>
                  <div className="text-[10px] text-slate-400 leading-snug">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
            <span className="text-emerald-400 font-medium">Zero Historical Data Loss</span>
            <span className="text-brand-cyan font-medium">~40% Lower TCO</span>
          </div>
        </div>

        {/* Step 3: Modern SAP S/4HANA (3 cols) */}
        <div className="lg:col-span-3 p-5 sm:p-6 rounded-3xl bg-white/[0.06] border border-brand-blue/40 shadow-xl flex flex-col justify-between h-full">
          <div>
            <span className="block text-xs font-mono font-bold tracking-widest text-brand-cyan/80 mb-3">
              02
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-cyan">
              Target Intelligent Core
            </span>
            <h4 className="text-lg font-bold text-white mt-1 mb-3">SAP® S/4HANA</h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              In-memory HANA columnar database, Universal Journal (ACDOCA), role-based Fiori UX, and BTP integration.
            </p>
          </div>
          <div className="pt-3 border-t border-white/10 space-y-1.5 text-[11px] text-slate-300 font-mono">
            <div>• HANA In-Memory Engine</div>
            <div>• Fiori 3.0 / Intuitive UX</div>
            <div>• Embedded AI & SAC Analytics</div>
          </div>
        </div>
      </div>
    </div>
  );
}
