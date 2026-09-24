import { test } from "@playwright/test";

test("isolated html overflow hidden test", async ({ page }) => {
  await page.setContent(`
    <!DOCTYPE html>
    <html style="overflow: hidden;">
    <body style="margin: 0; height: 5000px;">
      <div style="position: fixed; top: 50px; bottom: 50px; left: 50px; right: 50px; display: flex; flex-direction: column; background: #222; color: white;">
        <div id="scroll" style="flex: 1 1 0%; min-height: 0; overflow-y: auto; background: #333;">
          <div style="height: 2000px; padding: 20px;">
            <h1>Scrollable content</h1>
            <p>Some item 1</p>
            <p style="margin-top: 1000px;">Some item at 1000px</p>
          </div>
        </div>
        <div style="flex: none; height: 60px; background: #111;">Fixed Bottom</div>
      </div>
    </body>
    </html>
  `);

  const scroller = page.locator("#scroll");
  const box = await scroller.boundingBox();
  console.log("Isolated box:", box);

  await page.mouse.move(box!.x + 100, box!.y + 100);
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(300);

  const st = await scroller.evaluate(el => el.scrollTop);
  console.log("Isolated scrollTop after wheel:", st);
});
