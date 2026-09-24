"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { servicesData } from "@/content/services";
import { companyData } from "@/content/company";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { cn } from "@/lib/utils";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenModal: () => void;
}

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About XpmindGlobal", href: "/about" },
  { label: "SAP® Services", href: "/services" },
  { label: "Projects & Case Studies", href: "/projects" },
  { label: "XPMIND Learning Cell", href: "/training" },
  { label: "16-Week S/4HANA Migration", href: "/s4hana-migration" },
  { label: "Contact Us", href: "/contact" },
];

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Navigation panel.
 *
 * Deliberately *not* a full-screen sheet: the floating bar stays visible and its
 * hamburger becomes an "X", so there is never a second close button or a
 * duplicated logo. The panel hangs below the bar with a blurred scrim behind it
 * and scrolls internally, so every item — including the very last one and the
 * "Get in Touch" button — is always reachable.
 */
export function MenuOverlay({ isOpen, onClose, onOpenModal }: MenuOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [openService, setOpenService] = useState<string | null>(null);

  useBodyScrollLock(isOpen);

  const prevIsOpen = useRef(false);

  // Reset scroll to top ONLY on initial open transition
  useEffect(() => {
    if (isOpen && !prevIsOpen.current) {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
      setOpenService(null);
    }
    prevIsOpen.current = isOpen;
  }, [isOpen]);

  // ── ESC closes · Tab is trapped inside the panel ──────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== "Tab" || !panelRef.current) return;

      const nodes = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter(
        (el) =>
          (el.offsetParent !== null || el === document.activeElement) &&
          !el.classList.contains("menu-scroll")
      );

      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Move focus into the first link once it has rendered, without triggering scroll jump.
    const raf = requestAnimationFrame(() => {
      const firstLink = panelRef.current?.querySelector<HTMLElement>("a[href]");
      firstLink?.focus({ preventScroll: true });
    });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(raf);
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen, onClose]);

  const handleModal = useCallback(() => {
    onClose();
    onOpenModal();
  }, [onClose, onOpenModal]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[59]" role="presentation">
      {/* Blurred scrim — clicking it closes the panel. The bar stays above it. */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-[rgba(4,8,15,0.55)] backdrop-blur-[3px] animate-in fade-in duration-200"
      />

      {/* Panel — hangs below the floating bar, flex column with exactly ONE scroll region */}
      <div
        ref={panelRef}
        id="navigation-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={cn(
          "menu-panel z-[59] rounded-[28px] border border-white/12 shadow-2xl",
          "left-3 right-3 sm:left-6 sm:right-6 lg:left-9 lg:right-9 bottom-6",
          "menu-overlay-surface text-white",
          "animate-in fade-in slide-in-from-top-2 duration-200"
        )}
      >
        {/* Ambient background: hero image at low opacity + soft glow */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0">
          <Image
            src="/images/backgrounds/sap-hero.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-[0.12]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1030]/85 via-[#101B4D]/80 to-[#1B2E7A]/85" />
          <div className="absolute -top-24 -left-16 w-[26rem] h-[26rem] bg-blue-600/20 rounded-full blur-[110px]" />
          <div className="absolute -bottom-24 right-0 w-[26rem] h-[26rem] bg-cyan-500/15 rounded-full blur-[110px]" />
        </div>

        {/* Exactly ONE scroll region */}
        <div
          ref={scrollRef}
          className="menu-scroll relative z-[1] outline-none"
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          tabIndex={0}
          aria-label="Scrollable menu content"
          onKeyDown={(e) => {
            const scroller = scrollRef.current;
            if (!scroller) return;

            switch (e.key) {
              case "PageDown":
                e.preventDefault();
                scroller.scrollTop = Math.min(
                  scroller.scrollHeight - scroller.clientHeight,
                  scroller.scrollTop + scroller.clientHeight * 0.8
                );
                break;
              case "PageUp":
                e.preventDefault();
                scroller.scrollTop = Math.max(0, scroller.scrollTop - scroller.clientHeight * 0.8);
                break;
              case "Home":
                e.preventDefault();
                scroller.scrollTop = 0;
                break;
              case "End":
                e.preventDefault();
                scroller.scrollTop = scroller.scrollHeight - scroller.clientHeight;
                break;
              case "ArrowDown":
                e.preventDefault();
                scroller.scrollTop = Math.min(
                  scroller.scrollHeight - scroller.clientHeight,
                  scroller.scrollTop + 60
                );
                break;
              case "ArrowUp":
                e.preventDefault();
                scroller.scrollTop = Math.max(0, scroller.scrollTop - 60);
                break;
              case " ":
                e.preventDefault();
                scroller.scrollTop = Math.min(
                  scroller.scrollHeight - scroller.clientHeight,
                  scroller.scrollTop + (e.shiftKey ? -scroller.clientHeight * 0.8 : scroller.clientHeight * 0.8)
                );
                break;
            }
          }}
        >
          <div className="menu-inner">
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.3fr_0.9fr] gap-8 lg:gap-10 items-start">
              {/* ── Column 1 — Quick navigation ── */}
              <nav aria-label="Quick navigation">
                <span className="block text-[11px] font-bold uppercase tracking-widest text-brand-cyan mb-3">
                  Quick Navigation
                </span>
                <ul className="space-y-0.5">
                  {QUICK_LINKS.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="group flex items-center justify-between gap-3 py-2.5 min-h-[44px] text-lg font-display font-bold text-slate-100 hover:text-brand-cyan transition-colors"
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="w-4 h-4 flex-shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-cyan" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* ── Column 2 — All 9 service lines (text only) ── */}
              <div className="border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-10">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-300">
                    Specialist Service Lines
                  </span>
                  <Link
                    href="/services"
                    onClick={onClose}
                    className="text-xs font-semibold text-brand-cyan hover:underline flex-shrink-0"
                  >
                    View all
                  </Link>
                </div>

                <ul>
                  {servicesData.map((svc) => {
                    const isExpanded = openService === svc.slug;
                    return (
                      <li key={svc.slug} className="border-b border-white/[0.08] last:border-b-0">
                        <div className="flex items-start justify-between gap-3">
                          <Link
                            href={`/services/${svc.slug}`}
                            onClick={onClose}
                            className="flex-1 py-2.5 min-h-[44px] flex items-center text-sm font-semibold text-slate-200 hover:text-white transition-colors"
                          >
                            {svc.title}
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              setOpenService((prev) => (prev === svc.slug ? null : svc.slug))
                            }
                            aria-expanded={isExpanded}
                            aria-label={`${isExpanded ? "Hide" : "Show"} description for ${svc.title}`}
                            className="lg:hidden w-11 h-11 -mr-2 flex items-center justify-center text-slate-400 hover:text-brand-cyan transition-colors flex-shrink-0"
                          >
                            <ChevronDown
                              className={cn(
                                "w-4 h-4 transition-transform duration-200",
                                isExpanded && "rotate-180"
                              )}
                            />
                          </button>
                        </div>

                        <p
                          className={cn(
                            "text-xs text-slate-400 leading-relaxed pb-3 lg:block",
                            isExpanded ? "block" : "hidden"
                          )}
                        >
                          {svc.shortDescription}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* ── Column 3 — Migration highlight + direct contact ── */}
              <div className="border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-10 flex flex-col gap-6">
                <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-brand-blue/20 via-[#101B4D]/90 to-brand-cyan/15 border border-brand-cyan/30 shadow-xl">
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-brand-cyan bg-cyan-950/70 px-2.5 py-0.5 rounded-full border border-cyan-500/30 mb-3">
                    Mandatory ECC Deadline
                  </span>
                  <h4 className="text-base font-bold text-white mb-2 leading-snug">
                    ECC to S/4HANA Brownfield Migration in 16 Weeks*
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Preserve 100% of historical data and custom ABAP code with zero business
                    disruption and ~40% cost efficiency.
                  </p>
                  <Link
                    href="/s4hana-migration"
                    onClick={onClose}
                    className="btn-pill-gradient text-xs px-5 py-3 min-h-[44px] rounded-full inline-flex items-center gap-1.5 font-semibold"
                  >
                    <span>Explore Migration Roadmap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <span className="block text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    Direct Contact
                  </span>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <Phone className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                    <a href={companyData.phones[0].href} className="hover:text-cyan-400 transition-colors">
                      {companyData.phones[0].number}
                    </a>
                    <span className="text-slate-600">|</span>
                    <a href={companyData.phones[1].href} className="hover:text-cyan-400 transition-colors">
                      {companyData.phones[1].number}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                    <a
                      href={`mailto:${companyData.email}`}
                      className="hover:text-cyan-400 transition-colors break-all"
                    >
                      {companyData.email}
                    </a>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{companyData.headquarters.fullAddress}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal row */}
            <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
              <div>
                © {new Date().getFullYear()} XpmindGlobal. All rights reserved. Registered in India.
              </div>
              <div className="text-slate-500">
                SAP® is a registered trademark of SAP SE in Germany and other countries.
              </div>
            </div>
          </div>
        </div>

        {/* Sticky consultation CTA — a normal non-scrolling flex sibling below the scroll area */}
        <div className="menu-cta relative z-[1]">
          <div className="mx-auto w-full max-w-[78rem]">
            <button
              type="button"
              onClick={handleModal}
              className="w-full min-h-[48px] py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
