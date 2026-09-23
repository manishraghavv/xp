"use client";

import React, { useState } from "react";
import {
  FileText,
  Layers,
  ShieldCheck,
  CreditCard,
  BarChart,
  RefreshCw,
  TrendingUp,
  Activity,
  ArrowUpRight,
} from "lucide-react";

interface FioriTile {
  id: string;
  title: string;
  subtitle: string;
  metric: string;
  unit?: string;
  trend: string;
  icon: React.ReactNode;
  category: string;
}

const tiles: FioriTile[] = [
  {
    id: "fiori-1",
    title: "General Ledger Cockpit",
    subtitle: "Real-time ACDOCA Balances",
    metric: "100%",
    unit: "Reconciled",
    trend: "+4.2% daily throughput",
    icon: <FileText className="w-5 h-5 text-blue-500" />,
    category: "Finance (FI/CO)",
  },
  {
    id: "fiori-2",
    title: "S/4HANA Readiness",
    subtitle: "Custom Code Adaptation",
    metric: "0",
    unit: "Syntax Errors",
    trend: "100% HANA-ready",
    icon: <RefreshCw className="w-5 h-5 text-cyan-500" />,
    category: "System Conversion",
  },
  {
    id: "fiori-3",
    title: "Access Risk Analysis",
    subtitle: "GRC Segregation of Duties",
    metric: "Zero",
    unit: "Critical SoD Violations",
    trend: "SOX / Audit Clean",
    icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
    category: "GRC & Security",
  },
  {
    id: "fiori-4",
    title: "MT940 Bank Clearing",
    subtitle: "Electronic Statements",
    metric: "94.6%",
    unit: "Auto-Cleared",
    trend: "Same-day cash position",
    icon: <CreditCard className="w-5 h-5 text-amber-500" />,
    category: "Treasury",
  },
  {
    id: "fiori-5",
    title: "SAC Executive Insights",
    subtitle: "Cross-Entity P&L Margin",
    metric: "+18.4%",
    unit: "EBITDA Visibility",
    trend: "Live HANA live-connection",
    icon: <BarChart className="w-5 h-5 text-violet-500" />,
    category: "Analytics",
  },
  {
    id: "fiori-6",
    title: "Continuous AMS SLA",
    subtitle: "L1–L3 Operational Health",
    metric: "99.98%",
    unit: "Contractual Uptime",
    trend: "24×7 War Room Active",
    icon: <Activity className="w-5 h-5 text-blue-600" />,
    category: "Support",
  },
];

export function D2_FioriTileGrid() {
  const [activeTile, setActiveTile] = useState<string | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto my-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tiles.map((tile) => {
          const isSelected = activeTile === tile.id;
          return (
            <div
              key={tile.id}
              onMouseEnter={() => setActiveTile(tile.id)}
              onMouseLeave={() => setActiveTile(null)}
              className="p-6 rounded-3xl bg-white/80 border border-slate-200/90 shadow-lg shadow-blue-900/5 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:border-brand-blue/40 hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {tile.category}
                  </span>
                  <div className="w-9 h-9 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center transition-transform group-hover:scale-110">
                    {tile.icon}
                  </div>
                </div>

                <h4 className="text-base font-bold text-slate-900 group-hover:text-brand-blue transition-colors mb-1">
                  {tile.title}
                </h4>
                <p className="text-xs text-slate-500 mb-5">{tile.subtitle}</p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-extrabold font-display text-slate-900">
                    {tile.metric}
                  </span>
                  {tile.unit && (
                    <span className="text-xs font-semibold text-slate-500">
                      {tile.unit}
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{tile.trend}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
