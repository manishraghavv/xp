import { test } from "@playwright/test";

test("check DOM node identity", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("http://localhost:3008/", { waitUntil: "networkidle" });

  const hamburger = page.locator('button[aria-label="Open navigation menu"]');
  await hamburger.click();
  await page.waitForSelector("#navigation-menu-panel", { state: "visible" });
  await page.waitForTimeout(500);

  // Mark the scroll element with a custom property
  const result = await page.evaluate(() => {
    return new Promise<Record<string, unknown>>((resolve) => {
      const panel = document.getElementById("navigation-menu-panel");
      const scrollEl = panel?.children[1] as HTMLElement | null;
      if (!scrollEl) { resolve({ error: "no element" }); return; }

      // Tag the element
      (scrollEl as unknown as Record<string, unknown>).__testTag = "original";
      scrollEl.dataset.testTag = "original";

      // Set up a MutationObserver on the parent to detect if children are replaced
      const mutations: string[] = [];
      const observer = new MutationObserver((muts) => {
        for (const mut of muts) {
          mutations.push(
            `${mut.type} target=${(mut.target as Element).tagName}#${(mut.target as Element).id} ` +
            `added=${mut.addedNodes.length} removed=${mut.removedNodes.length}`
          );
        }
      });
      observer.observe(panel!, { childList: true, subtree: false });

      // Also watch the scroll element's parent for changes
      const parentObserver = new MutationObserver((muts) => {
        for (const mut of muts) {
          mutations.push(
            `parent: ${mut.type} target=${(mut.target as Element).tagName} ` +
            `added=${mut.addedNodes.length} removed=${mut.removedNodes.length} ` +
            `attr=${mut.attributeName || 'N/A'}`
          );
        }
      });
      parentObserver.observe(scrollEl, { childList: true, attributes: true, subtree: false });

      scrollEl.scrollTop = 200;

      const checks: { dt: number; scrollTop: number; sameNode: boolean; hasTag: boolean; dataTag: string | undefined }[] = [];
      [10, 50, 100, 200, 500].forEach(dt => {
        setTimeout(() => {
          const currentScrollEl = panel?.children[1] as HTMLElement | null;
          checks.push({
            dt,
            scrollTop: currentScrollEl?.scrollTop ?? -1,
            sameNode: currentScrollEl === scrollEl,
            hasTag: (currentScrollEl as unknown as Record<string, unknown>)?.__testTag === "original",
            dataTag: currentScrollEl?.dataset.testTag,
          });
        }, dt);
      });

      setTimeout(() => {
        observer.disconnect();
        parentObserver.disconnect();
        resolve({ checks, mutations: mutations.slice(0, 20) });
      }, 600);
    });
  });

  console.log("=== DOM NODE IDENTITY ===");
  console.log(JSON.stringify(result, null, 2));
});
