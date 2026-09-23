import React from "react";
import { Home, Compass, PhoneCall } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";

export default function NotFound() {
  return (
    <div data-theme="dark" className="min-h-[85vh] flex items-center justify-center pt-32 pb-20 dark-mesh-bg text-white px-4">
      <div className="max-w-2xl w-full p-8 sm:p-12 rounded-[32px] glass-card-dark text-center space-y-6 border border-slate-700/80 shadow-2xl relative">
        <div className="inline-block text-xs font-bold uppercase tracking-widest text-brand-cyan bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/25">
          Error 404 · Page Not Found
        </div>

        <h1 className="font-display text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl font-bold text-white">
          The requested SAP® resource could not be found.
        </h2>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg mx-auto">
          The page you are looking for may have been moved, renamed, or is currently undergoing architecture maintenance.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <PillButton
            href="/"
            variant="primary"
            size="md"
            icon={<Home className="w-4 h-4" />}
            iconPosition="left"
          >
            Return Home
          </PillButton>

          <PillButton
            href="/services"
            variant="glass"
            size="md"
            icon={<Compass className="w-4 h-4" />}
            iconPosition="left"
          >
            Browse Services
          </PillButton>

          <PillButton
            href="/contact"
            variant="secondary"
            size="md"
            icon={<PhoneCall className="w-4 h-4" />}
            iconPosition="left"
          >
            Contact Support
          </PillButton>
        </div>
      </div>
    </div>
  );
}
