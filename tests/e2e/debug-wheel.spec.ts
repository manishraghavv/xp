import { test } from "@playwright/test";

test("debug wheel on scroller", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("http://localhost:3008/", { waitUntil: "networkidle" });

  const hamburger = page.locator('button[aria-label="Open navigation menu"]');
  await hamburger.click();
  await page.waitForSelector("#navigation-menu-panel", { state: "visible" });
  await page.waitForTimeout(300);

  const scroller = page.locator(".menu-scroll");
  const box = await scroller.boundingBox();
  console.log("Scroller box:", box);

  const pointInfo = await page.evaluate(({ x, y }) => {
    const el = document.elementFromPoint(x, y);
    return {
      tag: el?.tagName,
      className: (el as HTMLElement)?.className,
      id: el?.id,
      overflow: el ? getComputedStyle(el).overflow : null,
      overflowY: el ? getComputedStyle(el).overflowY : null,
    };
  }, { x: 700, y: 400 });
  console.log("Element at (700, 400):", pointInfo);

  // Let's add wheel listener to log what receives wheel event
  await page.evaluate(() => {
    (window as any).__wheelHits = [];
    window.addEventListener("wheel", (e) => {
      (window as any).__wheelHits.push({
        target: (e.target as HTMLElement).tagName + "." + (e.target as HTMLElement).className?.slice(0, 30),
        deltaY: e.deltaY,
        defaultPrevented: e.defaultPrevented,
        composedPath: e.composedPath().map((n: any) => n.tagName || n.nodeName),
      });
    }, { passive: false });
  });

  await page.mouse.move(700, 400);
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(300);

  const hits = await page.evaluate(() => (window as any).__wheelHits);
  console.log("Wheel event hits:", JSON.stringify(hits, null, 2));

  const scrollAfter = await scroller.evaluate((el) => el.scrollTop);
  console.log("ScrollTop after page.mouse.wheel:", scrollAfter);

  // Now test CDP wheel
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Input.dispatchMouseEvent", {
    type: "mouseWheel",
    x: 700,
    y: 400,
    deltaX: 0,
    deltaY: 500,
  });
  await page.waitForTimeout(300);

  const scrollAfterCDP = await scroller.evaluate((el) => el.scrollTop);
  console.log("ScrollTop after CDP mouseWheel:", scrollAfterCDP);
});
