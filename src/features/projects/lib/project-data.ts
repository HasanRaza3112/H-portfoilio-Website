import { cache } from "react";

import type { ProjectDetail } from "@/types";

export const getCachedProjects = cache(async () => {
  const { getProjects } = await import("@/sanity/repositories/projects");
  return getProjects();
});

export const getCachedProjectCategories = cache(async () => {
  const { getProjectCategories } = await import("@/sanity/repositories/projects");
  return getProjectCategories();
});

export const getCachedProjectBySlug = cache(async (slug: string) => {
  const { getProjectBySlug } = await import("@/sanity/repositories/projects");
  return getProjectBySlug(slug);
});

export const getCachedProjectSlugs = cache(async () => {
  const { getProjectSlugs } = await import("@/sanity/repositories/projects");
  return getProjectSlugs();
});

export const getCachedSiteSettings = cache(async () => {
  const { getSiteSettings } = await import("@/sanity/repositories/site");
  return getSiteSettings();
});

export function compactRelated<T>(items: (T | null | undefined)[] | null | undefined): T[] {
  return (items ?? []).filter((item): item is T => item != null);
}

export function isPublishedProject(project: ProjectDetail | null): project is ProjectDetail {
  return project != null;
}
