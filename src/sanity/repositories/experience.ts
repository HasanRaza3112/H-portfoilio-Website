import { sanityFetch, sanityFetchList } from "@/sanity/fetch";
import { sanityTags } from "@/sanity/env";
import { experienceByIdQuery, experienceListQuery } from "@/sanity/queries";
import { experienceListSchema, experienceSchema } from "@/sanity/schemas";

export async function getExperienceList() {
  return sanityFetchList({
    query: experienceListQuery,
    schema: experienceListSchema,
    tags: [sanityTags.experience],
  });
}

export async function getExperienceById(id: string) {
  return sanityFetch({
    query: experienceByIdQuery,
    params: { id },
    schema: experienceSchema,
    tags: [sanityTags.experience, `${sanityTags.experience}:${id}`],
  });
}
