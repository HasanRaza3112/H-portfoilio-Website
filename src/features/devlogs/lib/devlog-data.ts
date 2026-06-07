import "server-only";

import { cache } from "react";

export const getCachedDevlogs = cache(async () => {
  const { getDevlogs } = await import("@/sanity/repositories/devlogs");
  return getDevlogs();
});

export const getCachedDevlogBySlug = cache(async (slug: string) => {
  const { getDevlogBySlug } = await import("@/sanity/repositories/devlogs");
  return getDevlogBySlug(slug);
});

export const getCachedDevlogSlugs = cache(async () => {
  const { getDevlogSlugs } = await import("@/sanity/repositories/devlogs");
  return getDevlogSlugs();
});

export const getCachedSiteSettings = cache(async () => {
  const { getSiteSettings } = await import("@/sanity/repositories/site");
  return getSiteSettings();
});
