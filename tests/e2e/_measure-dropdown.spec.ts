import { test, expect } from "@playwright/test";

const PATHS = ["/", "/services/sap-centre-of-excellence-coe"];
const VIEWPORTS = [
  { width: 1440, height: 900 },
  { width: 1366, height: 768 },
];

for (const vp of VIEWPORTS) {
  for (const p of PATHS) {
    test(`MEASURE ${vp.width}x${vp.height} ${p}`, async ({ page }) => {
      const logs: string[] = [];
      page.on("console", (m) => logs.push(`console.${m.type()}: ${m.text()}`));
      page.on("pageerror", (e) => logs.push(`pageerror: ${e.message}`));

      await page.setViewportSize(vp);
      await page.goto(p, { waitUntil: "networkidle" });

      const trigger = page.locator("#services-dropdown-trigger");
      await trigger.click();
      await page.waitForTimeout(400);

      const panel = page.locator("#services-dropdown-panel");
      const present = (await panel.count()) > 0;
      console.log(`\n===== MEASURE ${vp.width}x${vp.height} ${p} =====`);
      console.log("panel present after click:", present);
      if (!present) {
        console.log(logs.join("\n"));
        return;
      }

      const box = await panel.boundingBox();
      console.log("panel bbox:", JSON.stringify(box));

      // Ancestor chain styles
      const chain = await page.evaluate(() => {
        const panel = document.getElementById("services-dropdown-panel");
        if (!panel) return null;
        const pick = (el: Element) => {
          const cs = getComputedStyle(el);
          return {
            tag: el.tagName,
            id: (el as HTMLElement).id,
            cls: String((el as HTMLElement).className).slice(0, 70),
            pointerEvents: cs.pointerEvents,
            zIndex: cs.zIndex,
            position: cs.position,
            overflow: cs.overflow,
            opacity: cs.opacity,
            transform: cs.transform,
            filter: cs.filter,
            backdropFilter: cs.backdropFilter,
          };
        };
        const out: ReturnType<typeof pick>[] = [];
        let cur: Element | null = panel;
        while (cur) {
          out.push(pick(cur));
          cur = cur.parentElement;
        }
        return out;
      });
      for (const c of chain ?? []) console.log("  ", JSON.stringify(c));

      // Bridge / panel computed
      const panelCs = await panel.evaluate((el) => {
        const cs = getComputedStyle(el);
        return {
          pointerEvents: cs.pointerEvents,
          maxHeight: cs.maxHeight,
          overflowY: cs.overflowY,
          isolation: cs.isolation,
          top: cs.top,
          scrollbarWidth: cs.scrollbarWidth,
          scrollHeight: el.scrollHeight,
          clientHeight: el.clientHeight,
          isScrollable: el.scrollHeight > el.clientHeight,
        };
      });
      console.log("panel computed:", JSON.stringify(panelCs));

      // Step-by-step mouse move from trigger centre to first service item
      const tbox = await trigger.boundingBox();
      const firstItem = page.locator("#services-dropdown-panel a").nth(1);
      const ibox = await firstItem.boundingBox();
      console.log("trigger bbox:", JSON.stringify(tbox), "first item bbox:", JSON.stringify(ibox));

      if (tbox && ibox) {
        const sx = tbox.x + tbox.width / 2;
        const sy = tbox.y + tbox.height / 2;
        const ex = ibox.x + ibox.width / 2;
        const ey = ibox.y + ibox.height / 2;
        for (let i = 1; i <= 15; i++) {
          const x = sx + ((ex - sx) * i) / 15;
          const y = sy + ((ey - sy) * i) / 15;
          await page.mouse.move(x, y);
          const info = await page.evaluate(
            ({ x, y }) => {
              const panel = document.getElementById("services-dropdown-panel");
              const el = document.elementFromPoint(x, y) as HTMLElement | null;
              const inside = !!(panel && el && panel.contains(el));
              const cs = panel ? getComputedStyle(panel) : null;
              return {
                panelInDom: !!panel,
                panelVisible: !!panel && cs!.opacity !== "0" && cs!.visibility !== "hidden",
                hit: el ? `${el.tagName}.${String(el.className).slice(0, 40)}` : "null",
                insidePanel: inside,
              };
            },
            { x, y }
          );
          console.log(
            `  step ${i}: at (${x.toFixed(0)},${y.toFixed(0)}) inDom=${info.panelInDom} visible=${info.panelVisible} hit=${info.hit} insidePanel=${info.insidePanel}`
          );
        }
      }

      // Click first service item, log resulting URL
      if (present && (await panel.isVisible().catch(() => false))) {
        await firstItem.click({ timeout: 3000 }).catch((e) => logs.push("click error: " + e.message));
        await page.waitForTimeout(800);
        console.log("URL after clicking first item:", page.url());
      } else {
        console.log("panel not visible before item click; skipping");
      }

      if (logs.length) console.log("---- page logs ----\n" + logs.join("\n"));
    });
  }
}
