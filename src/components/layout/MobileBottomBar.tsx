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
 * The single sticky call-to-action bar shown on phones.
 *
 * It stays out of the way while the hero prompt box, the footer, a form field,
 * the menu panel or the modal is on screen, and carries the back-to-top button
 * directly above it so nothing overlaps the page copy.
 */
export function MobileBottomBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const isOverlayOpen = useOverlayOpen();
  const isFieldFocused = useFormFieldFocused();
  const isPromptBoxInView = useElementInView("hero-prompt-box", "-8% 0px -8% 0px");
  const isFooterInView = useElementInView("site-footer", "-10% 0px 0px 0px");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHasScrolled(y > 400);
      setShowBackToTop(y > 700);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isBarVisible =
    hasScrolled &&
    !isPromptBoxInView &&
    !isFooterInView &&
    !isOverlayOpen &&
    !isFieldFocused &&
    !isModalOpen;

  return (
    <>
      {/* Back-to-top — sits directly above the sticky bar */}
      {showBackToTop && !isOverlayOpen && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top of page"
          className="md:hidden fixed right-4 z-40 w-12 h-12 rounded-full bg-navy-950/90 border border-white/20 backdrop-blur-xl shadow-2xl flex items-center justify-center text-white transition-[bottom] duration-300"
          style={{
            bottom: isBarVisible
              ? "calc(5.5rem + env(safe-area-inset-bottom, 0px))"
              : "calc(1rem + env(safe-area-inset-bottom, 0px))",
          }}
        >
          <ArrowUp className="w-5 h-5 text-brand-cyan" />
        </button>
      )}

      {isBarVisible && (
        <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-navy-950/95 backdrop-blur-xl border-t border-white/10 shadow-2xl px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full btn-pill-gradient min-h-[48px] py-3.5 rounded-full text-white font-bold text-sm flex items-center justify-center shadow-lg shadow-blue-500/25 active:scale-95 transition-transform cursor-pointer"
          >
            Book Free Assessment
          </button>
        </div>
      )}

      <GetInTouchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService="S/4HANA Upgrade & Migration"
      />
    </>
  );
}
