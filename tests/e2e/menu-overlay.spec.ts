import { test, expect, devices, type Browser } from "@playwright/test";
import path from "path";

const SCREENSHOT_DIR = path.join(process.cwd(), "reference", "verify");

const VIEWPORTS = [
  { width: 1440, height: 900 },
  { width: 1366, height: 768 },
  { width: 375, height: 812 },
];

async function openMenu(page: import("@playwright/test").Page) {
  await page.getByLabel("Open navigation menu").click();
  await expect(page.locator("#navigation-menu-panel")).toBeVisible();
}

async function newContext(browser: Browser, width: number, height: number) {
  return browser.newContext({ viewport: { width, height } });
}

test.describe("Navigation panel", () => {
  test.skip(
    ({ viewport }) => viewport?.width !== 1440,
    "Runs its own viewports — desktop project only"
  );

  for (const { width, height } of VIEWPORTS) {
    test(`panel hangs below the bar and is fully reachable at ${width}x${height}`, async ({
      browser,
    }) => {
      test.setTimeout(120_000);
      const context = await newContext(browser, width, height);
      const page = await context.newPage();
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await openMenu(page);

      const bar = await page.locator("header[role=banner] > div > div").first().boundingBox();
      const panel = await page.locator("#navigation-menu-panel").boundingBox();
      expect(bar && panel).toBeTruthy();

      // Panel starts below the bar…
      expect(panel!.y).toBeGreaterThanOrEqual(bar!.y + bar!.height);
      // …and ends 1.5rem above the viewport bottom.
      expect(height - (panel!.y + panel!.height)).toBeGreaterThanOrEqual(20);
      expect(height - (panel!.y + panel!.height)).toBeLessThanOrEqual(30);

      // Gutters: 2.25rem on desktop, 0.75rem on phones.
      const expectedGutter = width >= 1024 ? 36 : 12;
      expect(Math.abs(panel!.x - expectedGutter)).toBeLessThanOrEqual(1);
      expect(Math.abs(width - (panel!.x + panel!.width) - expectedGutter)).toBeLessThanOrEqual(1);

      // No duplicated logo and no second close button inside the panel.
      await expect(page.locator('#navigation-menu-panel img[alt="XpmindGlobal"]')).toHaveCount(0);
      await expect(
        page.locator('#navigation-menu-panel [aria-label*="Close"]')
      ).toHaveCount(0);

      // The hamburger became the close control.
      await expect(page.getByLabel("Close navigation menu")).toBeVisible();

      // No horizontal overflow while the panel is open.
      const overflow = await page.evaluate(() => ({
        doc: document.documentElement.scrollWidth,
        win: window.innerWidth,
      }));
      expect(overflow.doc).toBeLessThanOrEqual(overflow.win);

      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, `menu-open-Desktop-${width}x${height}.png`),
      });
      await context.close();
    });

    test(`every menu item including the last one is reachable at ${width}x${height}`, async ({
      browser,
    }) => {
      test.setTimeout(120_000);
      const context = await newContext(browser, width, height);
      const page = await context.newPage();
      await page.goto("/about", { waitUntil: "domcontentloaded" });
      await openMenu(page);

      const links = page.locator("#navigation-menu-panel a");
      const count = await links.count();
      expect(count).toBeGreaterThan(10);

      for (let i = 0; i < count; i++) {
        const link = links.nth(i);
        await link.scrollIntoViewIfNeeded();
        await expect(link, `menu link #${i} is not reachable`).toBeVisible();
      }

      // The mobile accordion must be able to reveal a service description.
      if (width < 1024) {
        const toggle = page.locator('#navigation-menu-panel button[aria-expanded="false"]').first();
        await toggle.scrollIntoViewIfNeeded();
        await toggle.click();
        await expect(
          page.locator('#navigation-menu-panel button[aria-expanded="true"]').first()
        ).toBeVisible();
      }

      // The consultation CTA is sticky at the bottom and opens the modal.
      const cta = page.locator('#navigation-menu-panel button', { hasText: "Get in Touch" }).first();
      await cta.scrollIntoViewIfNeeded();
      await expect(cta).toBeVisible();
      await cta.click();

      await expect(page.locator("#get-in-touch-dialog")).toBeVisible();

      await context.close();
    });
  }
});

test.describe("Navigation panel behaviour", () => {
  test.skip(({ viewport }) => viewport?.width !== 1440, "Desktop project only");

  test("ESC and scrim click close it, and the route change resets it", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await openMenu(page);
    await page.keyboard.press("Escape");
    await expect(page.locator("#navigation-menu-panel")).toBeHidden();

    await openMenu(page);
    // Click the scrim (top-left corner, above the panel).
    await page.mouse.click(4, 4);
    await expect(page.locator("#navigation-menu-panel")).toBeHidden();

    // Opening the panel must not leave the body scroll locked after closing.
    const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(bodyOverflow).not.toBe("hidden");
  });

  test("clicking a menu link navigates and closes the panel", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await openMenu(page);

    await page.locator('#navigation-menu-panel a[href="/projects"]').first().click();
    await page.waitForURL("**/projects");
    await expect(page.locator("#navigation-menu-panel")).toBeHidden();
  });

  test("the panel reopens scrolled to the top", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await openMenu(page);

    const scroller = page.locator("#navigation-menu-panel > div").last();
    await scroller.evaluate((el) => el.scrollTo({ top: el.scrollHeight }));
    await page.keyboard.press("Escape");
    await openMenu(page);

    const scrollTop = await page
      .locator("#navigation-menu-panel > div")
      .last()
      .evaluate((el) => el.scrollTop);
    expect(scrollTop).toBe(0);
  });

  test("the panel is mobile-safe at 375x812", async ({ browser }) => {
    const context = await browser.newContext({ ...devices["iPhone 13"], viewport: { width: 375, height: 812 } });
    const page = await context.newPage();
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await openMenu(page);

    // Single column on phones.
    const grid = page.locator("#navigation-menu-panel .grid").first();
    const cols = await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(" ").length);
    expect(cols).toBe(1);

    const panel = await page.locator("#navigation-menu-panel").boundingBox();
    expect(panel).not.toBeNull();
    expect(Math.abs(panel!.x - 12)).toBeLessThanOrEqual(1);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "menu-open-Mobile-375x812.png") });
    await context.close();
  });
});
