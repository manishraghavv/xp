export interface TrainingTrack {
  id: string;
  tag: string;
  title: string;
  idealFor: string;
  description: string;
  bullets: string[];
}

export interface TechnicalCourse {
  title: string;
  description: string;
  level: string;
  hours: string;
  modules: string;
}

export interface TrustBadge {
  label: string;
}

export const trainingData = {
  hero: {
    eyebrow: "XPMIND Learning Cell",
    title: "Lead with SAP®. Not just use it.",
    subtitle:
      "Professional SAP® learning programmes for Chartered Accountants, Finance Leaders, and Business Professionals. Go beyond transactions — understand the business impact.",
    stats: [
      { number: "3", label: "Learning Tracks" },
      { number: "6", label: "SAP® Courses" },
      { number: "200+", label: "Hours of Content" },
    ],
  },

  trustBadges: [
    { label: "Expert-Led Content" },
    { label: "Video-Based Learning" },
    { label: "Certification Support" },
    { label: "Secure Access" },
  ] as TrustBadge[],

  tracks: [
    {
      id: "finance-track",
      tag: "Track 01",
      title: "Finance Track",
      idealFor: "CAs · CFOs · Finance Managers · Controllers",
      description:
        "Designed for CAs, CFOs, and Finance Managers who need to interpret SAP® financial reports, manage the close process, and drive compliance within their organisations.",
      bullets: [
        "SAP® financial report interpretation & analysis",
        "Period-end close process in SAP® FICO",
        "Compliance monitoring and reconciliation",
        "Cost centre and profit centre reporting",
        "Statutory reporting and audit readiness",
      ],
    },
    {
      id: "integration-track",
      tag: "Track 02",
      title: "Integration Track",
      idealFor: "Business Analysts · Ops Leaders · Process Owners",
      description:
        "For Business Analysts and Operations Leaders who need to understand how SAP® modules connect — and how cross-functional data flows drive business outcomes.",
      bullets: [
        "Procure-to-Pay (P2P) end-to-end process",
        "Order-to-Cash (O2C) workflow in SAP®",
        "Cross-module reporting and reconciliation",
        "Integration touchpoints: MM, SD, FI, CO",
        "Data flow and master data management",
      ],
    },
    {
      id: "business-readiness",
      tag: "Track 03",
      title: "Business Readiness",
      idealFor: "Fresh CAs · New Joiners · Mid-career Professionals",
      description:
        "The essential foundation for Fresh CAs, New Joiners, and Mid-career professionals entering SAP® environments — business context before system mechanics.",
      bullets: [
        "Business jargon and organisational structure",
        "Approval workflows and delegation of authority",
        "Management reporting fundamentals",
        "Introduction to ERP and SAP® concepts",
        "Navigating a large enterprise environment",
      ],
    },
  ] as TrainingTrack[],

  courses: [
    {
      title: "SAP® FICO — Financial Accounting & Controlling",
      description:
        "End-to-end coverage from GL configuration to cost controlling, asset accounting, and closing processes.",
      level: "Beginner → Advanced",
      hours: "40+ Hours",
      modules: "12 Modules",
    },
    {
      title: "SAP® MM — Materials Management & Procurement",
      description:
        "Procurement lifecycle, inventory management, vendor evaluation, and goods movements in SAP®.",
      level: "Beginner → Intermediate",
      hours: "30+ Hours",
      modules: "10 Modules",
    },
    {
      title: "S/4HANA Migration — Greenfield & Brownfield",
      description:
        "Technical and functional migration strategies, tools, testing methodology, and cutover planning.",
      level: "Intermediate → Advanced",
      hours: "35+ Hours",
      modules: "14 Modules",
    },
    {
      title: "SAP® GRC — Governance, Risk & Compliance",
      description:
        "Access Control, Process Control, SoD analysis, role design, and compliance reporting in SAP® GRC.",
      level: "Intermediate",
      hours: "22+ Hours",
      modules: "8 Modules",
    },
    {
      title: "SAP® BTP & Cloud Integration (CPI)",
      description:
        "Integration flows, API management, iFlows, and hybrid connectivity using SAP® Business Technology Platform.",
      level: "Intermediate → Advanced",
      hours: "28+ Hours",
      modules: "11 Modules",
    },
    {
      title: "Business Process Management & Digital Transformation",
      description:
        "Process mapping, change management, digital strategy, and aligning SAP® with business transformation goals.",
      level: "Beginner → Intermediate",
      hours: "18+ Hours",
      modules: "7 Modules",
    },
  ] as TechnicalCourse[],

  formProgrammes: [
    "Track 01 — Finance Track (CAs, CFOs)",
    "Track 02 — Integration Track (Business Analysts)",
    "Track 03 — Business Readiness (Fresh CAs, New Joiners)",
    "SAP® FICO Course",
    "SAP® MM Course",
    "S/4HANA Migration Course",
    "SAP® GRC Course",
    "SAP® BTP & Cloud Integration Course",
    "Business Process Management Course",
  ],
};
