import {
  ContactCtaSection,
} from "@/features/home/components/contact-cta-section";
import { CurrentMissionSection } from "@/features/home/components/current-mission-section";
import {
  EngineeringFocusSection,
  FeaturedProjectsSection,
} from "@/features/home/components/featured-projects-section";
import { ExperienceSnapshotSection } from "@/features/home/components/experience-snapshot-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { LatestDevlogsSection } from "@/features/home/components/latest-devlogs-section";
import { compactArray } from "@/features/home/lib/home-data";
import type { HomePageData } from "@/types";

interface HomePageViewProps {
  data: HomePageData | null;
}

export function HomePageView({ data }: HomePageViewProps) {
  const homepage = data?.homepage;
  const showMission = homepage?.showMissionSection !== false;
  const showExperience = homepage?.showExperienceSnapshot !== false;
  const showDevlogs = homepage?.showDevlogsSection !== false;

  const projects = compactArray(homepage?.featuredProjects);
  const engineeringLogs = compactArray(homepage?.featuredEngineeringLogs);
  const devlogs = compactArray(homepage?.featuredDevlogs);
  const experience = homepage?.experienceSnapshot ?? null;
  const mission = data?.currentMission;

  return (
    <>
      <HeroSection data={data} />
      {showMission && mission ? <CurrentMissionSection mission={mission} /> : null}
      <FeaturedProjectsSection projects={projects} />
      <EngineeringFocusSection logs={engineeringLogs} />
      {showExperience && experience ? (
        <ExperienceSnapshotSection experience={experience} />
      ) : null}
      {showDevlogs ? <LatestDevlogsSection devlogs={devlogs} /> : null}
      <ContactCtaSection
        headline={homepage?.contactCtaHeadline ?? "Open to game industry opportunities"}
        description={homepage?.contactCtaDescription}
      />
    </>
  );
}
