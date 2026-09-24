import { test } from "@playwright/test";

test("check final scrollTop after wheel", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("http://localhost:3008/", { waitUntil: "networkidle" });

  const hamburger = page.locator('button[aria-label="Open navigation menu"]');
  await hamburger.click();
  await page.waitForSelector("#navigation-menu-panel", { state: "visible" });
  await page.waitForTimeout(500);

  const scroller = page.locator(".menu-scroll");
  const box = await scroller.boundingBox();
  const midX = box!.x + box!.width / 2;
  const midY = box!.y + box!.height / 2;

  console.log("midX, midY:", midX, midY);

  await page.mouse.move(midX, midY);
  await page.mouse.wheel(0, 600);
  await page.waitForTimeout(300);

  const st600 = await scroller.evaluate(el => el.scrollTop);
  console.log("scrollTop after wheel(0, 600):", st600);

  await page.mouse.wheel(0, 1000);
  await page.waitForTimeout(300);

  const st1600 = await scroller.evaluate(el => el.scrollTop);
  console.log("scrollTop after wheel(0, 1000):", st1600);

  await page.mouse.wheel(0, 3000);
  await page.waitForTimeout(300);

  const st3000 = await scroller.evaluate(el => el.scrollTop);
  console.log("scrollTop after wheel(0, 3000):", st3000);
});
