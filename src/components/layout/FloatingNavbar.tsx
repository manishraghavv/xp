"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
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
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState("S/4HANA Upgrade & Migration");
  const [isFocusedWithin, setIsFocusedWithin] = useState(false);

  // Track whether the dropdown was opened by hover (so click can "pin" it)
  const openedByHover = useRef(false);
  // Refs for hover delay timers
  const hoverOpenTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Refs for outside-click detection
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  // ── Helpers ──────────────────────────────────────────────
  const clearHoverTimers = useCallback(() => {
    if (hoverOpenTimer.current) { clearTimeout(hoverOpenTimer.current); hoverOpenTimer.current = null; }
    if (hoverCloseTimer.current) { clearTimeout(hoverCloseTimer.current); hoverCloseTimer.current = null; }
  }, []);

  const closeDropdown = useCallback(() => {
    clearHoverTimers();
    openedByHover.current = false;
    setIsServicesOpen(false);
  }, [clearHoverTimers]);

  // ── Close on route change ────────────────────────────────
  useEffect(() => {
    closeDropdown();
    setIsMenuOverlayOpen(false);
  }, [pathname, closeDropdown]);

  // ── ESC key handler ──────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isServicesOpen) {
        closeDropdown();
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isServicesOpen, closeDropdown]);

  // ── Outside pointerdown handler ──────────────────────────
  useEffect(() => {
    if (!isServicesOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      // Ignore clicks that started on the trigger (the trigger's onClick handles toggle)
      if (triggerRef.current?.contains(target)) return;
      // Ignore clicks inside the panel
      if (panelRef.current?.contains(target)) return;
      // Everything else (including scrim) closes the dropdown
      closeDropdown();
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    return () => document.removeEventListener("pointerdown", handlePointerDown, true);
  }, [isServicesOpen, closeDropdown]);

  // ── Hover handlers (mouse only, with open/close delays) ──
  const handleHoverRegionEnter = useCallback((e: React.PointerEvent | React.MouseEvent) => {
    // Only respond to actual mouse, not touch
    if ("pointerType" in e && e.pointerType !== "mouse") return;

    // Cancel any pending close
    if (hoverCloseTimer.current) { clearTimeout(hoverCloseTimer.current); hoverCloseTimer.current = null; }

    if (isServicesOpen) return; // already open, do nothing

    hoverOpenTimer.current = setTimeout(() => {
      openedByHover.current = true;
      setIsServicesOpen(true);
    }, 100);
  }, [isServicesOpen]);

  const handleHoverRegionLeave = useCallback((e: React.PointerEvent | React.MouseEvent) => {
    if ("pointerType" in e && e.pointerType !== "mouse") return;

    // Cancel any pending open
    if (hoverOpenTimer.current) { clearTimeout(hoverOpenTimer.current); hoverOpenTimer.current = null; }

    // Only auto-close if it was opened by hover (not pinned by click)
    if (!openedByHover.current) return;

    hoverCloseTimer.current = setTimeout(() => {
      closeDropdown();
    }, 250);
  }, [closeDropdown]);

  // ── Click handler on Services trigger ────────────────────
  const handleServicesClick = useCallback(() => {
    clearHoverTimers();

    if (isServicesOpen) {
      // If currently open (whether by hover or click), close it
      closeDropdown();
    } else {
      // Open it, and mark as NOT opened by hover (click-pinned)
      openedByHover.current = false;
      setIsServicesOpen(true);
    }
  }, [isServicesOpen, closeDropdown, clearHoverTimers]);

  // ── When dropdown is open, clicking while it was hover-opened "pins" it ──
  // Actually handled: if it was opened by hover and user clicks, we want it to STAY open.
  // The click handler above sees isServicesOpen===true and closes. So we need
  // special logic: if openedByHover, the first click pins it (converts to click-open).
  const handleServicesTriggerClick = useCallback(() => {
    clearHoverTimers();

    if (isServicesOpen && openedByHover.current) {
      // Hover-opened → pin it open (convert to click-open, don't close)
      openedByHover.current = false;
      return;
    }

    if (isServicesOpen) {
      // Was click-pinned → close
      closeDropdown();
    } else {
      // Was closed → open by click
      openedByHover.current = false;
      setIsServicesOpen(true);
    }
  }, [isServicesOpen, closeDropdown, clearHoverTimers]);

  // ── Keyboard handler on Services trigger ─────────────────
  const handleServicesKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsServicesOpen(true);
      openedByHover.current = false;
      // Focus first item after panel renders
      requestAnimationFrame(() => {
        const firstItem = document.querySelector<HTMLAnchorElement>("#services-dropdown-panel a");
        firstItem?.focus();
      });
    }
  }, []);

  // ── Mutual exclusion: opening hamburger closes dropdown ──
  const openHamburger = useCallback(() => {
    closeDropdown();
    setIsMenuOverlayOpen(true);
  }, [closeDropdown]);

  const openModal = useCallback((service: string) => {
    closeDropdown();
    setModalService(service);
    setIsModalOpen(true);
  }, [closeDropdown]);

  // ── Should hide (never hide while dropdown, overlay or modal are open) ──
  const shouldHide =
    !isVisible &&
    !isServicesOpen &&
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

  const isServicesActive =
    pathname === "/services" || pathname.startsWith("/services/");

  return (
    <>
      <ScrollProgress />

      {/* Full-viewport scrim below the panel and bar when dropdown is open */}
      {isServicesOpen && (
        <div
          ref={scrimRef}
          aria-hidden="true"
          className="fixed inset-0 z-[58] bg-[rgba(6,10,40,0.45)] backdrop-blur-[3px] animate-in fade-in duration-200"
        />
      )}

      {/* Fixed Header Wrapper — no filter, no opacity, only transform for hide/show */}
      <header
        role="banner"
        onFocus={() => setIsFocusedWithin(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsFocusedWithin(false);
          }
        }}
        className={cn(
          "fixed top-3 inset-x-3 sm:top-5 sm:inset-x-6 lg:inset-x-9 z-[60]",
          "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          shouldHide ? "-translate-y-[150%]" : "translate-y-0"
        )}
      >
        <div className="max-w-[1720px] mx-auto relative">

          {/* ──── The Unified Infosys Frosted Glass Bar ──── */}
          <div
            className={cn(
              "infosys-navbar-bar h-[66px] sm:h-[74px] lg:h-[82px] rounded-full px-3 sm:px-4 lg:px-6",
              "flex items-center justify-between gap-2 sm:gap-4 relative transition-shadow duration-300",
              isScrolled ? "shadow-2xl" : ""
            )}
          >
            {/* 1. LEFT: Round White Hamburger + xp-dark Logo */}
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
              <button
                type="button"
                onClick={openHamburger}
                aria-label="Open navigation menu"
                aria-expanded={isMenuOverlayOpen}
                className="w-11 h-11 sm:w-12 sm:h-12 lg:w-[52px] lg:h-[52px] rounded-full bg-white text-[#0B1440] hover:bg-slate-50 flex items-center justify-center shadow-[0_2px_8px_rgba(10,16,48,0.12)] hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer flex-shrink-0"
              >
                <div className="w-5 h-3.5 flex flex-col justify-between">
                  <span className="w-full h-0.5 bg-[#0B1440] rounded-full" />
                  <span className="w-3/4 h-0.5 bg-[#0B1440] rounded-full" />
                  <span className="w-full h-0.5 bg-[#0B1440] rounded-full" />
                </div>
              </button>

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

            {/* 2. CENTER: Solid White Pill */}
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
                        onPointerEnter={handleHoverRegionEnter}
                        onPointerLeave={handleHoverRegionLeave}
                      >
                        {/* Single unified button trigger — click toggles, does NOT navigate */}
                        <button
                          ref={triggerRef}
                          type="button"
                          id="services-dropdown-trigger"
                          aria-haspopup="true"
                          aria-expanded={isServicesOpen}
                          aria-controls="services-dropdown-panel"
                          onClick={handleServicesTriggerClick}
                          onKeyDown={handleServicesKeyDown}
                          className={cn(
                            "px-4 lg:px-5 py-2 rounded-full text-[16px] font-medium transition-colors duration-200",
                            "flex items-center gap-1.5 cursor-pointer",
                            (isActive || isServicesOpen)
                              ? "bg-[#E8EEFF] text-[#1B3FD1] font-semibold"
                              : "text-[#14163F] hover:text-[#1B3FD1] hover:bg-slate-50"
                          )}
                        >
                          <span>{link.label}</span>
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform duration-200",
                              isServicesOpen ? "rotate-180" : ""
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

            {/* 3. RIGHT: Translucent Ring + Dark "Get in Touch" Pill */}
            <div className="flex items-center flex-shrink-0">
              <div className="p-[3px] rounded-full bg-white/60 border border-white/90 shadow-sm flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => openModal("S/4HANA Upgrade & Migration")}
                  className="h-11 sm:h-12 lg:h-[52px] px-4 sm:px-6 lg:px-7 rounded-full bg-[#0B0D14] hover:bg-[#171C4A] text-white shadow-md active:scale-95 transition-all flex items-center gap-2 sm:gap-2.5 font-medium text-xs sm:text-sm lg:text-[16px] cursor-pointer group"
                >
                  <MessageSquareText className="w-4 h-4 lg:w-5 lg:h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline">Get in Touch</span>
                  <span className="sm:hidden">Contact</span>
                </button>
              </div>
            </div>
          </div>

          {/* ──── Services Dropdown Panel (SIBLING of the bar, not a child) ──── */}
          {isServicesOpen && (
            <div
              ref={panelRef}
              id="services-dropdown-panel"
              role="region"
              aria-label="Enterprise SAP Services"
              onPointerEnter={handleHoverRegionEnter}
              onPointerLeave={handleHoverRegionLeave}
              className={cn(
                "services-dropdown-panel",
                "absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2",
                "w-[min(940px,calc(100vw-72px))] max-h-[calc(100svh-140px)] overflow-y-auto",
                "rounded-[28px] p-6 lg:p-7 z-[70] text-[#14163F]",
                "animate-in fade-in slide-in-from-top-2 duration-200"
              )}
            >
              {/* Header row */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6488]">
                  Enterprise SAP® Capabilities
                </span>
                <Link
                  href="/services"
                  onClick={closeDropdown}
                  className="text-xs font-semibold text-[#1B3FD1] hover:text-blue-800 flex items-center gap-1 group"
                >
                  <span>Explore All Services</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* 3×3 Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
                {servicesData.map((svc) => (
                  <Link
                    key={svc.slug}
                    href={`/services/${svc.slug}`}
                    onClick={closeDropdown}
                    className="p-3 rounded-2xl hover:bg-[#EEF2FF] border border-transparent hover:border-blue-200/80 transition-all flex items-start gap-3 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-blue-50/90 border border-blue-100 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-white transition-all shadow-sm">
                      {serviceIcons[svc.slug] || <Sparkles className="w-5 h-5 text-[#1B3FD1]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-bold text-[#14163F] group-hover:text-[#1B3FD1] transition-colors leading-snug">
                        {svc.title}
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5 leading-normal">
                        {svc.shortDescription}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#1B3FD1] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all self-center flex-shrink-0" />
                  </Link>
                ))}
              </div>

              {/* Bottom S/4HANA promo row */}
              <div className="pt-3.5 border-t border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-1">
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
                  onClick={closeDropdown}
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
        onOpenModal={() => openModal("S/4HANA Upgrade & Migration")}
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
