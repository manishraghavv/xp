"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { trainingData } from "@/content/training";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCounter } from "@/components/ui/StatCounter";
import { TrainingForm } from "@/components/sections/TrainingForm";
import { PillButton } from "@/components/ui/PillButton";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionBackground } from "@/components/ui/SectionBackground";

export default function TrainingPage() {
  const [selectedProgramme, setSelectedProgramme] = useState("");

  const handleNotifyClick = (programmeName: string) => {
    setSelectedProgramme(programmeName);
    const formElement = document.getElementById("register-interest");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Hero Section (Dark navy mesh with training photo) */}
      <section
        data-theme="dark"
        className="relative text-white pt-36 sm:pt-40 md:pt-44 pb-24 overflow-hidden"
      >
        <SectionBackground
          variant="pageHero"
          image="/images/backgrounds/bg-training-learning.jpg"
          imageAlt="Corporate Training & Practitioner Enablement"
          priority
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs items={[{ label: "Training" }]} theme="dark" className="mb-8" />

          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <span>{trainingData.hero.eyebrow}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08]">
              {trainingData.hero.title.replace("Real Expertise", "")}{" "}
              <span className="gradient-heading-accent">Real Expertise.</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl">
              {trainingData.hero.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <PillButton
                href="#tracks"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Browse Programmes
              </PillButton>

              <PillButton
                href="#register-interest"
                variant="secondary"
                size="md"
              >
                Register Your Interest
              </PillButton>
            </div>

            {/* Key Metrics Strip */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg">
              {trainingData.hero.stats.map((stat, idx) => (
                <StatCounter
                  key={idx}
                  number={stat.number}
                  label={stat.label}
                  theme="dark"
                />
              ))}
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              {trainingData.trustBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs text-slate-300 font-medium backdrop-blur-sm"
                >
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Learning Tracks (Light Section) */}
      <section id="tracks" data-theme="light" className="py-24 sm:py-32 bg-[#F6F7FB] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Professional Learning Tracks"
            title="Structured Paths for Every Career Stage"
            highlight="Structured Paths"
            subtitle="Each track is built around how SAP® impacts real business decisions — not just system navigation. Coming Soon."
            align="center"
            theme="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainingData.tracks.map((track, idx) => (
              <div
                key={track.id}
                className="p-8 rounded-4xl bg-white border border-slate-200/90 shadow-xl flex flex-col justify-between group hover:border-brand-blue/30 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                      {track.tag}
                    </span>
                    <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-0.5 rounded-full border border-amber-200">
                      Coming Soon
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-slate-900 mb-2 group-hover:text-brand-blue transition-colors">
                    {track.title}
                  </h3>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium mb-4">
                    <span className="font-bold text-brand-blue">Ideal for: </span>
                    {track.idealFor}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {track.description}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {track.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      const progName =
                        idx === 0
                          ? "Track 01 — Finance Track (CAs, CFOs)"
                          : idx === 1
                          ? "Track 02 — Integration Track (Business Analysts)"
                          : "Track 03 — Business Readiness (Fresh CAs, New Joiners)";
                      handleNotifyClick(progName);
                    }}
                    className="w-full btn-pill-gradient py-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>Notify Me When Live</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Courses (Light Section) */}
      <section data-theme="light" className="py-24 sm:py-32 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Technical SAP® Courses"
            title="Deep-Dive Courses for Practitioners"
            highlight="Deep-Dive Courses"
            subtitle="Comprehensive module-level courses for consultants, implementers, and power users. All coming soon — register your interest below."
            align="center"
            theme="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainingData.courses.map((course, idx) => (
              <div
                key={idx}
                className="p-8 rounded-4xl bg-[#F6F7FB] border border-slate-200/90 shadow-md flex flex-col justify-between group hover:shadow-2xl hover:border-brand-blue/30 transition-all"
              >
                <div>
                  <span className="block text-sm font-mono font-bold tracking-widest text-brand-blue/70 mb-4">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <h3 className="text-xl font-display font-bold text-slate-900 mb-2 group-hover:text-brand-blue transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {course.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-bold text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    {course.level}
                  </span>
                  <div className="flex items-center gap-3 font-mono font-medium">
                    <span>{course.hours}</span>
                    <span>{course.modules}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="register-interest" data-theme="light" className="py-24 sm:py-32 bg-[#F6F7FB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrainingForm
            selectedProgramme={selectedProgramme}
            onProgrammeChange={setSelectedProgramme}
          />
        </div>
      </section>
    </div>
  );
}
