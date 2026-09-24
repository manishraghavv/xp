import { test } from "@playwright/test";

test("check element at points", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("http://localhost:3008/", { waitUntil: "networkidle" });

  const hamburger = page.locator('button[aria-label="Open navigation menu"]');
  await hamburger.click();
  await page.waitForSelector("#navigation-menu-panel", { state: "visible" });
  await page.waitForTimeout(500);

  const res = await page.evaluate(() => {
    const el1 = document.elementFromPoint(700, 400);
    const el2 = document.elementFromPoint(675.5, 387.5);

    const getChain = (el: Element | null) => {
      const chain = [];
      let c = el;
      while (c) {
        chain.push(c.tagName + (c.id ? '#' + c.id : '') + (c.className ? '.' + c.className.toString().slice(0, 30) : ''));
        c = c.parentElement;
      }
      return chain;
    };

    return {
      pt1: { tag: el1?.tagName, id: el1?.id, cls: el1?.className, chain: getChain(el1) },
      pt2: { tag: el2?.tagName, id: el2?.id, cls: el2?.className, chain: getChain(el2) },
    };
  });

  console.log("Points comparison:", JSON.stringify(res, null, 2));

  // Now test wheel at (700, 400)
  const scroller = page.locator(".menu-scroll");
  await page.mouse.move(700, 400);
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(300);
  console.log("scrollTop after wheel at (700, 400):", await scroller.evaluate(el => el.scrollTop));

  // Now test wheel at (675.5, 387.5)
  await scroller.evaluate(el => { el.scrollTop = 0; });
  await page.mouse.move(675.5, 387.5);
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(300);
  console.log("scrollTop after wheel at (675.5, 387.5):", await scroller.evaluate(el => el.scrollTop));
});
