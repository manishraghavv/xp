// Shared motion tokens. Keep every animation on these so timing feels consistent.
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const DURATION = {
  fast: 0.2,
  base: 0.6,
  slow: 1.0,
} as const;

// Brand colours reused by WebGL scenes and canvas frames (mirrors tailwind brand tokens)
export const SCENE_COLORS = {
  navy: "#04080F",
  indigo: "#1B2E7A",
  blue: "#3B82F6",
  violet: "#7C5CFF",
  cyan: "#06B6D4",
  amber: "#F59E0B",
} as const;
