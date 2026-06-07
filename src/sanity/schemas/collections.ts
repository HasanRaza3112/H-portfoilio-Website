import { z } from "zod";

import {
  categorySchema,
  portableTextSchema,
  publishStatusSchema,
  relatedDocumentSchema,
  sanityImageSchema,
  seoSchema,
  slugSchema,
  videoEmbedSchema,
} from "./common";

export const projectCardSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: slugSchema,
  description: z.string().nullable().optional(),
  role: z.string().nullable().optional(),
  status: z.enum(["shipped", "in-progress", "confidential"]).nullable().optional(),
  duration: z.string().nullable().optional(),
  featured: z.boolean().nullable().optional(),
  technologies: z.array(z.string()).nullable().optional(),
  category: categorySchema.nullable().optional(),
  featuredImage: sanityImageSchema,
});

export type ProjectCard = z.infer<typeof projectCardSchema>;

export const projectDetailSchema = projectCardSchema.extend({
  overview: z.string().nullable().optional(),
  teamSize: z.string().nullable().optional(),
  challenges: z.array(z.string()).nullable().optional(),
  solutions: z.array(z.string()).nullable().optional(),
  lessonsLearned: z.array(z.string()).nullable().optional(),
  githubUrl: z.string().nullable().optional(),
  playableUrl: z.string().nullable().optional(),
  featuredRank: z.number().nullable().optional(),
  publishStatus: publishStatusSchema.nullable().optional(),
  publishedAt: z.string().nullable().optional(),
  gallery: z
    .array(
      z.object({
        url: z.string().nullable().optional(),
        alt: z.string().nullable().optional(),
        lqip: z.string().nullable().optional(),
        caption: z.string().nullable().optional(),
      }),
    )
    .nullable()
    .optional(),
  videos: z.array(videoEmbedSchema).nullable().optional(),
  relatedEngineeringLogs: z.array(relatedDocumentSchema).nullable().optional(),
  seo: seoSchema,
});

export type ProjectDetail = z.infer<typeof projectDetailSchema>;

export const engineeringLogCardSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: slugSchema,
  summary: z.string().nullable().optional(),
  readTime: z.string().nullable().optional(),
  technologies: z.array(z.string()).nullable().optional(),
  publishedAt: z.string().nullable().optional(),
  category: categorySchema.nullable().optional(),
});

export type EngineeringLogCard = z.infer<typeof engineeringLogCardSchema>;

export const engineeringLogDetailSchema = engineeringLogCardSchema.extend({
  problem: z.string().nullable().optional(),
  context: z.string().nullable().optional(),
  solution: z.string().nullable().optional(),
  tradeoffs: z.string().nullable().optional(),
  outcome: z.string().nullable().optional(),
  publishStatus: publishStatusSchema.nullable().optional(),
  relatedProjects: z.array(relatedDocumentSchema).nullable().optional(),
  content: portableTextSchema.nullable().optional(),
  seo: seoSchema,
});

export type EngineeringLogDetail = z.infer<typeof engineeringLogDetailSchema>;

export const devlogCardSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: slugSchema,
  summary: z.string().nullable().optional(),
  tags: z.array(z.string()).nullable().optional(),
  publishedAt: z.string().nullable().optional(),
});

export type DevlogCard = z.infer<typeof devlogCardSchema>;

export const devlogDetailSchema = devlogCardSchema.extend({
  publishStatus: publishStatusSchema.nullable().optional(),
  relatedProjects: z.array(relatedDocumentSchema).nullable().optional(),
  content: portableTextSchema.nullable().optional(),
  seo: seoSchema,
});

export type DevlogDetail = z.infer<typeof devlogDetailSchema>;

export const experienceSchema = z.object({
  _id: z.string(),
  company: z.string(),
  role: z.string(),
  location: z.string().nullable().optional(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  duration: z.string().nullable().optional(),
  technologies: z.array(z.string()).nullable().optional(),
  responsibilities: z.array(z.string()).nullable().optional(),
  accomplishments: z.array(z.string()).nullable().optional(),
  featuredAccomplishment: z.string().nullable().optional(),
  companyLogo: sanityImageSchema,
  order: z.number().nullable().optional(),
  relatedProjects: z.array(relatedDocumentSchema).nullable().optional(),
  relatedEngineeringLogs: z.array(relatedDocumentSchema).nullable().optional(),
});

export type Experience = z.infer<typeof experienceSchema>;

export const projectListSchema = z.array(projectCardSchema);
export const projectCategoriesSchema = z.array(categorySchema);
export const engineeringLogListSchema = z.array(engineeringLogCardSchema);
export const devlogListSchema = z.array(devlogCardSchema);
export const experienceListSchema = z.array(experienceSchema);
export const slugListSchema = z.array(slugSchema);
