"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { s4hanaData } from "@/content/s4hana";

export function FaqSection() {
  const faqItems = s4hanaData.faqs.slice(0, 6).map((f) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
  }));

  return (
    <section data-theme="light" className="py-16 sm:py-24 lg:py-32 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Frequently Asked Questions"
          title="Everything You Need to Know About SAP® Engagements"
          highlight="Frequently Asked"
          subtitle="Clear, direct answers to common questions regarding timelines, data safety, and execution models."
          align="center"
          theme="light"
        />

        <div className="mt-12">
          <Accordion items={faqItems} theme="light" />
        </div>
      </div>
    </section>
  );
}
