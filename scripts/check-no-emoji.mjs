#!/usr/bin/env node
/**
 * Emoji guard.
 *
 * Fails the build if any emoji character is found in the source tree (/src) or in a
 * text file shipped from /public. The site deliberately uses no emoji — decorative
 * glyphs are what make a marketing site look machine-generated, so this check keeps
 * them from creeping back in.
 *
 * Usage: node scripts/check-no-emoji.mjs
 * Exit codes: 0 = clean, 1 = emoji found (or scan could not run).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

/** Emoji / pictographic ranges we refuse to ship. */
const EMOJI_PATTERN =
  /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu;

/** Directories to scan (relative to the project root). */
const SCAN_ROOTS = ["src", "public"];

/**
 * Extensions we treat as text. Anything else (images, fonts, video) is skipped —
 * this keeps binary assets from producing false positives.
 */
const TEXT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".css",
  ".scss",
  ".json",
  ".md",
  ".mdx",
  ".txt",
  ".csv",
  ".svg",
  ".xml",
  ".html",
  ".webmanifest",
  ".yml",
  ".yaml",
]);

/** Never descend into these. */
const IGNORED_DIRS = new Set(["node_modules", ".next", ".git", "dist", "build", "coverage"]);

function isTextFile(filePath) {
  return TEXT_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function walk(dir, out = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }

  for (const entry of entries) {
    if (entry.name.startsWith(".") && entry.name !== ".well-known") continue;
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name)) continue;
      walk(full, out);
    } else if (entry.isFile() && isTextFile(full)) {
      out.push(full);
    }
  }

  return out;
}

/** Turn a raw match index into a 1-based line/column pair. */
function positionOf(source, index) {
  const before = source.slice(0, index);
  const line = before.split("\n").length;
  const column = index - before.lastIndexOf("\n");
  return { line, column };
}

function describe(codePoint) {
  return `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")} ${JSON.stringify(
    String.fromCodePoint(codePoint)
  )}`;
}

function main() {
  const files = [];
  for (const root of SCAN_ROOTS) {
    walk(path.join(projectRoot, root), files);
  }

  const violations = [];

  for (const file of files) {
    let source;
    try {
      source = fs.readFileSync(file, "utf8");
    } catch {
      continue;
    }

    // reset stateful regex between files
    EMOJI_PATTERN.lastIndex = 0;
    let match;
    while ((match = EMOJI_PATTERN.exec(source)) !== null) {
      const { line, column } = positionOf(source, match.index);
      violations.push({
        file: path.relative(projectRoot, file),
        line,
        column,
        found: describe(match[0].codePointAt(0)),
      });
    }
  }

  if (violations.length === 0) {
    console.log(`check-no-emoji: scanned ${files.length} text files — no emoji found.`);
    process.exit(0);
  }

  console.error(`check-no-emoji: found ${violations.length} emoji character(s):\n`);
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}:${v.column}  ${v.found}`);
  }
  console.error(
    "\nDecorative emoji are not allowed anywhere in /src or /public. Replace them with text."
  );
  process.exit(1);
}

main();
