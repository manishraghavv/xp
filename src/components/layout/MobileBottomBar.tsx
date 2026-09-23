"use client";

import React, { useState } from "react";
import { Sparkles, Calendar } from "lucide-react";
import { GetInTouchModal } from "./GetInTouchModal";

export function MobileBottomBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden p-3 bg-navy-950/90 backdrop-blur-xl border-t border-slate-800/80 shadow-2xl">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-full btn-pill-gradient py-3.5 rounded-full text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 active:scale-95 transition-transform"
        >
          <Calendar className="w-4 h-4 text-brand-cyan" />
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
