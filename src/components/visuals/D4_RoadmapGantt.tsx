"use client";

import React, { useState } from "react";
import { CheckCircle2, ChevronRight, Clock, ShieldCheck, Wrench } from "lucide-react";
import { s4hanaData } from "@/content/s4hana";

export function D4_RoadmapGantt() {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const phases = s4hanaData.timeline.phases;
  const activePhase = phases[activePhaseIndex];

  return (
    <div className="w-full max-w-5xl mx-auto my-8 p-6 sm:p-8 rounded-4xl bg-white/90 border border-slate-200/90 shadow-2xl backdrop-blur-xl">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
            Interactive Gantt Matrix
          </span>
          <h3 className="text-2xl font-bold font-display text-slate-900 mt-1">
            16-Week Phase-Gated Conversion Roadmap
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100 px-3.5 py-1.5 rounded-full">
          <Clock className="w-4 h-4 text-brand-blue" />
          <span>Click any phase bar to inspect deliverables</span>
        </div>
      </div>

      {/* Gantt Bar Visualization (16-week grid) */}
      <div className="mb-8 space-y-3">
        {phases.map((p, idx) => {
          const isSelected = activePhaseIndex === idx;
          // Calculate grid column span according to week ranges
          // Phase 1: Weeks 1-2 (2/16 = 12.5%)
          // Phase 2: Weeks 3-4 (2/16 = 12.5%)
          // Phase 3: Weeks 5-10 (6/16 = 37.5%)
          // Phase 4: Weeks 11-14 (4/16 = 25%)
          // Phase 5: Weeks 15-16 (2/16 = 12.5%)
          const widths = ["w-[12.5%]", "w-[12.5%]", "w-[37.5%]", "w-[25%]", "w-[12.5%]"];
          const leftOffsets = ["left-0", "left-[12.5%]", "left-[25%]", "left-[62.5%]", "left-[87.5%]"];
          const colors = [
            "bg-blue-600 text-white",
            "bg-indigo-600 text-white",
            "bg-cyan-600 text-white",
            "bg-emerald-600 text-white",
            "bg-amber-600 text-white",
          ];

          return (
            <div
              key={p.phase}
              onClick={() => setActivePhaseIndex(idx)}
              className={`p-3 rounded-2xl transition-all duration-200 cursor-pointer border ${
                isSelected
                  ? "bg-slate-50 border-brand-blue/50 shadow-md"
                  : "hover:bg-slate-50/60 border-transparent"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-brand-blue">{p.phase}</span>
                  <span>{p.name}</span>
                </div>
                <span className="text-slate-500 font-mono text-[11px]">{p.weeks}</span>
              </div>

              {/* Progress Track */}
              <div className="relative h-6 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`absolute top-0 bottom-0 rounded-full transition-all duration-300 flex items-center justify-center text-[10px] font-bold shadow-sm ${widths[idx]} ${leftOffsets[idx]} ${colors[idx]} ${
                    isSelected ? "ring-2 ring-brand-blue ring-offset-1" : ""
                  }`}
                >
                  {p.weeks}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Phase Details Card */}
      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-blue-100 text-brand-blue text-xs font-bold font-mono">
              {activePhase.phase}
            </span>
            <h4 className="text-lg font-bold text-slate-900">{activePhase.name}</h4>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200">
            Duration: {activePhase.weeks}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Activities */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Key Activities
            </span>
            <ul className="space-y-2 text-xs text-slate-700">
              {activePhase.activities.map((act, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Deliverables
            </span>
            <ul className="space-y-2 text-xs text-slate-700">
              {activePhase.deliverables.map((del, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SAP Tools Used */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              SAP® Tools Deployed
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activePhase.tools.map((tool, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-mono text-slate-700 font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
