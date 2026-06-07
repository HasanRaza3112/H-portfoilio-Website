import { defineField, defineType } from "sanity";

import { limits, maxChars, requiredString } from "../../lib/validation";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      validation: (rule) => [
        requiredString()(rule),
        maxChars(limits.metaTitle, "Meta title")(rule),
      ],
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      validation: (rule) => maxChars(limits.metaDescription, "Meta description")(rule),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => requiredString("Alt text is required for OG images")(rule),
        }),
      ],
    }),
    defineField({
      name: "canonicalPath",
      title: "Canonical Path",
      type: "string",
      description: "Optional override, e.g. /projects/my-project",
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      initialValue: false,
    }),
  ],
});

export const publishMeta = defineType({
  name: "publishMeta",
  title: "Publishing",
  type: "object",
  fields: [
    defineField({
      name: "publishStatus",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (rule) => requiredString()(rule),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
  ],
});
