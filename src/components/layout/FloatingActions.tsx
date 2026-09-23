"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, Calendar } from "lucide-react";
import { GetInTouchModal } from "./GetInTouchModal";

export function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        {/* Floating Book Free Assessment Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="pointer-events-auto px-4 py-3 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-xs sm:text-sm font-bold shadow-xl shadow-brand-blue/30 hover:shadow-brand-blue/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-white/20 backdrop-blur-md"
          aria-label="Book Free Assessment"
        >
          <Calendar className="w-4 h-4" />
          <span className="hidden sm:inline">Book Free Assessment</span>
          <span className="sm:hidden">Assessment</span>
        </button>

        {/* Back to top button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="pointer-events-auto p-3 rounded-full bg-navy-900/80 hover:bg-navy-800 text-white shadow-lg border border-slate-700/80 backdrop-blur-md hover:scale-105 active:scale-95 transition-all"
            aria-label="Back to top of page"
          >
            <ArrowUp className="w-4 h-4" />
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
