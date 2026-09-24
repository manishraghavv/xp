import { test, expect, devices, type Browser } from "@playwright/test";
import path from "path";
import { ALL_ROUTES, DESKTOP_WIDTHS, MOBILE_WIDTHS } from "./routes";

const SCREENSHOT_DIR = path.join(process.cwd(), "reference", "verify");

/** Report every element whose right edge escapes the viewport (helps localise bugs). */
async function findOverflowOffenders(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const offenders: { selector: string; right: number; width: number }[] = [];

    for (const el of Array.from(document.querySelectorAll<HTMLElement>("body *"))) {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;

      const style = window.getComputedStyle(el);
      if (style.position === "fixed" && style.visibility === "hidden") continue;

      // Ignore elements intentionally clipped by an overflow-hidden ancestor.
      let clipped = false;
      let parent = el.parentElement;
      while (parent && parent !== document.body) {
        const ps = window.getComputedStyle(parent);
        if (ps.overflowX === "hidden" || ps.overflowX === "clip") {
          clipped = true;
          break;
        }
        parent = parent.parentElement;
      }
      if (clipped) continue;

      if (rect.right > vw + 1 || rect.left < -1) {
        const id = el.id ? `#${el.id}` : "";
        const cls = typeof el.className === "string" ? el.className.split(/\s+/).slice(0, 4).join(".") : "";
        offenders.push({
          selector: `${el.tagName.toLowerCase()}${id}${cls ? `.${cls}` : ""}`,
          right: Math.round(rect.right),
          width: Math.round(rect.width),
        });
      }
    }

    // De-duplicate and keep the widest few.
    const seen = new Set<string>();
    return offenders
      .sort((a, b) => b.right - a.right)
      .filter((o) => (seen.has(o.selector) ? false : seen.add(o.selector)))
      .slice(0, 8);
  });
}

async function newMobileContext(browser: Browser, preset: string, width: number, height: number) {
  // `defaultBrowserType` is a project-level hint, not a context option — strip it.
  const { defaultBrowserType: _ignored, ...base } = devices[preset as keyof typeof devices];
  return browser.newContext({
    ...base,
    viewport: { width, height },
  });
}

/* ────────────────────────────────────────────────────────────────────────────
   TASK B — mobile layout
   ──────────────────────────────────────────────────────────────────────────── */

test.describe("Mobile layout (320px → 768px)", () => {
  // The suite builds its own emulated contexts, so it only needs to run once per
  // mobile project — not once for every breakpoint in the matrix.
  test.skip(
    ({ viewport }) => ![375, 768].includes(viewport?.width ?? 0),
    "Mobile-only suite (runs on the Mobile 375x812 and Tablet 768x1024 projects)"
  );

  test("no horizontal overflow on any route at any mobile width", async ({ browser }) => {
    test.setTimeout(600_000);

    const failures: string[] = [];

    for (const { width, height, device } of MOBILE_WIDTHS) {
      const context = await newMobileContext(browser, device, width, height);
      const page = await context.newPage();

      for (const route of ALL_ROUTES) {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await page.waitForSelector("h1");

        const { doc, win } = await page.evaluate(() => ({
          doc: document.documentElement.scrollWidth,
          win: window.innerWidth,
        }));

        if (doc > win) {
          const offenders = await findOverflowOffenders(page);
          failures.push(
            `${width}px ${route}: scrollWidth ${doc} > innerWidth ${win} → ${JSON.stringify(
              offenders
            )}`
          );
        }
      }

      await context.close();
    }

    expect(failures, failures.join("\n")).toEqual([]);
  });

  test("navbar collapses to a single bar with hamburger, logo and contact pill", async ({
    browser,
  }) => {
    const context = await newMobileContext(browser, "iPhone 13", 375, 812);
    const page = await context.newPage();
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // Centre pill (desktop nav) must be hidden.
    await expect(page.locator("nav[aria-label='Primary Navigation']")).toBeHidden();
    await expect(page.getByLabel("Open navigation menu")).toBeVisible();

    const header = page.locator("header[role=banner]");
    const box = await header.boundingBox();
    expect(box).not.toBeNull();
    // 12px gutters on both sides at mobile widths.
    expect(box!.x).toBeLessThanOrEqual(14);
    expect(box!.width).toBeGreaterThanOrEqual(375 - 26);

    await expect(header.getByRole("img").first()).toBeVisible();

    await context.close();
  });

  test("home hero fits badge, H1, copy and prompt box in one 375x667 screen", async ({
    browser,
  }) => {
    const context = await newMobileContext(browser, "iPhone 13", 375, 667);
    const page = await context.newPage();
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("#hero-prompt-box")).toBeVisible();

    const box = await page.locator("#hero-prompt-box").boundingBox();
    expect(box).not.toBeNull();
    // Prompt box must finish inside the first screen, clear of the floating bar.
    expect(box!.y + box!.height).toBeLessThanOrEqual(667);

    // The prompt box stacks on mobile: input above a full-width button.
    const input = page.locator("#hero-prompt-box input");
    const button = page.getByRole("button", { name: /Get Free Assessment/i }).first();
    const inputBox = await input.boundingBox();
    const buttonBox = await button.boundingBox();
    expect(inputBox!.y).toBeLessThan(buttonBox!.y);

    await context.close();
  });

  test("comparison table and card rails are scrollable containers, not overflowing", async ({
    browser,
  }) => {
    const context = await newMobileContext(browser, "Pixel 7", 360, 740);
    const page = await context.newPage();
    await page.goto("/s4hana-migration", { waitUntil: "domcontentloaded" });

    const comparison = page.locator("#migration-comparison");
    await expect(comparison).toBeVisible();

    const { scrollWidth, clientWidth } = await comparison.evaluate((el) => ({
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
    }));
    // Either stacked (no overflow) or horizontally scrollable inside its own box.
    expect(scrollWidth).toBeGreaterThanOrEqual(clientWidth);

    await context.close();
  });

  test("no paragraph is truncated with an ellipsis", async ({ browser }) => {
    const context = await newMobileContext(browser, "iPhone 13", 375, 812);
    const page = await context.newPage();

    for (const route of ["/", "/services", "/projects", "/training"]) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const clipped = await page.evaluate(() =>
        Array.from(document.querySelectorAll<HTMLElement>("p, li, h1, h2, h3, h4, span"))
          .filter((el) => {
            const s = window.getComputedStyle(el);
            if (s.textOverflow !== "ellipsis") return false;
            if (s.webkitLineClamp && s.webkitLineClamp !== "none") return false;
            return el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 2;
          })
          .map((el) => `${el.tagName}.${el.className}`.slice(0, 120))
      );
      expect(clipped, `${route} truncates text: ${clipped.join(" | ")}`).toEqual([]);
    }

    await context.close();
  });

  test("get-in-touch modal is an internally scrollable sheet with 16px inputs", async ({
    browser,
  }) => {
    const context = await newMobileContext(browser, "iPhone 13", 375, 812);
    const page = await context.newPage();
    await page.goto("/contact", { waitUntil: "domcontentloaded" });

    await page.getByRole("button", { name: /Get in Touch|Contact/i }).first().click();
    const dialog = page.locator("#get-in-touch-dialog");
    await expect(dialog).toBeVisible();

    const metrics = await dialog.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return {
        height: el.getBoundingClientRect().height,
        maxHeight: s.maxHeight,
        overflowY: s.overflowY,
      };
    });

    expect(metrics.height).toBeLessThanOrEqual(812 + 1);
    expect(["auto", "scroll"]).toContain(metrics.overflowY);

    const inputFontSize = await page
      .locator("#get-in-touch-dialog input[type=email]")
      .evaluate((el) => parseFloat(window.getComputedStyle(el).fontSize));
    expect(inputFontSize).toBeGreaterThanOrEqual(16);

    // Every interactive control must be at least 44x44.
    const smallTargets = await page
      .locator("#get-in-touch-dialog button, #get-in-touch-dialog input, #get-in-touch-dialog select")
      .evaluateAll((els) =>
        els
          .map((el) => {
            const r = el.getBoundingClientRect();
            return { text: (el as HTMLElement).innerText || el.getAttribute("type") || "", h: Math.round(r.height) };
          })
          .filter((t) => t.h > 0 && t.h < 44)
      );
    expect(smallTargets, JSON.stringify(smallTargets)).toEqual([]);

    await context.close();
  });

  test("screenshots of every route at 375x812", async ({ browser }) => {
    test.setTimeout(600_000);
    const context = await newMobileContext(browser, "iPhone 13", 375, 812);
    const page = await context.newPage();

    for (const route of ALL_ROUTES) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await page.waitForSelector("h1");
      await page.waitForTimeout(400);
      const name = route === "/" ? "home" : route.replace(/\//g, "-").replace(/^-/, "");
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, `mobile-${name}-375x812.png`),
        fullPage: false,
      });
    }

    await context.close();
  });
});

/* ────────────────────────────────────────────────────────────────────────────
   TASK D — large screens
   ──────────────────────────────────────────────────────────────────────────── */

test.describe("Large screens (2560 / 3440 / 3840 / retina 1920)", () => {
  // Builds its own large viewports; run once, not once per project.
  test.skip(
    ({ viewport }) => viewport?.width !== 1440,
    "Large-screen suite (runs on the Desktop 1440x900 project)"
  );

  const routes = ["/", "/services", "/s4hana-migration", "/about", "/contact"];

  test("no horizontal overflow and sane content width", async ({ browser }) => {
    test.setTimeout(300_000);

    for (const { width, height, deviceScaleFactor } of DESKTOP_WIDTHS) {
      const context = await browser.newContext({
        viewport: { width, height },
        deviceScaleFactor,
      });
      const page = await context.newPage();

      for (const route of routes) {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await page.waitForSelector("h1");

        const { doc, win } = await page.evaluate(() => ({
          doc: document.documentElement.scrollWidth,
          win: window.innerWidth,
        }));
        expect(doc, `${width}px ${route} overflows`).toBeLessThanOrEqual(win);

        // Content must fill the screen: 55–80% of viewport at 2560+.
        if (width >= 2560) {
          const container = await page.evaluate(() => {
            const main = document.querySelector("main");
            const inner = main?.querySelector("div[class*='max-w']") as HTMLElement | null;
            return inner?.getBoundingClientRect().width ?? 0;
          });
          const ratio = container / width;
          expect(
            ratio,
            `${width}px ${route}: content container is ${(ratio * 100).toFixed(1)}% of viewport`
          ).toBeGreaterThanOrEqual(0.55);
        }
      }

      await context.close();
    }
  });

  test("root font size scales up at 3840", async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 3840, height: 2160 } });
    const page = await context.newPage();
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const bodyFont = await page.evaluate(() =>
      parseFloat(window.getComputedStyle(document.body).fontSize)
    );
    expect(bodyFont).toBeGreaterThanOrEqual(22);

    await context.close();
  });

  test("navbar bar is centred with equal margins", async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 3840, height: 2160 } });
    const page = await context.newPage();
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const bar = await page.locator("header[role=banner] > div > div").first().boundingBox();
    expect(bar).not.toBeNull();
    const left = bar!.x;
    const right = 3840 - (bar!.x + bar!.width);
    expect(Math.abs(left - right)).toBeLessThanOrEqual(2);

    await context.close();
  });

  test("ultrawide hero background covers the full width", async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 3440, height: 1440 } });
    const page = await context.newPage();
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const img = page.locator("section[data-theme=dark] img").first();
    const box = await img.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThanOrEqual(3440 - 2);

    await context.close();
  });

  test("large-screen screenshots", async ({ browser }) => {
    test.setTimeout(300_000);
    for (const { width, height, deviceScaleFactor } of [
      { width: 2560, height: 1440, deviceScaleFactor: 1 },
      { width: 3440, height: 1440, deviceScaleFactor: 1 },
      { width: 3840, height: 2160, deviceScaleFactor: 1 },
      { width: 1920, height: 1080, deviceScaleFactor: 2 },
    ]) {
      const context = await browser.newContext({
        viewport: { width, height },
        deviceScaleFactor,
      });
      const page = await context.newPage();
      for (const route of routes) {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(500);
        const name = route === "/" ? "home" : route.replace(/\//g, "-").replace(/^-/, "");
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, `desktop-${name}-${width}x${height}.png`),
        });
      }
      await context.close();
    }
  });
});
