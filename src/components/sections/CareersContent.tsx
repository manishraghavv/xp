"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ApplyModal } from "@/components/layout/ApplyModal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCounter } from "@/components/ui/StatCounter";
import { PillButton } from "@/components/ui/PillButton";
import { Accordion } from "@/components/ui/Accordion";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { careersData } from "@/content/careers";

export function CareersContent() {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [applyAs, setApplyAs] = useState("");

  const openApply = (as = "") => {
    setApplyAs(as);
    setIsApplyOpen(true);
  };

  const { hero, paths, whyUs, skills, howItWorks, faqs, finalCta } = careersData;

  return (
    <div>
      {/* Hero Section (Dark navy mesh) */}
      <section
        data-theme="dark"
        className="relative text-white pt-28 sm:pt-36 md:pt-44 pb-16 sm:pb-24 overflow-hidden"
      >
        <SectionBackground
          variant="pageHero"
          image="/images/backgrounds/bg-about-collaboration.jpg"
          imageAlt="SAP Consulting Team Collaboration"
          priority
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs items={[{ label: "Careers" }]} theme="dark" className="mb-8" />

          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <span>{hero.badge}</span>
            </div>

            <h1 className="font-display text-[clamp(2rem,8.5vw,3rem)] md:text-6xl font-black tracking-tight leading-[1.1]">
              {hero.titleLead}{" "}
              <span className="gradient-heading-accent">{hero.titleAccent}</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl">
              {hero.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <PillButton
                variant="primary"
                size="md"
                onClick={() => openApply()}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {hero.primaryCta}
              </PillButton>

              <PillButton href="#paths" variant="secondary" size="md">
                {hero.secondaryCta}
              </PillButton>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-wrap gap-x-10 gap-y-6">
              {hero.stats.map((stat, idx) => (
                <StatCounter key={idx} number={stat.number} label={stat.label} theme="dark" />
              ))}
            </div>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {hero.cards.map((card, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-sm"
                >
                  <div className="text-sm font-bold text-white">{card.title}</div>
                  <div className="text-xs text-slate-300 mt-1">{card.line1}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{card.line2}</div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              {hero.modules.map((m, idx) => (
                <div
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs text-slate-300 font-medium backdrop-blur-sm"
                >
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Three Paths (Light Section) */}
      <section
        id="paths"
        data-theme="light"
        className="py-16 sm:py-24 lg:py-32 bg-[#F6F7FB] border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={paths.eyebrow}
            title={paths.title}
            highlight={paths.highlight}
            subtitle={paths.subtitle}
            align="center"
            theme="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {paths.items.map((path) => (
              <div
                key={path.id}
                className="p-8 rounded-4xl bg-white border border-slate-200/90 shadow-xl flex flex-col justify-between group hover:border-brand-blue/30 transition-all duration-300"
              >
                <div>
                  <div className="mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                      {path.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-slate-900 mb-2 group-hover:text-brand-blue transition-colors">
                    {path.title}
                  </h3>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium mb-4">
                    <span className="font-bold text-brand-blue">Ideal for: </span>
                    {path.idealFor}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{path.description}</p>

                  <div className="space-y-2.5 mb-8">
                    {path.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => openApply(path.applyAs)}
                    className="w-full btn-pill-gradient py-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>{path.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why XpmindGlobal (Light Section) */}
      <section data-theme="light" className="py-16 sm:py-24 lg:py-32 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={whyUs.eyebrow}
            title={whyUs.title}
            highlight={whyUs.highlight}
            subtitle={whyUs.subtitle}
            align="center"
            theme="light"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.cards.map((card, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl hover:border-brand-blue/30 transition-all duration-300"
              >
                <span className="text-xs font-bold text-brand-blue">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-display font-bold text-slate-900 mt-2 mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills in Demand (Light Section) */}
      <section data-theme="light" className="py-16 sm:py-24 lg:py-32 bg-[#F6F7FB] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={skills.eyebrow}
            title={skills.title}
            highlight={skills.highlight}
            subtitle={skills.subtitle}
            align="center"
            theme="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.groups.map((group, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl"
              >
                <h3 className="text-lg font-display font-bold text-slate-900 mb-4">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-brand-blue"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works (Light Section) */}
      <section data-theme="light" className="py-16 sm:py-24 lg:py-32 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={howItWorks.eyebrow}
            title={howItWorks.title}
            highlight={howItWorks.highlight}
            align="center"
            theme="light"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {howItWorks.steps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xl"
              >
                <div className="text-xs font-bold text-brand-blue mb-2">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h4 className="text-lg font-display font-bold text-slate-900 mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Candidate FAQs (Light Section) */}
      <section data-theme="light" className="py-16 sm:py-24 lg:py-32 bg-[#F6F7FB] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={faqs.eyebrow}
            title={faqs.title}
            highlight={faqs.highlight}
            align="center"
            theme="light"
          />

          <div className="mt-12">
            <Accordion
              items={faqs.items.map((f) => ({
                id: f.id,
                question: f.question,
                answer: f.answer,
              }))}
              theme="light"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        data-theme="dark"
        className="py-14 sm:py-20 text-white relative overflow-hidden border-t border-slate-800/80"
      >
        <SectionBackground variant="cta" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="p-6 sm:p-12 rounded-[32px] bg-gradient-to-b from-white/[0.09] to-white/[0.03] border border-white/20 backdrop-blur-2xl flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 shadow-2xl">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-brand-cyan">
                <span>{finalCta.eyebrow}</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-snug">
                {finalCta.headline}
              </h2>
            </div>

            <button
              onClick={() => openApply()}
              className="btn-pill-gradient px-8 py-4 rounded-full text-white text-sm sm:text-base font-semibold flex items-center gap-2 flex-shrink-0 cursor-pointer shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <span>{finalCta.buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <ApplyModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        defaultApplyAs={applyAs}
      />
    </div>
  );
}
