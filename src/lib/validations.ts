import { z } from "zod";

export const serviceOptions = [
  "SAP® Cloud & SaaS Solutions",
  "SAP® Analytics & Reporting",
  "SAP® Integration Services",
  "SAP® GRC, Security & Compliance",
  "SAP® Training & Enablement",
  "S/4HANA Upgrade & Migration",
  "SAP® Implementation & Rollout",
  "Application Management Services (AMS)",
  "SAP® Centre of Excellence (CoE)",
  "General Enquiry / Multiple Services",
] as const;

export const landscapeOptions = [
  "ECC (planning to migrate)",
  "S/4HANA (on-premise)",
  "S/4HANA Cloud (Public/Private)",
  "No SAP® yet (Greenfield exploration)",
  "SAP® alongside another ERP",
  "Not sure / exploring options",
] as const;

export const trainingProgrammes = [
  "Track 01 — Finance Track (CAs, CFOs)",
  "Track 02 — Integration Track (Business Analysts)",
  "Track 03 — Business Readiness (Fresh CAs, New Joiners)",
  "SAP® FICO Course",
  "SAP® MM Course",
  "S/4HANA Migration Course",
  "SAP® GRC Course",
  "SAP® BTP & Cloud Integration Course",
  "Business Process Management Course",
] as const;

// Full 8-field contact page form schema
export const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.string().email("Please provide a valid work email"),
  phone: z.string().max(30).optional().or(z.literal("")),
  company: z.string().min(1, "Company / Organisation name is required").max(150),
  service: z.string().min(1, "Please select a service area"),
  landscape: z.string().optional().or(z.literal("")),
  message: z.string().max(3000).optional().or(z.literal("")),
  website_bot_trap: z.string().max(0, "Bot detected").optional().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Modal 7-field form schema (first, last, email, phone, company, service, message)
export const modalFormSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.string().email("Please provide a valid work email"),
  phone: z.string().max(30).optional().or(z.literal("")),
  company: z.string().min(1, "Company / Organisation name is required").max(150),
  service: z.string().min(1, "Please select a service area"),
  message: z.string().max(3000).optional().or(z.literal("")),
  website_bot_trap: z.string().max(0, "Bot detected").optional().or(z.literal("")),
});

export type ModalFormData = z.infer<typeof modalFormSchema>;

// Training interest form schema
export const trainingInterestSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(100),
  email: z.string().email("Please provide a valid work email"),
  designation: z.string().max(100).optional().or(z.literal("")),
  programme: z.string().min(1, "Please select a programme of interest"),
  website_bot_trap: z.string().max(0, "Bot detected").optional().or(z.literal("")),
});

export type TrainingInterestData = z.infer<typeof trainingInterestSchema>;
