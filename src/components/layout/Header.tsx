"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, Phone, Mail, ArrowRight } from "lucide-react";
import { navigationData } from "@/content/navigation";
import { companyData } from "@/content/company";
import { MegaMenu } from "./MegaMenu";
import { MobileDrawer } from "./MobileDrawer";
import { GetInTouchModal } from "./GetInTouchModal";
import { ScrollProgress } from "./ScrollProgress";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine if header is over a dark hero (Home, About, Services, S4Hana, Projects, Training, Contact all start with dark/gradient hero)
  const isHeroDark = true;

  return (
    <>
      <ScrollProgress />

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-white/90 dark:bg-navy-950/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm py-2.5"
            : "bg-navy-950/70 backdrop-blur-md border-b border-white/10 py-3.5"
        )}
      >
        {/* Top utility bar - visible before scroll or on large screens */}
        {!isScrolled && (
          <div className="hidden lg:block border-b border-white/10 pb-2 mb-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-6">
                <a
                  href={companyData.phones[0].href}
                  className="flex items-center gap-1.5 hover:text-brand-cyan transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>{companyData.phones[0].number}</span>
                </a>
                <span className="text-slate-600">|</span>
                <a
                  href={`mailto:${companyData.email}`}
                  className="flex items-center gap-1.5 hover:text-brand-cyan transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>{companyData.email}</span>
                </a>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-amber-400 font-medium">
                  ⏰ ECC Support Ends 2027 · S/4HANA Migration Slots Open
                </span>
                <Link
                  href="/s4hana-migration"
                  className="text-brand-cyan hover:underline font-semibold flex items-center gap-1"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div
                className={cn(
                  "p-1.5 px-3 rounded-lg transition-all duration-300",
                  isScrolled
                    ? "bg-navy-900/95 border border-slate-700/80 shadow-sm"
                    : "bg-navy-900/40 border border-white/10"
                )}
              >
                <Image
                  src="/xp.png"
                  alt="XpmindGlobal Logo"
                  width={150}
                  height={30}
                  priority
                  className="h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigationData.mainNav.map((item) => {
                const isActive = pathname === item.href;
                const isServices = item.href === "/services";

                if (isServices) {
                  return (
                    <div
                      key={item.href}
                      className="relative"
                      onMouseEnter={() => setIsMegaMenuOpen(true)}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-1 text-sm font-semibold transition-colors py-2",
                          isScrolled
                            ? isActive
                              ? "text-brand-blue"
                              : "text-slate-700 hover:text-brand-blue"
                            : isActive
                            ? "text-brand-cyan"
                            : "text-slate-200 hover:text-brand-cyan"
                        )}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform duration-200",
                            isMegaMenuOpen ? "rotate-180" : ""
                          )}
                        />
                      </Link>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-sm font-semibold transition-colors py-2 relative",
                      isScrolled
                        ? isActive
                          ? "text-brand-blue font-bold"
                          : "text-slate-700 hover:text-brand-blue"
                        : isActive
                        ? "text-brand-cyan font-bold"
                        : "text-slate-200 hover:text-brand-cyan"
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span
                        className={cn(
                          "absolute bottom-0 left-0 right-0 h-0.5 rounded-full",
                          isScrolled ? "bg-brand-blue" : "bg-brand-cyan"
                        )}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/s4hana-migration"
                className={cn(
                  "px-3.5 py-2 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5",
                  pathname === "/s4hana-migration"
                    ? "bg-amber-500/20 text-amber-500 border-amber-500/40"
                    : isScrolled
                    ? "bg-amber-50 text-amber-700 border-amber-300/80 hover:bg-amber-100"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20"
                )}
              >
                <span>⚡ ECC → S/4HANA</span>
              </Link>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-xs font-semibold shadow-md shadow-brand-blue/20 hover:shadow-brand-blue/35 transition-all hover:-translate-y-0.5"
              >
                Get in Touch
              </button>
            </div>

            {/* Mobile Burger Button */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-xs font-semibold"
              >
                Enquire
              </button>
              <button
                onClick={() => setIsMobileDrawerOpen(true)}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  isScrolled
                    ? "text-slate-800 hover:bg-slate-100"
                    : "text-slate-200 hover:bg-white/10"
                )}
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <MegaMenu
          isOpen={isMegaMenuOpen}
          onClose={() => setIsMegaMenuOpen(false)}
        />
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        onOpenModal={() => setIsModalOpen(true)}
      />

      {/* Global Get In Touch Modal */}
      <GetInTouchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
