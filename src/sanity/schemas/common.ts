import { z } from "zod";

export const sanityImageSchema = z
  .object({
    url: z.string().nullable().optional(),
    alt: z.string().nullable().optional(),
    lqip: z.string().nullable().optional(),
  })
  .nullable()
  .optional();

export type SanityImage = z.infer<typeof sanityImageSchema>;

export const seoSchema = z
  .object({
    metaTitle: z.string().nullable().optional(),
    metaDescription: z.string().nullable().optional(),
    canonicalPath: z.string().nullable().optional(),
    noIndex: z.boolean().nullable().optional(),
    ogImage: sanityImageSchema,
  })
  .nullable()
  .optional();

export type SeoFields = z.infer<typeof seoSchema>;

export const slugSchema = z.string().min(1);

export const publishStatusSchema = z.enum(["draft", "published"]);

export const categorySchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: slugSchema,
  domain: z.enum(["project", "engineering"]),
});

export type ProjectCategory = z.infer<typeof categorySchema>;

export const sanityObjectSchema = z
  .object({
    _type: z.string(),
    _key: z.string().optional(),
  })
  .passthrough();

export const portableTextSchema = z.array(sanityObjectSchema);

export type PortableTextBlock = z.infer<typeof sanityObjectSchema>;

export const videoEmbedSchema = z.object({
  _key: z.string().optional(),
  title: z.string(),
  url: z.string(),
  provider: z.enum(["youtube", "vimeo", "other"]),
});

export type VideoEmbed = z.infer<typeof videoEmbedSchema>;

export const relatedDocumentSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: slugSchema.optional(),
  description: z.string().nullable().optional(),
  summary: z.string().nullable().optional(),
  featuredImage: sanityImageSchema,
});

export type RelatedDocument = z.infer<typeof relatedDocumentSchema>;
