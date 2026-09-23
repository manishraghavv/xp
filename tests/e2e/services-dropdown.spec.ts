import { test, expect } from "@playwright/test";
import path from "path";

const SCREENSHOT_DIR = path.join(process.cwd(), "reference", "verify");

// Only run the interactive dropdown tests on desktop viewports (lg: >= 1024px)
// On mobile the centre pill is hidden (lg:flex), and Services is in the hamburger menu.
test.describe("Services Dropdown", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
  });

  test("1. Click Services → panel opens, stays visible for 1.5s", async ({
    page,
    browserName,
  }, testInfo) => {
    // Skip on mobile viewport (no centre pill)
    const vw = page.viewportSize()?.width ?? 0;
    if (vw < 1024) {
      test.skip();
      return;
    }

    const trigger = page.locator("#services-dropdown-trigger");
    await expect(trigger).toBeVisible();

    // Click the trigger
    await trigger.click();
    await page.waitForTimeout(300);

    const panel = page.locator("#services-dropdown-panel");
    await expect(panel).toBeVisible();

    // Verify panel dimensions
    const panelBox = await panel.boundingBox();
    expect(panelBox).not.toBeNull();
    expect(panelBox!.width).toBeGreaterThan(600);

    // Verify computed styles
    const opacity = await panel.evaluate(
      (el) => getComputedStyle(el).opacity
    );
    expect(Number(opacity)).toBe(1);

    // Screenshot open state
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `dropdown-open-${testInfo.project.name.replace(/\s+/g, "-")}.png`),
    });

    // Wait 1.5s without moving the mouse — it must still be visible
    await page.waitForTimeout(1500);
    await expect(panel).toBeVisible();
  });

  test("2. Click Services again → closes; click outside → closes; ESC → closes + focus returns", async ({
    page,
  }, testInfo) => {
    const vw = page.viewportSize()?.width ?? 0;
    if (vw < 1024) { test.skip(); return; }

    const trigger = page.locator("#services-dropdown-trigger");
    const panel = page.locator("#services-dropdown-panel");

    // Open → close via second click
    await trigger.click();
    await page.waitForTimeout(300);
    await expect(panel).toBeVisible();
    await trigger.click();
    await page.waitForTimeout(300);
    await expect(panel).not.toBeVisible();

    // Open → close via click outside (on the body / scrim)
    await trigger.click();
    await page.waitForTimeout(300);
    await expect(panel).toBeVisible();
    // Click on the scrim area (top-left corner of the page, far from the panel)
    await page.mouse.click(10, 600);
    await page.waitForTimeout(300);
    await expect(panel).not.toBeVisible();

    // Open → close via ESC, confirm focus returns to trigger
    await trigger.click();
    await page.waitForTimeout(300);
    await expect(panel).toBeVisible();
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    await expect(panel).not.toBeVisible();

    // Check that focus returned to the trigger
    const focusedId = await page.evaluate(() => document.activeElement?.id);
    expect(focusedId).toBe("services-dropdown-trigger");

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `dropdown-closed-${testInfo.project.name.replace(/\s+/g, "-")}.png`),
    });
  });

  test("3. Hover opens, moving to panel keeps open, leaving closes", async ({
    page,
  }) => {
    const vw = page.viewportSize()?.width ?? 0;
    if (vw < 1024) { test.skip(); return; }

    const trigger = page.locator("#services-dropdown-trigger");
    const triggerBox = await trigger.boundingBox();
    expect(triggerBox).not.toBeNull();

    const panel = page.locator("#services-dropdown-panel");

    // Hover the trigger
    await page.mouse.move(
      triggerBox!.x + triggerBox!.width / 2,
      triggerBox!.y + triggerBox!.height / 2
    );
    // Wait for 100ms open delay + rendering
    await page.waitForTimeout(300);
    await expect(panel).toBeVisible();

    // Move pointer into the panel
    const panelBox = await panel.boundingBox();
    expect(panelBox).not.toBeNull();
    await page.mouse.move(
      panelBox!.x + panelBox!.width / 2,
      panelBox!.y + panelBox!.height / 2
    );
    await page.waitForTimeout(200);
    await expect(panel).toBeVisible();

    // Leave the panel area entirely
    await page.mouse.move(10, 600);
    await page.waitForTimeout(400);
    await expect(panel).not.toBeVisible();
  });

  test("4. Clicking a service item navigates and closes the panel", async ({
    page,
  }) => {
    const vw = page.viewportSize()?.width ?? 0;
    if (vw < 1024) { test.skip(); return; }

    const trigger = page.locator("#services-dropdown-trigger");
    await trigger.click();
    await page.waitForTimeout(300);

    // Click the first service link in the panel
    const firstServiceLink = page.locator("#services-dropdown-panel a").nth(1); // skip "Explore All Services" 
    await firstServiceLink.click();
    await page.waitForURL(/\/services\//);

    // Panel should be closed
    const panel = page.locator("#services-dropdown-panel");
    await expect(panel).not.toBeVisible();
  });

  test("5. 'Explore All Services' navigates to /services", async ({
    page,
  }) => {
    const vw = page.viewportSize()?.width ?? 0;
    if (vw < 1024) { test.skip(); return; }

    const trigger = page.locator("#services-dropdown-trigger");
    await trigger.click();
    await page.waitForTimeout(300);

    const exploreLink = page
      .locator("#services-dropdown-panel")
      .getByText("Explore All Services");
    await exploreLink.click();
    await page.waitForURL("/services");
  });

  test("6. Keyboard: Enter opens, ArrowDown focuses first item, ESC closes", async ({
    page,
  }) => {
    const vw = page.viewportSize()?.width ?? 0;
    if (vw < 1024) { test.skip(); return; }

    const trigger = page.locator("#services-dropdown-trigger");
    await trigger.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(300);

    const panel = page.locator("#services-dropdown-panel");
    await expect(panel).toBeVisible();

    // ESC to close
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    await expect(panel).not.toBeVisible();

    // ArrowDown to open and focus first item
    await trigger.focus();
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(300);
    await expect(panel).toBeVisible();

    // Verify focus is inside the panel
    const focusedInPanel = await page.evaluate(() => {
      const panel = document.getElementById("services-dropdown-panel");
      return panel?.contains(document.activeElement) ?? false;
    });
    expect(focusedInPanel).toBe(true);
  });

  test("7. Opening hamburger closes dropdown", async ({ page }) => {
    const vw = page.viewportSize()?.width ?? 0;
    if (vw < 1024) { test.skip(); return; }

    const trigger = page.locator("#services-dropdown-trigger");
    await trigger.click();
    await page.waitForTimeout(300);

    const panel = page.locator("#services-dropdown-panel");
    await expect(panel).toBeVisible();

    // Click the hamburger button
    const hamburger = page.getByLabel("Open navigation menu");
    await hamburger.click();
    await page.waitForTimeout(300);
    await expect(panel).not.toBeVisible();
  });

  test("8. Header stays visible while panel is open, even when scrolling", async ({
    page,
  }) => {
    const vw = page.viewportSize()?.width ?? 0;
    if (vw < 1024) { test.skip(); return; }

    const trigger = page.locator("#services-dropdown-trigger");
    await trigger.click();
    await page.waitForTimeout(300);

    const panel = page.locator("#services-dropdown-panel");
    await expect(panel).toBeVisible();

    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(500);

    // Both the header bar and panel should still be visible
    const header = page.locator("header[role=banner]");
    await expect(header).toBeVisible();
    await expect(panel).toBeVisible();
  });
});

test.describe("Services pages render", () => {
  test("all /services pages return 200", async ({ page }) => {
    const response = await page.goto("/services");
    expect(response?.status()).toBe(200);

    const slugs = [
      "sap-cloud-saas-solutions",
      "sap-analytics-reporting",
      "sap-integration-services",
      "sap-grc-security-compliance",
      "sap-training-enablement",
      "s4hana-upgrade-migration",
      "sap-implementation-rollout",
      "application-management-services-ams",
      "sap-centre-of-excellence-coe",
    ];

    for (const slug of slugs) {
      const res = await page.goto(`/services/${slug}`);
      expect(res?.status()).toBe(200);
      // Check no console errors by verifying content rendered
      const heading = page.locator("h1");
      await expect(heading).toBeVisible();
    }
  });
});

test.describe("Dropdown on /about after scroll", () => {
  test("works after scrolling down and back up", async ({ page }, testInfo) => {
    const vw = page.viewportSize()?.width ?? 0;
    if (vw < 1024) { test.skip(); return; }

    await page.goto("/about", { waitUntil: "networkidle" });

    // Scroll down to hide the header
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(600);

    // Scroll back up to reveal the header
    await page.evaluate(() => window.scrollBy(0, -400));
    await page.waitForTimeout(600);

    const trigger = page.locator("#services-dropdown-trigger");
    await expect(trigger).toBeVisible();

    await trigger.click();
    await page.waitForTimeout(300);

    const panel = page.locator("#services-dropdown-panel");
    await expect(panel).toBeVisible();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `dropdown-about-${testInfo.project.name.replace(/\s+/g, "-")}.png`),
    });

    // Close
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    await expect(panel).not.toBeVisible();
  });
});
