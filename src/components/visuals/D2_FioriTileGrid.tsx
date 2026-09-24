import React from "react";
interface FioriTile {
  id: string;
  title: string;
  subtitle: string;
  metric: string;
  unit?: string;
  trend: string;
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
    category: "Finance (FI/CO)",
  },
  {
    id: "fiori-2",
    title: "S/4HANA Readiness",
    subtitle: "Custom Code Adaptation",
    metric: "0",
    unit: "Syntax Errors",
    trend: "100% HANA-ready",
    category: "System Conversion",
  },
  {
    id: "fiori-3",
    title: "Access Risk Analysis",
    subtitle: "GRC Segregation of Duties",
    metric: "Zero",
    unit: "Critical SoD Violations",
    trend: "SOX / Audit Clean",
    category: "GRC & Security",
  },
  {
    id: "fiori-4",
    title: "MT940 Bank Clearing",
    subtitle: "Electronic Statements",
    metric: "94.6%",
    unit: "Auto-Cleared",
    trend: "Same-day cash position",
    category: "Treasury",
  },
  {
    id: "fiori-5",
    title: "SAC Executive Insights",
    subtitle: "Cross-Entity P&L Margin",
    metric: "+18.4%",
    unit: "EBITDA Visibility",
    trend: "Live HANA live-connection",
    category: "Analytics",
  },
  {
    id: "fiori-6",
    title: "Continuous AMS SLA",
    subtitle: "L1–L3 Operational Health",
    metric: "99.98%",
    unit: "Contractual Uptime",
    trend: "24×7 War Room Active",
    category: "Support",
  },
];

export function D2_FioriTileGrid() {
  return (
    <div className="w-full max-w-5xl mx-auto my-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tiles.map((tile, idx) => {
          return (
            <div
              key={tile.id}
              className="p-6 rounded-3xl bg-white/80 border border-slate-200/90 shadow-lg shadow-blue-900/5 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:border-brand-blue/40 hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {tile.category}
                  </span>
                  <span className="text-xs font-mono font-bold tracking-widest text-slate-400">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
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
                <div className="text-[11px] text-emerald-600 font-medium">
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
