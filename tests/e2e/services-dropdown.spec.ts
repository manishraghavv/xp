import { test, expect, type Page } from "@playwright/test";
import path from "path";
import { SERVICE_SLUGS } from "./routes";

/**
 * Services dropdown — click-only, real-interaction verification.
 *
 * Root causes this suite guards against:
 *   1. The panel inherited `pointer-events: none` from the fixed header wrapper,
 *      so mouse travel and clicks fell through to the scrim behind it.
 *   2. The scrim (later sibling, higher effective stacking) swallowed clicks on
 *      the panel's <Link> items, so nothing ever navigated.
 *   3. The old hover open/close timers turned the 12px bar→panel gap into a dead
 *      zone that closed the panel mid-travel.
 */

const SHOTS = path.join(process.cwd(), "reference", "verify");

const PANEL = "#services-dropdown-panel";
const TRIGGER = "#services-dropdown-trigger";
const SCROLL = ".services-dropdown-scroll";
const STRIP = `${PANEL} a[href='/s4hana-migration']`;

/** Only the two desktop projects in the brief expose the centre pill. */
const DESKTOP_PROJECTS = ["Desktop 1440x900", "Desktop 1366x768"];

async function openPanel(page: Page) {
  await page.locator(TRIGGER).click();
  await expect(page.locator(PANEL)).toBeVisible({ timeout: 300 });
}

test.describe("Services dropdown (click-only)", () => {
  let errors: string[] = [];

  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(!DESKTOP_PROJECTS.includes(testInfo.project.name), "Centre pill only exists at lg+");
    errors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(`console.error: ${msg.text()}`);
    });
    page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  });

  for (const route of ["/", "/services/sap-centre-of-excellence-coe"] as const) {
    test(`1 · click opens within 300ms, stays open 2s, mouse travels in — ${route}`, async ({
      page,
    }, testInfo) => {
      await page.goto(route, { waitUntil: "networkidle" });

      const trigger = page.locator(TRIGGER);
      const panel = page.locator(PANEL);

      await trigger.click();
      await expect(panel).toBeVisible({ timeout: 300 });

      // The open state must never be stuck at opacity: 0.
      await expect
        .poll(() => panel.evaluate((el) => getComputedStyle(el).opacity), { timeout: 1000 })
        .toBe("1");

      // No mouse movement for 2 seconds — it must still be open (no hover timer).
      await page.waitForTimeout(2000);
      await expect(panel).toBeVisible();

      // Real mouse travel from the trigger centre to the first service item, 15 steps.
      const tBox = (await trigger.boundingBox())!;
      const firstItem = page.locator(`${PANEL} ${SCROLL} a`).first();
      const fBox = (await firstItem.boundingBox())!;
      const sx = tBox.x + tBox.width / 2;
      const sy = tBox.y + tBox.height / 2;
      const ex = fBox.x + fBox.width / 2;
      const ey = fBox.y + fBox.height / 2;

      for (let i = 1; i <= 15; i++) {
        await page.mouse.move(sx + ((ex - sx) * i) / 15, sy + ((ey - sy) * i) / 15, { steps: 1 });
        await expect(panel, `panel must stay open at travel step ${i}`).toBeVisible();
      }

      const endHit = await page.evaluate(
        ({ x, y }) => {
          const p = document.getElementById("services-dropdown-panel")!;
          const el = document.elementFromPoint(x, y);
          return { inside: !!(el && p.contains(el)), tag: el?.tagName ?? "null" };
        },
        { x: ex, y: ey }
      );
      expect(endHit.inside, `elementFromPoint at end of travel hit ${endHit.tag}`).toBe(true);

      // Hovering every one of the 9 items must apply its hover surface.
      const items = page.locator(`${PANEL} ${SCROLL} a`);
      await expect(items).toHaveCount(9);
      for (let i = 0; i < 9; i++) {
        const box = (await items.nth(i).boundingBox())!;
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await expect
          .poll(() => items.nth(i).evaluate((el) => getComputedStyle(el).backgroundColor), {
            message: `item ${i + 1} must show a hover background`,
          })
          .not.toBe("rgba(0, 0, 0, 0)");
      }

      await expect(panel).toBeVisible();
      await page.screenshot({
        path: path.join(SHOTS, `dropdown-fixed-open-${testInfo.project.name.replace(/\s+/g, "-")}.png`),
      });

      expect(errors, errors.join("\n")).toEqual([]);
    });
  }

  test("2 · each of the 9 items navigates to /services/[slug] and closes the panel", async ({
    page,
  }) => {
    // Nine full navigations, each possibly compiling a dev-server route.
    test.slow();

    const items = page.locator(`${PANEL} ${SCROLL} a`);

    for (let i = 0; i < SERVICE_SLUGS.length; i++) {
      const slug = SERVICE_SLUGS[i];
      await page.goto("/", { waitUntil: "networkidle" });
      await openPanel(page);
      await expect(items).toHaveCount(9);

      await items.nth(i).click();
      await page.waitForURL((url) => url.pathname === `/services/${slug}`);

      expect(new URL(page.url()).pathname).toBe(`/services/${slug}`);
      await expect(page.locator("h1").first()).toBeVisible();
      await expect(page.locator(PANEL)).toHaveCount(0);
    }
  });

  test("3 · 'Explore All Services' → /services and strip 'Learn more' → /s4hana-migration", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await openPanel(page);
    await page.locator(`${PANEL} a[href='/services']`).click();
    await page.waitForURL((url) => url.pathname === "/services");
    expect(new URL(page.url()).pathname).toBe("/services");
    await expect(page.locator(PANEL)).toHaveCount(0);

    await page.goto("/", { waitUntil: "networkidle" });
    await openPanel(page);
    await page.locator(STRIP).click();
    await page.waitForURL((url) => url.pathname === "/s4hana-migration");
    expect(new URL(page.url()).pathname).toBe("/s4hana-migration");
    await expect(page.locator(PANEL)).toHaveCount(0);
  });

  test("4 · toggle, outside click, ESC focus return, and bar link while open", async ({ page }) => {
    const panel = page.locator(PANEL);
    const trigger = page.locator(TRIGGER);

    await page.goto("/", { waitUntil: "networkidle" });

    // Second click on the trigger closes it.
    await openPanel(page);
    await trigger.click();
    await expect(panel).toHaveCount(0);

    // Outside (scrim) click closes it.
    await openPanel(page);
    await page.mouse.click(20, 600);
    await expect(panel).toHaveCount(0);

    // ESC closes and returns focus to the trigger.
    await openPanel(page);
    await page.keyboard.press("Escape");
    await expect(panel).toHaveCount(0);
    expect(await page.evaluate(() => document.activeElement?.id)).toBe("services-dropdown-trigger");

    // A bar link stays clickable while the panel is open: navigates + closes.
    await openPanel(page);
    await page
      .getByRole("navigation", { name: "Primary Navigation" })
      .getByRole("link", { name: "Projects" })
      .click();
    await page.waitForURL((url) => url.pathname === "/projects");
    expect(new URL(page.url()).pathname).toBe("/projects");
    await expect(panel).toHaveCount(0);
  });

  test("5 · layout & hit-testing: nothing covered, strip always visible", async ({ page }, testInfo) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await openPanel(page);

    const panel = page.locator(PANEL);
    const scroll = page.locator(`${PANEL} ${SCROLL}`);
    const strip = page.locator(STRIP);

    await expect(strip).toBeVisible();

    const metrics = await scroll.evaluate((el) => ({
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
      scrollable: el.scrollHeight > el.clientHeight + 1,
    }));
    console.log(
      `[layout ${testInfo.project.name}] grid scrollHeight=${metrics.scrollHeight} clientHeight=${metrics.clientHeight} scrollable=${metrics.scrollable}`
    );

    // The wrapper must not clip/scroll globally — the inner surface does that.
    expect(await panel.evaluate((el) => getComputedStyle(el).overflow)).toBe("visible");
    expect(await panel.evaluate((el) => getComputedStyle(el).pointerEvents)).toBe("auto");

    // The ECC strip is a non-scrolling bottom row, always inside the viewport.
    const stripBox = (await strip.boundingBox())!;
    const vh = page.viewportSize()!.height;
    console.log(`[layout ${testInfo.project.name}] strip bottom=${Math.round(stripBox.y + stripBox.height)} viewport=${vh}`);
    expect(stripBox.y + stripBox.height).toBeLessThanOrEqual(vh);

    // Nothing is covered: elementFromPoint at each item + strip centre resolves inside the panel.
    const probes = await page.evaluate(
      ({ panelSel, scrollSel, stripSel }) => {
        const p = document.querySelector(panelSel)!;
        const nodes = Array.from(document.querySelectorAll(`${scrollSel} a`));
        const stripEl = document.querySelector(stripSel);
        const list = stripEl ? [...nodes, stripEl] : nodes;
        return list.map((n, i) => {
          const r = n.getBoundingClientRect();
          const x = r.left + r.width / 2;
          const y = r.top + r.height / 2;
          const el = document.elementFromPoint(x, y);
          return { i, covered: !(el && p.contains(el)), tag: el?.tagName ?? "null" };
        });
      },
      { panelSel: PANEL, scrollSel: SCROLL, stripSel: STRIP }
    );
    const covered = probes.filter((p) => p.covered);
    expect(covered, `covered nodes: ${JSON.stringify(covered)}`).toEqual([]);

    if (testInfo.project.name === "Desktop 1440x900") {
      expect(
        metrics.scrollable,
        `1440x900 must fit all 9 items + strip without scrolling (scrollHeight=${metrics.scrollHeight}, clientHeight=${metrics.clientHeight})`
      ).toBe(false);
    }

    if (testInfo.project.name === "Desktop 1366x768" && metrics.scrollable) {
      const box = (await scroll.boundingBox())!;
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.wheel(0, 300);
      await expect.poll(() => scroll.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
      await expect(strip).toBeVisible();
      // The page behind must not have scrolled.
      expect(await page.evaluate(() => window.scrollY)).toBe(0);
      await page.screenshot({
        path: path.join(SHOTS, "dropdown-fixed-1366-grid-scrolled.png"),
      });
    }

    await page.screenshot({
      path: path.join(SHOTS, `dropdown-fixed-layout-${testInfo.project.name.replace(/\s+/g, "-")}.png`),
    });
  });

  test("6 · keyboard flow + header never hides while open", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const panel = page.locator(PANEL);
    const trigger = page.locator(TRIGGER);
    const inPanel = () =>
      page.evaluate(() => {
        const p = document.getElementById("services-dropdown-panel");
        return !!p && p.contains(document.activeElement);
      });

    // Enter opens.
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(panel).toBeVisible();

    // Tab is trapped inside the panel.
    await page.keyboard.press("Tab");
    expect(await inPanel()).toBe(true);

    // ArrowDown moves focus to the next panel item.
    const before = await page.evaluate(() => document.activeElement?.textContent ?? "");
    await page.keyboard.press("ArrowDown");
    expect(await page.evaluate(() => document.activeElement?.textContent ?? "")).not.toBe(before);

    // ESC closes and returns focus to the trigger.
    await page.keyboard.press("Escape");
    await expect(panel).toHaveCount(0);
    expect(await page.evaluate(() => document.activeElement?.id)).toBe("services-dropdown-trigger");

    // ArrowDown opens and moves focus into the panel.
    await trigger.focus();
    await page.keyboard.press("ArrowDown");
    await expect(panel).toBeVisible();
    expect(await inPanel()).toBe(true);
    await page.keyboard.press("Escape");

    // Header must not scroll-hide while the panel is open.
    await openPanel(page);
    const header = page.locator("header[role=banner]");
    const beforeY = (await header.boundingBox())!.y;
    await page.evaluate(() => window.scrollBy(0, 700));
    await page.waitForTimeout(600);
    await expect(header).toBeVisible();
    await expect(panel).toBeVisible();
    const afterY = (await header.boundingBox())!.y;
    console.log(`[header] y before scroll=${Math.round(beforeY)} after scroll=${Math.round(afterY)}`);
    expect(afterY).toBeGreaterThanOrEqual(0);

    expect(errors, errors.join("\n")).toEqual([]);
  });
});
