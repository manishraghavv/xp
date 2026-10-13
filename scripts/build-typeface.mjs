// Converts the OFL-licensed Sora font into the three.js typeface JSON used by Text3D.
// Usage: node scripts/build-typeface.mjs
import opentype from "opentype.js";
import fs from "node:fs";

const SRC = "node_modules/@fontsource/sora/files/sora-latin-800-normal.woff";
const OUT = "public/fonts/sora-800.typeface.json";
const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,&-+*/%~:;!?'\"()®·";

const buf = fs.readFileSync(SRC);
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
const scale = 1000 / font.unitsPerEm;
const r = (n) => Math.round(n * scale);

const glyphs = {};
for (const ch of CHARS) {
  const g = font.charToGlyph(ch);
  if (!g || g.index === 0) continue;
  const path = g.getPath(0, 0, font.unitsPerEm);
  const o = [];
  for (const c of path.commands) {
    // opentype paths use y-down screen coords at (0,0) baseline; flip to y-up
    const y = (v) => r(-v);
    if (c.type === "M") o.push("m", r(c.x), y(c.y));
    else if (c.type === "L") o.push("l", r(c.x), y(c.y));
    else if (c.type === "Q") o.push("q", r(c.x), y(c.y), r(c.x1), y(c.y1));
    else if (c.type === "C") o.push("b", r(c.x), y(c.y), r(c.x1), y(c.y1), r(c.x2), y(c.y2));
    else if (c.type === "Z") o.push("z");
  }
  glyphs[ch] = { ha: r(g.advanceWidth), x_min: r(g.xMin || 0), x_max: r(g.xMax || 0), o: o.join(" ") };
}

const json = {
  glyphs,
  familyName: "Sora",
  ascender: r(font.ascender),
  descender: r(font.descender),
  underlinePosition: -100,
  underlineThickness: 50,
  boundingBox: { yMin: r(font.descender), xMin: 0, yMax: r(font.ascender), xMax: 1000 },
  resolution: 1000,
  original_font_information: { format: 0, copyright: "Sora, SIL Open Font License 1.1" },
};
fs.writeFileSync(OUT, JSON.stringify(json));
console.log("glyphs:", Object.keys(glyphs).length, "bytes:", fs.statSync(OUT).size);
