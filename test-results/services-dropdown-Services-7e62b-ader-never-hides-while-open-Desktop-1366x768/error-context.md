# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: services-dropdown.spec.ts >> Services dropdown (click-only) >> 6 · keyboard flow + header never hides while open
- Location: tests\e2e\services-dropdown.spec.ts:259:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3008/
Call log:
  - navigating to "http://localhost:3008/", waiting until "networkidle"

```

# Test source

```ts
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
  238 |       ).toBe(false);
  239 |     }
  240 | 
  241 |     if (testInfo.project.name === "Desktop 1366x768" && metrics.scrollable) {
  242 |       const box = (await scroll.boundingBox())!;
  243 |       await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  244 |       await page.mouse.wheel(0, 300);
  245 |       await expect.poll(() => scroll.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
  246 |       await expect(strip).toBeVisible();
  247 |       // The page behind must not have scrolled.
  248 |       expect(await page.evaluate(() => window.scrollY)).toBe(0);
  249 |       await page.screenshot({
  250 |         path: path.join(SHOTS, "dropdown-fixed-1366-grid-scrolled.png"),
  251 |       });
  252 |     }
  253 | 
  254 |     await page.screenshot({
  255 |       path: path.join(SHOTS, `dropdown-fixed-layout-${testInfo.project.name.replace(/\s+/g, "-")}.png`),
  256 |     });
  257 |   });
  258 | 
  259 |   test("6 · keyboard flow + header never hides while open", async ({ page }) => {
> 260 |     await page.goto("/", { waitUntil: "networkidle" });
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3008/
  261 |     const panel = page.locator(PANEL);
  262 |     const trigger = page.locator(TRIGGER);
  263 |     const inPanel = () =>
  264 |       page.evaluate(() => {
  265 |         const p = document.getElementById("services-dropdown-panel");
  266 |         return !!p && p.contains(document.activeElement);
  267 |       });
  268 | 
  269 |     // Enter opens.
  270 |     await trigger.focus();
  271 |     await page.keyboard.press("Enter");
  272 |     await expect(panel).toBeVisible();
  273 | 
  274 |     // Tab is trapped inside the panel.
  275 |     await page.keyboard.press("Tab");
  276 |     expect(await inPanel()).toBe(true);
  277 | 
  278 |     // ArrowDown moves focus to the next panel item.
  279 |     const before = await page.evaluate(() => document.activeElement?.textContent ?? "");
  280 |     await page.keyboard.press("ArrowDown");
  281 |     expect(await page.evaluate(() => document.activeElement?.textContent ?? "")).not.toBe(before);
  282 | 
  283 |     // ESC closes and returns focus to the trigger.
  284 |     await page.keyboard.press("Escape");
  285 |     await expect(panel).toHaveCount(0);
  286 |     expect(await page.evaluate(() => document.activeElement?.id)).toBe("services-dropdown-trigger");
  287 | 
  288 |     // ArrowDown opens and moves focus into the panel.
  289 |     await trigger.focus();
  290 |     await page.keyboard.press("ArrowDown");
  291 |     await expect(panel).toBeVisible();
  292 |     expect(await inPanel()).toBe(true);
  293 |     await page.keyboard.press("Escape");
  294 | 
  295 |     // Header must not scroll-hide while the panel is open.
  296 |     await openPanel(page);
  297 |     const header = page.locator("header[role=banner]");
  298 |     const beforeY = (await header.boundingBox())!.y;
  299 |     await page.evaluate(() => window.scrollBy(0, 700));
  300 |     await page.waitForTimeout(600);
  301 |     await expect(header).toBeVisible();
  302 |     await expect(panel).toBeVisible();
  303 |     const afterY = (await header.boundingBox())!.y;
  304 |     console.log(`[header] y before scroll=${Math.round(beforeY)} after scroll=${Math.round(afterY)}`);
  305 |     expect(afterY).toBeGreaterThanOrEqual(0);
  306 | 
  307 |     expect(errors, errors.join("\n")).toEqual([]);
  308 |   });
  309 | });
  310 | 
```