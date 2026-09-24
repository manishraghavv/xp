import { test } from "@playwright/test";

test("step 1 measurement", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("http://localhost:3008/", { waitUntil: "networkidle" });

  const hamburger = page.locator('button[aria-label="Open navigation menu"]');
  await hamburger.click();
  await page.waitForSelector("#navigation-menu-panel", { state: "visible" });
  await page.waitForTimeout(500);

  const measure = await page.evaluate(() => {
    const scrollEl = document.querySelector("#navigation-menu-panel .overflow-y-auto") as HTMLElement;
    if (!scrollEl) return { error: "No scrollEl found" };

    const getMetrics = (el: HTMLElement) => {
      const cs = getComputedStyle(el);
      return {
        tag: el.tagName,
        id: el.id,
        className: el.className,
        clientHeight: el.clientHeight,
        scrollHeight: el.scrollHeight,
        scrollTop: el.scrollTop,
        display: cs.display,
        flexDirection: cs.flexDirection,
        justifyContent: cs.justifyContent,
        alignItems: cs.alignItems,
        placeContent: cs.placeContent,
        overflowY: cs.overflowY,
        height: cs.height,
        maxHeight: cs.maxHeight,
        minHeight: cs.minHeight,
      };
    };

    const target = getMetrics(scrollEl);
    const ancestors = [];
    let curr = scrollEl.parentElement;
    for (let i = 0; i < 3 && curr; i++) {
      ancestors.push(getMetrics(curr));
      curr = curr.parentElement;
    }

    return { target, ancestors };
  });

  console.log("=== STEP 1 ELEMENT AND ANCESTORS METRICS ===");
  console.log(JSON.stringify(measure, null, 2));

  // Log scrollTop and window.scrollY before wheel
  const before = await page.evaluate(() => {
    const scrollEl = document.querySelector("#navigation-menu-panel .overflow-y-auto") as HTMLElement;
    return {
      scrollTop: scrollEl?.scrollTop ?? -1,
      windowScrollY: window.scrollY,
    };
  });

  // Call page.mouse.move(700, 500) + page.mouse.wheel(0, 600)
  await page.mouse.move(700, 500);
  await page.mouse.wheel(0, 600);
  await page.waitForTimeout(500);

  // Log scrollTop and window.scrollY after wheel
  const after = await page.evaluate(() => {
    const scrollEl = document.querySelector("#navigation-menu-panel .overflow-y-auto") as HTMLElement;
    return {
      scrollTop: scrollEl?.scrollTop ?? -1,
      windowScrollY: window.scrollY,
    };
  });

  console.log("=== BEFORE WHEEL ===");
  console.log(JSON.stringify(before, null, 2));
  console.log("=== AFTER WHEEL ===");
  console.log(JSON.stringify(after, null, 2));

  // Also log document.elementFromPoint(700, 500) and its ancestor chain
  const hitTest = await page.evaluate(() => {
    const el = document.elementFromPoint(700, 500);
    if (!el) return null;
    const chain = [];
    let curr: Element | null = el;
    while (curr) {
      chain.push({
        tag: curr.tagName,
        id: curr.id,
        className: curr.className?.toString().slice(0, 80),
        pointerEvents: getComputedStyle(curr).pointerEvents,
      });
      curr = curr.parentElement;
    }
    return {
      element: {
        tag: el.tagName,
        id: el.id,
        className: el.className?.toString().slice(0, 80),
      },
      chain,
    };
  });

  console.log("=== HIT TEST AT (700, 500) ===");
  console.log(JSON.stringify(hitTest, null, 2));
});
