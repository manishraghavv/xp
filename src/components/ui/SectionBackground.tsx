import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface SectionBackgroundProps {
  variant?: "hero" | "pageHero" | "dark" | "light" | "cta" | "footer";
  image?: string;
  imageAlt?: string;
  className?: string;
  priority?: boolean;
}

export function SectionBackground({
  variant = "dark",
  image,
  imageAlt = "Enterprise Architecture Background",
  className = "",
  priority = false,
}: SectionBackgroundProps) {
  // 1. LIGHT VARIANT
  if (variant === "light") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 pointer-events-none overflow-hidden select-none z-0 light-mesh-bg",
          className
        )}
      >
        {/* Soft atmospheric ambient light glows */}
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-blue-500/[0.07] rounded-full blur-[110px]" />
        <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-purple-500/[0.06] rounded-full blur-[130px]" />
        <div className="absolute -bottom-32 left-1/3 w-[550px] h-[550px] bg-cyan-500/[0.06] rounded-full blur-[120px]" />
      </div>
    );
  }

  // 2. CTA BAND VARIANT (#1B2E7A -> #4C2FBF)
  if (variant === "cta") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 pointer-events-none overflow-hidden select-none z-0 cta-mesh-bg",
          className
        )}
      >
        {/* Ambient glow orbs */}
        <div className="absolute -top-24 -left-20 w-[450px] h-[450px] bg-blue-400/25 rounded-full blur-[100px] animate-drift-1" />
        <div className="absolute -bottom-24 -right-20 w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[110px] animate-drift-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-violet-400/20 rounded-full blur-[90px]" />

        {/* Faint grid overlay */}
        <div
          className="absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
    );
  }

  // 3. FOOTER VARIANT (#0A1030 -> #0D1A4A with glowing gradient top line)
  if (variant === "footer") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 pointer-events-none overflow-hidden select-none z-0 footer-mesh-bg",
          className
        )}
      >
        {/* Glowing top border gradient line (blue -> violet -> cyan) */}
        <div className="absolute top-0 inset-x-0 glowing-divider-line z-10" />

        {/* Deep ambient glow orbs */}
        <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[120px]" />

        {/* Faint subtle grid */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>
    );
  }

  // 4. GENERAL DARK VARIANT (Lighter, richer navy-indigo)
  if (variant === "dark") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 pointer-events-none overflow-hidden select-none z-0 dark-mesh-bg",
          className
        )}
      >
        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/25 rounded-full blur-[120px] animate-drift-1" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[130px] animate-drift-2" />
      </div>
    );
  }

  // 5. HERO & PAGE HERO VARIANTS (Multi-layered rich background)
  const isHomeHero = variant === "hero";
  const defaultPhoto = isHomeHero
    ? "/images/backgrounds/sap-hero.webp"
    : "/images/backgrounds/bg-about-collaboration.jpg";
  const bgPhoto = image || defaultPhoto;

  const homeBlurDataURL =
    "data:image/webp;base64,UklGRoYAAABXRUJQVlA4IHoAAADQAwCdASoUAAsAPzmGuVOvKSWisAgB4CcJbAC06CFxroQKDZ1pEgAA/iWUA6eBNqBj0kobAyMS0scTa9D+dxU5BTPFyFo2dndtwwdR139Hx7+cA7rQEkdLo1aOTyqhJrnn0E49rLkaXmjiY8zWxHbVRX75HMZmoBAgAA==";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden select-none z-0",
        className
      )}
    >
      {/* Layer 1: Rich base gradient (navy-deep -> mid -> royal) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1030] via-[#101B4D] to-[#1B2E7A]" />

      {/* Layer 2: Photo layer (Art-directed for Desktop and Mobile) */}
      {isHomeHero ? (
        <div className="absolute inset-0 opacity-[0.82]">
          {/* Desktop WebP with subtle cinematic slow-zoom */}
          <div className="hidden md:block absolute inset-0">
            <Image
              src="/images/backgrounds/sap-hero.webp"
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              placeholder="blur"
              blurDataURL={homeBlurDataURL}
              className="object-cover object-[center_38%] animate-slow-zoom"
            />
          </div>
          {/* Mobile WebP tuned crop around focal point */}
          <div className="md:hidden absolute inset-0">
            <Image
              src="/images/backgrounds/sap-hero-mobile.webp"
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              placeholder="blur"
              blurDataURL={homeBlurDataURL}
              className="object-cover object-[center_38%]"
            />
          </div>
          {/* Subtle blue tint overlay */}
          <div className="absolute inset-0 bg-[#1B2E7A]/22 mix-blend-soft-light" />
        </div>
      ) : (
        <>
          <div className="absolute inset-0 mix-blend-luminosity opacity-55">
            <Image
              src={bgPhoto}
              alt={imageAlt}
              fill
              priority={priority}
              sizes="100vw"
              className="object-cover object-center scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1030]/65 via-[#101B4D]/60 to-[#0A1030]/90" />
        </>
      )}

      {/* Layer 3: Readability overlay */}
      {isHomeHero ? (
        // Centered Hero Vignette tuned to sap-hero image: >= 7:1 text contrast in center, brighter edges
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(10,16,48,0.58) 0%, rgba(10,16,48,0.86) 100%)",
          }}
        />
      ) : (
        // Left-aligned Hero Scrim (Text readable on left, photo visible on right)
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,16,48,0.94) 0%, rgba(10,16,48,0.72) 48%, rgba(10,16,48,0.22) 100%)",
          }}
        />
      )}

      {/* Layer 4: Soft ambient glow orbs with slow drift animations */}
      {/* Orb 1: Royal Blue Top-Left */}
      <div className="absolute -top-32 -left-20 w-[580px] h-[580px] rounded-full bg-blue-600/30 blur-[130px] animate-drift-1 pointer-events-none" />

      {/* Orb 2: Violet Top-Right */}
      <div className="absolute -top-24 right-0 w-[540px] h-[540px] rounded-full bg-violet-600/25 blur-[125px] animate-drift-2 pointer-events-none" />

      {/* Orb 3: Cyan Bottom-Center */}
      <div className="absolute bottom-12 left-1/3 w-[500px] h-[500px] rounded-full bg-cyan-400/25 blur-[120px] animate-drift-3 pointer-events-none" />

      {/* Layer 5: Subtle grid pattern (masked) */}
      <div
        className="absolute inset-0 opacity-[0.04] [mask-image:radial-gradient(ellipse_80%_60%_at_center,black_40%,transparent_85%)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.2) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Layer 6: 140px bottom fade into the next section */}
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#0A1030] via-[#0A1030]/70 to-transparent pointer-events-none" />
    </div>
  );
}
