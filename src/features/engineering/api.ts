import { sanityFetch, sanityFetchList } from "@/sanity/fetch";
import {
  allEngineeringQuery,
  engineeringBySlugQuery,
  engineeringSlugsQuery,
} from "@/sanity/queries";
import { sanityTags } from "@/sanity/env";
import {
  engineeringArticleSchema,
  engineeringListSchema,
  type EngineeringArticle,
} from "@/sanity/schemas/content";
import { z } from "zod";

const slugListSchema = z.array(z.object({ slug: z.string() }));

export async function getEngineeringArticles(): Promise<EngineeringArticle[]> {
  return sanityFetchList({
    query: allEngineeringQuery,
    schema: engineeringListSchema,
    tags: [sanityTags.engineering],
  });
}

export async function getEngineeringArticleBySlug(
  slug: string,
): Promise<EngineeringArticle | null> {
  return sanityFetch({
    query: engineeringBySlugQuery,
    params: { slug },
    schema: engineeringArticleSchema,
    tags: [sanityTags.engineering, `engineering:${slug}`],
  });
}

export async function getEngineeringSlugs(): Promise<string[]> {
  const slugs = await sanityFetchList({
    query: engineeringSlugsQuery,
    schema: slugListSchema,
    tags: [sanityTags.engineering],
  });

  return slugs.map((item) => item.slug);
}
