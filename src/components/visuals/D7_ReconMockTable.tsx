"use client";

import React from "react";

export function D7_ReconMockTable() {
  const transactions = [
    {
      id: "TX-90214",
      bank: "HDFC Bank Corporate",
      ref: "NEFT-INWARD-49201",
      amount: "₹ 4,820,500.00",
      type: "Credit",
      status: "Auto-Matched",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      glDoc: "1400029104",
    },
    {
      id: "TX-90215",
      bank: "State Bank of India",
      ref: "RTGS-OUT-88192",
      amount: "₹ 1,250,000.00",
      type: "Debit",
      status: "Auto-Matched",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      glDoc: "1400029105",
    },
    {
      id: "TX-90216",
      bank: "ICICI Bank FX",
      ref: "FX-USD-INW-0021",
      amount: "₹ 8,910,200.00",
      type: "Credit",
      status: "Auto-Matched",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      glDoc: "1400029106",
    },
    {
      id: "TX-90217",
      bank: "Axis Bank Ops",
      ref: "VENDOR-CHQ-1049",
      amount: "₹ 340,000.00",
      type: "Debit",
      status: "Pending Search String",
      statusColor: "bg-amber-50 text-amber-700 border-amber-200",
      glDoc: "Rule Queued",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-6 p-6 rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            MT940 Electronic Bank Statement Feed
          </span>
          <h4 className="text-lg font-bold text-slate-900">
            Automated Posting & Clearing Cockpit
          </h4>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>94.6% Auto-Match Rate</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-mono uppercase text-[10px]">
              <th className="pb-3 font-semibold">Tx ID</th>
              <th className="pb-3 font-semibold">Bank / Account</th>
              <th className="pb-3 font-semibold">Statement Ref</th>
              <th className="pb-3 font-semibold text-right">Amount (INR)</th>
              <th className="pb-3 font-semibold text-center">Status</th>
              <th className="pb-3 font-semibold text-right">SAP® G/L Doc</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 font-mono font-medium text-slate-800">{tx.id}</td>
                <td className="py-3 font-medium text-slate-900">{tx.bank}</td>
                <td className="py-3 font-mono text-slate-500">{tx.ref}</td>
                <td className="py-3 font-mono font-bold text-slate-900 text-right">{tx.amount}</td>
                <td className="py-3 text-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap ${tx.statusColor}`}
                  >
                    <span>{tx.status}</span>
                  </span>
                </td>
                <td className="py-3 font-mono text-right text-slate-600">{tx.glDoc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
