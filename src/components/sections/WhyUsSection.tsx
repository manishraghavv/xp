"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { D2_FioriTileGrid } from "@/components/visuals/D2_FioriTileGrid";
import { D6_ModuleConstellation } from "@/components/visuals/D6_ModuleConstellation";
import { homeData, type WhyUsPoint } from "@/content/home";

export function WhyUsSection() {
  const points: WhyUsPoint[] = homeData.whyUs;

  return (
    <section data-theme="light" className="py-16 sm:py-24 lg:py-32 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why Choose Us"
          title="Why Leading Enterprises Choose XpmindGlobal"
          highlight="Why Leading Enterprises"
          subtitle={
            <>
              A dedicated SAP® specialist firm combining Chartered Accountant business rigor with deep technical architecture mastery.
              <span className="block mt-4">
                Founded in 2020, XpmindGlobal brings together Chartered Accountants, SAP® S/4HANA certified consultants, and process engineers — each with 20–29 years of hands-on experience. Not junior resources learning on your dime.
              </span>
            </>
          }
          align="center"
          theme="light"
        />

        {/* Feature Row 1: CA-Led Engineering + Fiori Cockpit Visual (D2) */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
              Functional Precision
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mt-1">
              Fiori Cockpits Built for Executive Decision-Makers
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Combining Chartered Accountant financial rigor with SAP® technical mastery so your dashboards deliver statutory clarity from day one.
            </p>
          </div>
          <D2_FioriTileGrid />
        </div>

        {/* 6 Strategic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 mb-16 sm:mb-24">
          {points.map((card: WhyUsPoint, idx: number) => (
            <div
              key={idx}
              className="card-interactive p-8 rounded-3xl bg-[#F6F7FB] border border-slate-200/80 shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="mb-6">
                  <span className="text-sm font-mono font-bold tracking-widest text-brand-blue/70">
                    {card.num}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {card.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {card.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue">
                  <span>SAP® Specialisation</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Row 2: Comprehensive Module Constellation Visual (D6) */}
        <div>
          <D6_ModuleConstellation />
        </div>
      </div>
    </section>
  );
}
