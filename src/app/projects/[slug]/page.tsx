import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projectsData } from "@/content/projects";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CheckCircle2, ArrowRight, ChevronRight, ShieldCheck } from "lucide-react";
import { ContactCtaBand } from "@/components/sections/ContactCtaBand";

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

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const related = projectsData.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="pt-24 sm:pt-28">
      {/* Hero Section (Dark navy mesh) */}
      <section className="dark-mesh-bg text-white pt-12 pb-20 relative overflow-hidden border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs
            items={[
              { label: "Projects", href: "/projects" },
              { label: project.title },
            ]}
            theme="dark"
            className="mb-6"
          />

          <div className="max-w-4xl space-y-6">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/25">
              {project.tag}
            </span>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
              {project.title}
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed font-normal">
              {project.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content (Light Section) */}
      <section className="py-20 bg-canvas-subtle light-mesh-bg border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Narrative & Results (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="p-8 sm:p-10 rounded-3xl glass-card-light space-y-6">
                <h2 className="text-2xl font-display font-bold text-slate-900 border-b border-slate-100 pb-4">
                  Project Background & Overview
                </h2>
                <p className="text-base text-slate-700 leading-relaxed">
                  {project.overview}
                </p>
              </div>

              <div className="p-8 sm:p-10 rounded-3xl glass-card-light space-y-6">
                <h3 className="text-2xl font-display font-bold text-slate-900 border-b border-slate-100 pb-4">
                  Measurable Results Achieved
                </h3>
                <div className="space-y-4">
                  {project.results.map((res, idx) => (
                    <div key={idx} className="flex items-start gap-3.5 text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-base leading-relaxed">{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Technical Details (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl glass-card-light space-y-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-blue border-b border-slate-100 pb-3">
                  Technical Specifications
                </h3>

                <div className="space-y-4">
                  {project.details.map((detail, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        {detail.label}
                      </div>
                      <p className="text-sm font-medium text-slate-900 leading-relaxed">
                        {detail.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-blue">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Compliance & Audit Guarantee</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  All automations and workflows conform to SOX segregation of duties, Indian statutory GSTN laws, and internal enterprise audit requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-display font-bold text-slate-900">
              More Case Studies
            </h3>
            <Link
              href="/projects"
              className="text-sm font-bold text-brand-blue hover:text-cyan-600 flex items-center gap-1"
            >
              <span>View All 5 Projects</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/projects/${rel.slug}`}
                className="p-8 rounded-2xl glass-card-light group hover:border-brand-blue/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-100 mb-3">
                    {rel.tag}
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 group-hover:text-brand-blue transition-colors mb-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {rel.overview}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 text-xs font-bold text-brand-blue flex items-center gap-1">
                  <span>Read case study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment CTA */}
      <ContactCtaBand
        eyebrow="Proven Methodology"
        headline="Have a Similar Challenge in Your SAP® Landscape?"
        subtitle="Speak with our senior Chartered Accountants and developers to see how we can deliver comparable automation for your business."
        buttonText="Get a Free Assessment →"
      />
    </div>
  );
}
