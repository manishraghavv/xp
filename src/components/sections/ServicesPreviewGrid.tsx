import React from "react";
import Link from "next/link";
import { ArrowRight, Cloud, BarChart3, Network, ShieldCheck, GraduationCap, RefreshCw } from "lucide-react";
import { servicesData } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassButton } from "@/components/ui/GlassButton";

export function ServicesPreviewGrid() {
  const iconMap: Record<number, React.ReactNode> = {
    1: <Cloud className="w-6 h-6 text-brand-blue" />,
    2: <BarChart3 className="w-6 h-6 text-brand-blue" />,
    3: <Network className="w-6 h-6 text-brand-blue" />,
    4: <ShieldCheck className="w-6 h-6 text-brand-blue" />,
    5: <GraduationCap className="w-6 h-6 text-brand-blue" />,
    6: <RefreshCw className="w-6 h-6 text-brand-blue" />,
  };

  // 6 preview services
  const previewServices = servicesData.slice(0, 6);

  return (
    <section className="py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            eyebrow="Specialised Capabilities"
            title={
              <>
                Nine specialised <span className="text-brand-blue">SAP® service lines</span>.
              </>
            }
            subtitle="From S/4HANA migrations and Cloud BTP to compliance, custom ABAP development, and SLA-backed AMS support."
            className="mb-0"
            theme="light"
          />

          <GlassButton
            href="/services"
            variant="outline-light"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            className="self-start md:self-auto flex-shrink-0"
          >
            View All 9 Services →
          </GlassButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {previewServices.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="p-8 rounded-2xl glass-card-light group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {iconMap[service.id] || <Cloud className="w-6 h-6 text-brand-blue" />}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-100">
                    {service.number}
                  </span>
                </div>

                <div className="text-[11px] font-bold uppercase tracking-wider text-brand-cyan mb-2">
                  {service.tag}
                </div>

                <h3 className="text-xl font-display font-bold text-slate-900 mb-3 group-hover:text-brand-blue transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
                  {service.shortDescription || service.overview}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center text-sm font-semibold text-brand-blue group-hover:text-cyan-600 transition-colors gap-1.5">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
