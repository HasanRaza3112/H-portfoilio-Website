import { sanityFetch, sanityFetchList } from "@/sanity/fetch";
import { sanityTags } from "@/sanity/env";
import {
  projectBySlugQuery,
  projectCategoriesQuery,
  projectSlugsQuery,
  projectsListQuery,
} from "@/sanity/queries";
import {
  projectCategoriesSchema,
  projectDetailSchema,
  projectListSchema,
  slugListSchema,
} from "@/sanity/schemas";

export async function getProjects() {
  return sanityFetchList({
    query: projectsListQuery,
    schema: projectListSchema,
    tags: [sanityTags.projects],
  });
}

export async function getProjectBySlug(slug: string) {
  return sanityFetch({
    query: projectBySlugQuery,
    params: { slug },
    schema: projectDetailSchema,
    tags: [sanityTags.projects, `${sanityTags.projects}:${slug}`],
  });
}

export async function getProjectCategories() {
  return sanityFetchList({
    query: projectCategoriesQuery,
    schema: projectCategoriesSchema,
    tags: [sanityTags.projectCategories],
  });
}

export async function getProjectSlugs() {
  return sanityFetchList({
    query: projectSlugsQuery,
    schema: slugListSchema,
    tags: [sanityTags.projects],
  });
}
