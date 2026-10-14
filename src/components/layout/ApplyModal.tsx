"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, CheckCircle2, AlertCircle, Upload } from "lucide-react";
import {
  applicationSchema,
  type ApplicationData,
  CV_ALLOWED_EXTENSIONS,
  CV_MAX_BYTES,
} from "@/lib/validations";
import { careersData } from "@/content/careers";
import { companyData } from "@/content/company";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultApplyAs?: string;
}

const labelClass =
  "block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5";
const inputClass =
  "w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-navy-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-brand-blue";

export function ApplyModal({ isOpen, onClose, defaultApplyAs = "" }: ApplyModalProps) {
  const { modal } = careersData;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [cvError, setCvError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ApplicationData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      applyingAs: defaultApplyAs,
      fullName: "",
      email: "",
      mobile: "",
      location: "",
      primaryArea: "",
      experience: "",
      otherModules: "",
      availability: "",
      workMode: "",
      qualification: "",
      passingYear: "",
      linkedin: "",
      about: "",
      consent: undefined,
      website_bot_trap: "",
    },
  });

  const applyingAs = watch("applyingAs");

  useEffect(() => {
    if (defaultApplyAs) setValue("applyingAs", defaultApplyAs);
  }, [defaultApplyAs, setValue]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) setStatus("idle");
  }, [isOpen]);

  if (!isOpen) return null;

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setCvError("");
    if (!file) {
      setCv(null);
      return;
    }
    const lower = file.name.toLowerCase();
    if (!CV_ALLOWED_EXTENSIONS.some((ext) => lower.endsWith(ext))) {
      setCv(null);
      setCvError("PDF, DOC or DOCX only");
      return;
    }
    if (file.size > CV_MAX_BYTES) {
      setCv(null);
      setCvError("Max 5 MB");
      return;
    }
    setCv(file);
  };

  const onSubmit = async (data: ApplicationData) => {
    if (!cv) {
      setCvError("Please upload your CV / Resume");
      return;
    }
    setStatus("loading");
    setErrorMessage("");

    try {
      const body = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) body.append(key, String(value));
      });
      body.append("cv", cv);

      const res = await fetch("/api/careers", { method: "POST", body });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to submit application");
      }

      setStatus("success");
      reset();
      setCv(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const err = (name: keyof ApplicationData) =>
    errors[name]?.message ? (
      <p className="text-xs text-red-500 mt-1">{String(errors[name]?.message)}</p>
    ) : null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      <div
        className="modal-backdrop fixed inset-0 bg-navy-950/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        id="apply-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-title"
        className="modal-panel relative w-full sm:max-w-2xl max-h-[100dvh] sm:max-h-[90svh] overflow-y-auto overscroll-contain bg-white dark:bg-navy-900 rounded-t-3xl sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 z-10"
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3
              id="apply-title"
              className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white"
            >
              {modal.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {modal.intro}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center min-w-[44px] min-h-[44px] -mr-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors flex-shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {status === "success" && (
          <div className="my-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="font-semibold text-sm">{modal.success}</p>
          </div>
        )}

        {status === "error" && (
          <div className="my-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <p className="font-semibold">Something went wrong.</p>
              <p className="mt-1">
                Please email us at{" "}
                <a
                  href={`mailto:${companyData.email}`}
                  className="font-bold underline text-brand-cyan hover:text-cyan-300"
                >
                  {companyData.email}
                </a>{" "}
                {errorMessage && `(${errorMessage})`}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <input
            type="text"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            {...register("website_bot_trap")}
          />

          <fieldset>
            <legend className={labelClass}>I&apos;m applying as *</legend>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {modal.applyAsOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`cursor-pointer px-4 py-3 rounded-lg border text-sm transition-colors ${
                    applyingAs === opt.value
                      ? "border-brand-blue bg-blue-50 dark:bg-navy-800 ring-2 ring-brand-blue"
                      : "border-slate-300 dark:border-slate-700 bg-white dark:bg-navy-800 hover:border-brand-blue/50"
                  }`}
                >
                  <input
                    type="radio"
                    value={opt.value}
                    className="sr-only"
                    {...register("applyingAs")}
                  />
                  <span className="block font-semibold text-slate-900 dark:text-white">
                    {opt.label}
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    {opt.sub}
                  </span>
                </label>
              ))}
            </div>
            {err("applyingAs")}
          </fieldset>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Full Name *</label>
              <input type="text" placeholder="e.g. Priya Sharma" className={inputClass} {...register("fullName")} />
              {err("fullName")}
            </div>
            <div>
              <label className={labelClass}>Email *</label>
              <input type="email" placeholder="you@email.com" className={inputClass} {...register("email")} />
              {err("email")}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Mobile Number *</label>
              <input type="tel" placeholder="+91 98XX XXX XXX" className={inputClass} {...register("mobile")} />
              {err("mobile")}
            </div>
            <div>
              <label className={labelClass}>Current Location *</label>
              <input type="text" placeholder="City, Country" className={inputClass} {...register("location")} />
              {err("location")}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Primary SAP® Area *</label>
              <select className={inputClass} {...register("primaryArea")}>
                <option value="" disabled>
                  Select module...
                </option>
                {modal.sapAreas.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {err("primaryArea")}
            </div>
            <div>
              <label className={labelClass}>Total SAP® Experience *</label>
              <select className={inputClass} {...register("experience")}>
                <option value="" disabled>
                  Select...
                </option>
                {modal.experience.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {err("experience")}
            </div>
          </div>

          <div>
            <label className={labelClass}>Other Modules / Certifications</label>
            <input
              type="text"
              placeholder="e.g. S/4HANA Finance certified, COPA, GST, CPI"
              className={inputClass}
              {...register("otherModules")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Availability / Notice Period</label>
              <select className={inputClass} {...register("availability")}>
                <option value="">Select...</option>
                {modal.availability.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Preferred Work Mode</label>
              <select className={inputClass} {...register("workMode")}>
                <option value="">Select...</option>
                {modal.workModes.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Highest Qualification</label>
              <input
                type="text"
                placeholder="e.g. CA, MBA Finance, B.Tech"
                className={inputClass}
                {...register("qualification")}
              />
            </div>
            <div>
              <label className={labelClass}>Year of Passing</label>
              <input type="text" placeholder="e.g. 2025" className={inputClass} {...register("passingYear")} />
            </div>
          </div>

          <div>
            <label className={labelClass}>LinkedIn Profile</label>
            <input
              type="url"
              placeholder="https://linkedin.com/in/your-profile"
              className={inputClass}
              {...register("linkedin")}
            />
          </div>

          <div>
            <label className={labelClass}>About You / Key Projects</label>
            <textarea
              rows={3}
              placeholder="Briefly describe your SAP® experience, key implementations, or what kind of role you're looking for..."
              className={`${inputClass} resize-vertical`}
              {...register("about")}
            />
          </div>

          <div>
            <label className={labelClass}>Upload CV / Resume *</label>
            <label className="flex flex-col items-center justify-center gap-1 px-4 py-6 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-navy-800 text-center cursor-pointer hover:border-brand-blue transition-colors">
              <Upload className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {cv ? cv.name : "Click or drag your CV here"}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                PDF, DOC or DOCX · Max 5 MB
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="sr-only"
                onChange={onFileChange}
              />
            </label>
            {cvError && <p className="text-xs text-red-500 mt-1">{cvError}</p>}
          </div>

          <div>
            <label className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 w-4 h-4 flex-shrink-0 accent-brand-blue"
                {...register("consent")}
              />
              <span>{modal.consent}</span>
            </label>
            {err("consent")}
          </div>

          <div className="sticky bottom-0 -mx-5 sm:-mx-8 mt-4 px-5 sm:px-8 py-4 bg-white/95 dark:bg-navy-900/95 backdrop-blur border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              <span>Your profile is kept confidential.</span>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full sm:w-auto px-6 py-3.5 min-h-[48px] rounded-lg bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-sm font-semibold shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{status === "loading" ? "Submitting..." : "Submit Application →"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
