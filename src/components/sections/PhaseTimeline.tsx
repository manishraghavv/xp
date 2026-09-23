"use client";

import React, { useState } from "react";
import { s4hanaData, type MigrationPhase } from "@/content/s4hana";
import { ChevronDown, Plus, Minus, ArrowRight, CheckCircle2, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

export function PhaseTimeline() {
  const [openPhases, setOpenPhases] = useState<Set<string>>(new Set(["Phase 01"]));

  const togglePhase = (phaseId: string) => {
    setOpenPhases((prev) => {
      const next = new Set(prev);
      if (next.has(phaseId)) {
        next.delete(phaseId);
      } else {
        next.add(phaseId);
      }
      return next;
    });
  };

  return (
    <div className="space-y-4">
      {s4hanaData.timeline.phases.map((phase) => {
        const isOpen = openPhases.has(phase.phase);

        return (
          <div
            key={phase.phase}
            className={cn(
              "rounded-2xl border transition-all duration-300 overflow-hidden",
              isOpen
                ? "bg-white border-brand-blue/30 shadow-md shadow-brand-blue/5"
                : "bg-white/80 border-slate-200/90 hover:border-slate-300 shadow-sm"
            )}
          >
            {/* Phase Header */}
            <button
              type="button"
              onClick={() => togglePhase(phase.phase)}
              aria-expanded={isOpen}
              className="w-full p-6 sm:p-7 flex flex-wrap items-center justify-between gap-4 text-left transition-colors"
            >
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="font-display font-black text-xs sm:text-sm tracking-widest uppercase text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  {phase.phase}
                </span>
                <span className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                  {phase.name}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs sm:text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {phase.weeks}
                </span>
                <div
                  className={cn(
                    "w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center transition-transform duration-300",
                    isOpen ? "rotate-180 bg-brand-blue text-white border-brand-blue" : "text-slate-600 bg-slate-50"
                  )}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </button>

            {/* Phase Expanded Body (3 columns: Activities, Deliverables, SAP Tools) */}
            {isOpen && (
              <div className="p-6 sm:p-8 pt-0 border-t border-slate-100 bg-slate-50/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
                  {/* Activities */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-brand-blue border-b border-slate-200 pb-2 flex items-center gap-1.5">
                      <ArrowRight className="w-3.5 h-3.5" />
                      <span>Activities</span>
                    </h5>
                    <ul className="space-y-2">
                      {phase.activities.map((act, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                          <span className="text-brand-blue mt-1">→</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-700 border-b border-slate-200 pb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Deliverables</span>
                    </h5>
                    <ul className="space-y-2">
                      {phase.deliverables.map((del, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* SAP Tools */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-amber-700 border-b border-slate-200 pb-2 flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5" />
                      <span>SAP® Tools</span>
                    </h5>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {phase.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-800 shadow-xs"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Footnote */}
      <p className="text-xs text-slate-500 pt-3 leading-relaxed italic">
        {s4hanaData.timeline.footnote}
      </p>
    </div>
  );
}
