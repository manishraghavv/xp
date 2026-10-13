export interface CareerPath {
  id: string;
  tag: string;
  title: string;
  description: string;
  idealFor: string;
  bullets: string[];
  cta: string;
  applyAs: ApplyAs;
}

export type ApplyAs = "Freelancer" | "Full-Time" | "Fresher";

export interface CareerFaq {
  id: number;
  question: string;
  answer: string;
}

export const careersData = {
  hero: {
    badge: "We're Hiring · Freelance · Full-Time · Freshers",
    titleLead: "Build your SAP®",
    titleAccent: "career with seasoned experts.",
    subtitle:
      "Whether you're a seasoned SAP® freelancer, an experienced consultant looking for your next full-time role, or a fresher ready to start in SAP® — XpmindGlobal wants to hear from you. Work on S/4HANA migrations, implementations, AMS and custom development alongside senior CA and SAP®-certified leaders.",
    primaryCta: "Apply Now — Upload CV",
    secondaryCta: "Explore Opportunities",
    stats: [
      { number: "3", label: "Ways to Join" },
      { number: "20+", label: "SAP® Areas" },
      { number: "50+", label: "Projects Delivered" },
      { number: "Remote", label: "& Hybrid Friendly" },
    ],
    cards: [
      {
        title: "Freelance Network",
        line1: "S/4HANA · FICO · MM · SD",
        line2: "Project, hourly & monthly engagements",
      },
      {
        title: "Full-Time",
        line1: "Functional & Technical Roles",
        line2: "Implementation · AMS · Migration",
      },
      {
        title: "Freshers",
        line1: "SAP® Launchpad",
        line2: "CAs · MBAs · Engineers",
      },
    ],
    modules: [
      "SAP® FICO",
      "SAP® MM",
      "SAP® SD",
      "SAP® PP · QM · PM",
      "SAP® ABAP",
      "SAP® Basis",
      "SAP® BTP & CPI",
      "SAP® GRC",
      "SuccessFactors",
      "S/4HANA Migration",
    ],
  },

  paths: {
    eyebrow: "Choose Your Path",
    title: "Three ways to work with us.",
    highlight: "work with us.",
    subtitle:
      "One simple application. Tell us how you'd like to engage, and we'll match you to the right opportunities as they open.",
    items: [
      {
        id: "freelance",
        tag: "Path 01",
        title: "Freelance & Contract Consultants",
        description:
          "Join our SAP® talent network and get considered for implementation, rollout, migration, AMS and enhancement assignments — on terms that fit your schedule.",
        idealFor: "Independent SAP® consultants · 3+ years experience",
        bullets: [
          "Project-based, hourly or monthly contracts",
          "Remote, hybrid or on-site assignments",
          "Functional, technical & techno-functional roles",
          "Transparent commercials agreed upfront",
          "Repeat work with a long-term delivery partner",
        ],
        cta: "Join Freelance Network",
        applyAs: "Freelancer",
      },
      {
        id: "full-time",
        tag: "Path 02",
        title: "Full-Time Professionals",
        description:
          "Grow with a consulting firm built by Chartered Accountants and S/4HANA-certified leaders — where you learn the business behind every configuration.",
        idealFor: "Experienced SAP® consultants, developers & leads",
        bullets: [
          "End-to-end S/4HANA implementation & migration exposure",
          "Direct mentoring from 20+ year SAP® veterans",
          "Multi-industry work: Manufacturing, FMCG, Energy",
          "Client-facing ownership from early on",
          "Clear growth path to lead & architect roles",
        ],
        cta: "Apply for Full-Time",
        applyAs: "Full-Time",
      },
      {
        id: "freshers",
        tag: "Path 03",
        title: "Freshers & Graduates",
        description:
          "Starting out? Freshers and career-switchers with a finance, commerce or engineering background can begin their SAP® journey with us.",
        idealFor: "Fresh CAs · MBAs · B.Com / B.Tech · Career switchers",
        bullets: [
          "Structured onboarding into SAP® fundamentals",
          "Learn with our XPMIND Learning Cell content",
          "Hands-on support work under senior guidance",
          "Internship & trainee opportunities",
          "Business-first mindset, not just transactions",
        ],
        cta: "Apply as Fresher",
        applyAs: "Fresher",
      },
    ] as CareerPath[],
  },

  whyUs: {
    eyebrow: "Why XpmindGlobal",
    title: "More than a job. A career partner.",
    highlight: "A career partner.",
    subtitle:
      "We're a senior-led team, which means you learn from people who've delivered SAP® for two decades — not from a slide deck.",
    cards: [
      {
        title: "Learn From Veterans",
        description:
          "Work alongside Chartered Accountants and S/4HANA-certified consultants with 20–29 years of hands-on SAP® and finance experience.",
      },
      {
        title: "Real Project Exposure",
        description:
          "Brownfield migrations, greenfield implementations, AMS, GRC and custom ABAP development — the work that builds a strong SAP® CV.",
      },
      {
        title: "Flexible Engagement",
        description:
          "Freelance, contract or full-time; remote, hybrid or on-site. We shape the engagement around the project and your availability.",
      },
      {
        title: "Finance-First Thinking",
        description:
          "Understand the P&L impact of what you configure. Our finance-led approach makes you a more valuable consultant in every client room.",
      },
      {
        title: "Continuous Learning",
        description:
          "Access to XPMIND Learning Cell programmes, reusable accelerators and knowledge sessions to keep your skills ahead of the market.",
      },
      {
        title: "Long-Term Relationships",
        description:
          "We build lasting teams. Great freelancers get repeat assignments; great employees get bigger responsibilities.",
      },
    ],
  },

  skills: {
    eyebrow: "Skills in Demand",
    title: "Who we're looking for.",
    highlight: "looking for.",
    subtitle:
      "Don't see your exact module? Apply anyway — our requirements change with every new project.",
    groups: [
      {
        title: "Functional",
        tags: ["FICO", "MM", "SD", "PP", "QM", "PM", "PS", "EWM", "SuccessFactors", "Ariba"],
      },
      {
        title: "Technical",
        tags: [
          "ABAP / RAP",
          "Fiori / UI5",
          "Basis",
          "Security & GRC",
          "HANA",
          "Workflow",
          "Smart Forms / Adobe",
        ],
      },
      {
        title: "Cloud, Data & Leadership",
        tags: [
          "BTP",
          "CPI / PI-PO",
          "SAC",
          "BW/4HANA",
          "S/4HANA Migration",
          "Solution Architects",
          "PMO / Project Managers",
        ],
      },
    ],
  },

  howItWorks: {
    eyebrow: "How It Works",
    title: "From application to first assignment.",
    highlight: "first assignment.",
    steps: [
      {
        title: "Apply",
        description: "Share your details and upload your CV — takes about 2 minutes.",
      },
      {
        title: "Profile Review",
        description: "Our team reviews your SAP® skills, experience and preferences.",
      },
      {
        title: "Conversation",
        description: "A short call with a senior consultant to understand your strengths.",
      },
      {
        title: "Match",
        description: "We share suitable roles or projects as they open up.",
      },
      {
        title: "Onboard",
        description: "Agree terms, get onboarded and start delivering.",
      },
    ],
  },

  faqs: {
    eyebrow: "FAQs",
    title: "Questions from candidates.",
    highlight: "candidates.",
    items: [
      {
        id: 1,
        question: "Is there a specific job opening, or is this a general application?",
        answer:
          "Both. We regularly have requirements across implementation, migration and AMS projects. When there's no immediate match, your profile stays in our talent database and we reach out as soon as a suitable role or project opens.",
      },
      {
        id: 2,
        question: "I'm a fresher with no SAP® experience. Can I still apply?",
        answer:
          "Yes. We welcome fresh CAs, MBAs, commerce and engineering graduates who want to build a career in SAP®. Select \"Fresher\" in the application form and tell us about your qualification and interests.",
      },
      {
        id: 3,
        question: "How do freelance engagements work?",
        answer:
          "Freelance consultants are engaged per project — on a fixed-scope, hourly or monthly basis depending on the assignment. Scope, duration, work mode and commercials are agreed with you before any work begins.",
      },
      {
        id: 4,
        question: "Do you charge candidates any fee?",
        answer:
          "No. XpmindGlobal never charges candidates for applications, interviews or placements. If anyone asks you for money in our name, please report it to info@xpmindglobal.com.",
      },
      {
        id: 5,
        question: "How will my data and CV be used?",
        answer:
          "Your details are used only to evaluate you for opportunities with XpmindGlobal and its projects. We do not sell or publicly share your CV. You can request deletion of your data anytime by emailing info@xpmindglobal.com.",
      },
      {
        id: 6,
        question: "How soon will I hear back?",
        answer:
          "Every application is reviewed. If your profile matches a current requirement, we typically reach out within a few business days. Otherwise, we'll contact you when a relevant opportunity comes up.",
      },
    ] as CareerFaq[],
  },

  finalCta: {
    eyebrow: "Your Next Move",
    headline: "Ready to grow your SAP® career with us?",
    buttonText: "Apply Now — Upload CV",
  },

  modal: {
    title: "Apply to XpmindGlobal",
    intro:
      "Share your profile and CV — takes about 2 minutes. Our talent team reviews every application and reaches out when a matching opportunity opens.",
    success:
      "Application received! Thank you — our team will review your profile and contact you when there's a suitable match.",
    applyAsOptions: [
      { value: "Freelancer", label: "Freelancer", sub: "Project / Contract" },
      { value: "Full-Time", label: "Full-Time", sub: "Experienced" },
      { value: "Fresher", label: "Fresher", sub: "Graduate / Intern" },
    ],
    sapAreas: [
      "SAP® FICO",
      "SAP® MM",
      "SAP® SD",
      "SAP® PP",
      "SAP® PM",
      "SAP® QM",
      "SAP® PS",
      "SAP® EWM / WM",
      "SAP® HCM / SuccessFactors",
      "SAP® ABAP",
      "SAP® Basis / Security",
      "SAP® GRC",
      "SAP® BW / BI / SAC",
      "SAP® BTP / CPI / Integration",
      "SAP® Fiori / UI5",
      "SAP® Ariba",
      "S/4HANA Migration",
      "SAP® Project / Program Management",
      "Not yet — looking to start in SAP®",
      "Other",
    ],
    experience: [
      "Fresher (0 years)",
      "Less than 2 years",
      "2–5 years",
      "5–10 years",
      "10–15 years",
      "15+ years",
    ],
    availability: [
      "Immediate",
      "Within 15 days",
      "Within 30 days",
      "30–60 days",
      "60–90 days",
      "Part-time / weekends only",
    ],
    workModes: ["Remote", "Hybrid", "On-site (India)", "On-site (International)", "Open to any"],
    consent:
      "I agree that XpmindGlobal may store my details and CV to contact me about current and future opportunities. I can ask for my data to be deleted anytime by writing to info@xpmindglobal.com.",
  },
};
