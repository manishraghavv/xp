import type { Metadata } from "next";
import { CareersContent } from "@/components/sections/CareersContent";

export const metadata: Metadata = {
  title: "Careers | We're Hiring SAP® Freelancers, Full-Time Professionals & Freshers",
  description:
    "Build your SAP® career with seasoned experts. XpmindGlobal is hiring freelance, full-time and fresher SAP® talent across S/4HANA migration, implementation and AMS.",
  alternates: {
    canonical: "/careers",
  },
};

export default function CareersPage() {
  return <CareersContent />;
}
