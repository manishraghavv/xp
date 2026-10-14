# UI Progress

Plain-text progress note for the website UI work. Updated on the commit that adds it.

## Done so far
- Foundation: self-hosted fonts, shared type scale, hover and hero tokens, glass styles, AVIF/WebP and 2K to 4K image sizes, ignore rules for local reference folders and env files.
- Home hero: background video chosen by breakpoint (1080p, 720p, mobile square) over a poster image, word-drop headline, hidden page scrollbar.
- Assets: the three sap-cloud-erp-bg videos added; old s1, xp and xp2 clips removed (nothing references them).
- Shared text and hero components: AnimatedText, SectionHeader and PageHero, used by every inner page and every detail page, with a layered blue gradient hero background controlled by --hero-* variables and a crisp bottom edge.
- Hover system: shared card-interactive component and tokens applied to home telemetry, cockpit tiles, service pages, integration diagram, projects, footer and floating buttons; reusable TabPills for the Module Constellation with debounced hover preview and tooltips.
- Navbar: Services dropdown opens on hover and keyboard focus (CSS), mobile accordion in the menu, one consistent active pill.
- Content migration and forms: Careers apply flow and Remote stat, contact and training forms, validation, sitemap, CTA bands.

## Not done yet
1. Roll out the word-drop text animation and the clearer hero background to all inner pages (audit every route; About and Projects first). Status: implemented through PageHero and SectionHeader in this commit set; still needs a visual review on the live site.
2. Hero bottom: remove the white or milky fade and restore the light-blue gradient look with a clean bottom edge on all inner pages except Home. Status: implemented in PageHero; still needs a visual review on the live site.
3. Home Module Constellation: hover effects on tabs and cards and the hover preview of module details. Status: implemented with TabPills; still needs a visual review on the live site.
4. Scroll-triggered text animation for all text on Home and every page, in three tiers: word drop, fast word drop and block drop, through shared components. Only headings and eyebrows use it today.
5. Replace hero images narrower than 1920 px with higher-resolution versions (the nine service-*.jpg and five case-*.jpg files are 1000 px wide).
6. Verify which video file loads at each breakpoint (1080p desktop, 720p tablet, mobile square on phones).

## How to run
- Install: npm install (or npm ci for a clean install)
- Development: npm run dev
- Lint (emoji check plus next lint): npm run lint
- Type check: npx tsc --noEmit
- Production build: npm run build
- Production server: npm run start -- -p 3008
