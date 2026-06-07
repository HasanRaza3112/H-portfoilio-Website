import { sanityFetch, sanityFetchList } from "@/sanity/fetch";
import { sanityTags } from "@/sanity/env";
import {
  devlogBySlugQuery,
  devlogSlugsQuery,
  devlogsListQuery,
} from "@/sanity/queries";
import {
  devlogDetailSchema,
  devlogListSchema,
  slugListSchema,
} from "@/sanity/schemas";

export async function getDevlogs() {
  return sanityFetchList({
    query: devlogsListQuery,
    schema: devlogListSchema,
    tags: [sanityTags.devlogs],
  });
}

export async function getDevlogBySlug(slug: string) {
  return sanityFetch({
    query: devlogBySlugQuery,
    params: { slug },
    schema: devlogDetailSchema,
    tags: [sanityTags.devlogs, `${sanityTags.devlogs}:${slug}`],
  });
}

export async function getDevlogSlugs() {
  return sanityFetchList({
    query: devlogSlugsQuery,
    schema: slugListSchema,
    tags: [sanityTags.devlogs],
  });
}
