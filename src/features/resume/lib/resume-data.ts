import "server-only";

import { cache } from "react";

export const getCachedResumePageData = cache(async () => {
  const [{ getPersonProfile, getSiteSettings }, { getExperienceList }] =
    await Promise.all([
      import("@/sanity/repositories/site"),
      import("@/sanity/repositories/experience"),
    ]);

  const [profile, siteSettings, experiences] = await Promise.all([
    getPersonProfile(),
    getSiteSettings(),
    getExperienceList(),
  ]);

  return { profile, siteSettings, experiences };
});
