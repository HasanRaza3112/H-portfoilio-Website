export {
  sanityImageSchema,
  seoSchema,
  slugSchema,
  publishStatusSchema,
  categorySchema,
  portableTextSchema,
  videoEmbedSchema,
  relatedDocumentSchema,
  type SanityImage,
  type SeoFields,
  type ProjectCategory,
  type PortableTextBlock,
  type VideoEmbed,
  type RelatedDocument,
} from "./common";

export {
  projectCardSchema,
  projectDetailSchema,
  engineeringLogCardSchema,
  engineeringLogDetailSchema,
  devlogCardSchema,
  devlogDetailSchema,
  experienceSchema,
  projectListSchema,
  projectCategoriesSchema,
  engineeringLogListSchema,
  devlogListSchema,
  experienceListSchema,
  slugListSchema,
  type ProjectCard,
  type ProjectDetail,
  type EngineeringLogCard,
  type EngineeringLogDetail,
  type DevlogCard,
  type DevlogDetail,
  type Experience,
} from "./collections";

export {
  siteSettingsSchema,
  personProfileSchema,
  currentMissionSchema,
  homepageSchema,
  homePageDataSchema,
  missionItemSchema,
  type SiteSettings,
  type PersonProfile,
  type CurrentMission,
  type Homepage,
  type HomePageData,
  type MissionItem,
} from "./singletons";

/**
 * Optional Sanity TypeGen (after schema changes):
 *   npx sanity schema extract --path=./sanity/extract.json
 *   npx sanity typegen generate
 *
 * Runtime validation uses the Zod schemas above (`z.infer` → @/types).
 */
