import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { servicesData, deliveryMethodology } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRight, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { ContactCtaBand } from "@/components/sections/ContactCtaBand";

export const metadata: Metadata = {
  title: "SAP® Services Portfolio | Nine Enterprise Practice Areas",
  description:
    "Explore XpmindGlobal's 9 specialised SAP® service lines: S/4HANA Migration, Cloud BTP, SAC Analytics, GRC & Compliance, AMS, Implementation, and CoE Governance.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="pt-24 sm:pt-28">
      {/* Hero Section (Dark navy mesh) */}
      <section className="dark-mesh-bg text-white pt-12 pb-20 relative overflow-hidden border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs items={[{ label: "Services" }]} theme="dark" className="mb-6" />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-6">
              <span>Service Portfolio</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6">
              Nine service lines.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-light to-brand-cyan">
                One trusted partner
              </span>
              .
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed font-normal">
              Structured to deliver measurable outcomes across your entire SAP® lifecycle. From strategic architectural advisory and S/4HANA migrations to 24×7 AMS support and Centre of Excellence governance.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky In-Page Navigation / Table of Contents */}
      <div className="sticky top-[69px] z-30 bg-white/95 dark:bg-navy-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm py-3 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <div className="flex items-center gap-6 text-xs font-semibold whitespace-nowrap">
            <span className="text-slate-400 uppercase tracking-wider">Jump to:</span>
            {servicesData.map((svc) => (
              <a
                key={svc.id}
                href={`#${svc.slug}`}
                className="text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-brand-cyan transition-colors"
              >
                {svc.number}. {svc.title.replace("SAP® ", "")}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Services Detailed List (Light Section) */}
      <section className="py-20 bg-canvas-subtle light-mesh-bg border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {servicesData.map((service, idx) => {
            const isAlt = idx % 2 === 1;

            return (
              <div
                key={service.id}
                id={service.slug}
                className="p-8 sm:p-12 rounded-3xl glass-card-light scroll-mt-32 transition-all duration-300 hover:border-brand-blue/30"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-start ${isAlt ? "lg:flex-row-reverse" : ""}`}>
                  {/* Left Column: Details & Bullets (7 cols) */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-display font-black text-brand-blue/20">
                        {service.number}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100">
                        {service.tag}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
                      {service.title}
                    </h2>

                    <p className="text-base text-slate-700 leading-relaxed">
                      {service.overview}
                    </p>

                    <div className="space-y-3 pt-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                        Key Capabilities & Deliverables
                      </div>
                      {service.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-3 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex items-center gap-4">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-cyan-600 transition-colors"
                      >
                        <span>View Dedicated Service Page</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Side Info Box (5 cols) */}
                  <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-6">
                    {service.sideCards.map((side, sIdx) => (
                      <div key={sIdx} className={sIdx > 0 ? "pt-6 border-t border-slate-100" : ""}>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-3">
                          {side.title}
                        </h4>

                        {side.chips && side.chips.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {side.chips.map((chip, cIdx) => (
                              <span
                                key={cIdx}
                                className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700"
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        )}

                        {side.text && (
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                            {side.text}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Delivery Methodology (Light Section) */}
      <section className="py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Delivery Methodology"
            title={
              <>
                From assessment to <span className="text-brand-blue">go-live and beyond</span>.
              </>
            }
            subtitle="Our disciplined, phase-gated execution framework guarantees quality, compliance, and predictable go-live milestones."
            theme="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {deliveryMethodology.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-card-light text-center space-y-3 relative group"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 text-brand-blue font-display font-black text-base flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-sm">
                  {step.step}
                </div>

                <h4 className="text-lg font-bold text-slate-900">{step.title}</h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scoping CTA */}
      <ContactCtaBand
        eyebrow="Need Guidance?"
        headline="Not sure which SAP® service fits your current challenge?"
        subtitle="Speak with our senior Chartered Accountants and S/4HANA architects for a complimentary scoping call."
        buttonText="Request a Free Scoping Call →"
      />
    </div>
  );
}
