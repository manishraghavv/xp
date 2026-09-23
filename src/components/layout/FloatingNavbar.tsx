"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const [isOverLightSection, setIsOverLightSection] = useState(false);
  const [isFocusedWithin, setIsFocusedWithin] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Light/Dark section observer for subtle middle pill adaptation
  useEffect(() => {
    const lightSections = document.querySelectorAll('[data-theme="light"]');
    if (!lightSections.length) {
      setIsOverLightSection(false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const anyLightIntersecting = entries.some(
          (entry) =>
            entry.isIntersecting &&
            entry.boundingClientRect.top <= 80 &&
            entry.boundingClientRect.bottom >= 20
        );
        setIsOverLightSection(anyLightIntersecting);
      },
      {
        rootMargin: "-20px 0px -85% 0px",
        threshold: [0, 0.1, 0.5],
      }
    );

    lightSections.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsServicesDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 200);
  };

  // Keep navbar visible if dropdown, menu, modal or keyboard focus is active
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

      {/* Floating 3-part header wrapper */}
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
          "fixed top-0 inset-x-0 z-40 pointer-events-none px-4 sm:px-8 py-4 sm:py-5",
          "transition-[transform,opacity] duration-320 ease-[cubic-bezier(0.22,1,0.36,1)]",
          shouldHide ? "-translate-y-[130%] opacity-0" : "translate-y-0 opacity-100"
        )}
      >
        <div className="max-w-[1720px] mx-auto grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr] items-center justify-between">
          
          {/* 1. LEFT GROUP: Hamburger + Logo (ALWAYS Solid Dark Navy Glass for Crisp Contrast) */}
          <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto justify-self-start">
            <div
              className={cn(
                "flex items-center gap-3 sm:gap-4 p-1 rounded-full transition-all duration-300",
                "bg-[rgba(10,16,48,0.88)] backdrop-blur-xl border border-white/[0.14] pr-4 sm:pr-5 shadow-2xl",
                isScrolled ? "shadow-navy-950/80" : ""
              )}
            >
              {/* Round White Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsMenuOverlayOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={isMenuOverlayOpen}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-navy-950 hover:bg-slate-100 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer flex-shrink-0"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span className="w-full h-0.5 bg-navy-950 rounded-full transition-all" />
                  <span className="w-3/4 h-0.5 bg-navy-950 rounded-full transition-all" />
                  <span className="w-full h-0.5 bg-navy-950 rounded-full transition-all" />
                </div>
              </button>

              {/* XP Logo */}
              <Link href="/" className="inline-block group" aria-label="XpmindGlobal Home">
                <Image
                  src="/xp.png"
                  alt="XpmindGlobal"
                  width={150}
                  height={32}
                  priority
                  className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>
          </div>

          {/* 2. CENTER: Frosted-Glass Lavender Pill Container */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center pointer-events-auto justify-self-center relative"
          >
            <div
              className={cn(
                "h-[58px] px-3 rounded-full flex items-center gap-1 transition-all duration-300",
                isOverLightSection
                  ? "bg-[#BCC2D4]/90 backdrop-blur-2xl border border-white/60 shadow-xl"
                  : "bg-[#CDD2E0]/78 backdrop-blur-2xl border border-white/45 shadow-glass-lavender",
                isScrolled ? "shadow-2xl" : ""
              )}
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

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
                          "px-5 py-2 rounded-full text-[17px] font-medium transition-all duration-200 flex items-center gap-1.5",
                          isActive
                            ? "bg-white/70 text-[#1B1B4B] shadow-sm font-semibold"
                            : "text-[#1B1B4B] hover:bg-white/50"
                        )}
                        aria-expanded={isServicesDropdownOpen}
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 text-[#1B1B4B]/80 transition-transform duration-200",
                            isServicesDropdownOpen ? "rotate-180" : ""
                          )}
                        />
                      </Link>

                      {/* 3-Column Glass Dropdown for Services */}
                      {isServicesDropdownOpen && (
                        <div
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[780px] p-6 rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-2xl shadow-blue-900/15 animate-in fade-in slide-in-from-top-2 duration-200 z-50 text-slate-900"
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
                      "px-5 py-2 rounded-full text-[17px] font-medium transition-all duration-200",
                      isActive
                        ? "bg-white/70 text-[#1B1B4B] shadow-sm font-semibold"
                        : "text-[#1B1B4B] hover:bg-white/50"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* 3. RIGHT: Dark Pill "Get in Touch" Button */}
          <div className="flex items-center justify-self-end pointer-events-auto">
            <button
              type="button"
              onClick={() => {
                setModalService("S/4HANA Upgrade & Migration");
                setIsModalOpen(true);
              }}
              className="h-[52px] sm:h-[56px] px-6 sm:px-7 rounded-full bg-[rgba(10,16,48,0.88)] backdrop-blur-xl text-white border border-white/[0.16] shadow-xl hover:bg-navy-900 hover:border-brand-cyan/40 transition-all flex items-center gap-2.5 font-medium text-sm sm:text-[17px] active:scale-95 group cursor-pointer"
            >
              <MessageSquareText className="w-4 h-4 sm:w-5 sm:h-5 text-brand-cyan transition-transform group-hover:scale-110" />
              <span className="hidden sm:inline">Get in Touch</span>
              <span className="sm:hidden">Contact</span>
            </button>
          </div>

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
