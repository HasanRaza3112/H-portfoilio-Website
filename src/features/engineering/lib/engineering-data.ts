import { cache } from "react";

export const getCachedEngineeringLogs = cache(async () => {
  const { getEngineeringLogs } = await import("@/sanity/repositories/engineering");
  return getEngineeringLogs();
});

export const getCachedEngineeringLogBySlug = cache(async (slug: string) => {
  const { getEngineeringLogBySlug } = await import("@/sanity/repositories/engineering");
  return getEngineeringLogBySlug(slug);
});

export const getCachedEngineeringLogSlugs = cache(async () => {
  const { getEngineeringLogSlugs } = await import("@/sanity/repositories/engineering");
  return getEngineeringLogSlugs();
});

export const getCachedEngineeringCategories = cache(async () => {
  const { getProjectCategories } = await import("@/sanity/repositories/projects");
  return getProjectCategories();
});

export const getCachedSiteSettings = cache(async () => {
  const { getSiteSettings } = await import("@/sanity/repositories/site");
  return getSiteSettings();
});

export function compactRelated<T>(items: (T | null | undefined)[] | null | undefined): T[] {
  return (items ?? []).filter((item): item is T => item != null);
}

export function formatPublishedDate(value?: string | null): string | null {
  if (!value) {
    return null;
  }

  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
