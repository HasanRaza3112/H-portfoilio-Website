import type { Metadata } from "next";

import { ResumePageView } from "@/features/resume";
import { ResumeJsonLd } from "@/features/resume/components/resume-json-ld";
import { getCachedResumePageData } from "@/features/resume/lib/resume-data";
import { buildResumePageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { profile, siteSettings } = await getCachedResumePageData();
  return buildResumePageMetadata(profile, siteSettings);
}

export default async function ResumePage() {
  const { profile, siteSettings, experiences } = await getCachedResumePageData();

  return (
    <>
      <ResumeJsonLd
        profile={profile}
        siteSettings={siteSettings}
        experiences={experiences}
      />
      <ResumePageView
        profile={profile}
        siteSettings={siteSettings}
        experiences={experiences}
      />
    </>
  );
}
