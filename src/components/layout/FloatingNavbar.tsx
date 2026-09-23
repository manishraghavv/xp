"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Sparkles,
  MessageSquareText,
  ArrowRight,
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
import { MenuOverlay } from "./MenuOverlay";
import { GetInTouchModal } from "./GetInTouchModal";
import { ScrollProgress } from "./ScrollProgress";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { cn } from "@/lib/utils";

const serviceIcons: Record<string, React.ReactNode> = {
  "sap-cloud-saas-solutions": <Cloud className="w-4 h-4 text-cyan-500" />,
  "sap-analytics-reporting": <BarChart3 className="w-4 h-4 text-blue-500" />,
  "sap-integration-services": <Network className="w-4 h-4 text-indigo-500" />,
  "sap-grc-security-compliance": <ShieldCheck className="w-4 h-4 text-emerald-500" />,
  "sap-training-enablement": <GraduationCap className="w-4 h-4 text-amber-500" />,
  "s4hana-upgrade-migration": <RefreshCw className="w-4 h-4 text-cyan-500" />,
  "sap-implementation-rollout": <Layers className="w-4 h-4 text-violet-500" />,
  "application-management-services-ams": <Headphones className="w-4 h-4 text-blue-500" />,
  "sap-centre-of-excellence-coe": <Award className="w-4 h-4 text-amber-500" />,
};

export function FloatingNavbar() {
  const { isVisible, isScrolled } = useScrollDirection();
  const [isMenuOverlayOpen, setIsMenuOverlayOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState("S/4HANA Upgrade & Migration");
  const [isFocusedWithin, setIsFocusedWithin] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsServicesDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 200);
  };

  // Keep navbar visible if dropdown, menu, modal, or keyboard focus is active
  const shouldHide =
    !isVisible &&
    !isServicesDropdownOpen &&
    !isMenuOverlayOpen &&
    !isModalOpen &&
    !isFocusedWithin;

  const navLinks = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services", hasDropdown: true },
    { label: "Projects", href: "/projects" },
    { label: "Training", href: "/training" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <ScrollProgress />

      {/* Unified Infosys-style Floating Navbar (ONE Glass Bar) */}
      <header
        role="banner"
        aria-hidden={shouldHide}
        onFocus={() => setIsFocusedWithin(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsFocusedWithin(false);
          }
        }}
        className={cn(
          "fixed top-3 inset-x-3 sm:top-5 sm:inset-x-6 lg:inset-x-9 z-50 pointer-events-none",
          "transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          shouldHide ? "-translate-y-[150%] opacity-0" : "translate-y-0 opacity-100"
        )}
      >
        <div className="max-w-[1720px] mx-auto pointer-events-auto">
          <div
            className={cn(
              "infosys-navbar-bar h-[66px] sm:h-[74px] lg:h-[82px] rounded-full px-3 sm:px-4 lg:px-6",
              "flex items-center justify-between gap-2 sm:gap-4 relative transition-shadow duration-300",
              isScrolled ? "shadow-2xl" : ""
            )}
          >
            {/* 1. LEFT GROUP: Round White Hamburger Button + xp-dark Logo */}
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
              {/* Round White Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsMenuOverlayOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={isMenuOverlayOpen}
                className="w-11 h-11 sm:w-12 sm:h-12 lg:w-[52px] lg:h-[52px] rounded-full bg-white text-[#0B1440] hover:bg-slate-50 flex items-center justify-center shadow-[0_2px_8px_rgba(10,16,48,0.12)] hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer flex-shrink-0"
              >
                <div className="w-5 h-3.5 flex flex-col justify-between">
                  <span className="w-full h-0.5 bg-[#0B1440] rounded-full transition-all" />
                  <span className="w-3/4 h-0.5 bg-[#0B1440] rounded-full transition-all" />
                  <span className="w-full h-0.5 bg-[#0B1440] rounded-full transition-all" />
                </div>
              </button>

              {/* XP Dark Wordmark with Amber Chevron */}
              <Link href="/" className="inline-flex items-center group flex-shrink-0" aria-label="XpmindGlobal Home">
                <Image
                  src="/xp-dark.png"
                  alt="XpmindGlobal"
                  width={140}
                  height={32}
                  priority
                  className="h-7 sm:h-8 lg:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </Link>
            </div>

            {/* 2. CENTER GROUP: Solid White Pill (Unconditional 100% Readability on Dark & Light) */}
            <nav
              aria-label="Primary Navigation"
              className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2"
            >
              <div className="h-[54px] px-2.5 rounded-full bg-white shadow-[0_2px_12px_rgba(10,16,48,0.08)] border border-slate-100 flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive =
                    pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

                  if (link.hasDropdown) {
                    return (
                      <div
                        key={link.href}
                        className="relative"
                        onMouseEnter={handleDropdownEnter}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            "px-4 lg:px-5 py-2 rounded-full text-[16px] font-medium transition-colors duration-200 flex items-center gap-1.5",
                            isActive
                              ? "bg-[#E8EEFF] text-[#1B3FD1] font-semibold"
                              : "text-[#14163F] hover:text-[#1B3FD1] hover:bg-slate-50"
                          )}
                          aria-expanded={isServicesDropdownOpen}
                        >
                          <span>{link.label}</span>
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 text-[#14163F]/75 transition-transform duration-200",
                              isServicesDropdownOpen ? "rotate-180" : ""
                            )}
                          />
                        </Link>

                        {/* 3-Column Glass Dropdown for Services */}
                        {isServicesDropdownOpen && (
                          <div
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-3.5 w-[780px] p-6 rounded-3xl bg-white/98 backdrop-blur-2xl border border-slate-200/90 shadow-2xl shadow-blue-900/15 animate-in fade-in slide-in-from-top-2 duration-200 z-50 text-slate-900"
                          >
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Enterprise SAP® Capabilities
                              </span>
                              <Link
                                href="/services"
                                className="text-xs font-semibold text-brand-blue hover:text-blue-700 flex items-center gap-1"
                              >
                                <span>Explore All Services</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>

                            {/* 3 Columns of Services */}
                            <div className="grid grid-cols-3 gap-3">
                              {servicesData.map((svc) => (
                                <Link
                                  key={svc.slug}
                                  href={`/services/${svc.slug}`}
                                  className="p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200/80 transition-all flex items-start gap-2.5 group"
                                >
                                  <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                                    {serviceIcons[svc.slug] || <Sparkles className="w-4 h-4 text-brand-blue" />}
                                  </div>
                                  <div>
                                    <div className="text-xs font-bold text-slate-900 group-hover:text-brand-blue transition-colors line-clamp-1">
                                      {svc.title}
                                    </div>
                                    <div className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                                      {svc.shortDescription}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>

                            {/* Highlighted S/4HANA Migration Banner inside dropdown */}
                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between px-2">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800">
                                  2027 ECC Deadline
                                </span>
                                <span className="text-xs font-medium text-slate-700">
                                  ECC to S/4HANA Brownfield in 16 Weeks*
                                </span>
                              </div>
                              <Link
                                href="/s4hana-migration"
                                className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
                              >
                                <span>Learn More</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "px-4 lg:px-5 py-2 rounded-full text-[16px] font-medium transition-colors duration-200",
                        isActive
                          ? "bg-[#E8EEFF] text-[#1B3FD1] font-semibold"
                          : "text-[#14163F] hover:text-[#1B3FD1] hover:bg-slate-50"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* 3. RIGHT GROUP: Translucent Ring Outer Wrapper + Dark Pill "Get in Touch" Button */}
            <div className="flex items-center flex-shrink-0">
              <div className="p-[3px] rounded-full bg-white/60 border border-white/90 shadow-sm flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setModalService("S/4HANA Upgrade & Migration");
                    setIsModalOpen(true);
                  }}
                  className="h-11 sm:h-12 lg:h-[52px] px-4 sm:px-6 lg:px-7 rounded-full bg-[#0B0D14] hover:bg-[#171C4A] text-white shadow-md active:scale-95 transition-all flex items-center gap-2 sm:gap-2.5 font-medium text-xs sm:text-sm lg:text-[16px] cursor-pointer group"
                >
                  <MessageSquareText className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline">Get in Touch</span>
                  <span className="sm:hidden">Contact</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Menu Overlay (Still uses white logo on dark overlay) */}
      <MenuOverlay
        isOpen={isMenuOverlayOpen}
        onClose={() => setIsMenuOverlayOpen(false)}
        onOpenModal={() => {
          setModalService("S/4HANA Upgrade & Migration");
          setIsModalOpen(true);
        }}
      />

      {/* Global Consultation Modal */}
      <GetInTouchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService={modalService}
      />
    </>
  );
}
