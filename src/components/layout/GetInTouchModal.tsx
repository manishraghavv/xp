"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Send, Lock, CheckCircle2, AlertCircle } from "lucide-react";
import { modalFormSchema, type ModalFormData, serviceOptions } from "@/lib/validations";
import { companyData } from "@/content/company";

interface GetInTouchModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  defaultMessage?: string;
}

export function GetInTouchModal({
  isOpen,
  onClose,
  defaultService = "",
  defaultMessage = "",
}: GetInTouchModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ModalFormData>({
    resolver: zodResolver(modalFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      service: defaultService,
      message: defaultMessage,
      website_bot_trap: "",
    },
  });

  useEffect(() => {
    if (defaultService) {
      setValue("service", defaultService);
    }
    if (defaultMessage) {
      setValue("message", defaultMessage);
    }
  }, [defaultService, defaultMessage, setValue]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setStatus("idle");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const onSubmit = async (data: ModalFormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to submit enquiry");
      }

      setStatus("success");
      reset();
    } catch (err: unknown) {
      setStatus("error");
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMessage(message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 z-10 my-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
              Get in Touch
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Tell us about your SAP® challenge. A senior consultant will respond within 24 business hours — no obligation.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {status === "success" && (
          <div className="my-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">✓ Thank you! We&apos;ll be in touch within 24 business hours.</p>
              <p className="text-xs mt-1">
                Our senior SAP® consultants are reviewing your requirements and will reach out promptly.
              </p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="my-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <p className="font-semibold">Something went wrong.</p>
              <p className="mt-1">
                Please email us directly at{" "}
                <a
                  href={`mailto:${companyData.email}`}
                  className="font-bold underline text-brand-cyan hover:text-cyan-300"
                >
                  {companyData.email}
                </a>{" "}
                or call {companyData.phones[0].number}. {errorMessage && `(${errorMessage})`}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* Honeypot field */}
          <input
            type="text"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            {...register("website_bot_trap")}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                First Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Rajesh"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-navy-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Last Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Gupta"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-navy-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Work Email *
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-navy-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+91 98XX XXX XXX"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-navy-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                {...register("phone")}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Company / Organisation *
            </label>
            <input
              type="text"
              placeholder="Your organisation name"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-navy-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              {...register("company")}
            />
            {errors.company && (
              <p className="text-xs text-red-500 mt-1">{errors.company.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Service of Interest *
            </label>
            <select
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-navy-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              {...register("service")}
            >
              <option value="" disabled>
                Select a service area...
              </option>
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-white dark:bg-navy-900">
                  {opt}
                </option>
              ))}
            </select>
            {errors.service && (
              <p className="text-xs text-red-500 mt-1">{errors.service.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Your Message / Project Brief
            </label>
            <textarea
              rows={3}
              placeholder="Describe your SAP® challenge or what you'd like to explore..."
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-navy-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue resize-vertical"
              {...register("message")}
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-500" />
              <span>Strictly confidential.</span>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-sm font-semibold shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{status === "loading" ? "Sending..." : "Send Message →"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
