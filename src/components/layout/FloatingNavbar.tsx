"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowRight } from "lucide-react";
import { servicesData } from "@/content/services";
import { MenuOverlay } from "./MenuOverlay";
import { GetInTouchModal } from "./GetInTouchModal";
import { ScrollProgress } from "./ScrollProgress";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { cn } from "@/lib/utils";

export function FloatingNavbar() {
  const { isVisible, isScrolled } = useScrollDirection();
  const [isMenuOverlayOpen, setIsMenuOverlayOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState("S/4HANA Upgrade & Migration");
  const [isFocusedWithin, setIsFocusedWithin] = useState(false);
  // When true, the panel moves focus to its first item as soon as it mounts
  const [focusFirstItem, setFocusFirstItem] = useState(false);

  // Refs for outside-click detection and keyboard focus management
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  // ── Helpers ──────────────────────────────────────────────
  const closeDropdown = useCallback(() => {
    setFocusFirstItem(false);
    setIsServicesOpen(false);
  }, []);

  // ── Close on route change ────────────────────────────────
  useEffect(() => {
    closeDropdown();
    setIsMenuOverlayOpen(false);
  }, [pathname, closeDropdown]);

  // ── Keyboard: ESC close · Tab trap · arrow-key item navigation ──
  useEffect(() => {
    if (!isServicesOpen) return;

    const getPanelFocusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []
      );

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeDropdown();
        triggerRef.current?.focus();
        return;
      }

      if (e.key === "Tab") {
        const trigger = triggerRef.current;
        const nodes: HTMLElement[] = trigger
          ? [trigger, ...getPanelFocusables()]
          : getPanelFocusables();
        if (nodes.length === 0) return;

        const idx = nodes.indexOf(document.activeElement as HTMLElement);
        e.preventDefault();
        const next =
          idx === -1
            ? e.shiftKey
              ? nodes.length - 1
              : 1
            : e.shiftKey
              ? (idx - 1 + nodes.length) % nodes.length
              : (idx + 1) % nodes.length;
        nodes[next]?.focus();
        return;
      }

      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        const items = getPanelFocusables();
        if (items.length === 0) return;
        const idx = items.indexOf(document.activeElement as HTMLElement);
        if (idx === -1) return; // let the trigger's own handler deal with it
        e.preventDefault();
        const next =
          e.key === "ArrowDown"
            ? (idx + 1) % items.length
            : (idx - 1 + items.length) % items.length;
        items[next]?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isServicesOpen, closeDropdown]);

  // ── Move focus to the first panel item when opened via arrow key ──
  useEffect(() => {
    if (!isServicesOpen || !focusFirstItem) return;
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    setFocusFirstItem(false);
  }, [isServicesOpen, focusFirstItem]);

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

  // ── Click handler on Services trigger (click-only, never navigates) ──
  const handleServicesTriggerClick = useCallback(() => {
    setFocusFirstItem(false);
    setIsServicesOpen((prev) => !prev);
  }, []);

  // ── Keyboard handler on Services trigger (Enter/Space fire click natively) ──
  const handleServicesKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setFocusFirstItem(true);
      setIsServicesOpen(true);
    }
  }, []);

  // ── Mutual exclusion: opening hamburger closes dropdown ──
  const openHamburger = useCallback(() => {
    closeDropdown();
    setIsMenuOverlayOpen(true);
  }, [closeDropdown]);

  const closeMenu = useCallback(() => {
    setIsMenuOverlayOpen(false);
  }, []);

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
          className="fixed inset-0 z-[55] bg-[rgba(6,10,40,0.45)] backdrop-blur-[3px]"
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
          "fixed top-3 inset-x-3 sm:top-5 sm:inset-x-6 lg:inset-x-9 z-[60] pointer-events-none",
          "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          shouldHide ? "-translate-y-[150%]" : "translate-y-0"
        )}
      >
        <div className="max-w-[1720px] mx-auto relative pointer-events-none">

          {/* ──── The Unified Infosys Frosted Glass Bar ──── */}
          <div
            className={cn(
              "infosys-navbar-bar pointer-events-auto h-16 sm:h-[74px] lg:h-[82px] rounded-full px-2.5 sm:px-4 lg:px-6",
              "flex items-center justify-between gap-2 sm:gap-4 relative transition-shadow duration-300",
              isScrolled ? "shadow-2xl" : ""
            )}
          >
            {/* 1. LEFT: Round White Hamburger + xp-dark Logo */}
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
              {/* The hamburger morphs into an X — there is no second close button. */}
              <button
                type="button"
                onClick={isMenuOverlayOpen ? () => setIsMenuOverlayOpen(false) : openHamburger}
                aria-label={isMenuOverlayOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMenuOverlayOpen}
                aria-controls="navigation-menu-panel"
                className="w-11 h-11 sm:w-12 sm:h-12 lg:w-[52px] lg:h-[52px] rounded-full bg-white text-[#0B1440] hover:bg-slate-50 flex items-center justify-center shadow-[0_2px_8px_rgba(10,16,48,0.12)] hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer flex-shrink-0"
              >
                <div className="w-5 h-3.5 flex flex-col justify-between">
                  <span
                    className={cn(
                      "w-full h-0.5 bg-[#0B1440] rounded-full origin-center transition-transform duration-200",
                      isMenuOverlayOpen && "translate-y-[6px] rotate-45"
                    )}
                  />
                  <span
                    className={cn(
                      "w-3/4 h-0.5 bg-[#0B1440] rounded-full transition-opacity duration-200",
                      isMenuOverlayOpen && "opacity-0"
                    )}
                  />
                  <span
                    className={cn(
                      "w-full h-0.5 bg-[#0B1440] rounded-full origin-center transition-transform duration-200",
                      isMenuOverlayOpen && "-translate-y-[6px] -rotate-45"
                    )}
                  />
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
                      <div key={link.href} className="relative">
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
                  <span className="hidden sm:inline">Get in Touch</span>
                  <span className="sm:hidden">Contact</span>
                </button>
              </div>
            </div>
          </div>

          {/* ──── Services Dropdown Panel (sibling of the bar · click-only) ──── */}
          {isServicesOpen && (
            <div
              ref={panelRef}
              id="services-dropdown-panel"
              role="region"
              aria-label="Enterprise SAP Services"
              className="services-dropdown-panel text-[#14163F]"
            >
              {/* Opaque surface — clips the rounded corners, holds the single scroll region */}
              <div className="services-dropdown-surface">
                {/* Header row — non-scrolling */}
                <div className="flex-none flex items-center justify-between gap-3 px-6 lg:px-7 pt-5 pb-3 border-b border-slate-200/60">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6488]">
                    Enterprise SAP® Capabilities
                  </span>
                  <Link
                    href="/services"
                    onClick={closeDropdown}
                    className="text-xs font-semibold text-[#1B3FD1] hover:text-blue-800 flex items-center gap-1 group flex-shrink-0"
                  >
                    <span>Explore All Services</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                {/* 3×3 Services Grid — the ONLY scroll region */}
                <div
                  className="services-dropdown-scroll flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 lg:px-7 py-3"
                  data-lenis-prevent
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-1.5">
                    {servicesData.map((svc) => (
                      <Link
                        key={svc.slug}
                        href={`/services/${svc.slug}`}
                        onClick={closeDropdown}
                        className="p-2.5 rounded-2xl hover:bg-[#EEF2FF] border border-transparent hover:border-blue-200/80 transition-all flex items-start gap-3 group"
                      >
                        <span className="text-xs font-mono font-bold tracking-widest text-[#1B3FD1]/60 flex-shrink-0 pt-0.5">
                          {svc.number}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-bold text-[#14163F] group-hover:text-[#1B3FD1] transition-colors leading-snug">
                            {svc.title}
                          </div>
                          <div className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                            {svc.shortDescription}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#1B3FD1] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all self-center flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Bottom S/4HANA promo row — non-scrolling, always visible */}
                <div className="flex-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-6 lg:px-7 py-3 border-t border-slate-200/60">
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
                    className="text-xs font-bold text-[#1B3FD1] hover:underline flex items-center gap-1 group flex-shrink-0"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Fullscreen Menu Overlay */}
      <MenuOverlay
        isOpen={isMenuOverlayOpen}
        onClose={closeMenu}
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
