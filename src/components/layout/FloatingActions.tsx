"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { GetInTouchModal } from "./GetInTouchModal";
import {
  useElementInView,
  useFormFieldFocused,
  useOverlayOpen,
} from "@/hooks/useBodyScrollLock";

/**
 * Desktop-only floating actions: a "Book Free Assessment" pill plus a stacked
 * back-to-top button. Both hide themselves while the hero prompt box, the footer,
 * a form field, the menu panel or the modal is in view.
 */
export function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showAssessmentCta, setShowAssessmentCta] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isOverlayOpen = useOverlayOpen();
  const isFieldFocused = useFormFieldFocused();
  const isPromptBoxInView = useElementInView("hero-prompt-box", "-8% 0px -8% 0px");
  const isFooterInView = useElementInView("site-footer", "-10% 0px 0px 0px");

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      setShowBackToTop(y > 500);
      setShowAssessmentCta(y > 450);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  const blocked =
    isOverlayOpen || isFieldFocused || isPromptBoxInView || isFooterInView || isModalOpen;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col items-end gap-3 pointer-events-none">
        {showBackToTop && !blocked && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="pointer-events-auto w-12 h-12 rounded-full bg-navy-950/90 hover:bg-navy-900 text-white shadow-2xl border border-white/20 backdrop-blur-xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center group"
            aria-label="Back to top of page"
          >
            <ArrowUp className="w-4 h-4 text-brand-cyan group-hover:-translate-y-0.5 transition-transform" />
          </button>
        )}

        {showAssessmentCta && !blocked && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="pointer-events-auto px-5 py-3 rounded-full btn-pill-gradient text-white text-sm font-bold shadow-2xl shadow-blue-500/35 hover:scale-105 active:scale-95 transition-all flex items-center border border-white/25 backdrop-blur-xl cursor-pointer"
            aria-label="Book Free Assessment"
          >
            Book Free Assessment
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
