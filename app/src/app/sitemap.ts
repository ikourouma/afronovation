import type { MetadataRoute } from "next";

import { getCollection } from "@/lib/cms/read";

// Picks up platforms and articles added in the admin.
export const revalidate = 3600;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://afronovation.com";

const staticRoutes = [
  "",
  "/about",
  "/solutions",
  "/enterprise-services",
  "/platforms",
  "/insights",
  "/testimonials",
  "/contact",
  "/privacy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [platforms, articles] = await Promise.all([
    getCollection("platformPages"),
    getCollection("articles"),
  ]);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const platformEntries: MetadataRoute.Sitemap = platforms.map((platform) => ({
    url: `${siteUrl}/platforms/${platform.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles
    .filter((article) => article.published)
    .map((article) => ({
      url: `${siteUrl}/insights/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "yearly",
      priority: 0.6,
    }));

  return [...staticEntries, ...platformEntries, ...articleEntries];
}
