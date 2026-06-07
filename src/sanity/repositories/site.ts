import { sanityFetch } from "@/sanity/fetch";
import { sanityTags } from "@/sanity/env";
import { personProfileQuery, siteSettingsQuery } from "@/sanity/queries";
import { personProfileSchema, siteSettingsSchema } from "@/sanity/schemas";

export async function getSiteSettings() {
  return sanityFetch({
    query: siteSettingsQuery,
    schema: siteSettingsSchema,
    tags: [sanityTags.siteSettings],
  });
}

export async function getPersonProfile() {
  return sanityFetch({
    query: personProfileQuery,
    schema: personProfileSchema,
    tags: [sanityTags.personProfile],
  });
}
