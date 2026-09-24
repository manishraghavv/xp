import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { companyData } from "@/content/company";
import { navigationData } from "@/content/navigation";
import { SectionBackground } from "@/components/ui/SectionBackground";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="site-footer"
      data-theme="dark"
      className="relative text-white pt-14 sm:pt-20 pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))] md:pb-20 overflow-hidden border-t border-slate-800/80"
    >
      <SectionBackground variant="footer" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-16">
          {/* Company Info Column (2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block group">
              <div className="p-2 px-3.5 rounded-2xl bg-navy-950/80 border border-white/15 inline-block shadow-lg">
                <Image
                  src="/xp.png"
                  alt="XpmindGlobal"
                  width={180}
                  height={36}
                  className="h-8 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              {companyData.description}
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                <span>
                  <a href={companyData.phones[0].href} className="hover:text-cyan-400 transition-colors">
                    {companyData.phones[0].number}
                  </a>
                  {" | "}
                  <a href={companyData.phones[1].href} className="hover:text-cyan-400 transition-colors">
                    {companyData.phones[1].number}
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                <a href={companyData.phones[2].href} className="hover:text-cyan-400 transition-colors">
                  {companyData.phones[2].number}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                <a href={`mailto:${companyData.email}`} className="hover:text-cyan-400 transition-colors">
                  {companyData.email}
                </a>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-relaxed">
                  {companyData.headquarters.fullAddress}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Navigation Columns */}
          {navigationData.footerGroups.map((group, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-xs font-bold tracking-widest uppercase text-slate-300 border-b border-slate-700/60 pb-2">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-slate-300 hover:text-brand-cyan transition-colors flex items-center gap-1 group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear}{" "}
            <span className="text-white font-semibold">XpmindGlobal</span>. All rights reserved.
            Registered in India.
          </div>
          <div className="text-brand-cyan font-medium">
            SAP® Consulting · Greater Noida · India
          </div>
        </div>

        {/* Legal Trademark Disclaimer */}
        <div className="mt-6 pt-4 border-t border-slate-800/40 text-sm text-slate-400 leading-relaxed text-left">
          SAP®, SAP S/4HANA®, SAP BTP®, SAP Fiori®, SAP Ariba®, Rise with SAP®, and other SAP products and services mentioned herein as well as their respective logos are trademarks or registered trademarks of SAP SE in Germany and in several other countries. XpmindGlobal is an independent enterprise consulting firm and is not affiliated with, sponsored by, or endorsed by SAP SE.
        </div>
      </div>
    </footer>
  );
}
