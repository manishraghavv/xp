import { defineConfig, devices } from "@playwright/test";

/**
 * E2E configuration.
 *
 * The app is always served on port 3008 (`npm run dev` / `npm run start`).
 * `reuseExistingServer` means an already-running dev server is reused instead of
 * starting a second one.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  retries: 0,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: "http://localhost:3008",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3008",
    reuseExistingServer: true,
    timeout: 180_000,
    stdout: "ignore",
    stderr: "pipe",
  },
  projects: [
    {
      name: "Desktop 1440x900",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "Desktop 1366x768",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1366, height: 768 },
      },
    },
    {
      name: "Mobile 375x812",
      use: {
        ...devices["iPhone 13"],
        viewport: { width: 375, height: 812 },
      },
    },
    {
      name: "Mobile 390x844",
      use: {
        ...devices["iPhone 13"],
        viewport: { width: 390, height: 844 },
      },
    },
    {
      name: "Tablet 768x1024",
      use: {
        ...devices["Pixel 7"],
        viewport: { width: 768, height: 1024 },
      },
    },
    {
      name: "4K 3840x2160",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 3840, height: 2160 },
        deviceScaleFactor: 1,
      },
    },
  ],
});
