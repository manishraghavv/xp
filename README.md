# XpmindGlobal Corporate Portal

A production-grade, enterprise corporate website for **XpmindGlobal** — specialist SAP® consulting firm (S/4HANA Brownfield conversion, Cloud SaaS, Analytics, GRC, Integration, and AMS) based in Greater Noida, India.

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and modern visual design principles combining the **Hostinger AI Builder page aesthetic** with an **Infosys-style 3-part floating navbar**.

---

## Architecture & Visual System

### 1. Infosys-Style 3-Part Floating Navbar
The navbar floats persistently across all pages at `top-4 sm:top-5` without collapsing into a full-width flat strip:
- **Left Capsule**: Round frosted glass pill with circular hamburger button (`w-11 h-11`) and the white/amber `public/xp.png` brand logo.
  - *Dynamic Logo Contrast Adaptation*: Since `/xp.png` is white text, the left group detects when scrolling over light sections (`data-theme="light"`) and smoothly activates a dark navy glass capsule (`bg-navy-950/85 backdrop-blur-xl border border-slate-700/80 shadow-2xl`) so the logo and brand mark remain crisp and legible at all times.
- **Center Capsule**: Translucent lavender/slate pill (`rgba(205,210,224,0.72)` with `backdrop-blur-xl`) with navigation links (Home, About, Services with 3-column Mega Menu, Projects, Training, S/4HANA Migration, Contact).
- **Right Capsule**: Dark navy glass pill with pill CTA "Get in Touch" triggering the lead intake modal.

### 2. Full-Screen Menu Overlay
Triggered by the circular hamburger button:
- Dark glass panel (`bg-navy-950/95 backdrop-blur-3xl`) with 3 organized columns:
  1. Main Navigation links with icons and active state highlights
  2. All 9 SAP® Service Offerings with direct links
  3. Featured S/4HANA Brownfield Migration card + Corporate Coordinates (Greater Noida, India & London, UK)

### 3. Hostinger AI Builder Page Rhythm
- Alternating dark mesh-gradient sections (Hero, ECC promo bands, CTA bands, footer) and high-clarity light canvas sections (`#F5F8FF` / `#FFFFFF`).
- **Pill UI System**: Eyebrow pill badges with gradient text, `PillButton` primitives with blue-to-cyan gradients and frosted glass variants, and large `rounded-[28px]` / `rounded-[32px]` cards with subtle 1px border lines and multi-stop drop shadows.
- **Interactive Prompt Box**: Hostinger-style prompt input in the Hero with 5 clickable capability chips that pre-populate the interactive inquiry modal.

### 4. 8 Original SAP® Interactive Visual Components
All visuals are custom code-built without relying on external dashboard screenshots:
- `D1_HeroDashboard`: Glass telemetry window + 3 live metric pills (Universal Journal, 99.9% AMS SLA, MT940 auto-recon).
- `D2_FioriTileGrid`: SAP Fiori launchpad-style interactive module tiles (FI, CO, SD, MM, PP, QM, HR, PS).
- `D3_ConversionDiagram`: ECC 6.0 AnyDB to S/4HANA in-memory conversion flow pipeline.
- `D4_RoadmapGantt`: 16-week phase-gated Gantt matrix with clickable week milestones.
- `D5_IntegrationDiagram`: Central S/4HANA core with animated integration rails to CPI, MT940, VRF, and Hyperscalers.
- `D6_ModuleConstellation`: Interactive hexagonal module constellation grid.
- `D7_ReconMockTable`: Live MT940 bank statement reconciliation audit table.
- `D8_GrcShieldMatrix`: GRC security shield with Segregation of Duties (SoD) risk evaluation matrix.

---

## 21 Statically Generated Routes & Pages

Every page is statically pre-rendered (`next build` SSG) with dedicated OpenGraph metadata, JSON-LD schemas, and responsive viewports:

| # | Route | Purpose | Key Visual / Components |
|---|---|---|---|
| 1 | `/` | Corporate Homepage | `D1_HeroDashboard`, `PromptBox`, `ScrollRail`, `TwoWaysCardPair`, `D2_FioriTileGrid`, `D3_ConversionDiagram`, `D6_ModuleConstellation` |
| 2 | `/about` | Company Background, Leadership & Philosophy | Enterprise team imagery, Founder & Principal Consultant cards, Core Values, Office Coordinates |
| 3 | `/services` | SAP® Services Overview (All 9 Practices) | Grid of 9 practice areas with feature pills, metrics, and `service-*.jpg` covers |
| 4 | `/services/sap-cloud-saas-solutions` | Cloud & SaaS Architecture | `D5_IntegrationDiagram`, Cloud hyperscalers, Migration methodology |
| 5 | `/services/sap-analytics-reporting` | SAP Analytics Cloud & BW/4HANA | Interactive KPI cards, executive dashboard architecture |
| 6 | `/services/sap-integration-services` | SAP Integration Suite & BTP CPI | `D5_IntegrationDiagram`, REST/SOAP/RFC endpoints, EDI protocols |
| 7 | `/services/sap-grc-security-consulting` | GRC, Access Control & Cybersecurity | `D8_GrcShieldMatrix`, SoD conflict detection, audit compliance |
| 8 | `/services/sap-training-corporate-enablement` | Enterprise Upskilling & Enablement | 3 training tracks, 6 module syllabi, corporate interest intake |
| 9 | `/services/sap-s4hana-migration-services` | Brownfield 16-Week Conversion | `D3_ConversionDiagram`, `D4_RoadmapGantt`, Universal Journal summary |
| 10 | `/services/sap-implementation-rollouts` | Greenfield & Global Template Rollouts | Multi-plant architecture, localization, cutover management |
| 11 | `/services/sap-ams-support` | 24x7 Application Management Services | `TwoWaysCardPair`, L1-L3 SLA matrix, ITIL-aligned governance |
| 12 | `/services/sap-coe-consulting` | Centre of Excellence Advisory | Governance frameworks, license optimization, architectural roadmaps |
| 13 | `/projects` | Case Studies & Delivery Portfolio | 5 major enterprise implementations with business metrics |
| 14 | `/projects/fund-management-automation` | Fund Management in Real Estate | FM Derivation rules, budget consumption controls, audit logs |
| 15 | `/projects/pr-po-release-strategy` | Multi-Level PR & PO Workflows | Dynamic approval matrices, release strategy automation |
| 16 | `/projects/vrf-portal-integration` | VRF Portal & Vendor Connectivity | `D5_IntegrationDiagram`, BAPI/RFC web services, automated invoice matching |
| 17 | `/projects/sap-implementation-solar-manufacturing` | Multi-Plant Solar Manufacturing | End-to-end MM/PP/QM/SD implementation across 3 manufacturing sites |
| 18 | `/projects/automated-bank-reconciliation-statement` | MT940 Electronic Bank Reconciliation | `D7_ReconMockTable`, BRS auto-matching, bank transaction posting |
| 19 | `/training` | Corporate & Individual Training Programs | Track syllabi, course fees, interactive registration form |
| 20 | `/s4hana-migration` | Dedicated Brownfield Conversion Hub | `D3_ConversionDiagram`, `D4_RoadmapGantt`, `MigrationComparison`, 10 FAQs with FAQPage JSON-LD |
| 21 | `/contact` | Global Inquiries & Office Locations | 8-field enterprise contact form, interactive modal, Greater Noida & London coordinates |

### Supporting Endpoints & System Assets
- `sitemap.xml`: Auto-generated sitemap covering all 21 URLs with dynamic priorities.
- `robots.txt`: Standard crawling directives allowing search engines to index all public routes.
- `404 Not Found`: Branded dark-mesh recovery page with direct shortcuts.
- `api/contact`: Form handler for enterprise inquiries (First Name, Last Name, Work Email, Phone, Company, Service of Interest, SAP Landscape, Message).
- `api/training-interest`: Enrollment request intake for corporate and individual training tracks.

---

## Technical Specifications

- **Framework**: Next.js 15.5.26 (App Router)
- **Node.js**: v18+ recommended (v22 tested)
- **Styling**: Tailwind CSS v3 with customized `@theme` tokens:
  - Deep Navy: `#050B18`, `#0A1628`, `#0F172A`
  - Royal Blue: `#1E40AF`, `#2563EB`, `#3B82F6`
  - Vibrant Cyan: `#06B6D4`, `#22D3EE`
  - Light Mesh Canvas: `#F8FAFC`, `#F5F8FF`
- **Icons**: Lucide React
- **Brand Asset**: `public/xp.png` (white wordmark + amber chevron) preserved verbatim across all headers, footers, and app icons.
- **Images**: 21 curated commercial-use photos from Unsplash documented in `IMAGE_CREDITS.md`.

---

## Getting Started

### 1. Installation
```bash
# Clone the repository
cd "D:\New folder\XP"

# Install dependencies
npm install
```

### 2. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Static Export
```bash
# Type check and build all 21 static pages
npm run build

# Start production server
npm run start
```

---

## Content Editing Guide

All enterprise copy, service descriptions, project case studies, and training curriculum are centrally organized in typed TypeScript files under `src/content/`:
- `src/content/navigation.ts`: Header navigation items, dropdown services, and footer columns.
- `src/content/services.ts`: Detailed specifications for all 9 SAP practices, including scopes, deliverables, and FAQs.
- `src/content/projects.ts`: Complete case study data for all 5 enterprise delivery projects.
- `src/content/training.ts`: Training tracks, course modules, schedules, and duration.
- `src/content/s4hana.ts`: S/4HANA migration urgency, comparison matrix, 16-week timeline, and FAQs.
- `src/content/about.ts`: Corporate story, core values, and leadership bios.

---

## Verification & Quality Assurance

- **Zero Lint / TypeScript Errors**: `npm run lint` passes with 0 warnings.
- **100% Static Page Generation**: All 21 public URLs pre-render at build time (`○` Static / `●` SSG).
- **Responsive Compatibility**: Tested across Mobile (375px), Tablet (768px), and Desktop (1280px+).
- **SEO & Structured Data**: Includes Organization, LocalBusiness, BreadcrumbList, Service, and FAQPage JSON-LD schemas.
