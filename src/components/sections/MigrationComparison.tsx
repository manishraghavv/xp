import React from "react";
import { s4hanaData } from "@/content/s4hana";
import { Check, X, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export function MigrationComparison() {
  const data = s4hanaData.comparison;

  return (
    <div
      id="migration-comparison"
      className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8"
    >
      {data.paths.map((path, idx) => {
        const isFeatured = path.featured;

        return (
          <div
            key={idx}
            className={cn(
              "p-6 sm:p-10 rounded-3xl flex flex-col justify-between transition-all duration-300 relative",
              isFeatured
                ? "bg-white border-2 border-brand-blue shadow-xl shadow-brand-blue/10 md:-translate-y-2"
                : "glass-card-light border border-slate-200/90"
            )}
          >
            {isFeatured && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-[11px] font-bold tracking-wider uppercase shadow-md whitespace-nowrap">
                <span>{path.tag}</span>
              </div>
            )}

            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-display font-black text-slate-900 mb-1">
                  {path.name}
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {path.subtitle}
                </p>
              </div>

              <div className="space-y-3.5 mb-8">
                {path.points.map((pt, pIdx) => {
                  const isGood = pt.status === "good";
                  const isBad = pt.status === "bad";

                  return (
                    <div key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm">
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                          isGood
                            ? "bg-emerald-50 text-emerald-600"
                            : isBad
                            ? "bg-red-50 text-red-500"
                            : "bg-amber-50 text-amber-600"
                        )}
                      >
                        {isGood ? (
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        ) : isBad ? (
                          <X className="w-3.5 h-3.5 stroke-[3]" />
                        ) : (
                          <Minus className="w-3.5 h-3.5 stroke-[3]" />
                        )}
                      </div>

                      <span
                        className={cn(
                          "leading-relaxed",
                          isGood
                            ? "text-slate-900 font-semibold"
                            : isBad
                            ? "text-slate-500"
                            : "text-slate-700"
                        )}
                      >
                        {pt.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <span
                className={cn(
                  "text-xs font-bold block text-center py-2 px-3 rounded-lg",
                  isFeatured
                    ? "bg-blue-50 text-brand-blue"
                    : "bg-slate-100 text-slate-600"
                )}
              >
                {isFeatured ? "Best for 85%+ of ECC Landscapes" : "Requires Custom Case Evaluation"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
