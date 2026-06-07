import { cache } from "react";

import { BRAND } from "@/lib/constants";
import type { HomePageData, PersonProfile } from "@/sanity/schemas";

export function resolveHeroEyebrow(
  heroEyebrow: string | null | undefined,
  profile: PersonProfile | null | undefined,
): string {
  if (heroEyebrow?.trim()) {
    return heroEyebrow.trim();
  }

  const role = profile?.currentRole ?? BRAND.currentRole;
  const company = profile?.currentCompany ?? BRAND.currentCompany;

  return `${role} @ ${company}`;
}

export function resolvePersonProfile(
  profile: PersonProfile | null | undefined,
): PersonProfile {
  return {
    name: profile?.name ?? BRAND.name,
    title: profile?.title ?? BRAND.title,
    tagline: profile?.tagline ?? BRAND.tagline,
    profileImage: profile?.profileImage ?? null,
    currentRole: profile?.currentRole ?? BRAND.currentRole,
    currentCompany: profile?.currentCompany ?? BRAND.currentCompany,
    expertiseAreas: profile?.expertiseAreas ?? [],
    professionalSummary: profile?.professionalSummary,
  };
}

export function compactArray<T>(items: (T | null | undefined)[] | null | undefined): T[] {
  return (items ?? []).filter((item): item is T => item != null);
}

export const getCachedHomePageData = cache(async (): Promise<HomePageData | null> => {
  const { getHomePageData } = await import("@/sanity/repositories/homepage");
  return getHomePageData();
});

export const getCachedSiteSettings = cache(async () => {
  const { getSiteSettings } = await import("@/sanity/repositories/site");
  return getSiteSettings();
});
