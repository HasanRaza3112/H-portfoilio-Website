import { sanityFetch, sanityFetchList } from "@/sanity/fetch";
import { sanityTags } from "@/sanity/env";
import {
  engineeringLogBySlugQuery,
  engineeringLogSlugsQuery,
  engineeringLogsListQuery,
} from "@/sanity/queries";
import {
  engineeringLogDetailSchema,
  engineeringLogListSchema,
  slugListSchema,
} from "@/sanity/schemas";

export async function getEngineeringLogs() {
  return sanityFetchList({
    query: engineeringLogsListQuery,
    schema: engineeringLogListSchema,
    tags: [sanityTags.engineeringLogs],
  });
}

export async function getEngineeringLogBySlug(slug: string) {
  return sanityFetch({
    query: engineeringLogBySlugQuery,
    params: { slug },
    schema: engineeringLogDetailSchema,
    tags: [sanityTags.engineeringLogs, `${sanityTags.engineeringLogs}:${slug}`],
  });
}

export async function getEngineeringLogSlugs() {
  return sanityFetchList({
    query: engineeringLogSlugsQuery,
    schema: slugListSchema,
    tags: [sanityTags.engineeringLogs],
  });
}
