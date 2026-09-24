import { test } from "@playwright/test";

test("track scrollTop every frame during wheel", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("http://localhost:3008/", { waitUntil: "networkidle" });

  const hamburger = page.locator('button[aria-label="Open navigation menu"]');
  await hamburger.click();
  await page.waitForSelector("#navigation-menu-panel", { state: "visible" });
  await page.waitForTimeout(500);

  const scroller = page.locator(".menu-scroll");

  // Track on the browser side:
  await page.evaluate(() => {
    const scroller = document.querySelector(".menu-scroll") as HTMLElement;
    (window as any).__scrollLog = [];
    
    // Listen to scroll events
    scroller.addEventListener("scroll", (e) => {
      (window as any).__scrollLog.push({
        type: "scroll-event",
        scrollTop: scroller.scrollTop,
        time: performance.now(),
      });
    });

    // Also requestAnimationFrame tracker
    let tracking = true;
    const track = () => {
      if (!tracking) return;
      (window as any).__scrollLog.push({
        type: "raf",
        scrollTop: scroller.scrollTop,
        time: performance.now(),
      });
      requestAnimationFrame(track);
    };
    requestAnimationFrame(track);

    setTimeout(() => { tracking = false; }, 2000);
  });

  await page.mouse.move(700, 400);
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(1000);

  const logs = await page.evaluate(() => (window as any).__scrollLog);
  // Filter only logs where scrollTop > 0 or right around changes
  console.log("Scroll logs with scrollTop > 0:", logs.filter((l: any) => l.scrollTop > 0));
  console.log("Total logs count:", logs.length);
  if (logs.filter((l: any) => l.scrollTop > 0).length === 0) {
    console.log("First 10 logs:", logs.slice(0, 10));
  }
});
