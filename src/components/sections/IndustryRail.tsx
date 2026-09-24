"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollRail } from "@/components/ui/ScrollRail";
import { homeData, type IndustryItem } from "@/content/home";

const industryPhotos: Record<string, string> = {
  Manufacturing: "/images/industry-manufacturing.jpg",
  "Power & Energy": "/images/industry-power-energy.jpg",
  FMCG: "/images/industry-fmcg.jpg",
};

const industryHighlights: Record<string, string[]> = {
  Manufacturing: [
    "Shop floor bill of materials (BOM) & capacity routing",
    "Real-time scrap analysis & standard costing",
    "Multi-plant inventory valuation & PP integration",
  ],
  "Power & Energy": [
    "Capital expenditure & multi-plant asset management",
    "High-volume vendor invoice clearance & MT940",
    "Regulatory Indian GAAP & GSTN tax compliance",
  ],
  FMCG: [
    "High-speed order-to-cash & trade spend management",
    "Batch management & multi-channel distribution",
    "State-wise GSTN compliance & automated reconciliations",
  ],
};

const industryModules: Record<string, string> = {
  Manufacturing: "PP · MM · FI · CO · QM",
  "Power & Energy": "AM · PM · PS · FI · CO",
  FMCG: "SD · MM · FI · CO · SAC",
};

export function IndustryRail() {
  const items: IndustryItem[] = homeData.industries;

  return (
    <section data-theme="light" className="py-16 sm:py-24 lg:py-32 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Industries We Serve"
          title="Specialised SAP® Domain Expertise"
          highlight="Domain Expertise"
          subtitle="Deep sectoral understanding across high-compliance manufacturing, renewable energy, and FMCG supply chains."
          align="center"
          theme="light"
        />

        {/* Horizontal Scroll-Snap Card Rail */}
        <ScrollRail className="pb-8">
          {items.map((item: IndustryItem, idx: number) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[min(84vw,320px)] sm:w-[380px] lg:w-[420px] snap-start rounded-3xl bg-[#F6F7FB] border border-slate-200/90 shadow-lg shadow-blue-900/5 overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:border-brand-blue/30 transition-all duration-300"
            >
              {/* Photo Cover */}
              <div className="relative h-52 w-full overflow-hidden bg-navy-950">
                <Image
                  src={industryPhotos[item.name] || "/images/industry-manufacturing.jpg"}
                  alt={item.name}
                  fill
                  sizes="420px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/30 to-transparent" />
                
                <span className="absolute top-4 left-4 text-[11px] font-bold uppercase tracking-wider text-cyan-300 bg-navy-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-500/20">
                  Sector Specialization
                </span>

                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {item.name}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Key Highlights
                    </span>
                    {(industryHighlights[item.name] || []).map((h: string, hIdx: number) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue mt-0.5 flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/80">
                  <span className="text-[11px] font-mono font-bold text-slate-500 block mb-1">
                    Modules Deployed
                  </span>
                  <div className="text-xs font-semibold text-brand-blue">
                    {industryModules[item.name] || "SAP® Core"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ScrollRail>
      </div>
    </section>
  );
}
