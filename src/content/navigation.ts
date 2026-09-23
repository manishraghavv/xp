export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface MegaMenuCategory {
  title: string;
  items: {
    title: string;
    description: string;
    href: string;
    tag: string;
  }[];
}

export const navigationData = {
  mainNav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Training", href: "/training" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],

  migrationCta: {
    label: "ECC → S/4HANA Migration",
    href: "/s4hana-migration",
    highlight: true,
  },

  megaMenu: [
    {
      title: "Core SAP® Transformations",
      items: [
        {
          title: "S/4HANA Upgrade & Migration",
          description: "16-week accelerated Brownfield conversion & Greenfield implementations.",
          href: "/services/s4hana-upgrade-migration",
          tag: "Time-Bound Market Opportunity",
        },
        {
          title: "SAP® Implementation & Rollout",
          description: "End-to-end multi-plant, multi-country enterprise rollouts.",
          href: "/services/sap-implementation-rollout",
          tag: "End-to-End Delivery",
        },
        {
          title: "Application Management Services (AMS)",
          description: "Dedicated SLA support pool, 24x7 coverage, and continuous enhancement.",
          href: "/services/application-management-services-ams",
          tag: "Recurring Cornerstone",
        },
      ],
    },
    {
      title: "Cloud & Analytics",
      items: [
        {
          title: "SAP® Cloud & SaaS Solutions",
          description: "SAP® BTP, Rise with SAP®, SuccessFactors, Ariba, and hyperscalers.",
          href: "/services/sap-cloud-saas-solutions",
          tag: "Fastest Growing Segment",
        },
        {
          title: "SAP® Analytics & Reporting",
          description: "CFO & COO dashboards, SAC, BW/4HANA, and custom financial reports.",
          href: "/services/sap-analytics-reporting",
          tag: "CFO & COO Priority",
        },
        {
          title: "SAP® Integration Services",
          description: "SAP® CPI, PI/PO, REST/SOAP APIs, MT940 banking, and BAPI/RFC.",
          href: "/services/sap-integration-services",
          tag: "Enterprise Connectivity",
        },
      ],
    },
    {
      title: "Governance & Strategic Enablement",
      items: [
        {
          title: "SAP® GRC, Security & Compliance",
          description: "SOX, GSTN, GDPR, Access Control, SoD matrix, and audit readiness.",
          href: "/services/sap-grc-security-compliance",
          tag: "Regulatory Non-Negotiable",
        },
        {
          title: "SAP® Training & Enablement",
          description: "XPMIND Learning Cell corporate training, power user enablement, and SOPs.",
          href: "/services/sap-training-enablement",
          tag: "Scalable Enablement",
        },
        {
          title: "SAP® Centre of Excellence (CoE)",
          description: "Governance, architecture board, cost optimisation, and strategic roadmap.",
          href: "/services/sap-centre-of-excellence-coe",
          tag: "Premium Strategic Engagement",
        },
      ],
    },
  ] as MegaMenuCategory[],

  footerGroups: [
    {
      title: "Services",
      links: [
        { label: "SAP® Cloud & SaaS", href: "/services/sap-cloud-saas-solutions" },
        { label: "SAP® Analytics", href: "/services/sap-analytics-reporting" },
        { label: "GRC & Security", href: "/services/sap-grc-security-compliance" },
        { label: "S/4HANA Migration", href: "/services/s4hana-upgrade-migration" },
        { label: "AMS Support", href: "/services/application-management-services-ams" },
        { label: "ECC → S/4HANA Migration", href: "/s4hana-migration" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Team", href: "/about#leadership" },
        { label: "Case Studies", href: "/projects" },
        { label: "Training", href: "/training" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "+91 9711011844", href: "tel:+919711011844" },
        { label: "+91 9910003017", href: "tel:+919910003017" },
        { label: "120-5106972", href: "tel:01205106972" },
        { label: "info@xpmindglobal.com", href: "mailto:info@xpmindglobal.com" },
      ],
    },
  ],
};
