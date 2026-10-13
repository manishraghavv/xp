"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getGsap } from "@/lib/gsap";
import { useNearViewport } from "@/hooks/useRenderTier";
import { EASE_OUT } from "@/lib/motion";

export interface SequenceCaption {
  /** Scroll progress range [from, to] in 0..1 during which this caption is shown */
  range: [number, number];
  eyebrow?: string;
  title: string;
  text?: string;
}

interface SequenceCanvasProps {
  /** Folder holding /{3840|1920|1280}/f-0001.avif ... and poster.avif|webp */
  base: string;
  frames: number;
  alt: string;
  captions?: SequenceCaption[];
  /** Total scroll distance as a multiple of the viewport height */
  scrollLength?: number;
  className?: string;
}

const AVIF_PROBE =
  "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";

function supportsAvif(): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img.width > 0 && img.height > 0);
    img.onerror = () => resolve(false);
    img.src = AVIF_PROBE;
  });
}

function pickWidth(cssWidth: number): 1280 | 1920 | 3840 {
  const px = cssWidth * Math.min(window.devicePixelRatio || 1, 2);
  if (px <= 1500) return 1280;
  if (px <= 2700) return 1920;
  return 3840;
}

const pad = (n: number) => String(n).padStart(4, "0");

/**
 * Apple-style scroll-scrubbed image sequence. A tall wrapper scrolls while a sticky stage
 * stays on screen; GSAP ScrollTrigger maps scroll progress to a frame drawn on a canvas.
 * Frames preload in chunks (first frame immediately, the rest once near the viewport) at a
 * resolution chosen from viewport width and device pixel ratio. If frames fail to load, or
 * the visitor prefers reduced motion, a static poster is shown instead of the pinned stage.
 */
export function SequenceCanvas({
  base,
  frames,
  alt,
  captions = [],
  scrollLength = 4,
  className,
}: SequenceCanvasProps) {
  const reduced = useReducedMotion();
  const outerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const near = useNearViewport(outerRef, "1200px");

  const images = useRef<(HTMLImageElement | null)[]>([]);
  const ext = useRef<"avif" | "webp">("avif");
  const widthDir = useRef<1280 | 1920 | 3840>(1920);
  const lastDrawn = useRef(-1);
  const state = useRef({ target: 0, current: 0 });

  const [failed, setFailed] = useState(false);
  const [firstReady, setFirstReady] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const [activeCaption, setActiveCaption] = useState(-1);

  const posterBase = `${base}/poster`;

  const draw = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      // nearest already-loaded frame at or before the wanted one, else the nearest after
      let img: HTMLImageElement | null = null;
      let used = index;
      for (let i = index; i >= 0 && !img; i--) {
        if (images.current[i]) {
          img = images.current[i];
          used = i;
        }
      }
      for (let i = index + 1; i < frames && !img; i++) {
        if (images.current[i]) {
          img = images.current[i];
          used = i;
        }
      }
      if (!img || used === lastDrawn.current) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      lastDrawn.current = used;
    },
    [frames]
  );

  // Frame 0 loads right away so the stage never opens blank
  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    (async () => {
      const avif = await supportsAvif();
      if (cancelled) return;
      ext.current = avif ? "avif" : "webp";
      let w = pickWidth(window.innerWidth);
      if (!avif && w === 3840) w = 1920; // WebP fallback is generated up to 1920 wide
      widthDir.current = w;
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (cancelled) return;
        images.current[0] = img;
        setFirstReady(true);
        setLoaded(1);
      };
      img.onerror = () => !cancelled && setFailed(true);
      img.src = `${base}/${w}/f-${pad(1)}.${ext.current}`;
    })();
    return () => {
      cancelled = true;
    };
  }, [base, reduced]);

  // Remaining frames: chunked, started only once the section is near the viewport
  useEffect(() => {
    if (reduced || failed || !firstReady || !near) return;
    let cancelled = false;
    const CHUNK = 8;
    const loadOne = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          images.current[i] = img;
          resolve();
        };
        img.onerror = () => resolve(); // a missing frame just reuses its neighbour
        img.src = `${base}/${widthDir.current}/f-${pad(i + 1)}.${ext.current}`;
      });
    (async () => {
      for (let start = 1; start < frames && !cancelled; start += CHUNK) {
        const batch: Promise<void>[] = [];
        for (let i = start; i < Math.min(start + CHUNK, frames); i++) batch.push(loadOne(i));
        await Promise.all(batch);
        if (!cancelled) setLoaded(Math.min(start + CHUNK, frames));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [base, frames, near, firstReady, reduced, failed]);

  // Canvas sizing: backing store matches the stage x DPR (max 2), capped by source width
  useEffect(() => {
    if (reduced || failed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      lastDrawn.current = -1;
      draw(Math.round(state.current.current * (frames - 1)));
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [draw, frames, reduced, failed, firstReady]);

  // Scroll scrubbing
  useEffect(() => {
    if (reduced || failed || !firstReady) return;
    const outer = outerRef.current;
    if (!outer) return;
    const { gsap, ScrollTrigger } = getGsap();

    const trigger = ScrollTrigger.create({
      trigger: outer,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        state.current.target = self.progress;
      },
    });

    const tick = () => {
      const s = state.current;
      s.current += (s.target - s.current) * 0.18; // light smoothing between scroll steps
      if (Math.abs(s.target - s.current) < 0.0004) s.current = s.target;
      draw(Math.round(s.current * (frames - 1)));
      if (barRef.current) barRef.current.style.transform = `scaleX(${s.current.toFixed(4)})`;
      const idx = captions.findIndex((c) => s.current >= c.range[0] && s.current < c.range[1]);
      setActiveCaption((prev) => (prev === idx ? prev : idx));
    };
    gsap.ticker.add(tick);
    draw(0);

    return () => {
      gsap.ticker.remove(tick);
      trigger.kill();
    };
  }, [draw, frames, captions, reduced, failed, firstReady]);

  const poster = (
    <picture>
      <source srcSet={`${posterBase}.avif`} type="image/avif" />
      <img
        src={`${posterBase}.webp`}
        alt={alt}
        width={2560}
        height={1440}
        decoding="async"
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </picture>
  );

  // Static layout: reduced motion or failed load. Captions become a plain readable list.
  if (reduced || failed) {
    return (
      <div className={className} data-sequence="static">
        <div className="relative aspect-video w-full max-h-[80svh] overflow-hidden">{poster}</div>
        {captions.length > 0 && (
          <ul className="mx-auto mt-8 grid max-w-5xl gap-4 px-4 sm:grid-cols-3 sm:px-6">
            {captions.map((c, i) => (
              <li key={i} className="rounded-3xl border border-white/12 bg-white/[0.06] p-5">
                {c.eyebrow && (
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-cyan">{c.eyebrow}</div>
                )}
                <div className="mt-1 text-lg font-bold text-white">{c.title}</div>
                {c.text && <p className="mt-1 text-sm text-slate-300">{c.text}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div
      ref={outerRef}
      className={className}
      style={{ height: `${scrollLength * 100}svh` }}
      data-sequence="scrub"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Poster sits underneath until the first frame has drawn */}
        {!firstReady && <div className="absolute inset-0">{poster}</div>}
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={alt}
          className="absolute inset-0 h-full w-full"
        />
        {/* Soft edges so the stage melts into neighbouring sections */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0A1030] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A1030] to-transparent" />

        <div className="pointer-events-none absolute inset-0 mx-auto flex max-w-7xl items-end px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
          <AnimatePresence mode="wait">
            {activeCaption >= 0 && (
              <motion.div
                key={activeCaption}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="max-w-xl rounded-3xl border border-white/14 bg-white/[0.06] p-6 text-white shadow-2xl backdrop-blur-xl sm:p-8"
              >
                {captions[activeCaption].eyebrow && (
                  <div className="text-xs font-bold uppercase tracking-widest text-brand-cyan">
                    {captions[activeCaption].eyebrow}
                  </div>
                )}
                <h3 className="mt-2 font-display text-2xl font-bold leading-snug sm:text-3xl">
                  {captions[activeCaption].title}
                </h3>
                {captions[activeCaption].text && (
                  <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                    {captions[activeCaption].text}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scroll progress + load progress */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-6 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center gap-4">
            <div className="h-px flex-1 overflow-hidden rounded-full bg-white/15">
              <div
                ref={barRef}
                className="h-full origin-left bg-gradient-to-r from-brand-blue via-brand-violet to-brand-cyan"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
            {loaded < frames && (
              <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                Loading visuals {Math.round((loaded / frames) * 100)}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
