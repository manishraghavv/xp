import { test, expect } from "@playwright/test";
import { ALL_ROUTES, EMOJI_PATTERN, FORBIDDEN_ICON_CLASSES } from "./routes";

/**
 * Regression guard for the "no emoji / no decorative icon" rule.
 *
 * Runs only on a desktop project so we don't repeat 21 navigations per viewport —
 * the DOM is identical across breakpoints.
 */
test.describe("No emoji or decorative icons", () => {
  test.skip(
    ({ viewport }) => (viewport?.width ?? 0) < 1024,
    "Desktop-only check — markup is shared across breakpoints"
  );

  test("all 21 routes render zero emoji characters", async ({ page }) => {
    test.setTimeout(120_000);

    for (const route of ALL_ROUTES) {
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.status(), `${route} should return 200`).toBe(200);

      // Wait for the client components (navbar / footer) to hydrate.
      await page.waitForSelector("header[role=banner]");

      const text: string = await page.evaluate(() => document.body.innerText);
      const matches = text.match(EMOJI_PATTERN) ?? [];
      expect(matches, `${route} rendered emoji: ${matches.join(" ")}`).toEqual([]);

      // Also check markup that innerText would miss (attributes, alt text, labels).
      const html: string = await page.content();
      const htmlMatches = html.match(EMOJI_PATTERN) ?? [];
      expect(htmlMatches, `${route} has emoji in markup: ${htmlMatches.join(" ")}`).toEqual([]);
    }
  });

  test("no decorative sparkle / zap / warning / clock icons render", async ({ page }) => {
    test.setTimeout(120_000);

    for (const route of ALL_ROUTES) {
      await page.goto(route, { waitUntil: "domcontentloaded" });

      for (const selector of FORBIDDEN_ICON_CLASSES) {
        await expect(
          page.locator(selector),
          `${route} still renders ${selector}`
        ).toHaveCount(0);
      }
    }
  });

  test("the floating Book Free Assessment button is text-only", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => window.scrollTo(0, 1400));
    await page.waitForTimeout(600);

    const cta = page.getByRole("button", { name: "Book Free Assessment" }).first();
    if ((await cta.count()) > 0) {
      await expect(cta.locator("svg")).toHaveCount(0);
    }
  });
});
