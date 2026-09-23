"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { navigationData } from "@/content/navigation";
import { companyData } from "@/content/company";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenModal: () => void;
}

export function MobileDrawer({ isOpen, onClose, onOpenModal }: MobileDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-navy-900 border-l border-slate-800 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <Link href="/" onClick={onClose} className="flex items-center">
              <Image
                src="/xp.png"
                alt="XpmindGlobal"
                width={160}
                height={32}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-navy-800"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="mt-6 space-y-1">
            {navigationData.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-200 hover:text-brand-cyan hover:bg-navy-800/60 transition-colors"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/s4hana-migration"
              onClick={onClose}
              className="block mt-4 px-4 py-3 rounded-xl text-base font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 transition-colors"
            >
              ⚡ ECC → S/4HANA Migration
            </Link>
          </nav>
        </div>

        <div className="pt-8 border-t border-slate-800 space-y-4">
          <button
            onClick={() => {
              onClose();
              onOpenModal();
            }}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-semibold text-sm shadow-lg flex items-center justify-center gap-2"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="space-y-2 text-xs text-slate-400 pt-2">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-brand-cyan" />
              <a href={companyData.phones[0].href} className="hover:text-white">
                {companyData.phones[0].number}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-brand-cyan" />
              <a href={`mailto:${companyData.email}`} className="hover:text-white">
                {companyData.email}
              </a>
            </div>
            <div className="flex items-start gap-2 pt-1 text-[11px] leading-relaxed">
              <MapPin className="w-3.5 h-3.5 text-brand-cyan flex-shrink-0 mt-0.5" />
              <span>Greater Noida West, Ghaziabad, UP, India</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
