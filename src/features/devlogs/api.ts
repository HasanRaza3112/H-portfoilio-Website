import { sanityFetch, sanityFetchList } from "@/sanity/fetch";
import {
  allDevlogsQuery,
  devlogBySlugQuery,
  devlogSlugsQuery,
  latestDevlogsQuery,
} from "@/sanity/queries";
import { sanityTags } from "@/sanity/env";
import {
  devlogListSchema,
  devlogSchema,
  type Devlog,
} from "@/sanity/schemas/content";
import { z } from "zod";

const slugListSchema = z.array(z.object({ slug: z.string() }));

export async function getDevlogs(): Promise<Devlog[]> {
  return sanityFetchList({
    query: allDevlogsQuery,
    schema: devlogListSchema,
    tags: [sanityTags.devlogs],
  });
}

export async function getLatestDevlogs(): Promise<Devlog[]> {
  return sanityFetchList({
    query: latestDevlogsQuery,
    schema: devlogListSchema,
    tags: [sanityTags.devlogs],
  });
}

export async function getDevlogBySlug(slug: string): Promise<Devlog | null> {
  return sanityFetch({
    query: devlogBySlugQuery,
    params: { slug },
    schema: devlogSchema,
    tags: [sanityTags.devlogs, `devlog:${slug}`],
  });
}

export async function getDevlogSlugs(): Promise<string[]> {
  const slugs = await sanityFetchList({
    query: devlogSlugsQuery,
    schema: slugListSchema,
    tags: [sanityTags.devlogs],
  });

  return slugs.map((item) => item.slug);
}
