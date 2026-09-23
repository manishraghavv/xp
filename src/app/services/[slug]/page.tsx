import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { servicesData } from "@/content/services";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CheckCircle2, ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import { ContactCtaBand } from "@/components/sections/ContactCtaBand";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((svc) => ({
    slug: svc.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.title} | XpmindGlobal Services`,
    description: service.shortDescription || service.overview,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Related services (other services)
  const relatedServices = servicesData.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <div className="pt-24 sm:pt-28">
      {/* Hero Section (Dark navy mesh) */}
      <section className="dark-mesh-bg text-white pt-12 pb-20 relative overflow-hidden border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs
            items={[
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
            theme="dark"
            className="mb-6"
          />

          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-display font-black text-brand-cyan px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/25">
                Service {service.number}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                {service.tag}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05]">
              {service.title}
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed font-normal">
              {service.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Details (Light Section) */}
      <section className="py-20 bg-canvas-subtle light-mesh-bg border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Scope & Deliverables (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="p-8 sm:p-10 rounded-3xl glass-card-light space-y-6">
                <h2 className="text-2xl font-display font-bold text-slate-900 border-b border-slate-100 pb-4">
                  Core Scope & Capabilities
                </h2>

                <div className="space-y-4">
                  {service.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3.5 text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                      <span className="text-base leading-relaxed">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engagement Assurance Card */}
              <div className="p-8 rounded-3xl bg-blue-50/60 border border-blue-100 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-blue">
                  <Sparkles className="w-4 h-4 text-brand-blue" />
                  <span>The XpmindGlobal Assurance</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Fixed-Scope Commitment & Senior Architecture Oversight
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Every project is supervised directly by our senior leadership team of Chartered Accountants and certified SAP® transformation specialists. We do not pass your requirements down to junior developers.
                </p>
              </div>
            </div>

            {/* Right Column: Side Info Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {service.sideCards.map((side, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl glass-card-light space-y-4"
                >
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-blue border-b border-slate-100 pb-3">
                    {side.title}
                  </h3>

                  {side.chips && side.chips.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {side.chips.map((chip, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200/90 text-xs font-semibold text-slate-800 shadow-sm"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}

                  {side.text && (
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {side.text}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Services (Light Section) */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Explore More
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-900">
                Related Service Lines
              </h3>
            </div>
            <Link
              href="/services"
              className="text-sm font-bold text-brand-blue hover:text-cyan-600 flex items-center gap-1"
            >
              <span>View All 9 Services</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rel) => (
              <Link
                key={rel.id}
                href={`/services/${rel.slug}`}
                className="p-6 rounded-2xl glass-card-light group hover:border-brand-blue/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-brand-cyan mb-2">
                    {rel.tag}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-brand-blue transition-colors mb-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {rel.overview}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 text-xs font-bold text-brand-blue flex items-center gap-1">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Scoping CTA */}
      <ContactCtaBand
        eyebrow="Get Started"
        headline={`Ready to scope your ${service.title.replace("SAP® ", "")} project?`}
        subtitle="Schedule a free 90-minute architecture review with our senior practice leads."
        buttonText="Book Free Assessment →"
        defaultService={service.title}
      />
    </div>
  );
}
