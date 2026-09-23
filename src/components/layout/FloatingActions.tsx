"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, Calendar } from "lucide-react";
import { GetInTouchModal } from "./GetInTouchModal";

export function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showAssessmentCta, setShowAssessmentCta] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let isPromptBoxVisible = false;
    let isFooterVisible = false;

    const promptBoxEl = document.getElementById("hero-prompt-box");
    const footerEl = document.getElementById("site-footer");

    const updateVisibility = () => {
      const scrollY = window.scrollY;
      setShowBackToTop(scrollY > 500);

      // Only show after user scrolled past hero (> 450px)
      // AND neither hero prompt box nor footer is in viewport
      const shouldShowCta = scrollY > 450 && !isPromptBoxVisible && !isFooterVisible;
      setShowAssessmentCta(shouldShowCta);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === "hero-prompt-box") {
            isPromptBoxVisible = entry.isIntersecting;
          }
          if (entry.target.id === "site-footer") {
            isFooterVisible = entry.isIntersecting;
          }
        });
        updateVisibility();
      },
      {
        threshold: [0, 0.05, 0.2],
      }
    );

    if (promptBoxEl) observer.observe(promptBoxEl);
    if (footerEl) observer.observe(footerEl);

    const handleScroll = () => {
      updateVisibility();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateVisibility();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col items-end gap-3 pointer-events-none">
        {/* Back to top button (Stacked ABOVE Assessment CTA with 12px gap) */}
        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className="pointer-events-auto p-3.5 rounded-full bg-navy-950/90 hover:bg-navy-900 text-white shadow-2xl border border-white/20 backdrop-blur-xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center group"
            aria-label="Back to top of page"
          >
            <ArrowUp className="w-4 h-4 text-brand-cyan group-hover:-translate-y-0.5 transition-transform" />
          </button>
        )}

        {/* Floating Book Free Assessment Button */}
        {showAssessmentCta && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="pointer-events-auto px-5 py-3 rounded-full btn-pill-gradient text-white text-sm font-bold shadow-2xl shadow-blue-500/35 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-white/25 backdrop-blur-xl cursor-pointer"
            aria-label="Book Free Assessment"
          >
            <Calendar className="w-4 h-4 text-cyan-200" />
            <span>Book Free Assessment</span>
          </button>
        )}
      </div>

      <GetInTouchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService="S/4HANA Upgrade & Migration"
      />
    </>
  );
}
