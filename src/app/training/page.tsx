"use client";

import React, { useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { trainingData } from "@/content/training";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCounter } from "@/components/ui/StatCounter";
import { TrainingForm } from "@/components/sections/TrainingForm";
import {
  Sparkles,
  PlayCircle,
  Award,
  Lock,
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  Package,
  Zap,
  ShieldAlert,
  Cloud,
  RefreshCw,
  Clock,
  BookOpen,
} from "lucide-react";

export default function TrainingPage() {
  const [selectedProgramme, setSelectedProgramme] = useState("");

  const trustIconMap: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles className="w-4 h-4 text-brand-cyan" />,
    PlayCircle: <PlayCircle className="w-4 h-4 text-brand-cyan" />,
    Award: <Award className="w-4 h-4 text-brand-cyan" />,
    Lock: <Lock className="w-4 h-4 text-brand-cyan" />,
  };

  const courseIconMap: Record<string, React.ReactNode> = {
    CircleDollarSign: <CircleDollarSign className="w-6 h-6 text-brand-blue" />,
    Package: <Package className="w-6 h-6 text-brand-blue" />,
    Zap: <Zap className="w-6 h-6 text-brand-blue" />,
    ShieldAlert: <ShieldAlert className="w-6 h-6 text-brand-blue" />,
    Cloud: <Cloud className="w-6 h-6 text-brand-blue" />,
    RefreshCw: <RefreshCw className="w-6 h-6 text-brand-blue" />,
  };

  const handleNotifyClick = (programmeName: string) => {
    setSelectedProgramme(programmeName);
    const formElement = document.getElementById("register-interest");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="pt-24 sm:pt-28">
      {/* Hero Section (Dark navy mesh) */}
      <section className="dark-mesh-bg text-white pt-12 pb-20 relative overflow-hidden border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs items={[{ label: "Training" }]} theme="dark" className="mb-6" />

          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              <span>{trainingData.hero.eyebrow}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05]">
              {trainingData.hero.title}
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
              {trainingData.hero.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#tracks"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-sm font-semibold shadow-lg shadow-brand-blue/30 hover:shadow-brand-blue/50 transition-all"
              >
                Browse Programmes →
              </a>

              <a
                href="#register-interest"
                className="px-6 py-3 rounded-lg border border-slate-700 bg-navy-800/50 text-slate-200 hover:text-brand-cyan hover:border-brand-cyan transition-colors text-sm font-medium"
              >
                Register Your Interest
              </a>
            </div>

            {/* Key Metrics Strip */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-6 max-w-lg">
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
            <div className="pt-4 flex flex-wrap items-center gap-4">
              {trainingData.trustBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/60 border border-slate-800 text-xs text-slate-300 font-medium"
                >
                  {trustIconMap[badge.icon]}
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Learning Tracks (Light Section) */}
      <section id="tracks" className="py-24 bg-canvas-subtle light-mesh-bg border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Professional Learning Tracks"
            title="Structured paths for every career stage."
            subtitle="Each track is built around how SAP® impacts real business decisions — not just system navigation. Coming Soon."
            theme="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainingData.tracks.map((track, idx) => (
              <div
                key={track.id}
                className="p-8 rounded-3xl glass-card-light flex flex-col justify-between group hover:border-brand-blue/30 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-100">
                      {track.tag}
                    </span>
                    <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      Coming Soon
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-slate-900 mb-2 group-hover:text-brand-blue transition-colors">
                    {track.title}
                  </h3>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 font-medium mb-4">
                    <span className="font-bold text-brand-blue">🎯 Ideal for: </span>
                    {track.idealFor}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {track.description}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {track.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan flex-shrink-0 mt-0.5" />
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
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-brand-blue hover:text-white text-brand-blue text-xs font-bold transition-all flex items-center justify-center gap-1.5"
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
      <section className="py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Technical SAP® Courses"
            title="Deep-dive courses for practitioners."
            subtitle="Comprehensive module-level courses for consultants, implementers, and power users. All coming soon — register your interest below."
            theme="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainingData.courses.map((course, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl glass-card-light flex flex-col justify-between group hover:border-brand-blue/30 transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {courseIconMap[course.icon] || <BookOpen className="w-6 h-6 text-brand-blue" />}
                  </div>

                  <h3 className="text-xl font-display font-bold text-slate-900 mb-2 group-hover:text-brand-blue transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {course.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-brand-blue bg-blue-50 px-2.5 py-1 rounded-md">
                    {course.level}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {course.hours}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      {course.modules}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-20 bg-canvas-subtle light-mesh-bg">
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
