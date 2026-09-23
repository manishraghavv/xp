import React from "react";
import { Factory, SunMedium, ShoppingBag, ArrowRight } from "lucide-react";
import { homeData } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function IndustryRail() {
  const iconMap: Record<string, React.ReactNode> = {
    Factory: <Factory className="w-8 h-8 text-brand-blue" />,
    SunMedium: <SunMedium className="w-8 h-8 text-brand-blue" />,
    ShoppingBag: <ShoppingBag className="w-8 h-8 text-brand-blue" />,
  };

  return (
    <section className="py-24 bg-canvas-subtle light-mesh-bg border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Industries We Serve"
          title={
            <>
              Deep domain knowledge across{" "}
              <span className="text-brand-blue">every vertical</span>.
            </>
          }
          subtitle="Enterprise ERP implementations require industry context. We bring specialised expertise tailored to the unique regulatory, supply chain, and operational demands of your sector."
          theme="light"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {homeData.industries.map((ind, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl glass-card-light group hover:border-brand-blue/40 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                {iconMap[ind.icon] || <Factory className="w-8 h-8 text-brand-blue" />}
              </div>

              <h3 className="text-2xl font-display font-bold text-slate-900 mb-3 group-hover:text-brand-blue transition-colors">
                {ind.name}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                {ind.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
