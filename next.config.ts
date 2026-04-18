import type { NextConfig } from "next";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

// In development, bind Cloudflare bindings (D1, KV, R2) locally via Wrangler
if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

const nextConfig: NextConfig = {};

export default nextConfig;
