export interface S4Stat {
  value: string;
  label: string;
}

export interface RiskCard {
  icon: string;
  title: string;
  description: string;
}

export interface ComparisonPath {
  name: string;
  subtitle: string;
  tag?: string;
  featured?: boolean;
  points: { text: string; status: "good" | "bad" | "neutral" }[];
}

export interface MigrationPhase {
  phase: string;
  name: string;
  weeks: string;
  activities: string[];
  deliverables: string[];
  tools: string[];
}

export interface ScopeCard {
  icon: string;
  title: string;
  bullets: string[];
}

export interface WhyUsCard {
  icon: string;
  title: string;
  description: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export const s4hanaData = {
  hero: {
    badge: "Aggressively Priced · Limited Project Slots · Act Now",
    title: "ECC to S/4HANA Brownfield Migration",
    subtitle:
      "The industry's fastest brownfield conversion — delivered in 16 weeks* at ~40% lower cost than the market. Your data, your customisations, your processes — preserved, not rebuilt.",
    stats: [
      { value: "16wks*", label: "Fastest Delivery" },
      { value: "~40%", label: "Cost Savings" },
      { value: "0", label: "Data Loss" },
      { value: "20+yrs", label: "SAP® Expertise" },
    ],
  },

  urgency: {
    eyebrow: "The Clock Is Ticking",
    title: "Why migrate right now?",
    paragraph1:
      "SAP® will end mainstream maintenance for ECC in December 2027. Extended maintenance costs extra, and innovation has already shifted entirely to S/4HANA. Every quarter you delay is money spent supporting a dead-end platform.",
    paragraph2:
      "Companies migrating now are gaining real-time analytics, embedded AI, simplified data models, and a platform ready for the next decade. Those waiting face a premium rush to migrate closer to the deadline — with fewer experienced partners available.",
    paragraph3:
      "XpmindGlobal's accelerated brownfield approach means you can be live on S/4HANA well ahead of the deadline — without the cost, risk, or disruption of a greenfield reimplementation.",
    risks: [
      {
        icon: "Banknote",
        title: "Rising Maintenance Costs",
        description:
          "ECC extended support fees increase year-on-year. Staying on ECC post-2027 will cost significantly more than migrating today.",
      },
      {
        icon: "ShieldAlert",
        title: "Security Vulnerabilities",
        description:
          "Fewer patches, slower security fixes. An unsupported ECC environment is an increasing liability for your business and your data.",
      },
      {
        icon: "TrendingDown",
        title: "Competitive Disadvantage",
        description:
          "Competitors on S/4HANA have real-time reporting, AI insights, and streamlined processes. ECC cannot match this capability gap.",
      },
      {
        icon: "Ban",
        title: "Innovation Blocked",
        description:
          "SAP® BTP, Fiori, embedded analytics, and AI extensions are S/4HANA-native. You cannot access these on ECC.",
      },
    ] as RiskCard[],
  },

  comparison: {
    eyebrow: "Migration Strategy",
    title: "Why Brownfield is right for most businesses.",
    subtitle:
      "Three paths to S/4HANA — each with very different risk, cost, and timelines. Here's the honest comparison.",
    paths: [
      {
        name: "Greenfield",
        subtitle: "New Implementation",
        points: [
          { text: "18–36+ months timeline", status: "bad" },
          { text: "Highest cost — full rebuild", status: "bad" },
          { text: "Historical data migration risk", status: "bad" },
          { text: "Extensive user retraining", status: "bad" },
          { text: "Custom code discarded", status: "bad" },
          { text: "Process redesign opportunity", status: "good" },
          { text: "Clean-core from day one", status: "good" },
        ],
      },
      {
        name: "Brownfield",
        subtitle: "System Conversion · Our Approach",
        tag: "XpmindGlobal Recommended",
        featured: true,
        points: [
          { text: "16 weeks* delivery timeline", status: "good" },
          { text: "~40% lower cost", status: "good" },
          { text: "All historical data preserved", status: "good" },
          { text: "ABAP customisations retained", status: "good" },
          { text: "Minimal user retraining", status: "good" },
          { text: "Minimal business disruption", status: "good" },
          { text: "Fixed-scope, fixed-cost", status: "good" },
        ],
      },
      {
        name: "Selective Data Transition",
        subtitle: "Hybrid Approach",
        points: [
          { text: "12–24 months typical", status: "neutral" },
          { text: "Medium to high cost", status: "neutral" },
          { text: "Selective data migration", status: "neutral" },
          { text: "Complex scope management", status: "neutral" },
          { text: "Process redesign possible", status: "good" },
          { text: "Flexibility in approach", status: "good" },
          { text: "High complexity & risk", status: "bad" },
        ],
      },
    ] as ComparisonPath[],
  },

  timeline: {
    eyebrow: "Our Delivery Method",
    title: "The 16-Week Brownfield Migration Process.",
    subtitle:
      "Our proven, phase-gated methodology — built on SAP® Activate and refined across 20+ years of implementations. Click each phase to see the full details.",
    footnote:
      "* 16-week timeline is scope-dependent. Actual delivery timeline confirmed after the free readiness assessment. Applies to mid-market ECC systems. Complex landscapes may require extended timelines.",
    phases: [
      {
        phase: "Phase 01",
        name: "Discover & Assess",
        weeks: "Weeks 1–2",
        activities: [
          "Readiness assessment of current ECC landscape",
          "Custom code analysis using SAP® Custom Code Migration app",
          "Simplification item review and gap analysis",
          "System sizing and infrastructure planning",
          "Stakeholder alignment workshops",
        ],
        deliverables: [
          "Migration Readiness Report",
          "Custom Code Impact List",
          "Risk Register",
          "Project Charter & Governance Model",
          "High-level Architecture Blueprint",
        ],
        tools: [
          "SAP® Readiness Check 2.0",
          "Custom Code Migration Workbench",
          "SAP® Activate Methodology",
          "Simplification Item Catalogue",
        ],
      },
      {
        phase: "Phase 02",
        name: "Prepare & Plan",
        weeks: "Weeks 3–5",
        activities: [
          "SAP® S/4HANA system provisioning",
          "Conversion pre-checks and pre-processing",
          "Data archiving and cleansing plan",
          "Custom code remediation kick-off",
          "Test strategy definition",
        ],
        deliverables: [
          "System Landscape Design",
          "Data Migration Strategy",
          "Custom Code Remediation Plan",
          "Test Strategy Document",
          "Change Management Plan",
        ],
        tools: [
          "SAP® Software Update Manager (SUM)",
          "Database Migration Option (DMO)",
          "SAP® Solution Manager",
          "SAP® HANA Studio",
        ],
      },
      {
        phase: "Phase 03",
        name: "Explore & Realise",
        weeks: "Weeks 6–10",
        activities: [
          "Technical system conversion (SUM/DMO execution)",
          "Mandatory business function activation",
          "Finance simplification (New G/L → Universal Journal)",
          "Custom code adaptation and testing",
          "Fiori launchpad setup and role configuration",
        ],
        deliverables: [
          "Converted Development System",
          "Finance Simplification Sign-off",
          "Remediated Custom Code",
          "Fiori Role Catalogue",
          "Integration Test Plan",
        ],
        tools: [
          "SAP® S/4HANA Migration Cockpit",
          "SAP® Fiori Apps Reference Library",
          "Universal Journal (ACDOCA)",
          "SAP® HANA Cloud",
        ],
      },
      {
        phase: "Phase 04",
        name: "Test & Validate",
        weeks: "Weeks 11–13",
        activities: [
          "System Integration Testing (SIT)",
          "User Acceptance Testing (UAT) with key users",
          "Performance & load testing on HANA",
          "Regression testing for critical business processes",
          "Cutover simulation and dress rehearsal",
        ],
        deliverables: [
          "Signed SIT & UAT Reports",
          "Performance Benchmark Results",
          "Issue Log & Resolution Register",
          "Cutover Runbook v1",
          "Go-Live Readiness Report",
        ],
        tools: [
          "SAP® Solution Manager Test Suite",
          "SAP® HANA Performance Tools",
          "SAP® Transport Management System",
          "Focused Build for SAP® Solution Manager",
        ],
      },
      {
        phase: "Phase 05",
        name: "Go-Live & Stabilise",
        weeks: "Weeks 14–16",
        activities: [
          "Final cutover execution (weekend window)",
          "Production system go-live",
          "Hypercare support (dedicated war room)",
          "Issue resolution & stabilisation",
          "Knowledge transfer to client team",
        ],
        deliverables: [
          "Production Go-Live Sign-off",
          "Hypercare Support Log",
          "Post Go-Live Stability Report",
          "Transition to AMS Document",
          "Lessons Learned Register",
        ],
        tools: [
          "SAP® Early Watch Alert",
          "SAP® Solution Manager Monitoring",
          "SAP® HANA Cockpit",
          "SAP® Fiori Launchpad (production)",
        ],
      },
    ] as MigrationPhase[],
  },

  scope: {
    eyebrow: "Scope of Delivery",
    title: "Everything included in our fixed-scope package.",
    cards: [
      {
        icon: "Cpu",
        title: "Technical Conversion",
        bullets: [
          "Full SUM/DMO execution",
          "HANA database migration",
          "Custom code remediation (ABAP)",
          "Simplification item resolution",
          "Fiori launchpad setup",
        ],
      },
      {
        icon: "Briefcase",
        title: "Finance Simplification",
        bullets: [
          "New G/L to Universal Journal migration",
          "Material Ledger activation",
          "Asset Accounting conversion",
          "Controlling integration realignment",
          "Profit Centre / Segment reporting",
        ],
      },
      {
        icon: "Database",
        title: "Data Migration & Quality",
        bullets: [
          "Data cleansing workshops",
          "Migration cockpit configuration",
          "Legacy data validation",
          "Historical data preservation",
          "Data reconciliation sign-off",
        ],
      },
      {
        icon: "CheckSquare",
        title: "Testing & Validation",
        bullets: [
          "Unit & integration test scripts",
          "UAT facilitation",
          "Performance benchmarking",
          "Cutover simulation",
          "Regression test suite",
        ],
      },
      {
        icon: "GraduationCap",
        title: "Training & Enablement",
        bullets: [
          "Role-based end user training",
          "Fiori UX orientation sessions",
          "Key user train-the-trainer",
          "Process documentation handover",
          "Quick reference guides",
        ],
      },
      {
        icon: "Shield",
        title: "Hypercare & Post Go-Live",
        bullets: [
          "Dedicated support for 4 weeks",
          "War room war team on standby",
          "Priority issue resolution",
          "Performance monitoring",
          "Transition to AMS (optional)",
        ],
      },
    ] as ScopeCard[],
  },

  whyUs: {
    eyebrow: "Why XpmindGlobal",
    title: "Not just another SAP® partner.",
    cards: [
      {
        icon: "Zap",
        title: "Proprietary Accelerator Toolkit",
        description:
          "Pre-built templates, test scripts, data migration tools, and cutover checklists refined across dozens of brownfield projects — cutting your timeline by weeks.",
      },
      {
        icon: "Briefcase",
        title: "Finance-Led Approach",
        description:
          "Our leadership team includes Chartered Accountants and finance veterans. We understand your finance processes as deeply as the technology — preventing costly post-go-live fixes.",
      },
      {
        icon: "ClipboardCheck",
        title: "Fixed-Scope Commitment",
        description:
          "We commit to a defined scope, timeline, and cost upfront. No creep, no surprises — a signed Statement of Work that protects you from day one.",
      },
      {
        icon: "Wrench",
        title: "Deep ABAP Expertise",
        description:
          "Our consultants adapt, not abandon, your custom code. Proven ABAP remediation methodology means your Z-programs and exits continue working on S/4HANA.",
      },
      {
        icon: "Handshake",
        title: "End-to-End Ownership",
        description:
          "One team owns your project from readiness check to hypercare exit. No handoffs between vendors, no gaps in accountability.",
      },
      {
        icon: "Globe",
        title: "Long-Term Partnership",
        description:
          "Post go-live, our AMS team knows your system inside-out. Ongoing support, upgrades, and enhancements without the learning curve.",
      },
    ] as WhyUsCard[],
  },

  faqs: [
    {
      id: 1,
      question: "What is the difference between Brownfield and Greenfield migration?",
      answer:
        "Brownfield (System Conversion) converts your existing SAP® ECC system to S/4HANA in-place. All historical data, custom code, configurations, and organisational structures are carried forward. Greenfield is a completely fresh implementation where everything is rebuilt from scratch. Brownfield is faster, cheaper, and far less disruptive — making it the right choice for most organisations that have a mature, working ECC system. Greenfield makes sense only when a company wants to completely re-engineer their processes or has a very simple ECC landscape.",
    },
    {
      id: 2,
      question: "Is 16 weeks really achievable? What are the conditions?",
      answer:
        "Yes — for well-scoped, mid-market ECC systems with a focused core (FI/CO, MM, SD, PP). The 16-week timeline applies when the ECC landscape is reasonably clean, custom code volume is manageable, client resources are available for UAT and workshops, and there are no external dependencies (e.g. waiting for third-party vendor APIs). We perform a free readiness assessment before confirming your timeline. Complex multi-company, multi-country, or highly customised landscapes may require 20–28 weeks. We will tell you the honest timeline at the assessment stage.",
    },
    {
      id: 3,
      question: "Will I lose any data during migration?",
      answer:
        "No. Brownfield migration converts the entire database — all transactional data, historical records, master data, and documents carry forward unchanged. We perform multiple validation checks and reconciliations throughout the process, and our cutover runbook includes a formal data integrity sign-off. Selective data archiving (of aged open items) may be recommended as a best practice before cutover, but this is always a client decision — nothing is deleted without your explicit approval.",
    },
    {
      id: 4,
      question: "Which versions of SAP® ECC are supported for brownfield migration?",
      answer:
        "SAP® supports brownfield migration from ECC 6.0 EHP 6 and above (EHP 7 and EHP 8 are the most common). If you are on an older EHP, we typically perform an upgrade to EHP 7/8 as a pre-step. Being on a recent support package level also reduces the number of pre-processing steps. Our assessment phase will confirm your exact starting point and identify any prerequisite steps before the main conversion.",
    },
    {
      id: 5,
      question: "What happens to my custom ABAP code and Z-programs?",
      answer:
        "Custom code does not automatically work on S/4HANA without review. We run SAP®'s Custom Code Migration Workbench during the assessment phase to identify all impacted programs. Most custom code can be adapted to work correctly on S/4HANA with minor to moderate changes (typically syntax corrections and adaptation to new S/4HANA data models). We include custom code remediation in our fixed-scope package up to an agreed number of objects. Code that cannot be adapted is flagged early so you can make informed decisions.",
    },
    {
      id: 6,
      question: "How much system downtime is required at go-live cutover?",
      answer:
        "Brownfield conversion requires a production downtime window — typically 24–48 hours depending on database size and system complexity. We schedule this over a weekend or public holiday to minimise business impact. Our cutover simulation in Phase 4 rehearses the exact steps so we know the downtime to the minute before the actual go-live. We aim to reduce downtime through careful pre-processing, parallel preparation, and optimised conversion scripts run during the pre-go-live window.",
    },
    {
      id: 7,
      question: "Will my staff need extensive retraining?",
      answer:
        "No — and this is one of the major advantages of brownfield. Business processes, transaction codes, and workflows remain largely the same. The main change for end users is the new SAP® Fiori user interface, which is more modern and intuitive than the classic SAP® GUI. We include role-based Fiori orientation training and key user sessions in our package. Most users are productive within a few days of go-live. There is no need to re-learn core business processes from scratch.",
    },
    {
      id: 8,
      question: "What specific business benefits does S/4HANA deliver over ECC?",
      answer:
        "S/4HANA delivers significant improvements: Real-time analytics and reporting directly in the system (no separate BW required for standard reports), a simplified Finance data model (Universal Journal) that eliminates reconciliation effort, faster period-end close, embedded AI and predictive analytics, SAP® Fiori for a modern user experience on any device, tighter integration across modules, and a platform ready for SAP® BTP extensions. Most clients see measurable improvements in month-end close time and finance reporting speed within the first quarter after go-live.",
    },
    {
      id: 9,
      question: "How is XpmindGlobal able to offer ~40% cost savings?",
      answer:
        "The ~40% cost saving is achieved through three factors: (1) Our offshore delivery model means you get senior consultants at lower blended rates without compromising quality, (2) Our proprietary accelerator toolkit — pre-built templates, test scripts, and automation — reduces the hours required by 30–40% compared to building everything from scratch, and (3) Fixed-scope engagements mean we have refined our delivery to eliminate waste. We are not adding junior staff to pad hours; our senior-led model is efficient and outcome-focused.",
    },
    {
      id: 10,
      question: "What support do you provide after go-live?",
      answer:
        "We include 4 weeks of dedicated Hypercare support as part of the migration package — a dedicated support team, daily status calls, and priority resolution of any production issues. After Hypercare, we offer a structured transition to our Application Management Services (AMS) model, where the same team that did your migration continues supporting your S/4HANA system. This ensures zero knowledge transfer overhead and continuity of care. Our AMS contracts are month-to-month with no lock-in.",
    },
  ] as FaqItem[],

  finalCta: {
    badge: "Limited Capacity — Project Slots Filling Fast",
    title: "Ready to move to S/4HANA? Let's assess your system — free.",
    description:
      "A 90-minute readiness session with our SAP® experts. We'll assess your ECC landscape, identify risks, and give you an honest timeline and cost estimate — no obligation.",
    primaryCta: "Book Free Assessment →",
    secondaryCta: "Talk to a Consultant",
  },
};
