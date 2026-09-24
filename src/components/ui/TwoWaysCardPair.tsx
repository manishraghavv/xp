"use client";

import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { PillButton } from "./PillButton";

interface TwoWaysCardPairProps {
  onOpenModal?: (service: string) => void;
}

export function TwoWaysCardPair({ onOpenModal }: TwoWaysCardPairProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {/* Model 1: Strategic Project Delivery */}
      <div className="rounded-4xl p-8 sm:p-10 bg-white/80 border border-slate-200/80 shadow-xl shadow-blue-900/5 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:border-brand-blue/30 group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full pointer-events-none" />

        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-brand-blue text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100">
            <span>Path 01 · Milestone-Driven</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-4 tracking-tight">
            Strategic Project Delivery
          </h3>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
            Fixed-scope, fixed-cost enterprise implementations and upgrades executed with phase-gated precision. Ideal for organisations with defined timelines and board-mandated milestones.
          </p>

          <ul className="space-y-3.5 mb-10 text-sm text-slate-700">
            {[
              "16-Week ECC to S/4HANA Brownfield conversion",
              "Multi-entity Greenfield implementations across FI, CO, MM, SD, PP",
              "BTP, CPI, and third-party API interface integration",
              "Fixed-fee governance with zero hidden change-orders",
              "4-week hypercare support included post-cutover",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-brand-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <PillButton
            variant="primary"
            size="lg"
            className="w-full justify-center"
            href="/services/s4hana-upgrade-migration"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Migration & Projects
          </PillButton>
        </div>
      </div>

      {/* Model 2: Application Management Services (AMS) */}
      <div className="rounded-4xl p-8 sm:p-10 bg-navy-950 text-white border border-slate-800 shadow-2xl shadow-blue-950/40 relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-brand-cyan/40 group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-500/15 to-transparent rounded-bl-full pointer-events-none" />

        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-6 border border-cyan-500/20">
            <span>Path 02 · Continuous SLA</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4 tracking-tight">
            Managed Services & AMS
          </h3>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
            Continuous enterprise peace of mind backed by contractual 99.9% uptime SLAs. A dedicated pool of senior CA and SAP® certified consultants supporting your operations 24×7.
          </p>

          <ul className="space-y-3.5 mb-10 text-sm text-slate-200">
            {[
              "L1–L3 24×7 multi-tier support across all core modules",
              "Proactive monthly patch management and security health audits",
              "Flexible models: dedicated squad, shared pool, or ticket bundles",
              "Direct access to Chartered Accountant SAP® specialists",
              "Predictable monthly OPEX pricing with no lock-in traps",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-brand-cyan flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <PillButton
            variant="secondary"
            size="lg"
            className="w-full justify-center bg-white/10 hover:bg-white/20 border-white/20 text-white"
            href="/services/application-management-services-ams"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Explore AMS & Support Models
          </PillButton>
        </div>
      </div>
    </div>
  );
}
