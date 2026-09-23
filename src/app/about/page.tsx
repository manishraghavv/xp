import React from "react";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { companyData } from "@/content/company";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCounter } from "@/components/ui/StatCounter";
import { Microscope, Handshake, Zap, Compass, ShieldCheck, ArrowRight } from "lucide-react";
import { ContactCtaBand } from "@/components/sections/ContactCtaBand";

export const metadata: Metadata = {
  title: "About Us | Senior SAP® Consultants & Finance Minds",
  description:
    "Founded by Chartered Accountants and SAP® leaders with 20+ years of experience. Learn about our story, mission, leadership, and finance-first approach to enterprise SAP® systems.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const iconMap: Record<string, React.ReactNode> = {
    Microscope: <Microscope className="w-5 h-5 text-brand-blue" />,
    Handshake: <Handshake className="w-5 h-5 text-brand-blue" />,
    Zap: <Zap className="w-5 h-5 text-brand-blue" />,
    Compass: <Compass className="w-5 h-5 text-brand-blue" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-brand-blue" />,
  };

  return (
    <div className="pt-24 sm:pt-28">
      {/* Hero Section (Dark navy mesh) */}
      <section className="dark-mesh-bg text-white pt-12 pb-20 relative overflow-hidden border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs items={[{ label: "About Us" }]} theme="dark" className="mb-6" />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-6">
              <span>About XpmindGlobal</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6">
              Finance minds.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-light to-brand-cyan">
                SAP® expertise.
              </span>{" "}
              Real outcomes.
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed font-normal">
              A specialist SAP® consulting firm founded by Chartered Accountants and senior technology leaders. We bring financial discipline, deep ERP architecture, and two decades of field experience to every engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story & Values Section (Light section) */}
      <section className="py-24 bg-canvas-subtle light-mesh-bg border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Story Text (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <SectionHeading
                eyebrow="Our Background"
                title="Our Story"
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
                  className="p-6 rounded-2xl glass-card-light group hover:border-brand-blue/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      {iconMap[val.icon] || <Zap className="w-5 h-5 text-brand-blue" />}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-brand-blue transition-colors mb-1">
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
      <section className="py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Vision & Mission"
            title={
              <>
                What drives us <span className="text-brand-blue">every day</span>.
              </>
            }
            theme="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="p-8 sm:p-10 rounded-3xl glass-card-light border-brand-blue/20 bg-blue-50/30 space-y-4">
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
            <div className="p-8 sm:p-10 rounded-3xl glass-card-light space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-600">
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
      <section className="py-24 bg-canvas-subtle light-mesh-bg border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="By the Numbers"
            title={
              <>
                Impact that <span className="text-brand-blue">speaks</span> for itself.
              </>
            }
            theme="light"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyData.metrics.map((m, idx) => (
              <div key={idx} className="p-8 rounded-2xl glass-card-light text-center space-y-3">
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
      <section id="leadership" className="py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Leadership Team"
            title={
              <>
                Meet the experts behind <span className="text-brand-blue">XpmindGlobal</span>.
              </>
            }
            subtitle="Our leadership team comprises Chartered Accountants, SAP® S/4HANA certified professionals, and enterprise transformation veterans with an average of 20+ years in the industry."
            theme="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyData.leadership.map((member, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl glass-card-light flex flex-col justify-between group hover:border-brand-blue/40 transition-all duration-300"
              >
                <div>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-blue to-brand-cyan text-white font-display font-black text-xl flex items-center justify-center mb-6 shadow-md shadow-brand-blue/20 group-hover:scale-105 transition-transform">
                    {member.initials}
                  </div>

                  <h3 className="text-xl font-display font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                    {member.name}
                  </h3>

                  <div className="text-xs font-bold uppercase tracking-wider text-cyan-600 mt-1 mb-4">
                    {member.role}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
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
