"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TwoWaysCardPair } from "@/components/ui/TwoWaysCardPair";
import { servicesData } from "@/content/services";

const serviceImageMap: Record<string, string> = {
  "sap-cloud-saas-solutions": "/images/service-cloud.jpg",
  "sap-analytics-reporting": "/images/service-analytics.jpg",
  "sap-integration-services": "/images/service-integration.jpg",
  "sap-grc-security-compliance": "/images/service-grc.jpg",
  "sap-training-enablement": "/images/service-training.jpg",
  "s4hana-upgrade-migration": "/images/service-migration.jpg",
  "sap-implementation-rollout": "/images/service-implementation.jpg",
  "application-management-services-ams": "/images/service-ams.jpg",
  "sap-centre-of-excellence-coe": "/images/service-coe.jpg",
};

export function ServicesPreviewGrid() {
  return (
    <section data-theme="light" className="py-24 sm:py-32 bg-[#F6F7FB] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title="Enterprise SAP® Consulting & Technical Delivery"
          highlight="Technical Delivery"
          subtitle="Nine core practices spanning the entire SAP® lifecycle. Led by senior practitioners with deep functional and financial acumen."
          align="center"
          theme="light"
        />

        {/* 9 Services Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {servicesData.map((service) => (
            <div
              key={service.slug}
              className="rounded-3xl bg-white border border-slate-200/80 shadow-lg shadow-blue-900/5 overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:border-brand-blue/30 transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Photo Cover with Subtle Scrim */}
              <div className="relative h-44 w-full overflow-hidden bg-navy-950">
                <Image
                  src={serviceImageMap[service.slug] || "/images/service-cloud.jpg"}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/30 to-transparent" />
                
                <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider text-cyan-300 bg-navy-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-500/20">
                  {service.tag}
                </span>

                <span className="absolute bottom-3 right-3 text-xs font-mono font-bold text-white/80">
                  {service.number}
                </span>
              </div>

              {/* Body Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-blue transition-colors mb-3 leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.bullets.slice(0, 3).map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-1">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-blue-700 transition-colors group/link"
                  >
                    <span>Explore practice & scope</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Two Ways Engagement Model Comparison (Hostinger Pattern) */}
        <div className="pt-8 border-t border-slate-200">
          <SectionHeading
            eyebrow="Flexible Engagement Models"
            title="Two Ways We Partner With Your Enterprise"
            highlight="Two Ways"
            subtitle="Whether you need a high-impact, fixed-scope transformation or ongoing 24×7 operational excellence with strict SLAs."
            align="center"
            theme="light"
          />

          <TwoWaysCardPair />
        </div>
      </div>
    </section>
  );
}
