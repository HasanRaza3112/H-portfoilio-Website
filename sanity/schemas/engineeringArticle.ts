import { defineArrayMember, defineField, defineType } from "sanity";

export const engineeringArticle = defineType({
  name: "engineeringArticle",
  title: "Engineering Article",
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
          { title: "SDK Development", value: "sdk-development" },
          { title: "Playable Ads", value: "playable-ads" },
          { title: "Wallet Systems", value: "wallet-systems" },
          { title: "Authentication", value: "authentication" },
          { title: "Clan Systems", value: "clan-systems" },
          { title: "Validation Tools", value: "validation-tools" },
          { title: "Architecture Notes", value: "architecture-notes" },
          { title: "Debugging Stories", value: "debugging-stories" },
        ],
      },
    }),
    defineField({ name: "publishedAt", type: "date" }),
    defineField({ name: "readTime", type: "string" }),
    defineField({
      name: "content",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
  ],
});
