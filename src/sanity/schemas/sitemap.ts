import { z } from "zod";

const sitemapEntrySchema = z.object({
  slug: z.string(),
  lastModified: z.string().nullable().optional(),
});

export const sitemapDataSchema = z.object({
  projects: z.array(sitemapEntrySchema),
  engineeringLogs: z.array(sitemapEntrySchema),
  devlogs: z.array(sitemapEntrySchema),
});

export type SitemapEntry = z.infer<typeof sitemapEntrySchema>;
export type SitemapData = z.infer<typeof sitemapDataSchema>;
