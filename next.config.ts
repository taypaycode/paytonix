import type { NextConfig } from "next";

/**
 * next.config.ts
 * Canonical-host redirect (www -> apex) and preview-deployment noindex headers.
 * Vercel also lets you configure a domain-level redirect in Project Settings;
 * this app-level rule is a safety net that holds even if that toggle is missed.
 */

const isProductionDeployment = process.env.VERCEL_ENV === "production";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.paytonix.net" }],
        destination: "https://paytonix.net/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    if (isProductionDeployment) {
      return [];
    }

    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
