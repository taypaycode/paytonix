/**
 * src/app/robots.ts
 * Generates /robots.txt. Allows general and AI-search crawlers; keeps the
 * form-confirmation route out of directives that Google/Bing might otherwise infer.
 */

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Robots directives for paytonix.net.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "OAI-AdsBot",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
