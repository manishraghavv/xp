import React from "react";
import { Cpu, TrendingUp, CheckCircle, Zap, Shield, Users } from "lucide-react";
import { homeData } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyUsSection() {
  const iconMap: Record<string, React.ReactNode> = {
    Cpu: <Cpu className="w-6 h-6 text-brand-blue" />,
    TrendingUp: <TrendingUp className="w-6 h-6 text-brand-blue" />,
    CheckCircle: <CheckCircle className="w-6 h-6 text-brand-blue" />,
    Zap: <Zap className="w-6 h-6 text-brand-blue" />,
    Shield: <Shield className="w-6 h-6 text-brand-blue" />,
    Users: <Users className="w-6 h-6 text-brand-blue" />,
  };

  return (
    <section className="py-24 bg-canvas-subtle light-mesh-bg border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why XpmindGlobal"
          title={
            <>
              SAP® expertise built on{" "}
              <span className="text-brand-blue">two decades</span> in the field.
            </>
          }
          subtitle="We combine the financial acumen of Chartered Accountants with deep SAP® technical mastery to deliver implementations, migrations, and support that solve real business problems."
          theme="light"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {homeData.whyUs.map((point) => (
            <div
              key={point.num}
              className="p-8 rounded-2xl glass-card-light relative overflow-hidden group"
            >
              {/* Subtle accent line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue to-brand-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              {/* Number watermark */}
              <div className="absolute top-4 right-6 text-6xl font-display font-black text-slate-100 dark:text-slate-800 pointer-events-none select-none">
                {point.num}
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {iconMap[point.icon] || <Cpu className="w-6 h-6 text-brand-blue" />}
              </div>

              <h3 className="text-xl font-display font-bold text-slate-900 mb-3 group-hover:text-brand-blue transition-colors">
                {point.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
