import { BRAND } from "@/lib/constants";
import { sanityFetch, sanityFetchList } from "@/sanity/fetch";
import {
  missionsQuery,
  siteSettingsQuery,
} from "@/sanity/queries";
import { sanityTags } from "@/sanity/env";
import {
  missionListSchema,
  siteSettingsSchema,
  type MissionItem,
  type SiteSettings,
} from "@/sanity/schemas/content";

function withBrandFallback(settings: SiteSettings | null): SiteSettings {
  return {
    name: settings?.name ?? BRAND.name,
    title: settings?.title ?? BRAND.title,
    tagline: settings?.tagline ?? BRAND.tagline,
    currentRole: settings?.currentRole,
    currentCompany: settings?.currentCompany,
    email: settings?.email,
    linkedin: settings?.linkedin,
    github: settings?.github,
    resumeUrl: settings?.resumeUrl,
    expertiseAreas: settings?.expertiseAreas ?? [],
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await sanityFetch({
    query: siteSettingsQuery,
    schema: siteSettingsSchema,
    tags: [sanityTags.siteSettings],
  });

  return withBrandFallback(settings);
}

export async function getCurrentMission(): Promise<MissionItem[]> {
  return sanityFetchList({
    query: missionsQuery,
    schema: missionListSchema,
    tags: [sanityTags.missions],
  });
}
