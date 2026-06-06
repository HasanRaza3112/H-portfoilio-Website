import { z } from "zod";

export const projectCategorySchema = z.enum([
  "gameplay",
  "sdk",
  "tools",
  "playable-ads",
  "integration",
]);

export const engineeringCategorySchema = z.enum([
  "sdk-development",
  "playable-ads",
  "wallet-systems",
  "authentication",
  "clan-systems",
  "validation-tools",
  "architecture-notes",
  "debugging-stories",
]);

export const missionStatusSchema = z.enum(["active", "completed", "upcoming"]);

export const externalLinkSchema = z.object({
  label: z.string(),
  url: z.string().url(),
});

export const siteSettingsSchema = z.object({
  name: z.string(),
  title: z.string(),
  tagline: z.string(),
  currentRole: z.string().optional(),
  currentCompany: z.string().optional(),
  email: z.string().email().optional(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  resumeUrl: z.string().optional(),
  expertiseAreas: z.array(z.string()).optional(),
});

export const missionItemSchema = z.object({
  label: z.string(),
  status: missionStatusSchema,
  description: z.string(),
});

export const projectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  category: projectCategorySchema,
  featured: z.boolean(),
  techStack: z.array(z.string()),
  overview: z.string(),
  responsibilities: z.array(z.string()),
  challenges: z.array(z.string()),
  solutions: z.array(z.string()),
  lessonsLearned: z.array(z.string()),
  externalLinks: z.array(externalLinkSchema),
  gallery: z
    .array(
      z.object({
        url: z.string(),
        alt: z.string(),
      }),
    )
    .optional(),
});

export const projectListItemSchema = projectSchema.pick({
  slug: true,
  title: true,
  summary: true,
  category: true,
  featured: true,
  techStack: true,
});

export const engineeringArticleSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  category: engineeringCategorySchema,
  publishedAt: z.string(),
  readTime: z.string().optional(),
  body: z.string().optional(),
});

export const devlogSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  publishedAt: z.string(),
  tags: z.array(z.string()),
  body: z.string().optional(),
});

export const experienceEntrySchema = z.object({
  id: z.string(),
  role: z.string(),
  company: z.string(),
  period: z.string(),
  location: z.string().optional(),
  accomplishments: z.array(z.string()),
});

export const projectListSchema = z.array(projectListItemSchema);
export const projectSchemaArray = z.array(projectSchema);
export const engineeringListSchema = z.array(engineeringArticleSchema);
export const devlogListSchema = z.array(devlogSchema);
export const experienceListSchema = z.array(experienceEntrySchema);
export const missionListSchema = z.array(missionItemSchema);

export type SiteSettings = z.infer<typeof siteSettingsSchema>;
export type MissionItem = z.infer<typeof missionItemSchema>;
export type Project = z.infer<typeof projectSchema>;
export type ProjectListItem = z.infer<typeof projectListItemSchema>;
export type EngineeringArticle = z.infer<typeof engineeringArticleSchema>;
export type Devlog = z.infer<typeof devlogSchema>;
export type ExperienceEntry = z.infer<typeof experienceEntrySchema>;
export type ProjectCategory = z.infer<typeof projectCategorySchema>;
export type EngineeringCategory = z.infer<typeof engineeringCategorySchema>;
