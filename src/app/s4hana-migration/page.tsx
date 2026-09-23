import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { s4hanaData } from "@/content/s4hana";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCounter } from "@/components/ui/StatCounter";
import { PillButton } from "@/components/ui/PillButton";
import { Accordion } from "@/components/ui/Accordion";
import { PhaseTimeline } from "@/components/sections/PhaseTimeline";
import { MigrationComparison } from "@/components/sections/MigrationComparison";
import { D3_ConversionDiagram } from "@/components/visuals/D3_ConversionDiagram";
import { D4_RoadmapGantt } from "@/components/visuals/D4_RoadmapGantt";
import {
  Banknote,
  ShieldAlert,
  TrendingDown,
  Ban,
  ArrowRight,
  Cpu,
  Briefcase,
  Database,
  CheckSquare,
  GraduationCap,
  Shield,
  Zap,
  ClipboardCheck,
  Wrench,
  Handshake,
  Globe,
  CheckCircle2,
  Sparkles,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { ContactCtaBand } from "@/components/sections/ContactCtaBand";

export const metadata: Metadata = {
  title: "ECC to S/4HANA Brownfield Migration in 16 Weeks | XpmindGlobal",
  description:
    "Accelerated 16-week SAP® ECC to S/4HANA Brownfield conversion at ~40% lower cost. 0 data loss, custom ABAP code preserved, and fixed-scope delivery guaranteed.",
  alternates: {
    canonical: "/s4hana-migration",
  },
};

export default function S4HanaMigrationPage() {
  const riskIconMap: Record<string, React.ReactNode> = {
    Banknote: <Banknote className="w-6 h-6 text-amber-500" />,
    ShieldAlert: <ShieldAlert className="w-6 h-6 text-red-500" />,
    TrendingDown: <TrendingDown className="w-6 h-6 text-amber-600" />,
    Ban: <Ban className="w-6 h-6 text-red-600" />,
  };

  const scopeIconMap: Record<string, React.ReactNode> = {
    Cpu: <Cpu className="w-6 h-6 text-brand-blue" />,
    Briefcase: <Briefcase className="w-6 h-6 text-brand-blue" />,
    Database: <Database className="w-6 h-6 text-brand-blue" />,
    CheckSquare: <CheckSquare className="w-6 h-6 text-brand-blue" />,
    GraduationCap: <GraduationCap className="w-6 h-6 text-brand-blue" />,
    Shield: <Shield className="w-6 h-6 text-brand-blue" />,
  };

  const whyIconMap: Record<string, React.ReactNode> = {
    Zap: <Zap className="w-6 h-6 text-brand-blue" />,
    Briefcase: <Briefcase className="w-6 h-6 text-brand-blue" />,
    ClipboardCheck: <ClipboardCheck className="w-6 h-6 text-brand-blue" />,
    Wrench: <Wrench className="w-6 h-6 text-brand-blue" />,
    Handshake: <Handshake className="w-6 h-6 text-brand-blue" />,
    Globe: <Globe className="w-6 h-6 text-brand-blue" />,
  };

  // FAQPage JSON-LD schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s4hanaData.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="pt-24 sm:pt-28">
      {/* Inject FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section (Dark navy mesh) */}
      <section
        data-theme="dark"
        className="dark-mesh-bg text-white pt-12 pb-24 relative overflow-hidden border-b border-slate-800/80"
      >
        {/* Glow */}
        <div
          className="absolute top-1/3 -right-32 w-[35rem] h-[35rem] bg-brand-cyan/15 rounded-full blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs items={[{ label: "S/4HANA Migration" }]} theme="dark" className="mb-6" />

          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <span>⚡ {s4hanaData.hero.badge}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-black tracking-tight leading-[1.05]">
              {s4hanaData.hero.title}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl">
              {s4hanaData.hero.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <PillButton
                href="/contact"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Book a Free Assessment
              </PillButton>

              <PillButton
                href="#process"
                variant="glass"
                size="lg"
              >
                See the 16-Week Process
              </PillButton>
            </div>

            {/* 4 Stats Grid */}
            <div className="pt-10 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl">
              {s4hanaData.hero.stats.map((stat, idx) => (
                <StatCounter
                  key={idx}
                  number={stat.value}
                  label={stat.label}
                  theme="dark"
                />
              ))}
            </div>
          </div>

          {/* D3: Interactive Conversion Diagram inside Hero Flow */}
          <div className="mt-14">
            <D3_ConversionDiagram />
          </div>
        </div>
      </section>

      {/* Why Migrate Right Now (Light Section) */}
      <section
        data-theme="light"
        className="py-24 bg-canvas-subtle light-mesh-bg border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column (6 cols): 3 Narrative Paragraphs + Photo Card */}
            <div className="lg:col-span-6 space-y-6">
              <SectionHeading
                eyebrow={s4hanaData.urgency.eyebrow}
                title={
                  <>
                    Why migrate <span className="text-brand-blue">right now</span>?
                  </>
                }
                theme="light"
                className="mb-6"
              />

              <div className="space-y-4 text-base text-slate-700 leading-relaxed">
                <p>{s4hanaData.urgency.paragraph1}</p>
                <p>{s4hanaData.urgency.paragraph2}</p>
                <p>{s4hanaData.urgency.paragraph3}</p>
              </div>

              {/* Photo Showcase */}
              <div className="relative rounded-[24px] overflow-hidden border border-slate-200/90 shadow-lg mt-6 group">
                <div className="relative h-64 sm:h-72 w-full">
                  <Image
                    src="/images/service-migration.jpg"
                    alt="SAP S/4HANA Migration Enterprise Landscape Architecture"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-brand-cyan bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-500/40 mb-1.5">
                      Target Architecture
                    </span>
                    <p className="text-sm font-semibold leading-snug">
                      Universal Journal ACDOCA Consolidation & Clean Core HANA In-Memory Engine
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (6 cols): 4 Risk Cards */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {s4hanaData.urgency.risks.map((risk, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-[24px] bg-white border border-slate-200/90 shadow-sm space-y-3 group hover:border-amber-500/40 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                    {riskIconMap[risk.icon] || <ShieldAlert className="w-5 h-5 text-amber-500" />}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {risk.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {risk.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Comparison Matrix (Light Section) */}
      <section
        data-theme="light"
        className="py-24 bg-white border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={s4hanaData.comparison.eyebrow}
            title={s4hanaData.comparison.title}
            subtitle={s4hanaData.comparison.subtitle}
            theme="light"
          />

          <MigrationComparison />
        </div>
      </section>

      {/* The 16-Week Process Roadmap (Light Section) */}
      <section
        id="process"
        data-theme="light"
        className="py-24 bg-canvas-subtle light-mesh-bg border-b border-slate-200/80 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={s4hanaData.timeline.eyebrow}
            title={s4hanaData.timeline.title}
            subtitle={s4hanaData.timeline.subtitle}
            theme="light"
          />

          {/* D4: Interactive Gantt Roadmap */}
          <D4_RoadmapGantt />

          {/* Deep-Dive Expandable Phase Activities & Deliverables */}
          <div className="mt-12 max-w-5xl mx-auto">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 text-center">
              Detailed Phase-by-Phase Deliverables & SAP® Toolset
            </h4>
            <PhaseTimeline />
          </div>
        </div>
      </section>

      {/* Scope of Delivery (Light Section) */}
      <section
        data-theme="light"
        className="py-24 bg-white border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={s4hanaData.scope.eyebrow}
            title={
              <>
                Everything included in our{" "}
                <span className="text-brand-blue">fixed-scope package</span>.
              </>
            }
            theme="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {s4hanaData.scope.cards.map((card, idx) => (
              <div
                key={idx}
                className="p-8 rounded-[28px] bg-white border border-slate-200/90 shadow-sm space-y-6 group hover:border-brand-blue/30 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {scopeIconMap[card.icon] || <Cpu className="w-6 h-6 text-brand-blue" />}
                </div>

                <h3 className="text-xl font-display font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                  {card.title}
                </h3>

                <div className="space-y-2.5">
                  {card.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why XpmindGlobal (Light Section) */}
      <section
        data-theme="light"
        className="py-24 bg-canvas-subtle light-mesh-bg border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={s4hanaData.whyUs.eyebrow}
            title={
              <>
                Not just another <span className="text-brand-blue">SAP® partner</span>.
              </>
            }
            theme="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {s4hanaData.whyUs.cards.map((card, idx) => (
              <div
                key={idx}
                className="p-8 rounded-[28px] bg-white border border-slate-200/90 shadow-sm space-y-4 group hover:border-brand-blue/30 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {whyIconMap[card.icon] || <Zap className="w-6 h-6 text-brand-blue" />}
                </div>

                <h3 className="text-xl font-display font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                  {card.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs (Light Section) */}
      <section
        data-theme="light"
        className="py-24 bg-white border-b border-slate-200/80"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            title={
              <>
                Your questions, <span className="text-brand-blue">answered honestly</span>.
              </>
            }
            subtitle="Clear, upfront answers on Brownfield migration timelines, historical data preservation, custom ABAP code, and post go-live support."
            theme="light"
          />

          <Accordion
            items={s4hanaData.faqs.map((f) => ({
              id: f.id,
              question: f.question,
              answer: f.answer,
            }))}
            theme="light"
          />
        </div>
      </section>

      {/* Final Migration CTA (Dark navy mesh) */}
      <section data-theme="dark">
        <ContactCtaBand
          eyebrow={s4hanaData.finalCta.badge}
          headline={s4hanaData.finalCta.title}
          subtitle={s4hanaData.finalCta.description}
          buttonText={s4hanaData.finalCta.primaryCta}
          defaultService="S/4HANA Upgrade & Migration"
        />
      </section>
    </div>
  );
}
