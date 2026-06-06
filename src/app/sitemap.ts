import type { MetadataRoute } from "next";

import { getDevlogSlugs } from "@/features/devlogs/api";
import { getEngineeringSlugs } from "@/features/engineering/api";
import { getProjectSlugs } from "@/features/projects/api";
import { BRAND } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = BRAND.siteUrl;

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/projects",
    "/engineering",
    "/experience",
    "/devlogs",
    "/resume",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const [projectSlugs, engineeringSlugs, devlogSlugs] = await Promise.all([
    getProjectSlugs(),
    getEngineeringSlugs(),
    getDevlogSlugs(),
  ]);

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...projectSlugs.map((slug) => ({
      url: `${base}/projects/${slug}`,
      lastModified: new Date(),
    })),
    ...engineeringSlugs.map((slug) => ({
      url: `${base}/engineering/${slug}`,
      lastModified: new Date(),
    })),
    ...devlogSlugs.map((slug) => ({
      url: `${base}/devlogs/${slug}`,
      lastModified: new Date(),
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
