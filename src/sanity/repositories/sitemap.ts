import { sanityFetch } from "@/sanity/fetch";
import { sanityTags } from "@/sanity/env";
import { sitemapDataQuery } from "@/sanity/queries/sitemap";
import { sitemapDataSchema } from "@/sanity/schemas/sitemap";

export async function getSitemapData() {
  const data = await sanityFetch({
    query: sitemapDataQuery,
    schema: sitemapDataSchema,
    tags: [
      sanityTags.projects,
      sanityTags.engineeringLogs,
      sanityTags.devlogs,
    ],
  });

  return (
    data ?? {
      projects: [],
      engineeringLogs: [],
      devlogs: [],
    }
  );
}
