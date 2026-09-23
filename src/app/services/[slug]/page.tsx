import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { servicesData } from "@/content/services";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CheckCircle2, ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import { ContactCtaBand } from "@/components/sections/ContactCtaBand";
import { D3_ConversionDiagram } from "@/components/visuals/D3_ConversionDiagram";
import { D5_IntegrationDiagram } from "@/components/visuals/D5_IntegrationDiagram";
import { D6_ModuleConstellation } from "@/components/visuals/D6_ModuleConstellation";
import { D8_GrcShieldMatrix } from "@/components/visuals/D8_GrcShieldMatrix";
import { D2_FioriTileGrid } from "@/components/visuals/D2_FioriTileGrid";
import { SectionBackground } from "@/components/ui/SectionBackground";

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

  // Contextual visual selector
  const renderVisual = () => {
    switch (slug) {
      case "sap-integration-services":
      case "sap-cloud-saas-solutions":
        return <D5_IntegrationDiagram />;
      case "sap-grc-security-compliance":
        return <D8_GrcShieldMatrix />;
      case "s4hana-upgrade-migration":
        return <D3_ConversionDiagram />;
      case "sap-implementation-rollout":
      case "sap-centre-of-excellence-coe":
        return <D6_ModuleConstellation />;
      case "sap-analytics-reporting":
      case "application-management-services-ams":
      case "sap-training-enablement":
        return <D2_FioriTileGrid />;
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
          image={serviceImageMap[slug] || "/images/backgrounds/bg-services-abstract.jpg"}
          imageAlt={service.title}
          priority
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs
            items={[
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
            theme="dark"
            className="mb-8"
          />

          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-display font-black text-brand-cyan px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25">
                Practice {service.number}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                {service.tag}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08]">
              {service.title}
            </h1>

            <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
              {service.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Details (Light Section) */}
      <section data-theme="light" className="py-24 sm:py-32 bg-[#F6F7FB] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Scope & Deliverables (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="p-8 sm:p-10 rounded-4xl bg-white border border-slate-200/90 shadow-xl space-y-6">
                <h2 className="text-2xl font-display font-bold text-slate-900 border-b border-slate-100 pb-4">
                  Core Scope & Capabilities
                </h2>

                <div className="space-y-4">
                  {service.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3.5 text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-brand-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm sm:text-base leading-relaxed">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contextual Code-Built SAP Visual Component */}
              <div className="pt-4">
                {renderVisual()}
              </div>
            </div>

            {/* Right Column: Side Info Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {service.sideCards.map((side, idx) => (
                <div
                  key={idx}
                  className="p-8 sm:p-10 rounded-4xl bg-white border border-slate-200/90 shadow-xl space-y-4"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-blue" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                      {side.title}
                    </h3>
                  </div>

                  {side.chips && side.chips.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {side.chips.map((chip, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}

                  {side.text && (
                    <p className="text-sm text-slate-600 leading-relaxed font-normal pt-1">
                      {side.text}
                    </p>
                  )}
                </div>
              ))}

              {/* Quick Scoping Box */}
              <div className="p-8 sm:p-10 rounded-4xl bg-navy-950 text-white shadow-2xl border border-slate-800 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-cyan">
                  Need a Scoping Call?
                </span>
                <h4 className="text-xl font-bold font-display text-white">
                  Discuss your {service.title.replace("SAP® ", "")} requirements.
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our Chartered Accountants and SAP® leads evaluate your current landscape and deliver a fixed-scope assessment.
                </p>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="btn-pill-gradient text-xs px-6 py-3 rounded-full inline-flex items-center gap-2 font-semibold"
                  >
                    <span>Request Practice Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services Section (Light Section) */}
      <section data-theme="light" className="py-24 sm:py-32 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
                Complementary Capabilities
              </span>
              <h3 className="text-2xl font-bold font-display text-slate-900 mt-1">
                Other Specialised SAP® Practice Lines
              </h3>
            </div>
            <Link
              href="/services"
              className="text-xs font-bold text-brand-blue hover:text-blue-700 flex items-center gap-1"
            >
              <span>All 9 Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedServices.map((rel) => (
              <Link
                key={rel.slug}
                href={`/services/${rel.slug}`}
                className="p-8 rounded-3xl bg-[#F6F7FB] border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-brand-blue/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-mono font-bold text-slate-400">{rel.number}</span>
                    <span className="font-semibold text-brand-blue">{rel.tag}</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-brand-blue transition-colors mb-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {rel.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 mt-6 flex items-center justify-between text-xs font-bold text-brand-blue">
                  <span>Explore practice</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <ContactCtaBand
        eyebrow="Specialist Delivery"
        headline={`Ready to scope your ${service.title.replace("SAP® ", "")} engagement?`}
        subtitle="Speak directly with our senior delivery architects and Chartered Accountants."
        buttonText="Schedule Practice Call →"
        defaultService={service.title}
      />
    </div>
  );
}
