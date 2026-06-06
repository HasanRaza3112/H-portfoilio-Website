import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", type: "text", validation: (r) => r.required() }),
    defineField({ name: "currentRole", type: "string" }),
    defineField({ name: "currentCompany", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "linkedin", type: "url" }),
    defineField({ name: "github", type: "url" }),
    defineField({ name: "resume", type: "file", options: { accept: ".pdf" } }),
    defineField({
      name: "expertiseAreas",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
