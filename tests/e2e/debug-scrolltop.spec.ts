import { test } from "@playwright/test";

test("check why scrollTop returns 0", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("http://localhost:3008/", { waitUntil: "networkidle" });

  const hamburger = page.locator('button[aria-label="Open navigation menu"]');
  await hamburger.click();
  await page.waitForSelector("#navigation-menu-panel", { state: "visible" });
  await page.waitForTimeout(300);

  const res = await page.evaluate(() => {
    const scroller = document.querySelector(".menu-scroll") as HTMLElement;
    if (!scroller) return { error: "no .menu-scroll" };

    const cs = getComputedStyle(scroller);
    const before = scroller.scrollTop;
    scroller.scrollTop = 200;
    const after = scroller.scrollTop;

    return {
      before,
      after,
      clientHeight: scroller.clientHeight,
      scrollHeight: scroller.scrollHeight,
      offsetHeight: scroller.offsetHeight,
      overflow: cs.overflow,
      overflowY: cs.overflowY,
      display: cs.display,
      position: cs.position,
      height: cs.height,
      maxHeight: cs.maxHeight,
      flex: cs.flex,
      childrenCount: scroller.children.length,
      childTag: scroller.children[0]?.tagName,
      childClientHeight: (scroller.children[0] as HTMLElement)?.clientHeight,
      childScrollHeight: (scroller.children[0] as HTMLElement)?.scrollHeight,
      childOffsetHeight: (scroller.children[0] as HTMLElement)?.offsetHeight,
      childStyleHeight: (scroller.children[0] as HTMLElement)?.style.height,
      childComputedHeight: getComputedStyle(scroller.children[0] as HTMLElement)?.height,
    };
  });

  console.log("Scroller inspection:", JSON.stringify(res, null, 2));
});
