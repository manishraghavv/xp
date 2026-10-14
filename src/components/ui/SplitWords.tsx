import React from "react";

interface SplitWordsProps {
  /** The sentence to split. Rendered word by word; spacing is preserved. */
  text: string;
  /** Animation start offset in seconds (CSS var --base). */
  base?: number;
  /** Per-word stagger in seconds (CSS var --stagger). */
  stagger?: number;
  /** Animation order index of the first word (CSS var --i). */
  startIndex?: number;
  /** Apply the flowing gradient treatment to every word in this run. */
  gradient?: boolean;
  /** Gradient flow index of the first word (CSS var --gi). */
  gradientStart?: number;
}

/**
 * Pure-render helper: splits a sentence into per-word spans so CSS can drop each
 * word in from above, one after another. No JS animation and no intersection
 * observers. The real text is exposed once via aria-label on the parent element;
 * the split spans are aria-hidden.
 */
export function SplitWords({
  text,
  base = 0.25,
  stagger = 0.07,
  startIndex = 0,
  gradient = false,
  gradientStart = 0,
}: SplitWordsProps) {
  const words = text.split(" ");

  return (
    <>
      {words.map((word, idx) => {
        const style = {
          "--i": startIndex + idx,
          "--gi": gradientStart + idx,
          "--base": `${base}s`,
          "--stagger": `${stagger}s`,
        } as React.CSSProperties;

        return (
          <React.Fragment key={`${word}-${idx}`}>
            <span className="w" aria-hidden="true">
              <span
                className={gradient ? "wi wi-gradient" : "wi"}
                style={style}
              >
                {word}
              </span>
            </span>
            {idx < words.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </>
  );
}
