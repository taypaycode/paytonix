/**
 * src/app/sitemap.ts
 * Generates /sitemap.xml. Lists only canonical, indexable, 200-returning
 * routes — no anchors, query variants, redirects, or the noindexed
 * thank-you confirmation route.
 */

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { articles } from "@/lib/articles";

const CONTENT_LAST_MODIFIED = new Date("2026-07-25");

/**
 * Sitemap entries for paytonix.net.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/revenue-data-integrity-assessment`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/insights`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/insights/${article.slug}`,
    lastModified: new Date(article.lastReviewed),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}
