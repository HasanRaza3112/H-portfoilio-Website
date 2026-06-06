import type { Metadata } from "next";

import { ExperienceTimeline } from "@/features/experience/components/ExperienceTimeline";
import { getExperience } from "@/features/experience/api";
import { getSiteSettings } from "@/features/site/api";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: "Experience",
    description: `Professional experience and accomplishments — ${settings.name}.`,
  };
}

export default async function ExperiencePage() {
  const experience = await getExperience();

  return <ExperienceTimeline experience={experience} />;
}
