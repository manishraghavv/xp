import { test } from "@playwright/test";

test("test why wheel does not scroll", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("http://localhost:3008/", { waitUntil: "networkidle" });

  const hamburger = page.locator('button[aria-label="Open navigation menu"]');
  await hamburger.click();
  await page.waitForSelector("#navigation-menu-panel", { state: "visible" });
  await page.waitForTimeout(300);

  const scroller = page.locator(".menu-scroll");

  // Test 1: baseline (current)
  await page.mouse.move(700, 400);
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(300);
  console.log("Baseline scrollTop:", await scroller.evaluate(el => el.scrollTop));

  // Test 2: what if html does NOT have overflow: hidden?
  await page.evaluate(() => {
    document.documentElement.classList.remove("menu-open");
    document.documentElement.style.overflow = "visible";
    document.body.style.overflow = "visible";
  });
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(300);
  console.log("With html visible scrollTop:", await scroller.evaluate(el => el.scrollTop));

  // Test 3: what if overscroll-behavior is NOT contain?
  await page.evaluate(() => {
    const el = document.querySelector(".menu-scroll") as HTMLElement;
    el.style.overscrollBehavior = "auto";
  });
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(300);
  console.log("With overscroll auto scrollTop:", await scroller.evaluate(el => el.scrollTop));

  // Test 4: what if touch-action is NOT pan-y?
  await page.evaluate(() => {
    const el = document.querySelector(".menu-scroll") as HTMLElement;
    el.style.touchAction = "auto";
  });
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(300);
  console.log("With touch-action auto scrollTop:", await scroller.evaluate(el => el.scrollTop));

  // Test 5: What if we remove animate-in from #navigation-menu-panel?
  await page.evaluate(() => {
    const panel = document.getElementById("navigation-menu-panel")!;
    panel.className = panel.className.replace(/animate-in[^\s]*/g, "").replace(/fade-in[^\s]*/g, "").replace(/slide-in[^\s]*/g, "");
    panel.style.animation = "none";
    panel.style.transform = "none";
  });
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(300);
  console.log("With animation removed scrollTop:", await scroller.evaluate(el => el.scrollTop));

  // Test 6: Is programmatic scrollTop working?
  await scroller.evaluate(el => { el.scrollTop = 200; });
  console.log("Programmatic scrollTop:", await scroller.evaluate(el => el.scrollTop));

  // Test 7: If programmatic scrollTop worked, does wheel from 200 work?
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(300);
  console.log("Wheel after programmatic scrollTop=200:", await scroller.evaluate(el => el.scrollTop));

  // Test 8: Does scrollRef have focus?
  await scroller.focus();
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(300);
  console.log("Wheel after scroller.focus():", await scroller.evaluate(el => el.scrollTop));
});
