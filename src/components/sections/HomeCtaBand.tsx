"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Phone, Mail } from "lucide-react";
import { homeData } from "@/content/home";
import { companyData } from "@/content/company";
import { PillButton } from "@/components/ui/PillButton";
import { GetInTouchModal } from "@/components/layout/GetInTouchModal";
import { SectionBackground } from "@/components/ui/SectionBackground";

export function HomeCtaBand() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = homeData.finalCta;

  return (
    <section
      data-theme="dark"
      className="py-24 sm:py-32 text-white relative overflow-hidden border-t border-slate-800/80"
    >
      <SectionBackground variant="cta" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-10 sm:p-16 rounded-[36px] bg-gradient-to-b from-white/[0.09] to-white/[0.03] border border-white/20 backdrop-blur-2xl text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
          {/* Subtle decorative ring */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-brand-cyan/20 to-transparent rounded-bl-full pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4 text-brand-cyan" />
            <span>Start Your Enterprise Transformation</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
            {data.headline}
          </h2>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            {data.subheadline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <PillButton
              variant="primary"
              size="lg"
              onClick={() => setIsModalOpen(true)}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {data.primaryCta.label}
            </PillButton>

            <PillButton
              variant="glass"
              size="lg"
              href={data.secondaryCta.href}
            >
              {data.secondaryCta.label}
            </PillButton>
          </div>

          {/* Quick contact strip */}
          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-brand-cyan" />
              <span>Direct: <a href={companyData.phones[0].href} className="text-white hover:text-cyan-300 underline underline-offset-4">{companyData.phones[0].number}</a></span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-cyan" />
              <span>Inquiries: <a href={`mailto:${companyData.email}`} className="text-white hover:text-cyan-300 underline underline-offset-4">{companyData.email}</a></span>
            </div>
          </div>
        </div>
      </div>

      <GetInTouchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService="S/4HANA Upgrade & Migration"
      />
    </section>
  );
}
