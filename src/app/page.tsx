import { CareerTimeline } from "@/features/home/components/CareerTimeline";
import { ContactCTA } from "@/features/home/components/ContactCTA";
import { CurrentMission } from "@/features/home/components/CurrentMission";
import { EngineeringFocus } from "@/features/home/components/EngineeringFocus";
import { FeaturedProjects } from "@/features/home/components/FeaturedProjects";
import { Hero } from "@/features/home/components/Hero";
import { LatestDevlogs } from "@/features/home/components/LatestDevlogs";
import { getLatestDevlogs } from "@/features/devlogs/api";
import { getEngineeringArticles } from "@/features/engineering/api";
import { getExperience } from "@/features/experience/api";
import { getFeaturedProjects } from "@/features/projects/api";
import {
  getCurrentMission,
  getSiteSettings,
} from "@/features/site/api";

export default async function HomePage() {
  const [settings, missions, projects, articles, experience, devlogs] =
    await Promise.all([
      getSiteSettings(),
      getCurrentMission(),
      getFeaturedProjects(),
      getEngineeringArticles(),
      getExperience(),
      getLatestDevlogs(),
    ]);

  return (
    <>
      <Hero settings={settings} />
      <CurrentMission missions={missions} />
      <FeaturedProjects projects={projects} />
      <EngineeringFocus articles={articles} />
      <CareerTimeline experience={experience} />
      <LatestDevlogs devlogs={devlogs} />
      <ContactCTA settings={settings} />
    </>
  );
}
