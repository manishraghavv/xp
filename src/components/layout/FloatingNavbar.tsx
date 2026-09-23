"use client";

import React, { useState, useRef, useEffect } from "react";
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
  "sap-cloud-saas-solutions": <Cloud className="w-5 h-5 text-cyan-500" />,
  "sap-analytics-reporting": <BarChart3 className="w-5 h-5 text-blue-500" />,
  "sap-integration-services": <Network className="w-5 h-5 text-indigo-500" />,
  "sap-grc-security-compliance": <ShieldCheck className="w-5 h-5 text-emerald-500" />,
  "sap-training-enablement": <GraduationCap className="w-5 h-5 text-amber-500" />,
  "s4hana-upgrade-migration": <RefreshCw className="w-5 h-5 text-cyan-500" />,
  "sap-implementation-rollout": <Layers className="w-5 h-5 text-violet-500" />,
  "application-management-services-ams": <Headphones className="w-5 h-5 text-blue-500" />,
  "sap-centre-of-excellence-coe": <Award className="w-5 h-5 text-amber-500" />,
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

  // Close dropdown and menu on route change
  useEffect(() => {
    setIsServicesDropdownOpen(false);
    setIsMenuOverlayOpen(false);
  }, [pathname]);

  // Keyboard navigation & ESC close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isServicesDropdownOpen) {
        setIsServicesDropdownOpen(false);
        const trigger = document.getElementById("services-dropdown-trigger");
        trigger?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isServicesDropdownOpen]);

  // Timed hover handlers (120ms enter delay, 200ms leave delay)
  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsServicesDropdownOpen(true);
    }, 120);
  };

  const handleDropdownLeave = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
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

      {/* Full-viewport Scrim when Services dropdown is open */}
      {isServicesDropdownOpen && (
        <div
          aria-hidden="true"
          onClick={() => setIsServicesDropdownOpen(false)}
          className="fixed inset-0 z-[65] pointer-events-auto bg-[rgba(6,10,40,0.45)] backdrop-blur-[3px] transition-opacity duration-200 animate-in fade-in"
        />
      )}

      {/* Header Fixed Wrapper (Siblings: The Bar + Dropdown Panel) */}
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
          "fixed top-3 inset-x-3 sm:top-5 sm:inset-x-6 lg:inset-x-9 z-[60] pointer-events-none",
          "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          shouldHide ? "-translate-y-[150%]" : "translate-y-0"
        )}
      >
        <div className="max-w-[1720px] mx-auto pointer-events-auto relative">
          
          {/* Sibling 1: The Unified Infosys Frosted Glass Bar */}
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
                        className="relative flex items-center rounded-full"
                        onMouseEnter={handleDropdownEnter}
                        onMouseLeave={handleDropdownLeave}
                      >
                        {/* Real Link for clicking the label */}
                        <Link
                          href={link.href}
                          onClick={() => setIsServicesDropdownOpen(false)}
                          className={cn(
                            "pl-4 lg:pl-5 pr-1.5 py-2 rounded-l-full text-[16px] font-medium transition-colors duration-200",
                            isActive
                              ? "bg-[#E8EEFF] text-[#1B3FD1] font-semibold"
                              : "text-[#14163F] hover:text-[#1B3FD1] hover:bg-slate-50"
                          )}
                        >
                          {link.label}
                        </Link>

                        {/* Separate Chevron Button for toggling dropdown */}
                        <button
                          type="button"
                          id="services-dropdown-trigger"
                          aria-label="Toggle Services menu"
                          aria-expanded={isServicesDropdownOpen}
                          aria-controls="services-dropdown-panel"
                          onClick={() => setIsServicesDropdownOpen((prev) => !prev)}
                          onKeyDown={(e) => {
                            if (e.key === "ArrowDown" || e.key === "Enter") {
                              e.preventDefault();
                              setIsServicesDropdownOpen(true);
                              setTimeout(() => {
                                const firstItem = document.querySelector<HTMLAnchorElement>(
                                  "#services-dropdown-panel a"
                                );
                                firstItem?.focus();
                              }, 50);
                            }
                          }}
                          className={cn(
                            "pr-3 lg:pr-4 pl-1 py-2.5 rounded-r-full text-[16px] transition-colors duration-200 cursor-pointer flex items-center justify-center",
                            isActive
                              ? "bg-[#E8EEFF] text-[#1B3FD1]"
                              : "text-[#14163F] hover:text-[#1B3FD1] hover:bg-slate-50"
                          )}
                        >
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 text-[#14163F]/75 transition-transform duration-200",
                              isServicesDropdownOpen ? "rotate-180" : ""
                            )}
                          />
                        </button>
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

          {/* Sibling 2: Rebuilt Services Dropdown Panel (Sibling outside the frosted bar to avoid nested filter bug) */}
          {isServicesDropdownOpen && (
            <div
              id="services-dropdown-panel"
              role="region"
              aria-label="Enterprise SAP Services"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
              className={cn(
                "services-dropdown-panel absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2",
                "w-[min(940px,calc(100vw-72px))] max-h-[calc(100svh-140px)] overflow-y-auto",
                "rounded-[28px] p-6 lg:p-7 z-[70] pointer-events-auto text-slate-900",
                "animate-in fade-in slide-in-from-top-2 duration-200"
              )}
            >
              {/* Header row */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6488]">
                  Enterprise SAP® Capabilities
                </span>
                <Link
                  href="/services"
                  onClick={() => setIsServicesDropdownOpen(false)}
                  className="text-xs font-semibold text-[#1B3FD1] hover:text-blue-800 flex items-center gap-1 group"
                >
                  <span>Explore All Services</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* 3 Columns x 3 Rows Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 my-4">
                {servicesData.map((svc) => (
                  <Link
                    key={svc.slug}
                    href={`/services/${svc.slug}`}
                    onClick={() => setIsServicesDropdownOpen(false)}
                    className="p-3 rounded-2xl hover:bg-[#EEF2FF] border border-transparent hover:border-blue-200/80 transition-all flex items-start gap-3 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-blue-50/90 border border-blue-100 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-white transition-all shadow-sm">
                      {serviceIcons[svc.slug] || <Sparkles className="w-5 h-5 text-[#1B3FD1]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-bold text-[#14163F] group-hover:text-[#1B3FD1] transition-colors leading-snug">
                        {svc.title}
                      </div>
                      <div className="text-[11px] text-slate-600 line-clamp-1 mt-0.5 leading-normal">
                        {svc.shortDescription}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#1B3FD1] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all self-center flex-shrink-0" />
                  </Link>
                ))}
              </div>

              {/* Bottom S/4HANA Migration Row */}
              <div className="pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 tracking-wider">
                    2027 ECC Deadline
                  </span>
                  <span className="text-xs font-semibold text-[#14163F]">
                    ECC to S/4HANA Brownfield Migration in 16 Weeks*
                  </span>
                </div>
                <Link
                  href="/s4hana-migration"
                  onClick={() => setIsServicesDropdownOpen(false)}
                  className="text-xs font-bold text-[#1B3FD1] hover:underline flex items-center gap-1 group"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          )}

        </div>
      </header>

      {/* Fullscreen Menu Overlay */}
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
