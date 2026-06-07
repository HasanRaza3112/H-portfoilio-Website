/**
 * GROQ query strings — internal to the data layer.
 * Import repositories from `@/sanity`, not queries directly.
 */
export { siteSettingsQuery } from "./singletons/siteSettings";
export { personProfileQuery } from "./singletons/personProfile";
export { homePageQuery } from "./singletons/homepage";
export { currentMissionQuery } from "./singletons/currentMission";

export {
  projectCategoriesQuery,
  projectsListQuery,
  projectBySlugQuery,
  projectSlugsQuery,
} from "./collections/project";

export {
  engineeringLogsListQuery,
  engineeringLogBySlugQuery,
  engineeringLogSlugsQuery,
} from "./collections/engineeringLog";

export {
  devlogsListQuery,
  devlogBySlugQuery,
  devlogSlugsQuery,
} from "./collections/devlog";

export { experienceListQuery, experienceByIdQuery } from "./collections/experience";

export { sitemapDataQuery } from "./sitemap";
