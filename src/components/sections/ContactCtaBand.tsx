"use client";

import React, { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { GetInTouchModal } from "@/components/layout/GetInTouchModal";

interface ContactCtaBandProps {
  eyebrow?: string;
  headline: string | React.ReactNode;
  subtitle?: string;
  buttonText?: string;
  defaultService?: string;
}

export function ContactCtaBand({
  eyebrow = "Get in Touch",
  headline,
  subtitle,
  buttonText = "Schedule a Consultation →",
  defaultService,
}: ContactCtaBandProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section data-theme="dark" className="py-20 dark-mesh-bg text-white relative overflow-hidden border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="p-8 sm:p-12 rounded-4xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 backdrop-blur-2xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-brand-cyan">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{eyebrow}</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-snug">
                {headline}
              </h2>
              {subtitle && (
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-pill-gradient px-8 py-4 rounded-full text-white text-sm sm:text-base font-semibold flex items-center gap-2 flex-shrink-0 cursor-pointer"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <GetInTouchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService={defaultService}
      />
    </>
  );
}
