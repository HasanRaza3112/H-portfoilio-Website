import { sanityFetch, sanityFetchList } from "@/sanity/fetch";
import {
  allProjectsQuery,
  featuredProjectsQuery,
  projectBySlugQuery,
  projectSlugsQuery,
} from "@/sanity/queries";
import { sanityTags } from "@/sanity/env";
import {
  projectListSchema,
  projectSchema,
  type Project,
  type ProjectListItem,
} from "@/sanity/schemas/content";
import { z } from "zod";

const slugListSchema = z.array(z.object({ slug: z.string() }));

export async function getFeaturedProjects(): Promise<ProjectListItem[]> {
  return sanityFetchList({
    query: featuredProjectsQuery,
    schema: projectListSchema,
    tags: [sanityTags.projects],
  });
}

export async function getProjects(): Promise<ProjectListItem[]> {
  return sanityFetchList({
    query: allProjectsQuery,
    schema: projectListSchema,
    tags: [sanityTags.projects],
  });
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return sanityFetch({
    query: projectBySlugQuery,
    params: { slug },
    schema: projectSchema,
    tags: [sanityTags.projects, `project:${slug}`],
  });
}

export async function getProjectSlugs(): Promise<string[]> {
  const slugs = await sanityFetchList({
    query: projectSlugsQuery,
    schema: slugListSchema,
    tags: [sanityTags.projects],
  });

  return slugs.map((item) => item.slug);
}
