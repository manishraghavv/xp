// Renders the procedural scroll sequences to AVIF/WebP at several widths.
// Usage: node scripts/generate-sequences.mjs [home|migration] [frameCount] [masterWidth]
// Masters are drawn at 3840x2160 (2x device scale), then encoded at 3840, 1920 and 1280.
import { chromium } from "playwright";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const kind = process.argv[2] || "home";
const COUNT = Number(process.argv[3] || 90);
const MASTER = Number(process.argv[4] || 3840);
const WIDTHS = [3840, 1920, 1280];
const OUT = path.resolve("public/sequences", kind);

const scene = fs.readFileSync(path.resolve("scripts/sequence/scene.js"), "utf8");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.setContent(
  `<body style="margin:0;background:#04080F"><canvas id="c" width="${MASTER}" height="${(MASTER * 9) / 16}"></canvas></body>`
);
await page.addScriptTag({ content: scene });

for (const w of WIDTHS) fs.mkdirSync(path.join(OUT, String(w)), { recursive: true });

const started = Date.now();
for (let i = 0; i < COUNT; i++) {
  const t = i / (COUNT - 1);
  const dataUrl = await page.evaluate(
    ([k, tt]) => {
      window.renderFrame(k, tt);
      return document.getElementById("c").toDataURL("image/png");
    },
    [kind, t]
  );
  const master = Buffer.from(dataUrl.split(",")[1], "base64");
  const name = `f-${String(i + 1).padStart(4, "0")}`;
  for (const w of WIDTHS) {
    const img = sharp(master).resize({ width: w, height: Math.round((w * 9) / 16) });
    // AVIF everywhere; WebP fallback only for the two smaller sizes
    await img.clone().avif({ quality: w >= 3840 ? 46 : 52, effort: 3 }).toFile(path.join(OUT, String(w), `${name}.avif`));
    if (w < 3840) await img.clone().webp({ quality: 80, effort: 4 }).toFile(path.join(OUT, String(w), `${name}.webp`));
  }
  if (i === COUNT - 1) {
    // Static poster = final frame, used as the no-JS / reduced-motion / load-failure fallback
    const base = sharp(master).resize({ width: 2560, height: 1440 });
    await base.clone().avif({ quality: 55, effort: 4 }).toFile(path.join(OUT, "poster.avif"));
    await base.clone().webp({ quality: 82 }).toFile(path.join(OUT, "poster.webp"));
  }
  if (i % 10 === 0) console.log(`${kind}: frame ${i + 1}/${COUNT} (${Math.round((Date.now() - started) / 1000)}s)`);
}
await browser.close();
console.log("done", kind);
