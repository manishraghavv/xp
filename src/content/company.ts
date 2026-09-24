export interface LeadershipMember {
  initials: string;
  name: string;
  role: string;
  bio: string;
  experience: string;
}

export interface CoreValue {
  title: string;
  description: string;
}

export interface MetricItem {
  number: string;
  title: string;
  description: string;
}

export const companyData = {
  name: "XpmindGlobal",
  legalName: "XpmindGlobal",
  tagline: "Finance minds. SAP® expertise. Real outcomes.",
  description:
    "XpmindGlobal is a specialist SAP® consulting firm founded by Chartered Accountants and SAP®-certified professionals with 20+ years of experience. Serving Manufacturing, FMCG, and Power & Energy.",
  foundedYear: 2004,
  headquarters: {
    office: "Office No. 12110, 12th Floor, Gaur City Mall",
    city: "Greater Noida West",
    district: "Ghaziabad",
    state: "UP",
    pinCode: "201318",
    country: "India",
    fullAddress:
      "Office No. 12110, 12th Floor, Gaur City Mall, Greater Noida West, Ghaziabad, UP - 201318, India",
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.267801831862!2d77.4262106!3d28.5917457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cefcba4128f73%3A0xe54e2bc6825c0e7b!2sGaur%20City%20Mall!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  },
  phones: [
    { label: "Mobile 1", number: "+91 9711011844", href: "tel:+919711011844" },
    { label: "Mobile 2", number: "+91 9910003017", href: "tel:+919910003017" },
    { label: "Landline", number: "120-5106972", href: "tel:01205106972" },
  ],
  email: "info@xpmindglobal.com",
  responseTime: "Within 24 business hours",
  proposalTurnaround: "Proposal within 48 business hours",
  
  story: [
    "XpmindGlobal was founded on a straightforward conviction: most SAP® projects fail not because of technology, but because the consultants don't understand the business deeply enough.",
    "Our founders — a Chartered Accountant with 20+ years in SAP® FICO, a S/4HANA certified implementation specialist, and a senior finance process transformation leader — came together to build a firm that genuinely bridges the gap between enterprise technology and business finance.",
    "Operating from our headquarters in Greater Noida West, India, we serve clients across Manufacturing, FMCG, and Power & Energy — providing SAP® services anchored in real-world business context, not just technical configuration.",
    "Our mission is clear: deliver exceptional SAP® support and development services through excellence, continuous innovation, proactive issue resolution, and long-term partnerships that grow with our clients.",
  ],

  values: [
    {
      title: "Intellectual Depth",
      description:
        "Every engagement is grounded in thorough business analysis, not assumptions. We diagnose before we prescribe.",
    },
    {
      title: "True Partnership",
      description:
        "We stay invested beyond go-live. Our AMS and CoE models are designed for long-term value creation.",
    },
    {
      title: "Speed with Precision",
      description:
        "Reusable accelerators, standardised playbooks, and pre-built templates ensure rapid delivery without compromising quality.",
    },
    {
      title: "Finance-Technology Alignment",
      description:
        "With CA and finance professionals at our core, SAP® configurations always serve broader business and compliance goals.",
    },
    {
      title: "Compliance-Ready Delivery",
      description:
        "Every solution is designed with SOX, GSTN, GDPR, and local statutory compliance baked in from day one.",
    },
  ] as CoreValue[],

  vision: {
    statement:
      "To be the leading SAP® support and process improvement partner — empowering businesses with seamless, innovative solutions for sustained growth and operational excellence.",
    description:
      "We measure our success by the operational resilience and competitive advantage we create for every client we serve.",
  },

  mission: {
    statement:
      "Deliver exceptional SAP® services through excellence, continuous innovation, and long-term partnership.",
    description:
      "We commit to proactive issue resolution, strategic SAP® utilisation, and fostering a culture of employee development. Our goal is always to deliver each project better than the previous — and SUCCEED.",
  },

  metrics: [
    {
      number: "20+",
      title: "Years of SAP® Expertise",
      description:
        "Each senior consultant brings 20–29 years of real-world SAP® and finance experience to every engagement.",
    },
    {
      number: "50+",
      title: "Projects Delivered",
      description:
        "Greenfield implementations, S/4HANA migrations, AMS contracts, and complex module customisations.",
    },
    {
      number: "9",
      title: "SAP® Service Lines",
      description:
        "From S/4HANA migration to cloud BTP, analytics, GRC, AMS, and dedicated Centre of Excellence setups.",
    },
    {
      number: "3",
      title: "Industries Served",
      description:
        "Deep, vertical-specific expertise in Manufacturing, Power & Energy, and FMCG sectors.",
    },
  ] as MetricItem[],

  leadership: [
    {
      initials: "AV",
      name: "Arvind V Sharma",
      role: "Co-Founder · SAP® FICO Lead",
      bio: "Chartered Accountant (CA) and Master in Investment & Financial Analysis (MIFA). Expert in SAP® FICO, Financial Reporting, Business Process Improvement, Statutory Compliance, and Automation across reputed listed companies in India.",
      experience: "20+ Years Experience",
    },
    {
      initials: "NK",
      name: "Naresh Kumar",
      role: "Co-Founder · SAP® Implementation Lead",
      bio: "SAP® S/4HANA Certified Professional (FICO). Wide-ranging experience in SAP® Implementation, Migration, Support, Business Process Automation, and Information Technology across leading organisations.",
      experience: "20+ Years Experience",
    },
    {
      initials: "AL",
      name: "Alok Sharma",
      role: "SAP® S/4HANA Transformation Expert",
      bio: "Expert in SAP® S/4HANA Finance Process Transformation, Greenfield Rollouts, and Global Delivery. Experienced across Oil & Gas, Utilities, Banking, FMCG, and Manufacturing. ISO Auditor and MDM specialist.",
      experience: "29+ Years Experience",
    },
    {
      initials: "SS",
      name: "Sharad Srivastava",
      role: "Strategic Finance Lead",
      bio: "Highly accomplished finance professional specialising in strategic planning, financial analysis, budgeting, and profitability optimisation. Proven ability to drive organisational success at the highest levels of enterprise finance.",
      experience: "26+ Years Experience",
    },
    {
      initials: "IS",
      name: "Ishan Sharma",
      role: "SAP® ABAP Development Expert",
      bio: "SAP® ABAP specialist with deep experience in development, customisation, and optimisation. Skilled in Smart Forms, BAPI, ALV, and enhancing SAP® modules for improved business performance and system efficiency.",
      experience: "Senior SAP® Developer",
    },
    {
      initials: "AK",
      name: "Aakkash Sharrma",
      role: "Business Development & Delivery Lead",
      bio: "25+ years of leadership and techno-functional expertise. Key contributor in setting up business domestically and internationally, with a strong track record in sales, service delivery, and large-scale ERP implementations globally.",
      experience: "25+ Years Experience",
    },
  ] as LeadershipMember[],
};
