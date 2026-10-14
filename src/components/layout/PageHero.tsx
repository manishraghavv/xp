import React from "react";
import Image from "next/image";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { AnimatedText, countWords } from "@/components/ui/AnimatedText";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  image: string;
  imageAlt: string;
  /** Native pixel size of the image. The picture is never displayed larger than this. */
  imageSize: [number, number];
  /** Focus point of the image (CSS object-position), set through --hero-pos. */
  pos?: string;
  /** Share of the hero width the picture covers on desktop (default 100%). */
  imageWidth?: string;
  /** Per-page tuning, all through the --hero-* variables. */
  tintLeft?: number;
  tintMid?: number;
  tintRight?: number;
  glow?: number;
  photoOpacity?: number;
  /** Violet-leaning variant of the same layer stack. */
  variant?: "blue" | "violet";
  crumbs: BreadcrumbItem[];
  /** A pill badge. A string gets the default pill; a node is rendered as is. */
  badge?: React.ReactNode;
  badgeTone?: "cyan" | "amber";
  title: string;
  highlight?: string;
  intro?: string[];
  /** Buttons, chips, stats: revealed together after the intro. */
  children?: React.ReactNode;
  /** Full-width content below the text block (for example a diagram). */
  below?: React.ReactNode;
  textWidth?: "3xl" | "4xl";
  className?: string;
}

const H1_BASE = 0.25;
const H1_STAGGER = 0.07;

/**
 * The single page hero: breadcrumb (slides down), badge, h1 (word-drop), intro
 * (word-drop, starts after the h1), then buttons or stats. All CSS driven.
 */
export function PageHero({
  image,
  imageAlt,
  imageSize,
  pos = "50% 40%",
  imageWidth,
  tintLeft,
  tintMid,
  tintRight,
  glow,
  photoOpacity,
  variant = "blue",
  crumbs,
  badge,
  badgeTone = "cyan",
  title,
  highlight,
  intro = [],
  children,
  below,
  textWidth = "3xl",
  className,
}: PageHeroProps) {
  const titleWords = countWords(title);
  const h1End = H1_BASE + titleWords * H1_STAGGER;
  const introWords = intro.reduce((n, p) => n + countWords(p), 0);
  // Keep the whole intro under about 1.6s however long it is.
  const introStagger = introWords > 0 ? Math.min(0.024, 1.6 / introWords) : 0.024;
  const introStart = h1End + 0.15;
  let cursor = 0;
  const introRuns = intro.map((p) => {
    const run = { text: p, base: introStart + cursor * introStagger };
    cursor += countWords(p);
    return run;
  });
  const restDelay = (introWords > 0 ? introStart + introWords * introStagger : h1End) + 0.5;

  const style = {
    "--hero-pos": pos,
    "--hero-img-w": `${imageSize[0]}px`,
    "--hero-img-h": `${imageSize[1]}px`,
    ...(imageWidth ? { "--hero-img-frac": imageWidth } : {}),
    ...(tintLeft !== undefined ? { "--hero-tint-left": tintLeft } : {}),
    ...(tintMid !== undefined ? { "--hero-tint-mid": tintMid } : {}),
    ...(tintRight !== undefined ? { "--hero-tint-right": tintRight } : {}),
    ...(glow !== undefined ? { "--hero-glow": glow } : {}),
    ...(photoOpacity !== undefined ? { "--hero-photo-opacity": photoOpacity } : {}),
  } as React.CSSProperties;

  return (
    <section data-theme="dark" className={cn("page-hero", variant === "violet" && "page-hero--violet", className)} style={style}>
      <div className="page-hero-bg" aria-hidden="true">
        <div className="page-hero-img">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            quality={85}
            sizes={`(max-width: ${imageSize[0]}px) 100vw, ${imageSize[0]}px`}
            className="object-cover"
            style={{ objectPosition: "var(--hero-pos)" }}
          />
        </div>
        <div className="page-hero-tint" />
        <div className="page-hero-band" />
        <div className="page-hero-shade" />
        <div className="page-hero-edge" />
      </div>

      <div className="page-hero-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="hero-crumb">
          <Breadcrumbs items={crumbs} theme="dark" className="mb-8" />
        </div>

        <div className={cn("space-y-5", textWidth === "4xl" ? "max-w-4xl" : "max-w-3xl")}>
          {badge && (
            <div className="hero-fade" style={{ "--d": "0.1s" } as React.CSSProperties}>
              {typeof badge === "string" ? (
                <span
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider",
                    badgeTone === "amber"
                      ? "bg-amber-500/15 border-amber-500/30 text-amber-400"
                      : "bg-cyan-500/10 border-cyan-500/25 text-cyan-300"
                  )}
                >
                  {badge}
                </span>
              ) : (
                badge
              )}
            </div>
          )}

          <AnimatedText
            as="h1"
            text={title}
            highlight={highlight}
            base={H1_BASE}
            stagger={H1_STAGGER}
            className="page-hero-h1 font-display text-[clamp(2rem,8.5vw,3rem)] md:text-6xl font-black tracking-tight leading-[1.1]"
          />

          {introRuns.map((run, i) => (
            <AnimatedText
              key={i}
              as="p"
              text={run.text}
              base={run.base}
              stagger={introStagger}
              className="page-hero-p text-base sm:text-xl text-slate-200 leading-relaxed font-normal"
            />
          ))}

          {children && (
            <div
              className="hero-fade space-y-6"
              style={{ "--d": `${restDelay}s` } as React.CSSProperties}
            >
              {children}
            </div>
          )}
        </div>

        {below && (
          <div
            className="hero-fade mt-14"
            style={{ "--d": `${restDelay + 0.15}s` } as React.CSSProperties}
          >
            {below}
          </div>
        )}
      </div>
    </section>
  );
}
