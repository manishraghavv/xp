export interface ProjectDetailItem {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: number;
  slug: string;
  tag: string;
  title: string;
  shortDescription: string;
  overview: string;
  results: string[];
  details: ProjectDetailItem[];
}

export const projectsData: ProjectItem[] = [
  {
    id: 1,
    slug: "fund-management-automation",
    tag: "Finance Automation · Custom Development",
    title: "Fund Management End-to-End Process Automation",
    shortDescription:
      "Automated complex multi-entity fund allocations, cash flow monitoring, and bank postings with zero manual intervention.",
    overview:
      "For a leading conglomerate, manual fund allocation across multiple business units and bank accounts was causing severe reconciliation delays and compliance bottlenecks. XpmindGlobal designed and developed a comprehensive automated Fund Management framework directly inside SAP®.",
    results: [
      "Automated end-to-end fund allocation and monitoring process across business units",
      "Eliminated 95% of manual journal entries through automated posting logic",
      "Real-time cash position and fund availability reporting for executive leadership",
      "Full audit trail and statutory compliance alignment for audit readiness",
      "Reduced monthly closing time for treasury operations from 5 days to 4 hours",
    ],
    details: [
      { label: "SAP® Module", value: "Fund Management (FM), FICO" },
      {
        label: "Key Components",
        value: "Custom Z-Transactions · Workflow Integration · Approval Engine · Posting Automation · Custom Reporting",
      },
      {
        label: "Compliance Outcome",
        value: "SOX-ready audit trail with zero manual intervention",
      },
      { label: "Deployment Scope", value: "Multi-entity enterprise group" },
    ],
  },
  {
    id: 2,
    slug: "pr-po-release-strategy",
    tag: "Materials Management · Enterprise Workflow",
    title: "PR & PO Release Strategy Across 50+ Company Codes",
    shortDescription:
      "Standardised procurement authorization across 50+ entities with multi-tier approval matrices and role-based controls.",
    overview:
      "A multi-national enterprise with 50+ diverse legal entities suffered from fragmented, inconsistent Purchase Requisition and Purchase Order approval chains. We architected and deployed a unified, role-based release strategy across the entire group.",
    results: [
      "Standardised PR and PO release strategies across 50+ company codes globally",
      "Implemented multi-level approval hierarchies based on financial thresholds and cost centres",
      "Significantly reduced procurement cycle times while strengthening internal controls",
      "Role-based authorisation matrix ensuring full Segregation of Duties (SoD) compliance",
    ],
    details: [
      { label: "SAP® Module", value: "Materials Management (MM), Workflow" },
      { label: "Scale", value: "50+ Company Codes · Group-wide deployment" },
      {
        label: "Deliverables",
        value: "Release Strategy Config · Role Matrix · Approval Workflow · Testing · Training",
      },
      { label: "Turnaround", value: "Delivered within 8 weeks with zero business disruption" },
    ],
  },
  {
    id: 3,
    slug: "vrf-portal-integration",
    tag: "Integration Services · Portal Automation",
    title: "VRF Portal Integration & Vendor Master Automation",
    shortDescription:
      "Connected external third-party vendor onboarding portal directly to SAP® Vendor Master with zero manual data entry.",
    overview:
      "Vendor Registration and Feedback (VRF) data collected through a third-party portal previously had to be manually validated, formatted, and re-keyed into SAP®. XpmindGlobal engineered an automated bi-directional API interface with real-time validation rules.",
    results: [
      "Seamless bi-directional integration between third-party VRF portal and SAP® Vendor Master",
      "Eliminated manual vendor onboarding data entry, reducing human error to zero",
      "Real-time data validation and error handling for GSTIN, PAN, and bank details",
      "Automated vendor code generation and notification workflows",
    ],
    details: [
      { label: "Integration Type", value: "Third-party Portal ↔ SAP® Vendor Master" },
      {
        label: "Key Features",
        value: "Automated data creation · Real-time validation · Approval workflow · Duplicate prevention · Audit logging",
      },
      { label: "Middleware / Protocols", value: "SAP® CPI · REST APIs · BAPI / RFC" },
      { label: "Impact", value: "Vendor onboarding reduced from 3 days to under 15 minutes" },
    ],
  },
  {
    id: 4,
    slug: "solar-manufacturing-implementation",
    tag: "Full-Lifecycle ERP · Solar Energy",
    title: "SAP® Implementation — Solar Manufacturing (Multi-Plant)",
    shortDescription:
      "Full lifecycle SAP® deployment across multiple manufacturing facilities from shop floor bill of materials to CFO dashboard.",
    overview:
      "A fast-growing solar energy manufacturer required end-to-end ERP implementation covering shop-floor bill of materials (BOM), production tracking, inventory valuation, and multi-currency financials across multiple state-of-the-art manufacturing plants.",
    results: [
      "End-to-end SAP® ERP implementation across multiple solar manufacturing facilities",
      "Full integration of Production Planning (PP), Materials Management (MM), and Finance (FI)",
      "Real-time manufacturing yield tracking, scrap analysis, and standard costing",
      "Statutory compliance and GSTN-ready reporting implemented from day one of go-live",
    ],
    details: [
      { label: "Industry", value: "Solar Energy & Renewable Manufacturing" },
      { label: "Modules Covered", value: "PP · FI · MM · AA (multi-plant configuration)" },
      { label: "Key Outcome", value: "Shop floor to CFO dashboard — end-to-end integration" },
      { label: "Execution Mode", value: "Fixed-scope rollout with on-site hypercare" },
    ],
  },
  {
    id: 5,
    slug: "bank-reconciliation-automation",
    tag: "Cash & Treasury · Banking Automation",
    title: "Bank Reconciliation Automation via MT940 Electronic Statements",
    shortDescription:
      "Automated statement ingestion, transaction matching, and auto-clearing via MT940 formats across multiple major banks.",
    overview:
      "Manual bank reconciliation across dozens of corporate bank accounts was consuming hundreds of finance hours each month. XpmindGlobal implemented automated MT940 electronic bank statement processing with sophisticated search string rules and automated posting.",
    results: [
      "Automated MT940 electronic bank statement upload and transaction matching",
      "Auto-clearing rate of over 92% on daily transaction volumes",
      "Eliminated manual statement reconciliation, cutting finance team month-end workload by 70%",
      "Real-time visibility into cash balances across all banking partners",
    ],
    details: [
      { label: "Technology Used", value: "MT940 Electronic Bank Statements, SAP® Treasury" },
      {
        label: "Automation Scope",
        value: "Statement upload · Transaction matching · Exception handling · Posting · Month-end close",
      },
      { label: "Accuracy", value: "92%+ automated matching rate on first pass" },
      { label: "Closing Benefit", value: "Daily cash position available by 9:30 AM" },
    ],
  },
];
