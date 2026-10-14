"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle } from "lucide-react";
import {
  trainingInterestSchema,
  type TrainingInterestData,
  trainingProgrammes,
} from "@/lib/validations";
import { companyData } from "@/content/company";

interface TrainingFormProps {
  selectedProgramme?: string;
  onProgrammeChange?: (prog: string) => void;
}

export function TrainingForm({
  selectedProgramme = "",
  onProgrammeChange,
}: TrainingFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TrainingInterestData>({
    resolver: zodResolver(trainingInterestSchema),
    defaultValues: {
      fullName: "",
      email: "",
      designation: "",
      programme: selectedProgramme,
      website_bot_trap: "",
    },
  });

  React.useEffect(() => {
    if (selectedProgramme) {
      setValue("programme", selectedProgramme);
    }
  }, [selectedProgramme, setValue]);

  const onSubmit = async (data: TrainingInterestData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/training-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || "Failed to register interest");
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
    <div id="register-interest" className="p-5 sm:p-12 rounded-3xl glass-card-light shadow-xl border border-slate-200/90 scroll-mt-28 sm:scroll-mt-32">
      <div className="mb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
          <span>Coming Soon</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
          Be among the first to enrol when we launch.
        </h3>
        <p className="text-sm text-slate-600">
          Register your interest now and we&apos;ll notify you the moment your programme opens for enrolment.
        </p>
      </div>

      {status === "success" && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-bold">Registered! We&apos;ll notify you when enrolment opens.</p>
            <p className="text-xs mt-1 text-emerald-700">
              You will receive curriculum updates and early-bird enrolment access directly in your inbox.
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
              Please try again or email us at{" "}
              <a href={`mailto:${companyData.email}`} className="font-bold underline text-brand-blue">
                {companyData.email}
              </a>
              . {errorMessage && `(${errorMessage})`}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Priyanshu Mehta"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-brand-blue"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Work Email *
            </label>
            <input
              type="email"
              placeholder="you@company.com"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-brand-blue"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Designation / Role
            </label>
            <input
              type="text"
              placeholder="e.g. Chartered Accountant, Financial Controller"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-brand-blue"
              {...register("designation")}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Programme of Interest *
            </label>
            <select
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-brand-blue"
              {...register("programme")}
            >
              <option value="" disabled>
                Select a programme...
              </option>
              {trainingProgrammes.map((prog) => (
                <option key={prog} value={prog}>
                  {prog}
                </option>
              ))}
            </select>
            {errors.programme && (
              <p className="text-xs text-red-500 mt-1">{errors.programme.message}</p>
            )}
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end">
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto px-8 py-3.5 min-h-[48px] rounded-lg bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-sm font-semibold shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{status === "loading" ? "Registering..." : "Register My Interest →"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
