import { defineArrayMember, defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "role", type: "string", validation: (r) => r.required() }),
    defineField({ name: "company", type: "string", validation: (r) => r.required() }),
    defineField({ name: "period", type: "string" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "order", type: "number" }),
    defineField({
      name: "accomplishments",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
});
