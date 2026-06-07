import { cache } from "react";

export const getCachedExperienceList = cache(async () => {
  const { getExperienceList } = await import("@/sanity/repositories/experience");
  return getExperienceList();
});

export const getCachedPersonProfile = cache(async () => {
  const { getPersonProfile } = await import("@/sanity/repositories/site");
  return getPersonProfile();
});

export function compactRelated<T>(items: (T | null | undefined)[] | null | undefined): T[] {
  return (items ?? []).filter((item): item is T => item != null);
}

export function isPresentRole(endDate?: string | null): boolean {
  if (!endDate) {
    return false;
  }

  return endDate.toLowerCase() === "present";
}
