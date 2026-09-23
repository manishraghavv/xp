# XpmindGlobal Corporate Website

## 1. Stack & Architecture
- **Framework**: Next.js 15+ (App Router, React 19)
- **Language**: TypeScript strict mode (`tsc --noEmit`)
- **Styling**: Tailwind CSS (CSS variables, Hostinger/Infosys design tokens)
- **Animations & Interactivity**: Framer Motion, Lucide React (no emojis anywhere)
- **Forms & Validation**: React Hook Form + Zod, in-memory rate limiting, honeypot protection (`website_bot_trap`), Nodemailer SMTP
- **Typography**: Outfit / Plus Jakarta Sans for headings, Inter for body

## 2. Directory Structure
```
D:\New folder\XP
├── .env.example                # SMTP and environment configuration
├── CLAUDE.md                   # Core project guidelines & specs
├── IMAGE_CREDITS.md            # Photo licenses, photographers & URLs
├── PLAN.md                     # Roadmap and milestone tracking
├── README.md                   # Comprehensive project documentation
├── package.json                # Dependencies and scripts
├── tailwind.config.ts          # Color tokens, radii, shadows, gradients
├── public/
│   ├── xp.png                  # Official logo (white wordmark + amber chevron)
│   └── images/                 # Curated licensed photography (Unsplash/Pexels)
└── src/
    ├── app/
    │   ├── layout.tsx          # RootLayout with JSON-LD schema & FloatingNavbar
    │   ├── page.tsx            # Home page (Hostinger layout rhythm)
    │   ├── about/              # About XpmindGlobal & Leadership
    │   ├── services/           # Services overview & [slug] dynamic routes (9 services)
    │   ├── projects/           # Case studies overview & [slug] dynamic routes (5 projects)
    │   ├── training/           # Training programmes & interest form
    │   ├── s4hana-migration/   # 16-Week ECC→S/4HANA migration showcase
    │   ├── contact/            # 8-Field contact form & coordinates
    │   ├── api/contact/        # Contact form handler
    │   ├── api/training-interest/ # Training registration handler
    │   ├── sitemap.ts          # Dynamic sitemap (all 21 static URLs)
    │   └── robots.ts           # Robots.txt
    ├── components/
    │   ├── layout/             # FloatingNavbar, MenuOverlay, Footer, Breadcrumbs, FloatingBottomBar
    │   ├── ui/                 # PromptBox, PillButton, GlassCard, GlassPanel, ScrollRail, SectionHeading, TwoWaysCardPair, etc.
    │   ├── visuals/            # D1–D8 custom code-built SAP enterprise interactive graphics
    │   └── sections/           # Section modules for pages
    ├── content/                # Verbatim source data (company, services, projects, training, s4hana, navigation, home)
    └── lib/                    # validations.ts, utils.ts, rate-limit.ts
```

## 3. Design Tokens & Visual Direction
- **Backgrounds**:
  - Dark sections (Hero, Migration band, CTA band, Footer): `#04080F` to `#0A1228` mesh gradient with soft blurred cyan/blue/violet orbs.
  - Light sections (Services, Why Us, Industries, Case Studies, About, FAQ, Forms): `#F6F7FB` / `#FFFFFF`.
- **Accent Colors**:
  - Primary Blue: `#3B82F6`
  - Violet: `#7C5CFF`
  - Cyan: `#06B6D4`
  - Logo Amber / Gold: `#F59E0B` / `#FBBF24` (badges and highlights)
- **Borders & Radii**:
  - Cards: `rounded-3xl` (24px to 32px), `border border-slate-200/80` (light) or `border border-white/12` (dark)
  - Pills: `rounded-full` (9999px)
- **Glassmorphism**:
  - Dark: `backdrop-blur-xl bg-white/[0.06] border border-white/14 shadow-2xl`
  - Light: `backdrop-blur-md bg-white/70 border border-slate-900/[0.06] shadow-xl shadow-blue-900/5`
- **Buttons**:
  - Primary: Pill gradient `from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25`
  - Secondary: Pill glass / outline `bg-white/10 hover:bg-white/20 border border-white/20`

## 4. Infosys Floating 3-Part Navbar Spec
The navbar consists of three separate detached floating elements across the top:
1. **Left Group**:
   - Round white button (56–64px diameter, dark navy hamburger icon). Opens fullscreen Menu Overlay.
   - Next to it (16px gap), the XP logo (`/xp.png`, ~40px high).
   - **Theme Adaptation**: Over light sections, the left group sits inside a dark navy glass capsule (`rgba(4,8,15,0.85)`) so the white logo text is always crisp and visible.
2. **Center Pill**:
   - Pill container (`rounded-full`, height ~60px, horizontally centered).
   - Translucent light grey-lavender `rgba(205,210,224,0.72)` with `backdrop-filter: blur(20px) saturate(140%)` and 1px white/20% border.
   - Dark indigo links (#1B1B4B, font-medium, ~17px).
   - Animated pill highlight on hover and active routes.
   - "Services" link opens a 3-column glass dropdown with all 9 services + highlighted S/4HANA migration.
3. **Right Dark Pill**:
   - Pill button (`rgba(10,12,20,0.78)` with blur and 1px white/15% border).
   - White text "Get in Touch" + `MessageSquareText` or `Sparkles` icon.
   - Opens global contact modal.
- **Mobile (< 1024px)**: Center pill hidden. Left has hamburger + logo, right has compact dark contact pill. Bottom sticky CTA bar ("Book Free Assessment").

## 5. Fullscreen Menu Overlay
- Dark glass panel (blur 24px) triggered by hamburger button.
- 3 Columns on desktop:
  - Column 1: Main navigation links (Home, About, Services, Projects, Training, Contact).
  - Column 2: Complete 9-services list with module tags.
  - Column 3: Featured 16-Week Migration card with CTA + direct phone numbers, email, and Greater Noida address.
- Accessible: Focus trap, ESC key close, body scroll lock, screen reader labels.

## 6. Content Verbatim Rule
- **Zero Invention**: Never invent client testimonials, awards, or arbitrary claims not in the source.
- **Strict Symbol Retention**: Every instance of "SAP®" MUST retain the registered trademark symbol "®".
- **Exact Counts**: 21 statically generated pages (7 root + 9 services + 5 case studies).
- **8-Field Contact Form**: First Name, Last Name, Work Email, Phone, Company, Service of Interest (10 options), Current SAP® Landscape (6 options), Message.

## 7. Developer Commands
- Run development server: `npm run dev`
- Run typecheck / lint: `npm run lint` (runs `tsc --noEmit`)
- Run production build: `npm run build`
- Run production server: `npm run start -- -p 3008`
