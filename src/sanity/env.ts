export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
} as const;

export const sanityTags = {
  siteSettings: "site-settings",
  personProfile: "person-profile",
  homepage: "homepage",
  currentMission: "current-mission",
  projects: "projects",
  projectCategories: "project-categories",
  engineeringLogs: "engineering-logs",
  devlogs: "devlogs",
  experience: "experience",
} as const;

export type SanityTag = (typeof sanityTags)[keyof typeof sanityTags];

export const singletonIds = {
  siteSettings: "siteSettings",
  personProfile: "personProfile",
  homepage: "homepage",
  currentMission: "currentMission",
} as const;

export const documentTypes = {
  project: "project",
  projectCategory: "projectCategory",
  engineeringLog: "engineeringLog",
  devlog: "devlog",
  experience: "experience",
} as const;
