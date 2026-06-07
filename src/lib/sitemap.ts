import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/constants";
import type { SitemapData, SitemapEntry } from "@/sanity/schemas/sitemap";

export const STATIC_SITEMAP_ROUTES = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/projects", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/engineering", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/devlogs", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/experience", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/resume", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly" as const, priority: 0.8 },
] as const;

function parseLastModified(value?: string | null): Date | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? undefined : new Date(parsed);
}

function buildContentEntries(
  entries: SitemapEntry[],
  pathPrefix: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
): MetadataRoute.Sitemap {
  return entries.map((entry) => ({
    url: `${getSiteUrl()}${pathPrefix}/${entry.slug}`,
    lastModified: parseLastModified(entry.lastModified),
    changeFrequency,
    priority,
  }));
}

export function buildSitemap(data: SitemapData | null): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_SITEMAP_ROUTES.map(
    (route) => ({
      url: `${getSiteUrl()}${route.path}`,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }),
  );

  if (!data) {
    return staticEntries;
  }

  return [
    ...staticEntries,
    ...buildContentEntries(data.projects, "/projects", "monthly", 0.8),
    ...buildContentEntries(data.engineeringLogs, "/engineering", "monthly", 0.7),
    ...buildContentEntries(data.devlogs, "/devlogs", "weekly", 0.6),
  ];
}
