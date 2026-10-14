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
import { useOverlayOpen } from "@/hooks/useBodyScrollLock";
import { cn } from "@/lib/utils";

/**
 * Services dropdown panel. Rendered inside the Services nav item so :hover and
 * :focus-visible on that wrapper open it (see .nav-services in globals.css).
 * Uses existing service names and routes only.
 */
function ServicesPanel({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <div id="services-dropdown-panel" className="nav-services-panel text-[#14163F]">
      <div className="services-dropdown-surface">
        <div className="flex-none flex items-center justify-between gap-3 px-6 lg:px-7 pt-5 pb-3 border-b border-slate-200/60">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A5380]">
            Enterprise SAP® Capabilities
          </span>
          <Link
            href="/services"
            onClick={onNavigate}
            className="nav-services-item-link text-xs font-semibold text-[#1B3FD1] hover:text-blue-900 flex items-center gap-1 group flex-shrink-0 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B3FD1] focus-visible:outline-offset-2"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 lg:px-7 py-3 services-dropdown-scroll"
          data-lenis-prevent
        >
          <div
            role="menu"
            aria-labelledby="services-dropdown-trigger"
            className="grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-1.5"
          >
            {servicesData.map((svc, i) => {
              const href = `/services/${svc.slug}`;
              return (
                <Link
                  key={svc.slug}
                  href={href}
                  role="menuitem"
                  aria-current={pathname === href ? "page" : undefined}
                  onClick={onNavigate}
                  style={{ "--i": i } as React.CSSProperties}
                  className="nav-services-item p-2.5 rounded-2xl border border-transparent flex items-start gap-3"
                >
                  <span className="nav-services-badge flex-shrink-0 w-7 h-7 rounded-lg bg-[#E8EEFF] text-[#1B3FD1] text-[11px] font-mono font-bold tracking-wider flex items-center justify-center">
                    {svc.number}
                  </span>
                  <span className="nav-services-text flex-1 min-w-0 block">
                    <span className="block text-[13px] font-bold text-[#14163F] leading-snug">
                      {svc.title}
                    </span>
                    <span className="block text-[11px] text-slate-600 mt-0.5 leading-snug">
                      {svc.shortDescription}
                    </span>
                  </span>
                  <ArrowRight
                    className="nav-services-arrow w-3.5 h-3.5 text-[#1B3FD1] self-center flex-shrink-0"
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-6 lg:px-7 py-3 border-t border-slate-200/60">
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-900 tracking-wider">
              2027 ECC Deadline
            </span>
            <span className="text-xs font-semibold text-[#14163F]">
              ECC to S/4HANA Brownfield Migration in 16 Weeks*
            </span>
          </div>
          <Link
            href="/s4hana-migration"
            onClick={onNavigate}
            className="text-xs font-bold text-[#1B3FD1] hover:underline flex items-center gap-1 group flex-shrink-0 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B3FD1] focus-visible:outline-offset-2"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function FloatingNavbar() {
  const { isVisible, isScrolled } = useScrollDirection();
  // Any page-level modal or menu that locks body scroll (Get in Touch, Apply, ...)
  const isOverlayOpen = useOverlayOpen();
  const [isMenuOverlayOpen, setIsMenuOverlayOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState("S/4HANA Upgrade & Migration");
  const [isFocusedWithin, setIsFocusedWithin] = useState(false);

  // Services dropdown: opening and closing is pure CSS (:hover / :focus-visible).
  // These flags only mirror that state for aria-expanded and Escape handling.
  const [svcHover, setSvcHover] = useState(false);
  const [svcKeyboard, setSvcKeyboard] = useState(false);
  const [svcDismissed, setSvcDismissed] = useState(false);
  const isServicesOpen = (svcHover || svcKeyboard) && !svcDismissed;

  const triggerRef = useRef<HTMLAnchorElement>(null);

  const pathname = usePathname();

  const closeDropdown = useCallback(() => {
    setSvcDismissed(true);
  }, []);

  // Close the menu on route change (the dropdown is dismissed by its own item click)
  useEffect(() => {
    setIsMenuOverlayOpen(false);
    setIsFocusedWithin(false);
  }, [pathname]);

  // A dismissal (Escape or item click) lasts until the pointer and focus have left.
  useEffect(() => {
    if (!svcHover && !svcKeyboard) setSvcDismissed(false);
  }, [svcHover, svcKeyboard]);

  const handleServicesKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === "Escape" && (isServicesOpen || svcKeyboard)) {
        e.preventDefault();
        setSvcDismissed(true);
        triggerRef.current?.focus();
      }
    },
    [isServicesOpen, svcKeyboard]
  );

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
    !isOverlayOpen &&
    !isFocusedWithin;

  const navLinks = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services", hasDropdown: true },
    { label: "Projects", href: "/projects" },
    { label: "Training", href: "/training" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ];

  const isServicesActive =
    pathname === "/services" || pathname.startsWith("/services/");

  return (
    <>
      <ScrollProgress />

      {/* Fixed Header Wrapper — no filter, no opacity, only transform for hide/show */}
      <header
        role="banner"
        onKeyDown={handleServicesKeyDown}
        onFocus={(e) => {
          // Keyboard focus only. A mouse or touch click leaves focus on the clicked
          // link/button, which would otherwise pin the navbar visible forever.
          if (e.target.matches(":focus-visible")) setIsFocusedWithin(true);
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsFocusedWithin(false);
          }
        }}
        className={cn(
          "nav-header fixed top-3 inset-x-3 sm:top-5 sm:inset-x-6 lg:inset-x-9 z-[60] pointer-events-none",
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
                      <div
                        key={link.href}
                        className="nav-services"
                        data-dismissed={svcDismissed ? "true" : undefined}
                        onPointerEnter={(e) => {
                          if (e.pointerType !== "touch") setSvcHover(true);
                        }}
                        onPointerLeave={() => setSvcHover(false)}
                        onFocus={(e) => {
                          if (e.target.matches(":focus-visible")) setSvcKeyboard(true);
                        }}
                        onBlur={(e) => {
                          if (!e.currentTarget.contains(e.relatedTarget)) setSvcKeyboard(false);
                        }}
                      >
                        {/* A normal link to /services. The panel opens on hover or keyboard focus. */}
                        <Link
                          ref={triggerRef}
                          href={link.href}
                          id="services-dropdown-trigger"
                          aria-haspopup="menu"
                          aria-expanded={isServicesOpen}
                          aria-controls="services-dropdown-panel"
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            "nav-link-pill px-4 lg:px-5 py-2 rounded-full text-[16px] font-medium",
                            "flex items-center gap-1.5",
                            isActive ? "bg-[#E8EEFF] text-[#1B3FD1] font-semibold" : "text-[#14163F]"
                          )}
                        >
                          <span>{link.label}</span>
                          <ChevronDown className="nav-services-chevron w-4 h-4" aria-hidden="true" />
                        </Link>

                        <ServicesPanel
                          pathname={pathname}
                          onNavigate={closeDropdown}
                        />
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "nav-link-pill px-4 lg:px-5 py-2 rounded-full text-[16px] font-medium",
                        link.href === "/careers" && "lg:hidden min-[1340px]:inline-flex",
                        isActive
                          ? "bg-[#E8EEFF] text-[#1B3FD1] font-semibold"
                          : "text-[#14163F]"
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
                  className="btn-shine btn-ring h-11 sm:h-12 lg:h-[52px] px-4 sm:px-6 lg:px-7 rounded-full bg-[#0B0D14] hover:bg-[#171C4A] text-white shadow-md flex items-center gap-2 sm:gap-2.5 font-medium text-xs sm:text-sm lg:text-[16px] cursor-pointer"
                >
                  <span className="hidden sm:inline">Get in Touch</span>
                  <span className="sm:hidden">Contact</span>
                </button>
              </div>
            </div>
          </div>

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
