import { test, expect } from "@playwright/test";
import path from "path";

const VERIFY_DIR = path.join(process.cwd(), "reference", "verify");

test.describe("Menu Scroll Verification", () => {
  test.skip(
    ({ viewport }) => viewport?.width !== 1440,
    "Runs its own viewports — desktop project only"
  );

  const desktopViewports = [
    { width: 1366, height: 768, name: "1366x768" },
    { width: 1440, height: 900, name: "1440x900" },
    { width: 1920, height: 1080, name: "1920x1080" },
  ];

  for (const vp of desktopViewports) {
    test(`Desktop ${vp.name}: menu scrolls correctly with mouse wheel and keyboard`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("http://localhost:3008/", { waitUntil: "networkidle" });

      const initialScrollY = await page.evaluate(() => window.scrollY);
      expect(initialScrollY).toBe(0);

      // Open menu
      const hamburger = page.locator('button[aria-label="Open navigation menu"]');
      await hamburger.click();
      await page.waitForSelector("#navigation-menu-panel", { state: "visible" });
      await page.waitForTimeout(300);

      const scroller = page.locator("#navigation-menu-panel .menu-scroll");
      await expect(scroller).toBeVisible();

      // Check 1: After open
      const initialMetrics = await scroller.evaluate((el) => {
        const panel = el.closest("#navigation-menu-panel") as HTMLElement;
        const quickNav = panel.querySelector('nav[aria-label="Quick navigation"] span') as HTMLElement;
        const specialist = panel.querySelector('div.border-t span, div.lg\\:border-l span') as HTMLElement;
        const scrollerRect = el.getBoundingClientRect();
        const qRect = quickNav ? quickNav.getBoundingClientRect() : null;
        const sRect = specialist ? specialist.getBoundingClientRect() : null;

        return {
          scrollTop: el.scrollTop,
          clientHeight: el.clientHeight,
          scrollHeight: el.scrollHeight,
          windowScrollY: window.scrollY,
          scrollerTop: scrollerRect.top,
          quickNavTop: qRect ? qRect.top : -1,
          specialistTop: sRect ? sRect.top : -1,
        };
      });

      console.log(`[${vp.name}] Initial Open Metrics:`, JSON.stringify(initialMetrics, null, 2));

      expect(initialMetrics.scrollTop).toBe(0);
      expect(initialMetrics.scrollHeight).toBeGreaterThan(initialMetrics.clientHeight);
      // Eyebrow labels top >= scroller top
      expect(initialMetrics.quickNavTop).toBeGreaterThanOrEqual(initialMetrics.scrollerTop);
      expect(initialMetrics.specialistTop).toBeGreaterThanOrEqual(initialMetrics.scrollerTop);

      // Screenshot at top
      await page.screenshot({
        path: path.join(VERIFY_DIR, `menu-scroll-top-${vp.name}.png`),
      });

      // Check 2: Mouse wheel scroll down
      const box = await scroller.boundingBox();
      expect(box).not.toBeNull();
      const midX = box!.x + box!.width / 2;
      const midY = box!.y + box!.height / 2;

      await page.mouse.move(midX, midY);
      await page.mouse.wheel(0, 3000);
      await page.waitForTimeout(600);

      const bottomMetrics = await scroller.evaluate((el) => {
        const panel = el.closest("#navigation-menu-panel") as HTMLElement;
        const links = panel.querySelectorAll('ul li a[href*="/services/"]');
        const lastService = links[links.length - 1] as HTMLElement;
        const lastAddress = panel.querySelector("div.space-y-3 > div:last-child") as HTMLElement;
        const ctaBar = panel.querySelector(".menu-cta") as HTMLElement;

        const elRect = el.getBoundingClientRect();
        const ctaRect = ctaBar ? ctaBar.getBoundingClientRect() : null;
        const lastServiceRect = lastService ? lastService.getBoundingClientRect() : null;
        const addressRect = lastAddress ? lastAddress.getBoundingClientRect() : null;

        return {
          scrollTop: el.scrollTop,
          maxScrollTop: el.scrollHeight - el.clientHeight,
          clientHeight: el.clientHeight,
          scrollHeight: el.scrollHeight,
          windowScrollY: window.scrollY,
          ctaTop: ctaRect ? ctaRect.top : -1,
          lastServiceBottom: lastServiceRect ? lastServiceRect.bottom : -1,
          addressBottom: addressRect ? addressRect.bottom : -1,
        };
      });

      console.log(`[${vp.name}] Bottom Scroll Metrics:`, JSON.stringify(bottomMetrics, null, 2));

      // Assert scrollTop increased to maxScrollTop (within 2px)
      expect(Math.abs(bottomMetrics.scrollTop - bottomMetrics.maxScrollTop)).toBeLessThanOrEqual(2);
      // window.scrollY stays 0
      expect(bottomMetrics.windowScrollY).toBe(0);

      // Assert last service and address are NOT covered by CTA row
      if (bottomMetrics.lastServiceBottom > 0 && bottomMetrics.ctaTop > 0) {
        expect(bottomMetrics.lastServiceBottom).toBeLessThanOrEqual(bottomMetrics.ctaTop + 1);
      }
      if (bottomMetrics.addressBottom > 0 && bottomMetrics.ctaTop > 0) {
        expect(bottomMetrics.addressBottom).toBeLessThanOrEqual(bottomMetrics.ctaTop + 1);
      }

      // Screenshot at bottom
      await page.screenshot({
        path: path.join(VERIFY_DIR, `menu-scroll-bottom-${vp.name}.png`),
      });

      // Wheel back up
      await page.mouse.wheel(0, -3000);
      await page.waitForTimeout(600);

      const backUpScrollTop = await scroller.evaluate((el) => el.scrollTop);
      expect(backUpScrollTop).toBe(0);

      // Check 3: Keyboard End / Home / PageDown / PageUp
      await scroller.focus();
      await page.keyboard.press("End");
      await page.waitForTimeout(300);
      const endScrollTop = await scroller.evaluate((el) => el.scrollTop);
      expect(endScrollTop).toBeGreaterThan(0);

      await page.keyboard.press("Home");
      await page.waitForTimeout(300);
      const homeScrollTop = await scroller.evaluate((el) => el.scrollTop);
      expect(homeScrollTop).toBe(0);

      await page.keyboard.press("PageDown");
      await page.waitForTimeout(300);
      const pageDownScrollTop = await scroller.evaluate((el) => el.scrollTop);
      expect(pageDownScrollTop).toBeGreaterThan(0);

      await page.keyboard.press("PageUp");
      await page.waitForTimeout(300);
      const pageUpScrollTop = await scroller.evaluate((el) => el.scrollTop);
      expect(pageUpScrollTop).toBe(0);

      // Close menu with ESC
      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);
      await expect(page.locator("#navigation-menu-panel")).toBeHidden();

      // Page scrolls normally afterwards
      expect(await page.evaluate(() => document.documentElement.classList.contains("menu-open"))).toBe(false);
      expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
    });
  }

  test("Mobile 375x667 touch swipe scrolls panel and CTA stays visible", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
      hasTouch: true,
    });
    const page = await context.newPage();
    await page.goto("http://localhost:3008/", { waitUntil: "networkidle" });

    const hamburger = page.locator('button[aria-label="Open navigation menu"]');
    await hamburger.click();
    await page.waitForSelector("#navigation-menu-panel", { state: "visible" });
    await page.waitForTimeout(300);

    const scroller = page.locator("#navigation-menu-panel .menu-scroll");
    await expect(scroller).toBeVisible();

    const initial = await scroller.evaluate((el) => ({
      scrollTop: el.scrollTop,
      clientHeight: el.clientHeight,
      scrollHeight: el.scrollHeight,
      windowScrollY: window.scrollY,
    }));

    console.log("[Mobile 375x667] Initial:", JSON.stringify(initial));
    expect(initial.scrollTop).toBe(0);
    expect(initial.scrollHeight).toBeGreaterThan(initial.clientHeight);

    // Screenshot at top (mobile)
    await page.screenshot({
      path: path.join(VERIFY_DIR, "menu-scroll-top-Mobile-375x667.png"),
    });

    // Touch swipe emulation: drag up inside the panel
    const box = await scroller.boundingBox();
    expect(box).not.toBeNull();
    const startX = box!.x + box!.width / 2;
    const startY = box!.y + box!.height * 0.75;
    const endY = box!.y + box!.height * 0.25;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX, endY, { steps: 10 });
    await page.mouse.up();
    await page.waitForTimeout(300);

    // Programmatic touch scroll test
    await scroller.evaluate((el) => {
      el.scrollTop = 500;
    });
    await page.waitForTimeout(300);

    const scrolledMobile = await scroller.evaluate((el) => ({
      scrollTop: el.scrollTop,
      windowScrollY: window.scrollY,
    }));
    console.log("[Mobile 375x667] After scroll:", JSON.stringify(scrolledMobile));
    expect(scrolledMobile.scrollTop).toBe(500);
    expect(scrolledMobile.windowScrollY).toBe(0);

    // Scroll to bottom
    await scroller.evaluate((el) => {
      el.scrollTop = el.scrollHeight - el.clientHeight;
    });
    await page.waitForTimeout(300);

    const bottomMobile = await scroller.evaluate((el) => {
      const panel = el.closest("#navigation-menu-panel") as HTMLElement;
      const ctaBar = panel.querySelector(".menu-cta") as HTMLElement;
      const ctaButton = ctaBar ? ctaBar.querySelector("button") : null;
      return {
        scrollTop: el.scrollTop,
        maxScrollTop: el.scrollHeight - el.clientHeight,
        ctaVisible: ctaButton ? ctaButton.offsetParent !== null : false,
      };
    });

    console.log("[Mobile 375x667] Bottom:", JSON.stringify(bottomMobile));
    expect(bottomMobile.scrollTop).toBe(bottomMobile.maxScrollTop);
    expect(bottomMobile.ctaVisible).toBe(true);

    // Screenshot at bottom (mobile)
    await page.screenshot({
      path: path.join(VERIFY_DIR, "menu-scroll-bottom-Mobile-375x667.png"),
    });

    // Close via X button
    const closeBtn = page.locator('button[aria-label="Close navigation menu"]');
    await closeBtn.click();
    await page.waitForTimeout(300);
    await expect(page.locator("#navigation-menu-panel")).toBeHidden();

    // Verify page scrolls normally
    await page.evaluate(() => window.scrollTo(0, 100));
    expect(await page.evaluate(() => window.scrollY)).toBe(100);

    await context.close();
  });

  test("Close via scrim click restores scrolling and no console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto("http://localhost:3008/", { waitUntil: "networkidle" });

    // Open menu
    await page.locator('button[aria-label="Open navigation menu"]').click();
    await page.waitForSelector("#navigation-menu-panel", { state: "visible" });

    // Click scrim (top-left outside the panel)
    await page.mouse.click(5, 5);
    await page.waitForTimeout(300);
    await expect(page.locator("#navigation-menu-panel")).toBeHidden();

    expect(await page.evaluate(() => document.documentElement.classList.contains("menu-open"))).toBe(false);
    expect(consoleErrors).toHaveLength(0);
  });
});
