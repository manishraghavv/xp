import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // The dev overlay badge would otherwise bleed into verification screenshots.
  devIndicators: false,
  images: {
    // AVIF first, WebP fallback — both are generated at request time.
    formats: ["image/avif", "image/webp"],
    // 2560 and 3840 are included so 4K / retina (DPR 2-3) screens get a native
    // width instead of an upscaled one.
    deviceSizes: [360, 420, 640, 750, 828, 960, 1080, 1200, 1280, 1536, 1920, 2048, 2560, 3200, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 320, 384, 512],
    // Quality 85-90 keeps gradients banding-free on large displays.
    qualities: [75, 85, 90],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
