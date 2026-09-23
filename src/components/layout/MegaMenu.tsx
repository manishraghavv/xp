"use client";

import React from "react";
import Link from "next/link";
import { navigationData } from "@/content/navigation";
import { ArrowRight, Sparkles } from "lucide-react";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 right-0 z-50 transition-all duration-300 transform opacity-100 translate-y-0"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
        <div className="bg-white/95 dark:bg-navy-900/95 backdrop-blur-2xl rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {navigationData.megaMenu.map((category, idx) => (
              <div key={idx} className="space-y-4">
                <div className="text-xs font-bold tracking-wider uppercase text-brand-blue dark:text-brand-cyan border-b border-slate-100 dark:border-slate-800 pb-2">
                  {category.title}
                </div>
                <div className="space-y-3">
                  {category.items.map((item, itemIdx) => (
                    <Link
                      key={itemIdx}
                      href={item.href}
                      onClick={onClose}
                      className="block p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-navy-800/80 transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-cyan transition-colors">
                          {item.title}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-blue dark:group-hover:text-brand-cyan transform group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                      <span className="inline-block mt-1 text-[10px] font-medium text-cyan-600 dark:text-cyan-400">
                        {item.tag}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mega menu bottom bar */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-50/70 dark:bg-navy-950/50 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-4 px-6 sm:px-8 rounded-b-2xl">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <Sparkles className="w-4 h-4 text-brand-cyan" />
              <span>
                Need a tailored SAP® roadmap? Our Chartered Accountants and senior architects are here to help.
              </span>
            </div>
            <Link
              href="/services"
              onClick={onClose}
              className="text-xs font-bold text-brand-blue dark:text-brand-cyan hover:underline flex items-center gap-1"
            >
              <span>View All 9 Service Lines</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
