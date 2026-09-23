"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Cloud,
  BarChart3,
  Network,
  ShieldCheck,
  GraduationCap,
  RefreshCw,
  Layers,
  Headphones,
  Award,
} from "lucide-react";
import { servicesData } from "@/content/services";
import { companyData } from "@/content/company";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenModal: () => void;
}

const serviceIcons: Record<string, React.ReactNode> = {
  "sap-cloud-saas-solutions": <Cloud className="w-4 h-4 text-cyan-400" />,
  "sap-analytics-reporting": <BarChart3 className="w-4 h-4 text-blue-400" />,
  "sap-integration-services": <Network className="w-4 h-4 text-indigo-400" />,
  "sap-grc-security-compliance": <ShieldCheck className="w-4 h-4 text-emerald-400" />,
  "sap-training-enablement": <GraduationCap className="w-4 h-4 text-amber-400" />,
  "s4hana-upgrade-migration": <RefreshCw className="w-4 h-4 text-cyan-400" />,
  "sap-implementation-rollout": <Layers className="w-4 h-4 text-violet-400" />,
  "application-management-services-ams": <Headphones className="w-4 h-4 text-blue-400" />,
  "sap-centre-of-excellence-coe": <Award className="w-4 h-4 text-amber-400" />,
};

export function MenuOverlay({ isOpen, onClose, onOpenModal }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-[75] overflow-y-auto [scrollbar-gutter:stable] menu-overlay-surface text-white animate-in fade-in duration-200"
    >
      {/* Background ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/12 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Centered Content Container */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-6 sm:py-8 min-h-screen flex flex-col justify-between relative z-10">
        
        {/* Top bar inside overlay */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <Link href="/" onClick={onClose} className="inline-block group" aria-label="XpmindGlobal Home">
            <div className="py-2 px-4 rounded-full bg-[rgba(10,16,48,0.85)] border border-white/15 shadow-xl flex items-center transition-transform group-hover:scale-[1.02]">
              <Image
                src="/xp.png"
                alt="XpmindGlobal Logo"
                width={150}
                height={32}
                priority
                className="h-8 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Unified round white button */}
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-11 h-11 sm:w-12 sm:h-12 lg:w-[52px] lg:h-[52px] rounded-full bg-white text-[#0B1440] hover:bg-slate-100 flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <X className="w-6 h-6 stroke-[2.2]" />
          </button>
        </div>

        {/* 3-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-8 sm:py-10 my-auto">
          
          {/* Column 1: Quick Navigation (Top-aligned) */}
          <div className="lg:col-span-4 flex flex-col space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan">
              Quick Navigation
            </span>
            <nav className="flex flex-col space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About XpmindGlobal", href: "/about" },
                { label: "SAP® Services", href: "/services" },
                { label: "Projects & Case Studies", href: "/projects" },
                { label: "XPMIND Learning Cell", href: "/training" },
                { label: "16-Week S/4HANA Migration", href: "/s4hana-migration" },
                { label: "Contact Us", href: "/contact" },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={onClose}
                  className="text-xl sm:text-2xl font-display font-bold text-slate-100 hover:text-brand-cyan transition-colors flex items-center justify-between group py-1"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-cyan" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 2: 9 Specialist Services (Full text, no truncated descriptions) */}
          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                Specialist Service Lines
              </span>
              <Link
                href="/services"
                onClick={onClose}
                className="text-xs font-semibold text-brand-cyan hover:underline"
              >
                View all →
              </Link>
            </div>

            <div className="space-y-2">
              {servicesData.map((svc) => (
                <Link
                  key={svc.slug}
                  href={`/services/${svc.slug}`}
                  onClick={onClose}
                  className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/[0.08] border border-transparent hover:border-white/10 transition-all group"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#0A1030] border border-white/15 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-brand-cyan/50">
                    {serviceIcons[svc.slug] || <Sparkles className="w-4 h-4 text-brand-cyan" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white transition-colors leading-tight">
                      {svc.title}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      {svc.shortDescription}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Featured S/4HANA Migration Card & Direct Contact */}
          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-10 flex flex-col justify-between space-y-6">
            
            {/* Featured Migration Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-brand-blue/20 via-[#101B4D]/90 to-brand-cyan/15 border border-brand-cyan/30 shadow-xl backdrop-blur-xl relative overflow-hidden group">
              <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-brand-cyan bg-cyan-950/70 px-2.5 py-0.5 rounded-full border border-cyan-500/30 mb-2.5">
                Mandatory ECC Deadline
              </span>
              <h4 className="text-base font-bold text-white mb-2 leading-snug">
                ECC to S/4HANA Brownfield Migration in 16 Weeks*
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Preserve 100% of historical data and custom ABAP code with zero business disruption and ~40% cost efficiency.
              </p>
              <Link
                href="/s4hana-migration"
                onClick={onClose}
                className="btn-pill-gradient text-xs px-5 py-2.5 rounded-full inline-flex items-center gap-1.5 font-semibold"
              >
                <span>Explore Migration Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Direct Coordinates with comfortable breathing room */}
            <div className="space-y-3 text-xs text-slate-300">
              <span className="block text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Direct Contact
              </span>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                <a href={companyData.phones[0].href} className="hover:text-cyan-400 transition-colors">
                  {companyData.phones[0].number}
                </a>
                <span>|</span>
                <a href={companyData.phones[1].href} className="hover:text-cyan-400 transition-colors">
                  {companyData.phones[1].number}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                <a href={`mailto:${companyData.email}`} className="hover:text-cyan-400 transition-colors">
                  {companyData.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-relaxed">{companyData.headquarters.fullAddress}</span>
              </div>
            </div>

            {/* Consultation Trigger Button */}
            <div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenModal();
                }}
                className="w-full py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-brand-cyan" />
                <span>Open Consultation Modal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer legal row */}
        <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <div>© {new Date().getFullYear()} XpmindGlobal. All rights reserved. Registered in India.</div>
          <div className="text-slate-500 text-[11px]">
            SAP® is a registered trademark of SAP SE in Germany and other countries.
          </div>
        </div>
      </div>
    </div>
  );
}
