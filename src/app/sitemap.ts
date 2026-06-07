import type { MetadataRoute } from "next";

import { buildSitemap } from "@/lib/sitemap";
import { getSitemapData } from "@/sanity/repositories/sitemap";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await getSitemapData();
  return buildSitemap(data);
}
