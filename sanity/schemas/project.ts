import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "summary", type: "text", validation: (r) => r.required() }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Gameplay", value: "gameplay" },
          { title: "SDK", value: "sdk" },
          { title: "Tools", value: "tools" },
          { title: "Playable Ads", value: "playable-ads" },
          { title: "Integration", value: "integration" },
        ],
      },
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "techStack", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "overview", type: "text" }),
    defineField({
      name: "gallery",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
    defineField({
      name: "responsibilities",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "challenges",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "solutions",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "lessonsLearned",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "externalLinks",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "url", type: "url" }),
          ],
        }),
      ],
    }),
  ],
});
