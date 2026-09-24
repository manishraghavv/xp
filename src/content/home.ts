export interface TickerItem {
  status: string;
  title: string;
  tag: string;
}

export interface IndustryItem {
  name: string;
  description: string;
}

export interface WhyUsPoint {
  num: string;
  title: string;
  description: string;
}

export const homeData = {
  hero: {
    badge: "Certified S/4HANA Specialists · 20+ Years of SAP® Excellence",
    headline: "Enterprise SAP® Solutions That Drive Growth.",
    subheadline:
      "XpmindGlobal delivers end-to-end SAP® consulting, S/4HANA migration, Cloud BTP, Analytics, GRC, and Application Management Services. Founded by senior Chartered Accountants and SAP® leaders in Greater Noida, India.",
    primaryCta: { label: "Explore Services →", href: "/services" },
    secondaryCta: { label: "Schedule a Consultation", href: "/contact" },
    stats: [
      { number: "20+", label: "Years Expertise" },
      { number: "50+", label: "Projects Delivered" },
      { number: "9", label: "SAP® Service Lines" },
      { number: "S/4HANA", label: "Certified Team" },
    ],
  },

  tickerItems: [
    {
      status: "Live Project",
      title: "S/4HANA Migration",
      tag: "Manufacturing · Solar Energy",
    },
    {
      status: "Delivered",
      title: "Bank Reconciliation Automation",
      tag: "MT940 · Zero Manual Effort",
    },
    {
      status: "Active AMS",
      title: "SAP® FICO + MM Support",
      tag: "99.9% SLA · Multi-entity",
    },
  ] as TickerItem[],

  marqueeServices: [
    "SAP® Cloud & SaaS Solutions",
    "SAP® Analytics & Reporting",
    "SAP® Integration Services",
    "SAP® GRC, Security & Compliance",
    "SAP® Training & Enablement",
    "S/4HANA Upgrade & Migration",
    "SAP® Implementation & Rollout",
    "Application Management Services (AMS)",
    "SAP® Centre of Excellence (CoE)",
    "SAP® FICO · MM · SD · PP · HR",
  ],

  migrationPromo: {
    urgencyBadge: "Limited Project Slots · Act Now",
    headline: "ECC to S/4HANA Brownfield Migration in Just 16 Weeks*",
    description:
      "SAP® will end mainstream maintenance for ECC in December 2027. Our accelerated Brownfield conversion brings your existing ECC system to S/4HANA in 16 weeks* at ~40% lower cost — preserving all data, custom code, and business processes.",
    stats: [
      { val: "16wks*", lbl: "Fastest Delivery" },
      { val: "~40%", lbl: "Cost Savings" },
      { val: "0", lbl: "Data Loss" },
    ],
    features: [
      {
        title: "All Data Preserved",
        desc: "Complete historical database converted in-place with zero data loss.",
      },
      {
        title: "Customisations Retained",
        desc: "Existing ABAP Z-programs and workflows remediated and preserved.",
      },
      {
        title: "Minimal Re-Training",
        desc: "Processes remain familiar; users quickly adopt modern SAP® Fiori UX.",
      },
      {
        title: "Faster Time to Value",
        desc: "Live in months, not years — at a fraction of greenfield reimplementation cost.",
      },
    ],
    urgencyStrip: "SAP® ECC Maintenance Ends 2027 · Secure Your Slot Today",
    ctaPrimary: { label: "See Migration Details →", href: "/s4hana-migration" },
    ctaSecondary: { label: "Book Free Assessment", href: "/contact" },
  },

  whyUs: [
    {
      num: "01",
      title: "Deep SAP® Specialisation",
      description:
        "We do not dilute our focus. Every consultant on our team is dedicated exclusively to the SAP® ecosystem, bringing deep technical and functional knowledge across ECC and S/4HANA.",
    },
    {
      num: "02",
      title: "Finance-First Perspective",
      description:
        "Founded by Chartered Accountants, we see SAP® through a financial lens. We ensure your system delivers accurate reporting, robust internal controls, and real bottom-line value.",
    },
    {
      num: "03",
      title: "Outcome-Focused Delivery",
      description:
        "We measure success by business outcomes — not hours billed. Our fixed-scope deliverables and phase-gated methodologies give you predictability in timeline and cost.",
    },
    {
      num: "04",
      title: "Reusable Accelerators",
      description:
        "Our proprietary library of migration tools, integration templates, and custom reports cuts project timelines by up to 40% compared to building from scratch.",
    },
    {
      num: "05",
      title: "Offshore Advantage",
      description:
        "High-calibre Indian delivery teams working at competitive rates provide round-the-clock coverage, rapid turnaround, and significant cost savings for global clients.",
    },
    {
      num: "06",
      title: "Long-Term Partnership",
      description:
        "We are built for enduring relationships. From initial implementation to ongoing AMS and Centre of Excellence governance, we grow with your business.",
    },
  ] as WhyUsPoint[],

  industries: [
    {
      name: "Manufacturing",
      description:
        "End-to-end production planning, bill of materials management, shop floor integration, standard costing, and supply chain visibility.",
    },
    {
      name: "Power & Energy",
      description:
        "Multi-plant operations, asset management, complex regulatory compliance, project accounting, and high-volume vendor management.",
    },
    {
      name: "FMCG",
      description:
        "Trade spend management, multi-channel distribution, high-volume order-to-cash, batch management, and real-time inventory tracking.",
    },
  ] as IndustryItem[],

  finalCta: {
    headline: "Ready to unlock the full power of SAP® for your business?",
    subheadline:
      "Talk to our senior SAP® consultants today. We'll assess your current landscape and provide an honest, actionable roadmap — no commitment required.",
    primaryCta: { label: "Get a Free Assessment →", href: "/contact" },
    secondaryCta: { label: "View All Services", href: "/services" },
  },
};
