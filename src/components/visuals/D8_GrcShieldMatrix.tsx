"use client";

import React from "react";

export function D8_GrcShieldMatrix() {
  const sodRules = [
    { rule: "Create PO vs Release PO", risk: "Low", status: "Role Segregated", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { rule: "Maintain Vendor vs Post Payment", risk: "Critical", status: "Enforced via GRC AC", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { rule: "Enter Invoice vs Approve Payment", risk: "High", status: "Workflow Mitigated", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { rule: "Bank Master vs Electronic Transfer", risk: "Critical", status: "Dual-Approval Active", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-6 p-6 sm:p-8 rounded-4xl bg-white border border-slate-200 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              SAP® GRC Access Control (AC 12.0)
            </span>
            <h4 className="text-lg font-bold text-slate-900">
              Segregation of Duties (SoD) Risk Matrix
            </h4>
          </div>
        </div>

        <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 self-start sm:self-auto">
          SOX & Audit Compliant
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {sodRules.map((r, i) => (
          <div
            key={i}
            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-bold text-slate-800">{r.rule}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Risk Level: {r.risk}</div>
            </div>
            <span
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${r.color}`}
            >
              <span>{r.status}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
