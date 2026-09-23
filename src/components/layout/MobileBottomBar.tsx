"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { GetInTouchModal } from "./GetInTouchModal";

export function MobileBottomBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let isPromptBoxVisible = false;
    let isFooterVisible = false;

    const promptBoxEl = document.getElementById("hero-prompt-box");
    const footerEl = document.getElementById("site-footer");

    const updateVisibility = () => {
      const scrollY = window.scrollY;
      const shouldShow = scrollY > 400 && !isPromptBoxVisible && !isFooterVisible;
      setIsVisible(shouldShow);
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
        threshold: [0, 0.05],
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

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-0 inset-x-0 z-30 md:hidden p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] bg-navy-950/95 backdrop-blur-xl border-t border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-full btn-pill-gradient py-3.5 rounded-full text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 active:scale-95 transition-transform cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-cyan-200" />
          <span>Book Free Assessment</span>
        </button>
      </div>

      <GetInTouchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService="S/4HANA Upgrade & Migration"
      />
    </>
  );
}
