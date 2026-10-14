"use client";

import React, { useState } from "react";
import { TabPills } from "@/components/ui/TabPills";

interface SapModule {
  code: string;
  name: string;
  desc: string;
}

const modules: SapModule[] = [
  { code: "FI", name: "Financial Accounting", desc: "General Ledger, AP, AR, Asset Accounting, statutory GSTN compliance" },
  { code: "CO", name: "Controlling & Profitability", desc: "Cost Center, Profit Center, Internal Orders, Product Costing" },
  { code: "MM", name: "Materials Management", desc: "Procurement, Inventory Valuation, PR/PO Release Strategy, Vendor Master" },
  { code: "SD", name: "Sales & Distribution", desc: "Order-to-Cash, Pricing, Billing, Shipping, Credit Management" },
  { code: "PP", name: "Production Planning", desc: "Bill of Materials (BOM), Capacity Planning, Shop Floor Routing, MRP" },
  { code: "QM", name: "Quality Management", desc: "Inspection Lots, Quality Notifications, Certification, Batch Tracking" },
  { code: "HR", name: "Human Capital & Payroll", desc: "Personnel Administration, Organization Management, Time & Payroll" },
  { code: "PS", name: "Project Systems", desc: "Work Breakdown Structures (WBS), Capital Expenditure, Cost Tracking" },
  { code: "PM", name: "Plant Maintenance", desc: "Equipment Maintenance, Preventative Calibration, Work Orders" },
  { code: "AM", name: "Asset Management", desc: "Fixed Asset Lifecycle, Depreciation Calculations, Asset Valuation" },
];

const tabItems = modules.map((m) => ({ id: m.code, label: m.code, title: m.name }));

function ModuleDetail({ module: m }: { module: SapModule }) {
  return (
    <>
      <div>
        <div className="flex items-center gap-2">
          <span className="module-chip px-2.5 py-0.5 rounded-full bg-blue-100 text-brand-blue font-mono font-extrabold text-xs">
            SAP® {m.code}
          </span>
          <h4 className="module-title text-base font-bold text-slate-900">{m.name}</h4>
        </div>
        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{m.desc}</p>
      </div>
      <div className="role-pill text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 flex-shrink-0">
        In-house CA & Functional Practice Lead
      </div>
    </>
  );
}

const LAYER = "col-start-1 row-start-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4";

export function D6_ModuleConstellation() {
  // committed = the selected module (click / keyboard). preview = transient hover.
  const [committed, setCommitted] = useState<string>("FI");
  const [preview, setPreview] = useState<string | null>(null);
  const [announce, setAnnounce] = useState("");

  const shown = preview ?? committed;

  // Keep the previous module around for one swap animation (derived state).
  const [lastShown, setLastShown] = useState(shown);
  const [leaving, setLeaving] = useState<string | null>(null);
  const [swapped, setSwapped] = useState(false);
  if (shown !== lastShown) {
    setLastShown(shown);
    setLeaving(lastShown);
    setSwapped(true);
  }

  const current = modules.find((m) => m.code === shown) || modules[0];
  const out = leaving ? modules.find((m) => m.code === leaving) : undefined;

  const commit = (code: string) => {
    setCommitted(code);
    const m = modules.find((x) => x.code === code);
    if (m) setAnnounce(`SAP ${m.code}, ${m.name}`);
  };

  return (
    <div className="card-interactive card-interactive--lg card-interactive--light card-interactive--passive w-full max-w-4xl mx-auto my-8 p-6 sm:p-8 rounded-4xl bg-slate-50 border border-slate-200 shadow-xl">
      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
          Full Functional Scope
        </span>
        <h3 className="text-2xl font-bold font-display text-slate-900 mt-1">
          SAP® Module Constellation
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Select any core SAP® functional discipline to view implementation depth.
        </p>
      </div>

      {/* Grid of Interactive Modules */}
      <TabPills
        items={tabItems}
        value={committed}
        onChange={commit}
        onPreview={setPreview}
        ariaLabel="SAP functional modules"
        idPrefix="module-tab"
        panelId="module-panel"
        className="tab-row grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2 mb-6"
      />

      <span className="sr-only" role="status" aria-live="polite">
        {announce}
      </span>

      {/* Selected Module Detail Panel (fixed height: every module is laid out invisibly
          in the same grid cell, so the card is always as tall as the tallest one) */}
      <div
        id="module-panel"
        role="tabpanel"
        aria-labelledby={`module-tab-${committed}`}
        className="card-interactive card-interactive--md card-heading-blue card-interactive--light card-interactive--passive p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm grid"
      >
        {modules.map((m) => (
          <div key={m.code} className={`${LAYER} invisible`} aria-hidden="true">
            <ModuleDetail module={m} />
          </div>
        ))}

        {out && (
          <div
            key={`out-${out.code}-${lastShown}`}
            className={`${LAYER} module-layer-out`}
            aria-hidden="true"
            onAnimationEnd={() => setLeaving(null)}
          >
            <ModuleDetail module={out} />
          </div>
        )}

        <div key={current.code} className={`${LAYER} ${swapped ? "module-layer-in" : ""}`}>
          <ModuleDetail module={current} />
        </div>
      </div>
    </div>
  );
}
