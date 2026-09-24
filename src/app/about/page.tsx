import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { companyData } from "@/content/company";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCounter } from "@/components/ui/StatCounter";
import { ContactCtaBand } from "@/components/sections/ContactCtaBand";

import { SectionBackground } from "@/components/ui/SectionBackground";

export const metadata: Metadata = {
  title: "About Us | Senior SAP® Consultants & Finance Minds",
  description:
    "Founded by Chartered Accountants and SAP® leaders with 20+ years of experience. Learn about our story, mission, leadership, and finance-first approach to enterprise SAP® systems.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section (Dark navy mesh with team photo) */}
      <section
        data-theme="dark"
        className="relative text-white pt-36 sm:pt-40 md:pt-44 pb-24 overflow-hidden"
      >
        <SectionBackground
          variant="pageHero"
          image="/images/backgrounds/bg-about-collaboration.jpg"
          imageAlt="Enterprise SAP Consulting Team Collaboration"
          priority
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs items={[{ label: "About Us" }]} theme="dark" className="mb-8" />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-6">
              <span>About XpmindGlobal</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] mb-6">
              Finance minds.{" "}
              <span className="gradient-heading-accent">
                SAP® expertise.
              </span>{" "}
              Real outcomes.
            </h1>

            <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
              A specialist SAP® consulting firm founded by Chartered Accountants and senior technology leaders. We bring financial discipline, deep ERP architecture, and two decades of field experience to every engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story & Values Section (Light section) */}
      <section data-theme="light" className="py-24 sm:py-32 bg-[#F6F7FB] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Story Text (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <SectionHeading
                eyebrow="Our Background"
                title="Our Story"
                highlight="Story"
                align="left"
                className="mb-8"
                theme="light"
              />

              <div className="space-y-5 text-base text-slate-700 leading-relaxed">
                {companyData.story.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Core Values Stack (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">
                Guiding Principles
              </div>

              {companyData.values.map((val, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl hover:border-brand-blue/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-sm font-mono font-bold tracking-widest text-brand-blue/70 flex-shrink-0 pt-0.5">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-1">
                        {val.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {val.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section (Light Section) */}
      <section data-theme="light" className="py-24 sm:py-32 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Vision & Mission"
            title="What Drives Us Every Day"
            highlight="Drives Us"
            align="center"
            theme="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Vision Card */}
            <div className="p-8 sm:p-10 rounded-4xl bg-[#F6F7FB] border border-brand-blue/20 space-y-4 shadow-lg">
              <div className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                Our Vision
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 leading-snug">
                {companyData.vision.statement}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed pt-2">
                {companyData.vision.description}
              </p>
            </div>

            {/* Mission Card */}
            <div className="p-8 sm:p-10 rounded-4xl bg-white border border-slate-200 shadow-lg space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-700">
                Our Mission
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 leading-snug">
                {companyData.mission.statement}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed pt-2">
                {companyData.mission.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* By the Numbers (Light section) */}
      <section data-theme="light" className="py-24 sm:py-32 bg-[#F6F7FB] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="By the Numbers"
            title="Impact That Speaks for Itself"
            highlight="Speaks for Itself"
            align="center"
            theme="light"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyData.metrics.map((m, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md text-center space-y-3">
                <StatCounter number={m.number} label="" theme="light" />
                <h4 className="text-base font-bold text-slate-900">{m.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team (Light section) */}
      <section id="leadership" data-theme="light" className="py-24 sm:py-32 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Leadership Team"
            title="Meet the Experts Behind XpmindGlobal"
            highlight="Meet the Experts"
            subtitle="Our leadership team comprises Chartered Accountants, SAP® S/4HANA certified professionals, and enterprise transformation veterans with an average of 20+ years in the industry."
            align="center"
            theme="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyData.leadership.map((member, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#F6F7FB] border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-brand-blue/30 flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-blue to-brand-cyan text-white font-display font-black text-xl flex items-center justify-center mb-6 shadow-md shadow-brand-blue/20 group-hover:scale-105 transition-transform">
                    {member.initials}
                  </div>

                  <h3 className="text-xl font-display font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                    {member.name}
                  </h3>

                  <div className="text-xs font-bold uppercase tracking-wider text-brand-blue mt-1 mb-4">
                    {member.role}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80">
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-white text-slate-700 border border-slate-200">
                    {member.experience}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <ContactCtaBand
        eyebrow="Work With Us"
        headline="Want senior SAP® expertise on your next project?"
        buttonText="Talk to Our Team →"
      />
    </div>
  );
}
