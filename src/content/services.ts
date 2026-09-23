export interface ServiceSideCard {
  title: string;
  chips?: string[];
  text?: string;
}

export interface ServiceItem {
  id: number;
  number: string;
  slug: string;
  tag: string;
  title: string;
  shortDescription: string;
  overview: string;
  bullets: string[];
  sideCards: ServiceSideCard[];
}

export const servicesData: ServiceItem[] = [
  {
    id: 1,
    number: "01",
    slug: "sap-cloud-saas-solutions",
    tag: "Fastest Growing SAP® Segment",
    title: "SAP® Cloud & SaaS Solutions",
    shortDescription:
      "Modernise enterprise operations with SAP® BTP, Rise with SAP®, and cloud hyperscalers to unlock scalable agility.",
    overview:
      "SAP®'s cloud portfolio is expanding rapidly. Cloud engagements attract modern, high-growth companies and generate subscription-linked recurring revenue alongside implementation fees — the highest LTV model in our portfolio.",
    bullets: [
      "SAP® BTP (Business Technology Platform) advisory and implementation",
      "Rise with SAP® cloud migration and managed services",
      "SAP® SuccessFactors HCM cloud deployment",
      "Integration with hyperscalers (AWS, Azure, Google Cloud)",
      "SAP® Ariba procurement cloud implementation",
    ],
    sideCards: [
      {
        title: "Cloud Platforms",
        chips: [
          "SAP® BTP",
          "Rise with SAP®",
          "SAP® SuccessFactors",
          "SAP® Ariba",
          "AWS",
          "Azure",
          "Google Cloud",
        ],
      },
      {
        title: "Revenue Model",
        text: "Implementation fees + recurring subscription-linked revenue = highest LTV per client.",
      },
    ],
  },
  {
    id: 2,
    number: "02",
    slug: "sap-analytics-reporting",
    tag: "CFO & COO Priority",
    title: "SAP® Analytics & Reporting",
    shortDescription:
      "Actionable executive dashboards, state-wise GSTN compliance, SAC, and BW/4HANA deep financial analytics.",
    overview:
      "Executive decision-makers demand real-time visibility into financial and operational metrics. We build tailored analytics, reconciliation reports, and compliance dashboards that turn SAP® data into actionable intelligence.",
    bullets: [
      "SAP® Analytics Cloud (SAC) dashboard design & implementation",
      "Customised financial and operational reports (FICO, MM, SD, PP)",
      "Inter-company reconciliation and automated reporting",
      "State-wise Trial Balance and statutory GSTN reporting",
      "Forex revaluation, TDS/TCS compliance, and ageing analyses",
    ],
    sideCards: [
      {
        title: "Customised Reports Delivered",
        chips: [
          "Inter-company Reporting",
          "MM/FI Reconciliation",
          "Forex Revaluation",
          "TDS/TCS Compliance",
          "State-wise Trial Balance (GSTN)",
          "Vendor Ageing",
          "Customer Ageing",
        ],
      },
      {
        title: "Key Tools",
        text: "SAP® Analytics Cloud · BW/4HANA · SAP® Fiori · Custom ABAP Reports",
      },
    ],
  },
  {
    id: 3,
    number: "03",
    slug: "sap-integration-services",
    tag: "Enterprise Connectivity",
    title: "SAP® Integration Services",
    shortDescription:
      "Seamless real-time connectivity between SAP® and external platforms via SAP® CPI, PI/PO, REST/SOAP, and MT940.",
    overview:
      "Enterprises operate complex ecosystems of third-party portals, banking interfaces, vendor management systems, and legacy applications. We create rock-solid, real-time integrations that eliminate manual data entry and ensure total data integrity.",
    bullets: [
      "SAP® CPI (Cloud Platform Integration) and PI/PO integration flows",
      "Third-party portal to SAP® master data integration (e.g. VRF portal)",
      "Automated bank reconciliation via MT940 electronic statements",
      "REST and SOAP API development for web and mobile interfaces",
      "BAPI and RFC custom interface development",
    ],
    sideCards: [
      {
        title: "Integration Platforms",
        chips: [
          "SAP® CPI",
          "SAP® PI/PO",
          "REST APIs",
          "SOAP Services",
          "MT940 / EDI",
          "BAPI / RFC",
        ],
      },
      {
        title: "Delivered Example",
        text: "VRF Portal ↔ SAP® Vendor Master: zero manual entry, real-time validation",
      },
    ],
  },
  {
    id: 4,
    number: "04",
    slug: "sap-grc-security-compliance",
    tag: "Regulatory Non-Negotiable",
    title: "SAP® GRC, Security & Compliance",
    shortDescription:
      "Complete SOX, GSTN, and GDPR audit readiness with role engineering, Access Control, and Segregation of Duties (SoD).",
    overview:
      "Regulatory scrutiny and data security requirements leave zero room for compliance failure. We design robust governance, risk, and compliance frameworks that protect your SAP® environment while keeping you audit-ready at all times.",
    bullets: [
      "SAP® Access Control (AC) and Process Control (PC) implementation",
      "Segregation of Duties (SoD) analysis and remediation",
      "Role redesign, user provisioning, and authorization management",
      "Statutory compliance frameworks: SOX, GSTN, GDPR, and Indian GAAP",
      "Internal audit preparation and remediation of audit observations",
    ],
    sideCards: [
      {
        title: "Compliance Coverage",
        chips: [
          "SOX",
          "GDPR",
          "GST / GSTN",
          "Segregation of Duties",
          "Access Control",
          "Process Control",
          "Audit Readiness",
        ],
      },
      {
        title: "Why It Matters",
        text: "Regulatory pressure makes SAP® security a non-negotiable investment — a specialised, high-margin niche with consistent demand.",
      },
    ],
  },
  {
    id: 5,
    number: "05",
    slug: "sap-training-enablement",
    tag: "Scalable & High-Margin",
    title: "SAP® Training & Enablement",
    shortDescription:
      "Structured knowledge transfer and practitioner training by XPMIND Learning Cell for teams, CAs, and business leaders.",
    overview:
      "Software only delivers value when users understand how to leverage it properly. Through the XPMIND Learning Cell, we provide role-specific training, corporate workshops, and practitioner enablement designed around real business processes.",
    bullets: [
      "Customised corporate training programs for end users and power users",
      "Role-based SAP® Fiori and S/4HANA user transition workshops",
      "Finance-focused SAP® training for Chartered Accountants and finance teams",
      "Standard Operating Procedure (SOP) development and documentation",
      "Ongoing knowledge transfer and hypercare enablement",
    ],
    sideCards: [
      {
        title: "Training Formats",
        chips: [
          "Classroom",
          "Virtual / Online",
          "On-site Workshop",
          "Self-paced Materials",
          "Certification Prep",
        ],
      },
      {
        title: "Audience",
        text: "End users · Power users · IT teams · Finance & operations managers",
      },
    ],
  },
  {
    id: 6,
    number: "06",
    slug: "s4hana-upgrade-migration",
    tag: "Time-Bound Market Opportunity",
    title: "S/4HANA Upgrade & Migration",
    shortDescription:
      "Proven 16-week Brownfield system conversion and Greenfield paths with zero historical data loss and ~40% cost efficiency.",
    overview:
      "With SAP® ECC mainstream maintenance ending, moving to S/4HANA is a strategic imperative. We offer a proven, fixed-scope 16-week Brownfield migration that preserves your historical data, custom code, and business processes while modernising your core.",
    bullets: [
      "ECC to S/4HANA Brownfield system conversion (SUM/DMO execution)",
      "Greenfield implementation for complete process reimagining",
      "Finance simplification: New G/L to Universal Journal (ACDOCA) migration",
      "Custom code remediation (ABAP adaptation and HANA optimization)",
      "System sizing, readiness assessments, and post go-live hypercare",
    ],
    sideCards: [
      {
        title: "Why Now?",
        text: "SAP® has announced end of mainstream ECC support. This creates a mandatory, time-bound migration window for thousands of companies globally — making S/4HANA migration one of the highest-demand services in enterprise IT.",
      },
      {
        title: "Migration Paths",
        chips: [
          "Greenfield",
          "Brownfield",
          "Selective Data Transition",
          "Landscape Transformation",
        ],
      },
    ],
  },
  {
    id: 7,
    number: "07",
    slug: "sap-implementation-rollout",
    tag: "End-to-End Delivery",
    title: "SAP® Implementation & Rollout",
    shortDescription:
      "End-to-end multi-entity SAP® rollouts across core modules: FI, CO, SD, MM, PP, QM, HR, and Plant Maintenance.",
    overview:
      "From initial business blueprinting through multi-plant rollouts and cutover, we deliver comprehensive, disciplined SAP® implementations. Our consultants combine deep technical knowledge with CFO-level business understanding.",
    bullets: [
      "End-to-end SAP® implementations across core modules (FI, CO, MM, SD, PP)",
      "Multi-company code, multi-plant rollouts for manufacturing and energy",
      "Business process re-engineering and standardisation",
      "Data migration strategy, cleansing, and cutover execution",
      "Post-implementation review and continuous process improvement",
    ],
    sideCards: [
      {
        title: "Key Focus Areas",
        chips: [
          "S/4HANA Greenfield",
          "Brownfield Conversion",
          "Multi-country Rollout",
          "PMO Governance",
          "Hypercare Support",
        ],
      },
      {
        title: "SAP® Modules",
        text: "FI · CO · SD · MM · PP · QM · HR · PS · AM · PM",
      },
    ],
  },
  {
    id: 8,
    number: "08",
    slug: "application-management-services-ams",
    tag: "Recurring Revenue Cornerstone",
    title: "Application Management Services (AMS)",
    shortDescription:
      "Predictable 99.9% SLA support, dedicated senior consultant pools, incident management, and ongoing process enhancements.",
    overview:
      "AMS is the backbone of a sustainable SAP® practice — delivering predictable uptime, rapid incident resolution, and ongoing enhancements. Our flexible, SLA-backed support models keep your systems operating at peak performance.",
    bullets: [
      "L1, L2, and L3 support across all SAP® functional and technical modules",
      "Flexible engagement models: dedicated team, shared pool, or on-demand tickets",
      "Preventive maintenance, patch applications, and system health checks",
      "Minor enhancements, report customisation, and continuous process tuning",
      "Monthly SLA reporting, governance meetings, and proactive recommendations",
    ],
    sideCards: [
      {
        title: "Delivery Model",
        text: "Offshore · Nearshore · Hybrid",
      },
      {
        title: "Engagement Types",
        chips: [
          "Dedicated Team",
          "Shared Support Pool",
          "On-demand Tickets",
          "24×7 Cover",
          "Business Hours SLA",
        ],
      },
    ],
  },
  {
    id: 9,
    number: "09",
    slug: "sap-centre-of-excellence-coe",
    tag: "Premium Strategic Engagement",
    title: "SAP® Centre of Excellence (CoE)",
    shortDescription:
      "Strategic governance, architecture steering, and long-term capability building that reduces SAP® TCO by 20–35%.",
    overview:
      "A well-structured SAP® CoE transforms IT from a cost centre into a strategic business driver. We partner with executive leadership to establish governance frameworks, define innovation roadmaps, and ensure continuous ROI from your SAP® investment.",
    bullets: [
      "CoE charter design, organizational structure, and governance model",
      "Architecture review board establishment and technology roadmap planning",
      "Demand management, project prioritization, and resource allocation",
      "Vendor management and software asset optimization",
      "Continuous innovation workshops: exploring AI, RPA, and BTP extensions",
    ],
    sideCards: [
      {
        title: "CoE Outcomes",
        chips: [
          "Governance Framework",
          "Innovation Roadmap",
          "Capability Building",
          "Cost Optimisation",
          "Executive Dashboards",
        ],
      },
      {
        title: "Why CoE?",
        text: "Organisations with a mature CoE reduce SAP® total cost of ownership by 20–35% while accelerating innovation cycles.",
      },
    ],
  },
];

export const deliveryMethodology = [
  {
    step: "01",
    title: "Assess",
    description:
      "Thorough business analysis, system readiness review, and gap identification. We diagnose before prescribing.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Blueprint creation, architecture design, and finance-technology alignment with all statutory requirements.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Configuration, custom ABAP development, integration build, and migration tool setup using proven accelerators.",
  },
  {
    step: "04",
    title: "Test",
    description:
      "Rigorous unit testing, SIT, UAT, cutover dress rehearsal, and performance benchmarking on HANA.",
  },
  {
    step: "05",
    title: "Go-Live & Support",
    description:
      "Flawless cutover execution, 4-week dedicated hypercare, war room support, and seamless transition to AMS.",
  },
];
