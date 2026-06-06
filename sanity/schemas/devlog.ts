import { defineArrayMember, defineField, defineType } from "sanity";

export const devlog = defineType({
  name: "devlog",
  title: "Devlog",
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
    defineField({ name: "publishedAt", type: "date" }),
    defineField({
      name: "tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "content",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
  ],
});
