import { sanityFetch } from "@/sanity/fetch";
import { sanityTags } from "@/sanity/env";
import { currentMissionQuery, homePageQuery } from "@/sanity/queries";
import { currentMissionSchema, homePageDataSchema } from "@/sanity/schemas";

export async function getHomePageData() {
  return sanityFetch({
    query: homePageQuery,
    schema: homePageDataSchema,
    tags: [
      sanityTags.homepage,
      sanityTags.personProfile,
      sanityTags.currentMission,
      sanityTags.projects,
      sanityTags.engineeringLogs,
      sanityTags.devlogs,
      sanityTags.experience,
    ],
  });
}

export async function getCurrentMission() {
  return sanityFetch({
    query: currentMissionQuery,
    schema: currentMissionSchema,
    tags: [sanityTags.currentMission],
  });
}
