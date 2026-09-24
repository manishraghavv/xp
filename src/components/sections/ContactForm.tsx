"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle } from "lucide-react";
import {
  contactFormSchema,
  type ContactFormData,
  serviceOptions,
  landscapeOptions,
} from "@/lib/validations";
import { companyData } from "@/content/company";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      landscape: "",
      message: "",
      website_bot_trap: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || "Failed to submit enquiry");
      }

      setStatus("success");
      reset();
    } catch (err: unknown) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMessage(msg);
    }
  };

  return (
    <div className="p-8 sm:p-10 rounded-3xl glass-card-light shadow-xl border border-slate-200/90">
      <div className="mb-6">
        <h3 className="text-2xl font-display font-bold text-slate-900">
          Send Us an Enquiry
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Tell us about your requirements. A senior SAP® consultant will respond within 24 business hours.
        </p>
      </div>

      {status === "success" && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-bold">Thank you! We&apos;ll be in touch within 24 business hours.</p>
            <p className="text-xs mt-1 text-emerald-700">
              Your inquiry has been routed to our senior SAP® practice lead. We look forward to connecting.
            </p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-bold">Something went wrong.</p>
            <p className="text-xs mt-1 text-red-700">
              Please email us directly at{" "}
              <a href={`mailto:${companyData.email}`} className="font-bold underline text-brand-blue">
                {companyData.email}
              </a>{" "}
              or call {companyData.phones[0].number}. {errorMessage && `(${errorMessage})`}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Honeypot field */}
        <input
          type="text"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          {...register("website_bot_trap")}
        />

        {/* Field 1 & 2: First Name, Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              First Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Rajesh"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Last Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Gupta"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Field 3 & 4: Work Email, Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Work Email *
            </label>
            <input
              type="email"
              placeholder="you@company.com"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+91 98XX XXX XXX"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              {...register("phone")}
            />
          </div>
        </div>

        {/* Field 5: Company */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Company / Organisation *
          </label>
          <input
            type="text"
            placeholder="Your organisation name"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            {...register("company")}
          />
          {errors.company && (
            <p className="text-xs text-red-500 mt-1">{errors.company.message}</p>
          )}
        </div>

        {/* Field 6: Service of Interest (10 options) */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Service of Interest *
          </label>
          <select
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            {...register("service")}
          >
            <option value="" disabled>
              Select a service area...
            </option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="text-xs text-red-500 mt-1">{errors.service.message}</p>
          )}
        </div>

        {/* Field 7: Current SAP Landscape (6 options) */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Current SAP® Landscape
          </label>
          <select
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            {...register("landscape")}
          >
            <option value="">Select current landscape status...</option>
            {landscapeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Field 8: Message */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Your Message / Project Brief
          </label>
          <textarea
            rows={4}
            placeholder="Describe your current SAP® challenge, project scope, or timeline..."
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue resize-vertical"
            {...register("message")}
          />
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            <span>Strictly confidential. No spam guaranteed.</span>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-sm font-semibold shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{status === "loading" ? "Sending..." : "Send Message →"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
