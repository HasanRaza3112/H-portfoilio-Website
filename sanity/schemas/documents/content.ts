import { defineArrayMember, defineField, defineType } from "sanity";

import {
  limits,
  maxChars,
  minArrayItems,
  requiredSlug,
  requiredString,
  requiredWhenPublished,
} from "../../lib/validation";

export const engineeringLog = defineType({
  name: "engineeringLog",
  title: "Engineering Log",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "thinking", title: "Technical Thinking" },
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
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => [
        requiredString()(rule),
        maxChars(limits.summary, "Summary")(rule),
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "projectCategory" }],
      options: {
        filter: "domain == $domain",
        filterParams: { domain: "engineering" },
      },
      group: "content",
      validation: (rule) => requiredWhenPublished("Category")(rule),
    }),
    defineField({
      name: "problem",
      title: "Problem",
      type: "text",
      rows: 4,
      group: "thinking",
      validation: (rule) => requiredWhenPublished("Problem")(rule),
    }),
    defineField({
      name: "context",
      title: "Context",
      type: "text",
      rows: 4,
      group: "thinking",
      validation: (rule) => requiredWhenPublished("Context")(rule),
    }),
    defineField({
      name: "solution",
      title: "Solution",
      type: "text",
      rows: 4,
      group: "thinking",
      validation: (rule) => requiredWhenPublished("Solution")(rule),
    }),
    defineField({
      name: "tradeoffs",
      title: "Tradeoffs",
      type: "text",
      rows: 4,
      group: "thinking",
      validation: (rule) => requiredWhenPublished("Tradeoffs")(rule),
    }),
    defineField({
      name: "outcome",
      title: "Outcome",
      type: "text",
      rows: 4,
      group: "thinking",
      validation: (rule) => requiredWhenPublished("Outcome")(rule),
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
      group: "thinking",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "portableText",
      group: "content",
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      description: 'e.g. "8 min read"',
      group: "content",
    }),
    defineField({
      name: "relatedProjects",
      title: "Related Projects",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "project" }],
        }),
      ],
      validation: (rule) => rule.max(4),
      group: "content",
    }),
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
      group: "publishing",
      validation: (rule) => requiredString()(rule),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "publishing",
      validation: (rule) => requiredWhenPublished("Published date")(rule),
    }),
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
      summary: "summary",
      publishStatus: "publishStatus",
      publishedAt: "publishedAt",
    },
    prepare({ title, summary, publishStatus, publishedAt }) {
      return {
        title,
        subtitle: [summary, publishStatus, publishedAt?.slice(0, 10)]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});

export const devlog = defineType({
  name: "devlog",
  title: "Devlog",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
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
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => [
        requiredString()(rule),
        maxChars(limits.summary, "Summary")(rule),
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "content",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "portableText",
      group: "content",
      validation: (rule) => requiredWhenPublished("Content")(rule),
    }),
    defineField({
      name: "relatedProjects",
      title: "Related Projects",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "project" }],
        }),
      ],
      validation: (rule) => rule.max(4),
      group: "content",
    }),
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
      group: "publishing",
      validation: (rule) => requiredString()(rule),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "publishing",
      validation: (rule) => requiredWhenPublished("Published date")(rule),
    }),
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
      publishedAt: "publishedAt",
      publishStatus: "publishStatus",
    },
    prepare({ title, publishedAt, publishStatus }) {
      return {
        title,
        subtitle: [publishStatus, publishedAt?.slice(0, 10)]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  groups: [
    { name: "role", title: "Role", default: true },
    { name: "details", title: "Details" },
    { name: "publishing", title: "Publishing" },
  ],
  fields: [
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      group: "role",
      validation: (rule) => requiredString()(rule),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      group: "role",
      validation: (rule) => requiredString()(rule),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "role",
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      group: "role",
      validation: (rule) => requiredWhenPublished("Start date")(rule),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "string",
      description: 'Use ISO date or "Present"',
      group: "role",
    }),
    defineField({
      name: "duration",
      title: "Duration (Display)",
      type: "string",
      description: 'e.g. "2025 — Present"',
      group: "role",
      validation: (rule) => requiredWhenPublished("Duration")(rule),
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
      group: "details",
    }),
    defineField({
      name: "responsibilities",
      title: "Responsibilities",
      type: "array",
      of: [{ type: "string" }],
      group: "details",
      validation: (rule) => minArrayItems(1, "Responsibilities")(rule),
    }),
    defineField({
      name: "accomplishments",
      title: "Key Accomplishments",
      type: "array",
      of: [{ type: "string" }],
      group: "details",
      validation: (rule) => minArrayItems(1, "Accomplishments")(rule),
    }),
    defineField({
      name: "featuredAccomplishment",
      title: "Featured Accomplishment",
      type: "text",
      rows: 2,
      description: "Shown on homepage experience snapshot",
      group: "details",
    }),
    defineField({
      name: "companyLogo",
      title: "Company Logo",
      type: "image",
      group: "role",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
      group: "publishing",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "relatedProjects",
      title: "Related Projects",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "project" }],
        }),
      ],
      group: "details",
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
      group: "details",
    }),
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
      group: "publishing",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "publishing",
    }),
  ],
  preview: {
    select: {
      company: "company",
      role: "role",
      duration: "duration",
      media: "companyLogo",
    },
    prepare({ company, role, duration, media }) {
      return {
        title: role,
        subtitle: [company, duration].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
