"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, CornerDownLeft } from "lucide-react";
import { GetInTouchModal } from "@/components/layout/GetInTouchModal";

interface PromptBoxProps {
  className?: string;
}

const suggestionChips = [
  { label: "ECC → S/4HANA migration", service: "S/4HANA Upgrade & Migration" },
  { label: "AMS support", service: "Application Management Services (AMS)" },
  { label: "SAP® GRC & compliance", service: "SAP® GRC, Security & Compliance" },
  { label: "Analytics & reporting", service: "SAP® Analytics & Reporting" },
  { label: "SAP® Cloud & BTP", service: "SAP® Cloud & SaaS Solutions" },
];

export function PromptBox({ className = "" }: PromptBoxProps) {
  const [promptText, setPromptText] = useState("");
  const [selectedService, setSelectedService] = useState("S/4HANA Upgrade & Migration");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsModalOpen(true);
  };

  const handleChipClick = (chip: typeof suggestionChips[0]) => {
    setSelectedService(chip.service);
    setPromptText(`We need guidance regarding ${chip.label}`);
    setIsModalOpen(true);
  };

  return (
    <>
      <div id="hero-prompt-box" className={`w-full max-w-3xl mx-auto ${className}`}>
        {/* Main Prompt Card */}
        <form
          onSubmit={handleSubmit}
          className="relative rounded-3xl bg-navy-900/60 backdrop-blur-2xl border border-white/15 p-2 sm:p-3 shadow-2xl shadow-blue-950/50 transition-all duration-300 focus-within:border-brand-blue/60 focus-within:ring-2 focus-within:ring-brand-blue/20"
        >
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex items-center flex-1 px-3 sm:px-4 py-2">
              <Sparkles className="w-5 h-5 text-brand-cyan flex-shrink-0 mr-3 animate-pulse" />
              <input
                type="text"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Tell us about your SAP® challenge…"
                aria-label="Describe your SAP challenge for assessment"
                className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base outline-none font-sans"
              />
            </div>

            <button
              type="submit"
              className="btn-pill-gradient px-6 py-3.5 rounded-full text-sm font-semibold flex items-center justify-center gap-2 group flex-shrink-0"
            >
              <span>Get Free Assessment</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </form>

        {/* Suggestion Chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 px-2">
          <span className="text-xs text-slate-400 font-medium mr-1">Popular:</span>
          {suggestionChips.map((chip, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleChipClick(chip)}
              className="text-xs px-3.5 py-1.5 rounded-full bg-white/[0.07] hover:bg-white/[0.14] text-slate-200 border border-white/10 hover:border-brand-cyan/40 transition-all duration-200 flex items-center gap-1.5 backdrop-blur-sm"
            >
              <span>{chip.label}</span>
            </button>
          ))}
        </div>
      </div>

      <GetInTouchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService={selectedService}
        defaultMessage={promptText}
      />
    </>
  );
}
