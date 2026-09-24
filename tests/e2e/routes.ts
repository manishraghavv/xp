/**
 * The site's 21 statically generated routes:
 *   7 root pages + 9 service detail pages + 5 case-study detail pages.
 * Kept in one place so the e2e suites cannot drift apart.
 */

export const SERVICE_SLUGS = [
  "sap-cloud-saas-solutions",
  "sap-analytics-reporting",
  "sap-integration-services",
  "sap-grc-security-compliance",
  "sap-training-enablement",
  "s4hana-upgrade-migration",
  "sap-implementation-rollout",
  "application-management-services-ams",
  "sap-centre-of-excellence-coe",
] as const;

export const PROJECT_SLUGS = [
  "fund-management-automation",
  "pr-po-release-strategy",
  "vrf-portal-integration",
  "solar-manufacturing-implementation",
  "bank-reconciliation-automation",
] as const;

export const ROOT_ROUTES = [
  "/",
  "/about",
  "/services",
  "/projects",
  "/training",
  "/s4hana-migration",
  "/contact",
] as const;

export const ALL_ROUTES: string[] = [
  ...ROOT_ROUTES,
  ...SERVICE_SLUGS.map((slug) => `/services/${slug}`),
  ...PROJECT_SLUGS.map((slug) => `/projects/${slug}`),
];

/** Emoji / pictographic ranges that must never appear in rendered copy. */
export const EMOJI_PATTERN =
  /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu;

/** Decorative lucide icon classes that must never be rendered. */
export const FORBIDDEN_ICON_CLASSES = [
  ".lucide-sparkles",
  ".lucide-zap",
  ".lucide-triangle-alert",
  ".lucide-alarm-clock",
  ".lucide-rocket",
  ".lucide-flame",
];

/** Mobile widths mandated in the brief, paired with a real device preset. */
export const MOBILE_WIDTHS = [
  { width: 320, height: 640, device: "Pixel 7" },
  { width: 360, height: 740, device: "Pixel 7" },
  { width: 375, height: 812, device: "iPhone 13" },
  { width: 390, height: 844, device: "iPhone 14" },
  { width: 414, height: 896, device: "iPhone 14" },
  { width: 430, height: 932, device: "iPhone 14" },
  { width: 768, height: 1024, device: "Pixel 7" },
] as const;

/** Large-screen targets mandated in the brief. */
export const DESKTOP_WIDTHS = [
  { width: 1920, height: 1080, deviceScaleFactor: 2 },
  { width: 2560, height: 1440, deviceScaleFactor: 1 },
  { width: 3440, height: 1440, deviceScaleFactor: 1 },
  { width: 3840, height: 2160, deviceScaleFactor: 1 },
] as const;
