import { defineField, defineType } from "sanity";

export const mission = defineType({
  name: "mission",
  title: "Current Mission",
  type: "document",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Completed", value: "completed" },
          { title: "Upcoming", value: "upcoming" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "text", validation: (r) => r.required() }),
    defineField({ name: "order", type: "number" }),
  ],
});
