"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollRail } from "@/components/ui/ScrollRail";
import { PillButton } from "@/components/ui/PillButton";
import { projectsData } from "@/content/projects";

const caseStudyPhotos: Record<string, string> = {
  "fund-management-automation": "/images/case-fund-management.jpg",
  "pr-po-release-strategy": "/images/case-pr-po.jpg",
  "vrf-portal-integration": "/images/case-vrf-portal.jpg",
  "solar-manufacturing-implementation": "/images/case-solar-mfg.jpg",
  "bank-reconciliation-automation": "/images/case-bank-recon.jpg",
};

export function FeaturedProjects() {
  return (
    <section data-theme="light" className="py-24 sm:py-32 bg-[#F6F7FB] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <SectionHeading
            eyebrow="Case Studies"
            title="Proven Results Across Complex SAP® Landscapes"
            highlight="Proven Results"
            subtitle="Explore how our specialist consultants solve complex integration, migration, and automation challenges."
            align="left"
            theme="light"
            className="mb-0 max-w-2xl"
          />

          <PillButton
            href="/projects"
            variant="outline"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            className="self-start sm:self-auto flex-shrink-0"
          >
            View All 5 Case Studies
          </PillButton>
        </div>

        {/* Horizontal Scroll-Snap Card Rail */}
        <ScrollRail className="pb-8">
          {projectsData.map((project) => (
            <div
              key={project.slug}
              className="flex-shrink-0 w-[320px] sm:w-[380px] lg:w-[420px] snap-start rounded-3xl bg-white border border-slate-200/90 shadow-lg shadow-blue-900/5 overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:border-brand-blue/30 transition-all duration-300"
            >
              {/* Photo Cover */}
              <div className="relative h-48 w-full overflow-hidden bg-navy-950">
                <Image
                  src={caseStudyPhotos[project.slug] || "/images/case-fund-management.jpg"}
                  alt={project.title}
                  fill
                  sizes="420px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/30 to-transparent" />
                
                <span className="absolute top-4 left-4 text-[11px] font-bold uppercase tracking-wider text-cyan-300 bg-navy-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-500/20">
                  {project.tag.split("·")[0]}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 leading-snug line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">
                    {project.shortDescription}
                  </p>

                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Key Outcomes
                    </span>
                    {project.results.slice(0, 2).map((res, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{res}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">
                    {project.details[0]?.value.split(",")[0] || "SAP® Core"}
                  </span>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue hover:text-blue-700 transition-colors"
                  >
                    <span>Read Case Study</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </ScrollRail>
      </div>
    </section>
  );
}
