import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { projectsData } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { ContactCtaBand } from "@/components/sections/ContactCtaBand";

export const metadata: Metadata = {
  title: "Case Studies & Client Impact | Proven SAP® Results",
  description:
    "Explore how XpmindGlobal delivered transformative SAP® automation, 50+ company code PR/PO strategies, solar manufacturing ERP, and MT940 bank integrations.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <div className="pt-24 sm:pt-28">
      {/* Hero Section (Dark navy mesh) */}
      <section className="dark-mesh-bg text-white pt-12 pb-20 relative overflow-hidden border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs items={[{ label: "Projects" }]} theme="dark" className="mb-6" />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-6">
              <span>Client Success Stories</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6">
              SAP® projects that{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-light to-brand-cyan">
                transformed operations
              </span>
              .
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed font-normal">
              Real-world implementations, custom automations, and strategic integrations delivered for enterprise leaders across Manufacturing, FMCG, and Power & Energy.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Detailed Cards (Light Section) */}
      <section className="py-20 bg-canvas-subtle light-mesh-bg border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {projectsData.map((project, idx) => (
            <div
              key={project.id}
              id={project.slug}
              className="p-8 sm:p-12 rounded-3xl glass-card-light transition-all duration-300 hover:border-brand-blue/30"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left Column: Title, Narrative & Results (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100">
                    {project.tag}
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 leading-snug">
                    {project.title}
                  </h2>

                  <p className="text-base text-slate-700 leading-relaxed">
                    {project.overview}
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Results Achieved
                    </div>
                    {project.results.map((result, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-3 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                        <span>{result}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-cyan-600 transition-colors"
                    >
                      <span>Read Detailed Case Study</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: Technical Details Box (5 cols) */}
                <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-blue border-b border-slate-100 pb-3">
                    Technical Scope & Approach
                  </div>

                  <div className="space-y-4">
                    {project.details.map((detail, dIdx) => (
                      <div key={dIdx} className="space-y-1">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          {detail.label}
                        </div>
                        <p className="text-sm font-medium text-slate-900 leading-relaxed">
                          {detail.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Assessment CTA */}
      <ContactCtaBand
        eyebrow="Have a Similar Challenge?"
        headline="Let's scope your SAP® project together — no commitment required."
        subtitle="Speak with our senior implementation leads to explore how our proven accelerators can solve your enterprise challenge."
        buttonText="Get a Free Assessment →"
      />
    </div>
  );
}
