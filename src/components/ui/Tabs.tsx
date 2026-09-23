"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  className?: string;
  theme?: "light" | "dark";
}

export function Tabs({ tabs, defaultTab, className, theme = "light" }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4 mb-8">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200",
                isActive
                  ? theme === "dark"
                    ? "bg-brand-blue text-white shadow-md shadow-brand-blue/30"
                    : "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                  : theme === "dark"
                  ? "text-slate-400 hover:text-white hover:bg-navy-800"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div>{tabs.find((t) => t.id === activeTab)?.content}</div>
    </div>
  );
}
