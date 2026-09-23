"use client";

import React, { useState } from "react";

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

export function D6_ModuleConstellation() {
  const [activeCode, setActiveCode] = useState<string>("FI");
  const activeModule = modules.find((m) => m.code === activeCode) || modules[0];

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 sm:p-8 rounded-4xl bg-slate-50 border border-slate-200 shadow-xl">
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
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-6">
        {modules.map((m) => {
          const isSelected = activeCode === m.code;
          return (
            <button
              key={m.code}
              type="button"
              onClick={() => setActiveCode(m.code)}
              className={`p-3 rounded-2xl text-center font-mono font-bold text-sm transition-all duration-200 border cursor-pointer ${
                isSelected
                  ? "bg-brand-blue text-white border-brand-blue shadow-lg scale-105"
                  : "bg-white text-slate-700 border-slate-200 hover:border-brand-blue/40 hover:bg-blue-50/50"
              }`}
            >
              {m.code}
            </button>
          );
        })}
      </div>

      {/* Selected Module Detail Panel */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-brand-blue font-mono font-extrabold text-xs">
              SAP® {activeModule.code}
            </span>
            <h4 className="text-base font-bold text-slate-900">{activeModule.name}</h4>
          </div>
          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            {activeModule.desc}
          </p>
        </div>
        <div className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 flex-shrink-0">
          ✓ In-house CA & Functional Practice Lead
        </div>
      </div>
    </div>
  );
}
