import { sanityFetchList } from "@/sanity/fetch";
import { experienceQuery } from "@/sanity/queries";
import { sanityTags } from "@/sanity/env";
import {
  experienceListSchema,
  type ExperienceEntry,
} from "@/sanity/schemas/content";

export async function getExperience(): Promise<ExperienceEntry[]> {
  return sanityFetchList({
    query: experienceQuery,
    schema: experienceListSchema,
    tags: [sanityTags.experience],
  });
}
