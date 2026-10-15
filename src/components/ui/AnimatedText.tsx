import React from "react";

type Tag = "span" | "h1" | "h2" | "h3" | "p" | "div";

interface AnimatedTextProps {
  text: string;
  /** Optional phrase inside `text` that gets the flowing gradient treatment. */
  highlight?: string;
  as?: Tag;
  className?: string;
  /** Seconds before the first word starts (load-triggered mode). */
  base?: number;
  /** Seconds between words (load-triggered mode). */
  stagger?: number;
  /** Animation order index of the first word. */
  startIndex?: number;
  /** Trigger on scroll (CSS view timeline) instead of on load. */
  scroll?: boolean;
  /**
   * Scroll tier: 1 = word drop (blur, 2% cascade), 2 = fast word drop (no blur, 1%
   * cascade). Tier 2 text over MAX_FAST_WORDS is not split: it drops in as one block.
   */
  tier?: 1 | 2;
}

export const MAX_FAST_WORDS = 60;

interface Token {
  word: string;
  gradient: boolean;
  gi: number;
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function tokenize(text: string, highlight?: string): Token[] {
  const split = (s: string, gradient: boolean): Token[] =>
    s
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word, gi) => ({ word, gradient, gi }));

  if (highlight && text.includes(highlight)) {
    const at = text.indexOf(highlight);
    return [
      ...split(text.slice(0, at), false),
      ...split(highlight, true),
      ...split(text.slice(at + highlight.length), false),
    ];
  }
  return split(text, false);
}

/**
 * The single word-drop text component. Words are split at render time (no client
 * JavaScript) and animated by CSS: from above, in order, on load, or on scroll
 * through a view() timeline where supported. The real sentence is exposed once to
 * assistive tech; the split spans are aria-hidden.
 */
export function AnimatedText({
  text,
  highlight,
  as = "span",
  className,
  base = 0.25,
  stagger = 0.07,
  startIndex = 0,
  scroll = false,
  tier = 1,
}: AnimatedTextProps) {
  const Component = as;
  const tokens = tokenize(text, highlight);

  // Long tier 2 text is too many spans: fall back to one cheap block drop.
  if (scroll && tier === 2 && tokens.length > MAX_FAST_WORDS) {
    return (
      <Component className={[className, "reveal-3"].filter(Boolean).join(" ")}>{text}</Component>
    );
  }

  return (
    <Component className={className}>
      <span className="sr-only">{text}</span>
      {tokens.map((t, i) => {
        const style = {
          "--i": startIndex + i,
          "--gi": t.gi,
          "--base": `${base}s`,
          "--stagger": `${stagger}s`,
        } as React.CSSProperties;
        const cls = ["wi", t.gradient ? "wi-gradient" : "", scroll ? (tier === 2 ? "wi-scroll-fast" : "wi-scroll") : ""]
          .filter(Boolean)
          .join(" ");

        return (
          <React.Fragment key={`${t.word}-${i}`}>
            <span className="w" aria-hidden="true">
              <span className={cls} style={style}>
                {t.word}
              </span>
            </span>
            {i < tokens.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </Component>
  );
}
