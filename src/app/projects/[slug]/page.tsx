import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projectsData } from "@/content/projects";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CheckCircle2, ArrowRight, ChevronRight } from "lucide-react";
import { ContactCtaBand } from "@/components/sections/ContactCtaBand";
import { D7_ReconMockTable } from "@/components/visuals/D7_ReconMockTable";
import { D5_IntegrationDiagram } from "@/components/visuals/D5_IntegrationDiagram";
import { D8_GrcShieldMatrix } from "@/components/visuals/D8_GrcShieldMatrix";
import { D6_ModuleConstellation } from "@/components/visuals/D6_ModuleConstellation";
import { D1_HeroDashboard } from "@/components/visuals/D1_HeroDashboard";
import { SectionBackground } from "@/components/ui/SectionBackground";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((proj) => ({
    slug: proj.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Case Study | XpmindGlobal`,
    description: project.shortDescription || project.overview,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
  };
}

const caseStudyPhotos: Record<string, string> = {
  "fund-management-automation": "/images/case-fund-management.jpg",
  "pr-po-release-strategy": "/images/case-pr-po.jpg",
  "vrf-portal-integration": "/images/case-vrf-portal.jpg",
  "solar-manufacturing-implementation": "/images/case-solar-mfg.jpg",
  "bank-reconciliation-automation": "/images/case-bank-recon.jpg",
};

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const related = projectsData.filter((p) => p.slug !== slug).slice(0, 2);

  // Case-specific visual selector
  const renderVisual = () => {
    switch (slug) {
      case "bank-reconciliation-automation":
        return <D7_ReconMockTable />;
      case "vrf-portal-integration":
        return <D5_IntegrationDiagram />;
      case "pr-po-release-strategy":
        return <D8_GrcShieldMatrix />;
      case "solar-manufacturing-implementation":
        return <D6_ModuleConstellation />;
      case "fund-management-automation":
        return <D1_HeroDashboard />;
      default:
        return <D6_ModuleConstellation />;
    }
  };

  return (
    <div>
      {/* Hero Section (Dark navy mesh with photo) */}
      <section
        data-theme="dark"
        className="relative text-white pt-36 sm:pt-40 md:pt-44 pb-24 overflow-hidden"
      >
        <SectionBackground
          variant="pageHero"
          image={caseStudyPhotos[slug] || "/images/backgrounds/bg-projects-analytics.jpg"}
          imageAlt={project.title}
          priority
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs
            items={[
              { label: "Projects", href: "/projects" },
              { label: project.title },
            ]}
            theme="dark"
            className="mb-8"
          />

          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <span>{project.tag}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08]">
              {project.title}
            </h1>

            <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
              {project.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Main Details Section (Light Section) */}
      <section data-theme="light" className="py-24 sm:py-32 bg-[#F6F7FB] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Results & Narrative (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="p-8 sm:p-10 rounded-4xl bg-white border border-slate-200/90 shadow-xl space-y-6">
                <h2 className="text-2xl font-display font-bold text-slate-900 border-b border-slate-100 pb-4">
                  Measurable Business Outcomes
                </h2>

                <div className="space-y-4">
                  {project.results.map((res, idx) => (
                    <div key={idx} className="flex items-start gap-3.5 text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm sm:text-base leading-relaxed">{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Case-Specific Interactive Visual */}
              <div className="pt-4">
                {renderVisual()}
              </div>
            </div>

            {/* Right Column: Technical Details (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 sm:p-10 rounded-4xl bg-white border border-slate-200/90 shadow-xl space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-blue border-b border-slate-100 pb-3">
                  Technical Architecture & Scope
                </h3>

                <div className="space-y-5">
                  {project.details.map((detail, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        {detail.label}
                      </div>
                      <div className="text-sm font-semibold text-slate-900 leading-relaxed">
                        {detail.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Scoping Card */}
              <div className="p-8 sm:p-10 rounded-4xl bg-navy-950 text-white border border-slate-800 shadow-2xl space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-cyan">
                  Similar Environment?
                </span>
                <h4 className="text-xl font-bold font-display text-white">
                  Schedule a technical review of your landscape.
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our Chartered Accountants and technical architects review your requirements and outline a milestone plan.
                </p>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="btn-pill-gradient text-xs px-6 py-3 rounded-full inline-flex items-center gap-2 font-semibold"
                  >
                    <span>Request Technical Review</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects (Light Section) */}
      <section data-theme="light" className="py-24 sm:py-32 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
                Explore More
              </span>
              <h3 className="text-2xl font-bold font-display text-slate-900 mt-1">
                Other Enterprise Implementations
              </h3>
            </div>
            <Link
              href="/projects"
              className="text-xs font-bold text-brand-blue hover:text-blue-700 flex items-center gap-1"
            >
              <span>All 5 Case Studies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/projects/${rel.slug}`}
                className="p-8 rounded-3xl bg-[#F6F7FB] border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-brand-blue/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-xs font-bold uppercase text-brand-blue block mb-2">
                    {rel.tag}
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 group-hover:text-brand-blue transition-colors mb-3 leading-snug">
                    {rel.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {rel.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 mt-6 flex items-center justify-between text-xs font-bold text-brand-blue">
                  <span>View Case Study</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <ContactCtaBand
        eyebrow="Proven Methodology"
        headline="Ready to achieve similar outcomes in your organization?"
        subtitle="Speak with our Chartered Accountants and SAP® leads for an actionable assessment."
        buttonText="Book Free Assessment →"
      />
    </div>
  );
}
