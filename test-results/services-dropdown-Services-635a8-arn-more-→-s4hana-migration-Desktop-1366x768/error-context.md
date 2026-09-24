# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: services-dropdown.spec.ts >> Services dropdown (click-only) >> 3 · 'Explore All Services' → /services and strip 'Learn more' → /s4hana-migration
- Location: tests\e2e\services-dropdown.spec.ts:134:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3008/
Call log:
  - navigating to "http://localhost:3008/", waiting until "networkidle"

```

# Test source

```ts
  37  |     errors = [];
  38  |     page.on("console", (msg) => {
  39  |       if (msg.type() === "error") errors.push(`console.error: ${msg.text()}`);
  40  |     });
  41  |     page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  42  |   });
  43  | 
  44  |   for (const route of ["/", "/services/sap-centre-of-excellence-coe"] as const) {
  45  |     test(`1 · click opens within 300ms, stays open 2s, mouse travels in — ${route}`, async ({
  46  |       page,
  47  |     }, testInfo) => {
  48  |       await page.goto(route, { waitUntil: "networkidle" });
  49  | 
  50  |       const trigger = page.locator(TRIGGER);
  51  |       const panel = page.locator(PANEL);
  52  | 
  53  |       await trigger.click();
  54  |       await expect(panel).toBeVisible({ timeout: 300 });
  55  | 
  56  |       // The open state must never be stuck at opacity: 0.
  57  |       await expect
  58  |         .poll(() => panel.evaluate((el) => getComputedStyle(el).opacity), { timeout: 1000 })
  59  |         .toBe("1");
  60  | 
  61  |       // No mouse movement for 2 seconds — it must still be open (no hover timer).
  62  |       await page.waitForTimeout(2000);
  63  |       await expect(panel).toBeVisible();
  64  | 
  65  |       // Real mouse travel from the trigger centre to the first service item, 15 steps.
  66  |       const tBox = (await trigger.boundingBox())!;
  67  |       const firstItem = page.locator(`${PANEL} ${SCROLL} a`).first();
  68  |       const fBox = (await firstItem.boundingBox())!;
  69  |       const sx = tBox.x + tBox.width / 2;
  70  |       const sy = tBox.y + tBox.height / 2;
  71  |       const ex = fBox.x + fBox.width / 2;
  72  |       const ey = fBox.y + fBox.height / 2;
  73  | 
  74  |       for (let i = 1; i <= 15; i++) {
  75  |         await page.mouse.move(sx + ((ex - sx) * i) / 15, sy + ((ey - sy) * i) / 15, { steps: 1 });
  76  |         await expect(panel, `panel must stay open at travel step ${i}`).toBeVisible();
  77  |       }
  78  | 
  79  |       const endHit = await page.evaluate(
  80  |         ({ x, y }) => {
  81  |           const p = document.getElementById("services-dropdown-panel")!;
  82  |           const el = document.elementFromPoint(x, y);
  83  |           return { inside: !!(el && p.contains(el)), tag: el?.tagName ?? "null" };
  84  |         },
  85  |         { x: ex, y: ey }
  86  |       );
  87  |       expect(endHit.inside, `elementFromPoint at end of travel hit ${endHit.tag}`).toBe(true);
  88  | 
  89  |       // Hovering every one of the 9 items must apply its hover surface.
  90  |       const items = page.locator(`${PANEL} ${SCROLL} a`);
  91  |       await expect(items).toHaveCount(9);
  92  |       for (let i = 0; i < 9; i++) {
  93  |         const box = (await items.nth(i).boundingBox())!;
  94  |         await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  95  |         await expect
  96  |           .poll(() => items.nth(i).evaluate((el) => getComputedStyle(el).backgroundColor), {
  97  |             message: `item ${i + 1} must show a hover background`,
  98  |           })
  99  |           .not.toBe("rgba(0, 0, 0, 0)");
  100 |       }
  101 | 
  102 |       await expect(panel).toBeVisible();
  103 |       await page.screenshot({
  104 |         path: path.join(SHOTS, `dropdown-fixed-open-${testInfo.project.name.replace(/\s+/g, "-")}.png`),
  105 |       });
  106 | 
  107 |       expect(errors, errors.join("\n")).toEqual([]);
  108 |     });
  109 |   }
  110 | 
  111 |   test("2 · each of the 9 items navigates to /services/[slug] and closes the panel", async ({
  112 |     page,
  113 |   }) => {
  114 |     // Nine full navigations, each possibly compiling a dev-server route.
  115 |     test.slow();
  116 | 
  117 |     const items = page.locator(`${PANEL} ${SCROLL} a`);
  118 | 
  119 |     for (let i = 0; i < SERVICE_SLUGS.length; i++) {
  120 |       const slug = SERVICE_SLUGS[i];
  121 |       await page.goto("/", { waitUntil: "networkidle" });
  122 |       await openPanel(page);
  123 |       await expect(items).toHaveCount(9);
  124 | 
  125 |       await items.nth(i).click();
  126 |       await page.waitForURL((url) => url.pathname === `/services/${slug}`);
  127 | 
  128 |       expect(new URL(page.url()).pathname).toBe(`/services/${slug}`);
  129 |       await expect(page.locator("h1").first()).toBeVisible();
  130 |       await expect(page.locator(PANEL)).toHaveCount(0);
  131 |     }
  132 |   });
  133 | 
  134 |   test("3 · 'Explore All Services' → /services and strip 'Learn more' → /s4hana-migration", async ({
  135 |     page,
  136 |   }) => {
> 137 |     await page.goto("/", { waitUntil: "networkidle" });
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3008/
  138 |     await openPanel(page);
  139 |     await page.locator(`${PANEL} a[href='/services']`).click();
  140 |     await page.waitForURL((url) => url.pathname === "/services");
  141 |     expect(new URL(page.url()).pathname).toBe("/services");
  142 |     await expect(page.locator(PANEL)).toHaveCount(0);
  143 | 
  144 |     await page.goto("/", { waitUntil: "networkidle" });
  145 |     await openPanel(page);
  146 |     await page.locator(STRIP).click();
  147 |     await page.waitForURL((url) => url.pathname === "/s4hana-migration");
  148 |     expect(new URL(page.url()).pathname).toBe("/s4hana-migration");
  149 |     await expect(page.locator(PANEL)).toHaveCount(0);
  150 |   });
  151 | 
  152 |   test("4 · toggle, outside click, ESC focus return, and bar link while open", async ({ page }) => {
  153 |     const panel = page.locator(PANEL);
  154 |     const trigger = page.locator(TRIGGER);
  155 | 
  156 |     await page.goto("/", { waitUntil: "networkidle" });
  157 | 
  158 |     // Second click on the trigger closes it.
  159 |     await openPanel(page);
  160 |     await trigger.click();
  161 |     await expect(panel).toHaveCount(0);
  162 | 
  163 |     // Outside (scrim) click closes it.
  164 |     await openPanel(page);
  165 |     await page.mouse.click(20, 600);
  166 |     await expect(panel).toHaveCount(0);
  167 | 
  168 |     // ESC closes and returns focus to the trigger.
  169 |     await openPanel(page);
  170 |     await page.keyboard.press("Escape");
  171 |     await expect(panel).toHaveCount(0);
  172 |     expect(await page.evaluate(() => document.activeElement?.id)).toBe("services-dropdown-trigger");
  173 | 
  174 |     // A bar link stays clickable while the panel is open: navigates + closes.
  175 |     await openPanel(page);
  176 |     await page
  177 |       .getByRole("navigation", { name: "Primary Navigation" })
  178 |       .getByRole("link", { name: "Projects" })
  179 |       .click();
  180 |     await page.waitForURL((url) => url.pathname === "/projects");
  181 |     expect(new URL(page.url()).pathname).toBe("/projects");
  182 |     await expect(panel).toHaveCount(0);
  183 |   });
  184 | 
  185 |   test("5 · layout & hit-testing: nothing covered, strip always visible", async ({ page }, testInfo) => {
  186 |     await page.goto("/", { waitUntil: "networkidle" });
  187 |     await openPanel(page);
  188 | 
  189 |     const panel = page.locator(PANEL);
  190 |     const scroll = page.locator(`${PANEL} ${SCROLL}`);
  191 |     const strip = page.locator(STRIP);
  192 | 
  193 |     await expect(strip).toBeVisible();
  194 | 
  195 |     const metrics = await scroll.evaluate((el) => ({
  196 |       scrollHeight: el.scrollHeight,
  197 |       clientHeight: el.clientHeight,
  198 |       scrollable: el.scrollHeight > el.clientHeight + 1,
  199 |     }));
  200 |     console.log(
  201 |       `[layout ${testInfo.project.name}] grid scrollHeight=${metrics.scrollHeight} clientHeight=${metrics.clientHeight} scrollable=${metrics.scrollable}`
  202 |     );
  203 | 
  204 |     // The wrapper must not clip/scroll globally — the inner surface does that.
  205 |     expect(await panel.evaluate((el) => getComputedStyle(el).overflow)).toBe("visible");
  206 |     expect(await panel.evaluate((el) => getComputedStyle(el).pointerEvents)).toBe("auto");
  207 | 
  208 |     // The ECC strip is a non-scrolling bottom row, always inside the viewport.
  209 |     const stripBox = (await strip.boundingBox())!;
  210 |     const vh = page.viewportSize()!.height;
  211 |     console.log(`[layout ${testInfo.project.name}] strip bottom=${Math.round(stripBox.y + stripBox.height)} viewport=${vh}`);
  212 |     expect(stripBox.y + stripBox.height).toBeLessThanOrEqual(vh);
  213 | 
  214 |     // Nothing is covered: elementFromPoint at each item + strip centre resolves inside the panel.
  215 |     const probes = await page.evaluate(
  216 |       ({ panelSel, scrollSel, stripSel }) => {
  217 |         const p = document.querySelector(panelSel)!;
  218 |         const nodes = Array.from(document.querySelectorAll(`${scrollSel} a`));
  219 |         const stripEl = document.querySelector(stripSel);
  220 |         const list = stripEl ? [...nodes, stripEl] : nodes;
  221 |         return list.map((n, i) => {
  222 |           const r = n.getBoundingClientRect();
  223 |           const x = r.left + r.width / 2;
  224 |           const y = r.top + r.height / 2;
  225 |           const el = document.elementFromPoint(x, y);
  226 |           return { i, covered: !(el && p.contains(el)), tag: el?.tagName ?? "null" };
  227 |         });
  228 |       },
  229 |       { panelSel: PANEL, scrollSel: SCROLL, stripSel: STRIP }
  230 |     );
  231 |     const covered = probes.filter((p) => p.covered);
  232 |     expect(covered, `covered nodes: ${JSON.stringify(covered)}`).toEqual([]);
  233 | 
  234 |     if (testInfo.project.name === "Desktop 1440x900") {
  235 |       expect(
  236 |         metrics.scrollable,
  237 |         `1440x900 must fit all 9 items + strip without scrolling (scrollHeight=${metrics.scrollHeight}, clientHeight=${metrics.clientHeight})`
```