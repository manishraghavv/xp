import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { projectsData } from "@/content/projects";
import { ContactCtaBand } from "@/components/sections/ContactCtaBand";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Case Studies & Client Impact | Proven SAP® Results",
  description:
    "Explore how XpmindGlobal delivered transformative SAP® automation, 50+ company code PR/PO strategies, solar manufacturing ERP, and MT940 bank integrations.",
  alternates: {
    canonical: "/projects",
  },
};

const caseStudyPhotos: Record<string, string> = {
  "fund-management-automation": "/images/case-fund-management.jpg",
  "pr-po-release-strategy": "/images/case-pr-po.jpg",
  "vrf-portal-integration": "/images/case-vrf-portal.jpg",
  "solar-manufacturing-implementation": "/images/case-solar-mfg.jpg",
  "bank-reconciliation-automation": "/images/case-bank-recon.jpg",
};

export default function ProjectsPage() {
  return (
    <div>
      <PageHero
        image="/images/backgrounds/bg-projects-analytics.jpg"
        imageAlt="Client Success Stories & Enterprise SAP Implementations"
        imageSize={[1920, 1280]}
        pos="75% 40%"
        imageWidth="54%"
        crumbs={[{ label: "Projects" }]}
        badge="Client Success Stories"
        title="SAP® projects that transformed operations."
        highlight="transformed operations."
        intro={[
          "Real-world implementations, custom automations, and strategic integrations delivered for enterprise leaders across Manufacturing, FMCG, and Power & Energy.",
        ]}
      />

      {/* Case Studies Detailed Cards (Light Section) */}
      <section data-theme="light" className="py-16 sm:py-24 lg:py-32 bg-[#F6F7FB] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {projectsData.map((project) => (
            <div
              key={project.id}
              id={project.slug}
              className="card-interactive card-interactive--lg card-interactive--light card-interactive--passive p-8 sm:p-12 rounded-4xl bg-white border border-slate-200/90 shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left Column: Title, Narrative & Results (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <span className="case-tag inline-block text-[11px] font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    {project.tag}
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 leading-snug">
                    {project.title}
                  </h2>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {project.overview}
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Results Achieved
                    </div>
                    {project.results.map((result, rIdx) => (
                      <div key={rIdx} className="result-row flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{result}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="btn-pill-gradient btn-shine text-xs px-6 py-3 rounded-full inline-flex items-center gap-2 font-semibold"
                    >
                      <span>Read Detailed Case Study</span>
                      <ArrowRight className="btn-arrow w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: Photo Cover + Technical Details (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="case-media relative h-52 w-full rounded-3xl overflow-hidden bg-navy-950 border border-slate-200 shadow-sm">
                    <Image
                      src={caseStudyPhotos[project.slug] || "/images/case-fund-management.jpg"}
                      alt={project.title}
                      fill
                      sizes="400px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                    <div className="case-media-tint absolute inset-0 bg-gradient-to-tr from-brand-blue/25 via-transparent to-brand-cyan/15" aria-hidden="true" />
                  </div>

                  <div className="case-panel bg-[#F6F7FB] p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
                    <div className="text-xs font-bold uppercase tracking-wider text-brand-blue border-b border-slate-200 pb-3">
                      Technical Scope & Approach
                    </div>

                    <div className="space-y-4">
                      {project.details.map((detail, dIdx) => (
                        <div key={dIdx} className="space-y-1">
                          <div className="case-label text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            {detail.label}
                          </div>
                          <p className="text-xs sm:text-sm font-medium text-slate-900 leading-relaxed">
                            {detail.value}
                          </p>
                        </div>
                      ))}
                    </div>
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
