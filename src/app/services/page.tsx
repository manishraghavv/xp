import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { servicesData, deliveryMethodology } from "@/content/services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ContactCtaBand } from "@/components/sections/ContactCtaBand";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "SAP® Services Portfolio | Nine Enterprise Practice Areas",
  description:
    "Explore XpmindGlobal's 9 specialised SAP® service lines: S/4HANA Migration, Cloud BTP, SAC Analytics, GRC & Compliance, AMS, Implementation, and CoE Governance.",
  alternates: {
    canonical: "/services",
  },
};

const serviceImageMap: Record<string, string> = {
  "sap-cloud-saas-solutions": "/images/service-cloud.jpg",
  "sap-analytics-reporting": "/images/service-analytics.jpg",
  "sap-integration-services": "/images/service-integration.jpg",
  "sap-grc-security-compliance": "/images/service-grc.jpg",
  "sap-training-enablement": "/images/service-training.jpg",
  "s4hana-upgrade-migration": "/images/service-migration.jpg",
  "sap-implementation-rollout": "/images/service-implementation.jpg",
  "application-management-services-ams": "/images/service-ams.jpg",
  "sap-centre-of-excellence-coe": "/images/service-coe.jpg",
};

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        image="/images/backgrounds/bg-services-abstract.jpg"
        imageAlt="SAP Cloud Infrastructure & Enterprise Services"
        imageSize={[1920, 1278]}
        pos="55% 45%"
        crumbs={[{ label: "Services" }]}
        badge="Full Lifecycle SAP® Services"
        title="Nine service lines. One trusted partner."
        highlight="One trusted partner."
        intro={[
          "Structured to deliver measurable outcomes across your entire SAP® lifecycle. From strategic architectural advisory and S/4HANA migrations to 24×7 AMS support and Centre of Excellence governance.",
          "A complete SAP® services business covers cloud, analytics, integration, compliance, enablement, migration, implementation, managed support, and strategic advisory. XpmindGlobal provides all nine — with clear paths from initial engagement to long-term partnership.",
        ]}
      />

      {/* In-Page Navigation / Table of Contents */}
      <div className="bg-canvas-subtle py-4 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <div className="flex items-center gap-4 text-xs font-semibold whitespace-nowrap">
            <span className="text-slate-500 uppercase tracking-wider">Jump to Practice:</span>
            {servicesData.map((svc) => (
              <a
                key={svc.id}
                href={`#${svc.slug}`}
                className="chip-interactive px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 shadow-xs"
              >
                {svc.number}. {svc.title.replace("SAP® ", "")}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Services Detailed List (Light Section) */}
      <section data-theme="light" className="py-16 sm:py-24 lg:py-32 bg-[#F6F7FB] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {servicesData.map((service, idx) => {
            const isAlt = idx % 2 === 1;

            return (
              <div
                key={service.id}
                id={service.slug}
                className="card-interactive card-interactive--lg card-interactive--light card-interactive--passive p-8 sm:p-12 rounded-4xl bg-white border border-slate-200/90 shadow-xl scroll-mt-24"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-start ${isAlt ? "lg:flex-row-reverse" : ""}`}>
                  {/* Left Column: Details & Bullets (7 cols) */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-display font-black text-brand-blue/20">
                        {service.number}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                        {service.tag}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
                      {service.title}
                    </h2>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {service.overview}
                    </p>

                    <div className="space-y-3 pt-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                        Key Capabilities & Deliverables
                      </div>
                      {service.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex items-center gap-4">
                      <Link
                        href={`/services/${service.slug}`}
                        className="btn-pill-gradient text-xs px-6 py-3 rounded-full inline-flex items-center gap-2 font-semibold"
                      >
                        <span>Explore Practice & Roadmap</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Photo Cover + Side Info Box (5 cols) */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="relative h-52 w-full rounded-3xl overflow-hidden bg-navy-950 border border-slate-200">
                      <Image
                        src={serviceImageMap[service.slug] || "/images/service-cloud.jpg"}
                        alt={service.title}
                        fill
                        sizes="400px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                    </div>

                    <div className="bg-[#F6F7FB] p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                      {service.sideCards.map((side, sIdx) => (
                        <div key={sIdx} className={sIdx > 0 ? "pt-6 border-t border-slate-200" : ""}>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-3">
                            {side.title}
                          </h4>

                          {side.chips && side.chips.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {side.chips.map((chip, cIdx) => (
                                <span
                                  key={cIdx}
                                  className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700"
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
              </div>
            );
          })}
        </div>
      </section>

      {/* Delivery Methodology (Light Section) */}
      <section data-theme="light" className="py-16 sm:py-24 lg:py-32 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Delivery Methodology"
            title="From Assessment to Go-Live and Beyond"
            highlight="Go-Live"
            subtitle="Our disciplined, phase-gated execution framework guarantees quality, compliance, and predictable go-live milestones."
            align="center"
            theme="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {deliveryMethodology.map((step, idx) => (
              <div
                key={idx}
                className="card-interactive p-6 rounded-3xl bg-[#F6F7FB] border border-slate-200/90 text-center space-y-3 relative"
              >
                <div className="card-icon w-12 h-12 rounded-full bg-blue-50 border border-blue-200 text-brand-blue font-display font-black text-base flex items-center justify-center mx-auto shadow-sm">
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
