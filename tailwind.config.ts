import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#04080F",
          900: "#070D1C",
          850: "#0A1228",
          800: "#0D1830",
          700: "#111F3A",
          600: "#1E293B",
        },
        brand: {
          blue: "#1A56DB",
          blueLight: "#3B82F6",
          cyan: "#06B6D4",
          cyanLight: "#22D3EE",
          gold: "#F59E0B",
          goldLight: "#FBBF24",
        },
        canvas: {
          DEFAULT: "#FFFFFF",
          subtle: "#F5F8FF",
          muted: "#EBF1FF",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glass-light": "0 10px 30px -10px rgba(26, 86, 219, 0.08), 0 1px 3px 0 rgba(0, 0, 0, 0.05)",
        "glass-dark": "0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 30px -5px rgba(6, 182, 212, 0.1)",
        "glow-cyan": "0 0 35px -5px rgba(6, 182, 212, 0.35)",
        "glow-blue": "0 0 40px -5px rgba(26, 86, 219, 0.45)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "marquee": "marquee 35s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
