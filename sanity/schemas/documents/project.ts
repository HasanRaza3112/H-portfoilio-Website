import { defineArrayMember, defineField, defineType } from "sanity";

import {
  limits,
  maxChars,
  minArrayItems,
  requiredSlug,
  requiredString,
  requiredWhenPublished,
  validUrl,
} from "../../lib/validation";

const publishFields = [
  defineField({
    name: "publishStatus",
    title: "Publish Status",
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
    group: "publishing",
  }),
  defineField({
    name: "publishedAt",
    title: "Published At",
    type: "datetime",
    validation: (rule) => requiredWhenPublished("Published date")(rule),
    group: "publishing",
  }),
];

export const projectCategory = defineType({
  name: "projectCategory",
  title: "Project Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => requiredString()(rule),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => requiredSlug()(rule),
    }),
    defineField({
      name: "domain",
      title: "Domain",
      type: "string",
      options: {
        list: [
          { title: "Project", value: "project" },
          { title: "Engineering", value: "engineering" },
        ],
      },
      initialValue: "project",
      validation: (rule) => requiredString()(rule),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "title", domain: "domain" },
    prepare({ title, domain }) {
      return {
        title,
        subtitle: domain === "engineering" ? "Engineering" : "Project",
      };
    },
  },
});

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "caseStudy", title: "Case Study" },
    { name: "media", title: "Media" },
    { name: "links", title: "Links" },
    { name: "publishing", title: "Publishing" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => requiredString()(rule),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      group: "content",
      validation: (rule) => requiredSlug()(rule),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "Recruiter-facing summary (max 200 characters)",
      group: "content",
      validation: (rule) => [
        requiredString()(rule),
        maxChars(limits.summary, "Description")(rule),
      ],
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "text",
      rows: 5,
      group: "content",
      validation: (rule) => [
        requiredWhenPublished("Overview")(rule),
        maxChars(limits.overview, "Overview")(rule),
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "projectCategory" }],
      options: {
        filter: "domain == $domain",
        filterParams: { domain: "project" },
      },
      group: "content",
      validation: (rule) => requiredWhenPublished("Category")(rule),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      group: "content",
      validation: (rule) => requiredWhenPublished("Role")(rule),
    }),
    defineField({
      name: "teamSize",
      title: "Team Size",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Shipped", value: "shipped" },
          { title: "In Progress", value: "in-progress" },
          { title: "Confidential", value: "confidential" },
        ],
      },
      group: "content",
      validation: (rule) => requiredWhenPublished("Status")(rule),
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
      validation: (rule) => minArrayItems(1, "Technologies")(rule),
    }),
    defineField({
      name: "challenges",
      title: "Challenges",
      type: "array",
      of: [{ type: "string" }],
      group: "caseStudy",
      validation: (rule) => minArrayItems(1, "Challenges")(rule),
    }),
    defineField({
      name: "solutions",
      title: "Solutions",
      type: "array",
      of: [{ type: "string" }],
      group: "caseStudy",
      validation: (rule) => minArrayItems(1, "Solutions")(rule),
    }),
    defineField({
      name: "lessonsLearned",
      title: "Lessons Learned",
      type: "array",
      of: [{ type: "string" }],
      group: "caseStudy",
      validation: (rule) => minArrayItems(1, "Lessons learned")(rule),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        }),
      ],
      group: "media",
    }),
    defineField({
      name: "videos",
      title: "Videos",
      type: "array",
      of: [defineArrayMember({ type: "videoEmbed" })],
      group: "media",
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      group: "media",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
      group: "links",
      validation: (rule) => validUrl()(rule),
    }),
    defineField({
      name: "playableUrl",
      title: "Playable URL",
      type: "url",
      group: "links",
      validation: (rule) => validUrl()(rule),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      group: "publishing",
    }),
    defineField({
      name: "featuredRank",
      title: "Featured Rank",
      type: "number",
      description: "Lower numbers appear first",
      group: "publishing",
    }),
    defineField({
      name: "relatedEngineeringLogs",
      title: "Related Engineering Logs",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "engineeringLog" }],
        }),
      ],
      validation: (rule) => rule.max(4),
      group: "content",
    }),
    ...publishFields,
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      status: "status",
      media: "featuredImage",
      publishStatus: "publishStatus",
    },
    prepare({ title, status, media, publishStatus }) {
      return {
        title,
        subtitle: [status, publishStatus].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
