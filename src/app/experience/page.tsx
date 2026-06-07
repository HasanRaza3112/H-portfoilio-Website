import type { Metadata } from "next";

import { ExperiencePageView } from "@/features/experience";
import { ExperienceJsonLd } from "@/features/experience/components/experience-json-ld";
import {
  getCachedExperienceList,
  getCachedPersonProfile,
} from "@/features/experience/lib/experience-data";
import { getCachedSiteSettings } from "@/features/home/lib/home-data";
import { buildExperiencePageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getCachedSiteSettings();
  return buildExperiencePageMetadata(siteSettings);
}

export default async function ExperiencePage() {
  const [experiences, profile] = await Promise.all([
    getCachedExperienceList(),
    getCachedPersonProfile(),
  ]);

  return (
    <>
      <ExperienceJsonLd experiences={experiences} />
      <ExperiencePageView experiences={experiences} profile={profile} />
    </>
  );
}
