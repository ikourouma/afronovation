import type { MetadataRoute } from "next";

import { platforms } from "@/content/platforms";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

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

  return [...staticEntries, ...platformEntries];
}
