import "server-only";

import { cache } from "react";

export const getCachedContactPageData = cache(async () => {
  const { getPersonProfile, getSiteSettings } = await import(
    "@/sanity/repositories/site"
  );

  const [profile, siteSettings] = await Promise.all([
    getPersonProfile(),
    getSiteSettings(),
  ]);

  return { profile, siteSettings };
});
