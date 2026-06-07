import { z } from "zod";

import {
  devlogCardSchema,
  engineeringLogCardSchema,
  experienceSchema,
  projectCardSchema,
} from "./collections";
import { sanityImageSchema, seoSchema } from "./common";

export const siteSettingsSchema = z.object({
  siteName: z.string(),
  contactEmail: z.string(),
  linkedinUrl: z.string().nullable().optional(),
  githubUrl: z.string().nullable().optional(),
  resumeFile: z
    .object({
      url: z.string().nullable().optional(),
      originalFilename: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
  defaultOgImage: sanityImageSchema,
  seo: seoSchema,
});

export type SiteSettings = z.infer<typeof siteSettingsSchema>;

export const personProfileSchema = z.object({
  name: z.string(),
  title: z.string(),
  tagline: z.string(),
  profileImage: sanityImageSchema,
  currentRole: z.string(),
  currentCompany: z.string(),
  expertiseAreas: z.array(z.string()),
  professionalSummary: z.string().nullable().optional(),
});

export type PersonProfile = z.infer<typeof personProfileSchema>;

export const missionItemSchema = z.object({
  _key: z.string(),
  label: z.string(),
  status: z.enum(["active", "completed", "upcoming"]),
  description: z.string(),
  relatedProject: z
    .object({
      _id: z.string(),
      title: z.string(),
      slug: z.string(),
    })
    .nullable()
    .optional(),
  relatedEngineeringLog: z
    .object({
      _id: z.string(),
      title: z.string(),
      slug: z.string(),
    })
    .nullable()
    .optional(),
});

export type MissionItem = z.infer<typeof missionItemSchema>;

export const currentMissionSchema = z.object({
  sectionTitle: z.string(),
  sectionDescription: z.string().nullable().optional(),
  items: z.array(missionItemSchema).nullable().optional(),
});

export type CurrentMission = z.infer<typeof currentMissionSchema>;

export const homepageSchema = z.object({
  heroEyebrow: z.string().nullable().optional(),
  showMissionSection: z.boolean().nullable().optional(),
  showExperienceSnapshot: z.boolean().nullable().optional(),
  showDevlogsSection: z.boolean().nullable().optional(),
  contactCtaHeadline: z.string(),
  contactCtaDescription: z.string().nullable().optional(),
  seo: seoSchema,
  featuredProjects: z.array(projectCardSchema).nullable().optional(),
  featuredEngineeringLogs: z.array(engineeringLogCardSchema).nullable().optional(),
  experienceSnapshot: experienceSchema.nullable().optional(),
  featuredDevlogs: z.array(devlogCardSchema).nullable().optional(),
});

export type Homepage = z.infer<typeof homepageSchema>;

export const homePageDataSchema = z.object({
  personProfile: personProfileSchema.nullable(),
  homepage: homepageSchema.nullable(),
  currentMission: currentMissionSchema.nullable(),
});

export type HomePageData = z.infer<typeof homePageDataSchema>;

export const personProfilePreviewSchema = personProfileSchema.pick({
  name: true,
  title: true,
  tagline: true,
  currentRole: true,
  currentCompany: true,
  expertiseAreas: true,
});

export type PersonProfilePreview = z.infer<typeof personProfilePreviewSchema>;
