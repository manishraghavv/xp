import React from "react";
import type { Metadata } from "next";
import { companyData } from "@/content/company";
import { ContactForm } from "@/components/sections/ContactForm";
import { Phone, Mail, MapPin, Clock, Globe } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Contact Us | Consult with Senior SAP® Specialists",
  description:
    "Get in touch with XpmindGlobal. Schedule a free 90-minute SAP® readiness consultation or project scoping session with our Chartered Accountants and implementation leads.",
  alternates: {
    canonical: "/contact",
  },
};


export default function ContactPage() {
  const whyReachOut = [
    {
      title: "Free Readiness Assessment",
      text: "A 90-minute complimentary technical and financial review of your current SAP® or ECC landscape.",
    },
    {
      title: "Senior Consultant Direct Access",
      text: "Speak directly with seasoned Chartered Accountants and S/4HANA architects, not sales account executives.",
    },
    {
      title: "Rapid 48-Hour Turnaround",
      text: "Receive a tailored statement of work, milestone breakdown, and transparent pricing within 48 business hours.",
    },
    {
      title: "Flexible Engagement Models",
      text: "Predictable fixed-scope deliverables, dedicated onshore/offshore teams, or SLA-backed monthly support.",
    },
  ];

  return (
    <div>
      <PageHero
        image="/images/backgrounds/bg-contact-skyline.jpg"
        imageAlt="Corporate Headquarters Architecture"
        imageSize={[1920, 1280]}
        pos="60% 30%"
        imageWidth="66%"
        crumbs={[{ label: "Contact Us" }]}
        badge="Start the Conversation"
        title="Let's start your SAP® journey together."
        highlight="SAP® journey"
        intro={[
          "Whether you are preparing for an ECC to S/4HANA migration, seeking dedicated AMS support, or exploring cloud and analytics integrations, our senior team is ready to evaluate your requirements.",
        ]}
      />

      {/* Main Content: Form + Coordinates (Light Section) */}
      <section data-theme="light" className="py-16 sm:py-24 lg:py-32 bg-[#F6F7FB] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Form (7 cols) */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Right Column: Coordinates & Why Reach Out (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              {/* Coordinates Card */}
              <div className="card-interactive card-interactive--lg card-interactive--light p-8 sm:p-10 rounded-4xl bg-white border border-slate-200/90 shadow-xl space-y-6">
                <h3 className="text-xl font-display font-bold text-slate-900 border-b border-slate-100 pb-4">
                  Our Coordinates
                </h3>

                <div className="space-y-4 text-sm text-slate-700">
                  <div className="card-interactive card-interactive--sm card-interactive--light flex items-start gap-3.5 rounded-xl px-2 -mx-2">
                    <MapPin className="card-icon w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="card-label text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                        Headquarters
                      </div>
                      <p className="font-medium text-slate-900 leading-relaxed">
                        {companyData.headquarters.fullAddress}
                      </p>
                    </div>
                  </div>

                  <div className="card-interactive card-interactive--sm card-interactive--light flex items-start gap-3.5 rounded-xl px-2 -mx-2">
                    <Phone className="card-icon w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="card-label text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                        Direct Phone
                      </div>
                      <p className="font-medium text-slate-900">
                        <a href={companyData.phones[0].href} className="link-underline-anim hover:text-brand-blue">
                          {companyData.phones[0].number}
                        </a>
                        {" | "}
                        <a href={companyData.phones[1].href} className="link-underline-anim hover:text-brand-blue">
                          {companyData.phones[1].number}
                        </a>
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Landline:{" "}
                        <a href={companyData.phones[2].href} className="link-underline-anim hover:text-brand-blue">
                          {companyData.phones[2].number}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="card-interactive card-interactive--sm card-interactive--light flex items-start gap-3.5 rounded-xl px-2 -mx-2">
                    <Mail className="card-icon w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="card-label text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                        Email
                      </div>
                      <a
                        href={`mailto:${companyData.email}`}
                        className="link-underline-anim font-medium text-brand-blue"
                      >
                        {companyData.email}
                      </a>
                    </div>
                  </div>

                  <div className="card-interactive card-interactive--sm card-interactive--light flex items-start gap-3.5 rounded-xl px-2 -mx-2">
                    <Globe className="card-icon w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="card-label text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                        Website
                      </div>
                      <a
                        href="https://www.xpmindglobal.com"
                        className="link-underline-anim font-medium text-brand-blue"
                      >
                        www.xpmindglobal.com
                      </a>
                    </div>
                  </div>

                  <div className="card-interactive card-interactive--sm card-interactive--light flex items-start gap-3.5 rounded-xl px-2 -mx-2">
                    <Clock className="card-icon w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="card-label text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                        Response Time
                      </div>
                      <p className="font-medium text-emerald-700">
                        {companyData.responseTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Reach Out Card */}
              <div className="card-interactive card-interactive--lg card-interactive--light p-8 sm:p-10 rounded-4xl bg-white border border-slate-200/90 shadow-xl space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-3">
                  Why Reach Out To Us?
                </h4>

                <div className="space-y-4">
                  {whyReachOut.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <span className="text-sm font-mono font-bold tracking-widest text-brand-blue/70 flex-shrink-0 pt-0.5">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h5 className="text-sm font-bold text-slate-900">{item.title}</h5>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Card */}
              <div className="card-interactive card-interactive--lg card-interactive--light p-4 rounded-4xl bg-white border border-slate-200/90 shadow-xl overflow-hidden">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-3 py-2">
                  Location Map: Greater Noida West
                </div>
                <div className="rounded-3xl overflow-hidden aspect-video bg-slate-100 border border-slate-200">
                  <iframe
                    title="XpmindGlobal Office Location"
                    src="https://maps.google.com/maps?q=Gaur+City+Mall+Greater+Noida+West&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
