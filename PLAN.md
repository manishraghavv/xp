# XpmindGlobal Corporate Website — Implementation Plan (PLAN.md)

## 1. Project Overview & Architecture
- **Framework**: Next.js 15+ (App Router) + TypeScript (strict mode)
- **Styling**: Tailwind CSS with design tokens defined via CSS variables in `globals.css`
- **Visual Design**: Infosys-inspired enterprise layout with alternating light (#F5F8FF / #FFFFFF) and dark navy mesh sections, paired with sophisticated glassmorphism:
  - Dark navy mesh-gradient glass sections for: Hero, ECC→S/4HANA promo band, CTA bands, and rich footer.
  - Light sections (#F5F8FF / #FFFFFF) for: Services, Why-Us, Industries, Case Studies, About, Leadership, FAQ, and Forms.
  - Frosted "light glass" cards (`rgba(255,255,255,0.65)`, `blur(16px)`, `1px` subtle border, soft blue-tinted shadow).
  - Sticky glass header with scroll progress bar.
- **Brand & Logo**: `public/xp.png` (white lettering with golden chevron #F59E0B) rendered on dark glass chips on light backgrounds and transparent glass on dark backgrounds.
- **Animation**: Framer Motion respecting `prefers-reduced-motion`.
- **Forms**: React Hook Form + Zod, with honeypot and in-memory rate limiting.
- **Email Delivery**: Server Route Handlers (`/api/contact`, `/api/training-interest`) via Nodemailer/Resend with `.env.local` support and `.env.example`.

---

## 2. Sitemap (21 Statically Generated Routes)
1. `/` (Home)
2. `/about` (About Us)
3. `/services` (Services Overview)
4. `/services/sap-cloud-saas-solutions` (Service 1)
5. `/services/sap-analytics-reporting` (Service 2)
6. `/services/sap-integration-services` (Service 3)
7. `/services/sap-grc-security-compliance` (Service 4)
8. `/services/sap-training-enablement` (Service 5)
9. `/services/s4hana-upgrade-migration` (Service 6)
10. `/services/sap-implementation-rollout` (Service 7)
11. `/services/application-management-services-ams` (Service 8)
12. `/services/sap-centre-of-excellence-coe` (Service 9)
13. `/projects` (Case Studies Overview)
14. `/projects/fund-management-automation` (Project 1)
15. `/projects/pr-po-release-strategy` (Project 2)
16. `/projects/vrf-portal-integration` (Project 3)
17. `/projects/solar-manufacturing-implementation` (Project 4)
18. `/projects/bank-reconciliation-automation` (Project 5)
19. `/training` (XPMIND Learning Cell)
20. `/s4hana-migration` (ECC → S/4HANA Brownfield Migration)
21. `/contact` (Contact & Coordinates)

Plus:
- Custom 404 (`/not-found`)
- `/sitemap.xml` (`src/app/sitemap.ts`)
- `/robots.txt` (`src/app/robots.ts`)
- Dynamic OG image (`src/app/opengraph-image.tsx`)
- Favicon / Apple-touch-icon (`src/app/icon.tsx`, `src/app/apple-icon.tsx`)

---

## 3. Component List & Directory Structure
```
/src
  /app
    /api
      /contact/route.ts
      /training-interest/route.ts
    /about/page.tsx
    /contact/page.tsx
    /projects
      /page.tsx
      /[slug]/page.tsx
    /services
      /page.tsx
      /[slug]/page.tsx
    /s4hana-migration/page.tsx
    /training/page.tsx
    favicon.ico
    globals.css
    layout.tsx
    not-found.tsx
    opengraph-image.tsx
    page.tsx
    robots.ts
    sitemap.ts
  /components
    /layout
      Header.tsx
      MegaMenu.tsx
      MobileDrawer.tsx
      Footer.tsx
      Breadcrumbs.tsx
      ScrollProgress.tsx
      FloatingActions.tsx
      GetInTouchModal.tsx
    /ui
      GlassCard.tsx
      GlassButton.tsx
      Badge.tsx
      SectionHeading.tsx
      StatCounter.tsx
      Accordion.tsx
      Tabs.tsx
    /sections
      HeroSection.tsx
      TickerBand.tsx
      MigrationPromo.tsx
      WhyUsSection.tsx
      ServicesGrid.tsx
      IndustryRail.tsx
      CaseStudiesGrid.tsx
      CtaBand.tsx
      ContactForm.tsx
      TrainingForm.tsx
  /content
    company.ts
    home.ts
    navigation.ts
    projects.ts
    s4hana.ts
    services.ts
    training.ts
  /lib
    rate-limit.ts
    validations.ts
```

---

## 4. Design Tokens & CSS Variables
- `--bg-canvas`: `#FFFFFF`
- `--bg-canvas-alt`: `#F5F8FF`
- `--bg-navy-deep`: `#04080F`
- `--bg-navy-surface`: `#0D1830`
- `--bg-navy-surface2`: `#111F3A`
- `--color-blue`: `#1A56DB`
- `--color-blue-light`: `#3B82F6`
- `--color-cyan`: `#06B6D4`
- `--color-amber`: `#F59E0B`
- `--text-primary-dark`: `#0B1220`
- `--text-muted-dark`: `#475569`
- `--text-primary-light`: `#F8FAFC`
- `--text-muted-light`: `#94A3B8`
- `--glass-light-bg`: `rgba(255, 255, 255, 0.70)`
- `--glass-light-border`: `rgba(226, 232, 240, 0.8)`
- `--glass-light-shadow`: `0 10px 30px -10px rgba(26, 86, 219, 0.08)`
- `--glass-dark-bg`: `rgba(13, 24, 48, 0.65)`
- `--glass-dark-border`: `rgba(59, 130, 246, 0.15)`
- `--glass-dark-shadow`: `0 10px 40px -10px rgba(0, 0, 0, 0.5)`

---

## 5. Execution Steps
1. Project scaffolding in `d:\New folder\XP` (preserving `public/xp.png`), installing Next.js, React 19/18, Tailwind CSS, Lucide React, Framer Motion, React Hook Form, Zod, Nodemailer.
2. Configure Tailwind, Google Fonts (`Outfit` for headings, `Inter` for body), CSS variables, and design tokens.
3. Generate typed content files in `/src/content/*.ts` with 100% exact text from the source site.
4. Build UI primitives and Layout: Header, MegaMenu, MobileDrawer, Footer, Breadcrumbs, ScrollProgressBar, FloatingActions, and GetInTouchModal. Run lint & build.
5. Build Home page (`/`). Run lint & build.
6. Build About (`/about`) and Contact (`/contact`) with 8-field form and Google Map card. Run lint & build.
7. Build Services overview (`/services`) and 9 static service detail pages (`/services/[slug]`). Run lint & build.
8. Build Projects overview (`/projects`) and 5 static project detail pages (`/projects/[slug]`). Run lint & build.
9. Build Training (`/training`) with preselection trigger. Run lint & build.
10. Build S/4HANA Migration (`/s4hana-migration`) with 5-phase timeline, comparison matrix, 6 scope cards, 6 why cards, and 10 FAQs with FAQPage JSON-LD. Run lint & build.
11. Build API routes (`/api/contact`, `/api/training-interest`), sitemap, robots, OG image, custom 404, README.md, and run content verification script.
12. Final full QA, lint, typecheck, build, and summary.
