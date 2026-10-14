import { Inter, Outfit } from "next/font/google";

/**
 * Self-hosted fonts. next/font downloads the real WOFF2 variable files at build
 * time, serves them from the same origin, emits `font-display: swap`, preloads
 * the families used in the root layout, and generates a metrics-matched
 * `size-adjust`/`ascent-override` fallback to prevent layout shift (no FOUT
 * reflow, no synthesized bold).
 */
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  // Real weights only — 600/700 are used across the site.
  weight: ["300", "400", "500", "600", "700"],
  adjustFontFallback: true,
});

export const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  // Outfit is a variable font: every one of these is a real loaded weight, so
  // `font-extrabold` renders from the file instead of being faux-bolded.
  weight: ["400", "500", "600", "700", "800", "900"],
  adjustFontFallback: true,
});
