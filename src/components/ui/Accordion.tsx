"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemProps {
  id: string | number;
  question: string;
  answer: string | React.ReactNode;
  isOpenDefault?: boolean;
}

interface AccordionProps {
  items: AccordionItemProps[];
  className?: string;
  theme?: "light" | "dark";
}

export function Accordion({ items, className, theme = "light" }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string | number>>(new Set());

  const toggle = (id: string | number) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div
            key={item.id}
            className={cn(
              "rounded-xl border transition-all duration-300 overflow-hidden",
              theme === "dark"
                ? "bg-navy-800/60 border-slate-700/60 hover:border-slate-600"
                : "bg-white/80 border-slate-200/80 hover:border-brand-blue/30 shadow-sm"
            )}
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className={cn(
                "w-full px-6 py-5 flex items-center justify-between text-left gap-4 font-semibold text-base sm:text-lg transition-colors",
                theme === "dark" ? "text-slate-100 hover:text-cyan-400" : "text-slate-900 hover:text-brand-blue"
              )}
            >
              <span>{item.question}</span>
              <ChevronDown
                className={cn(
                  "w-5 h-5 flex-shrink-0 transition-transform duration-300",
                  isOpen ? "rotate-180 text-brand-cyan" : "text-slate-400"
                )}
              />
            </button>
            {isOpen && (
              <div
                className={cn(
                  "px-6 pb-6 pt-1 text-sm sm:text-base leading-relaxed border-t",
                  theme === "dark"
                    ? "text-slate-300 border-slate-700/40"
                    : "text-slate-600 border-slate-100"
                )}
              >
                {typeof item.answer === "string" ? <p>{item.answer}</p> : item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
