import { defineArrayMember, defineField, defineType } from "sanity";

export const portableText = defineType({
  name: "portableText",
  title: "Rich Text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                type: "url",
                validation: (rule) => rule.required(),
              }),
              defineField({
                name: "openInNewTab",
                type: "boolean",
                initialValue: false,
              }),
            ],
          },
          {
            name: "internalLink",
            type: "object",
            title: "Internal Link",
            fields: [
              defineField({
                name: "reference",
                type: "reference",
                to: [
                  { type: "project" },
                  { type: "engineeringLog" },
                  { type: "devlog" },
                ],
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "codeBlock",
    }),
    defineArrayMember({
      type: "callout",
    }),
  ],
});

export const codeBlock = defineType({
  name: "codeBlock",
  title: "Code Block",
  type: "object",
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: ["csharp", "typescript", "javascript", "json", "bash", "text"],
      },
      initialValue: "typescript",
    }),
    defineField({
      name: "filename",
      title: "Filename",
      type: "string",
    }),
    defineField({
      name: "code",
      title: "Code",
      type: "text",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { language: "language", filename: "filename" },
    prepare({ language, filename }) {
      return {
        title: filename ?? "Code block",
        subtitle: language,
      };
    },
  },
});

export const callout = defineType({
  name: "callout",
  title: "Callout",
  type: "object",
  fields: [
    defineField({
      name: "tone",
      title: "Tone",
      type: "string",
      options: {
        list: [
          { title: "Info", value: "info" },
          { title: "Warning", value: "warning" },
          { title: "Success", value: "success" },
        ],
      },
      initialValue: "info",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      validation: (rule) => rule.required(),
    }),
  ],
});

export const videoEmbed = defineType({
  name: "videoEmbed",
  title: "Video Embed",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "provider",
      title: "Provider",
      type: "string",
      options: {
        list: [
          { title: "YouTube", value: "youtube" },
          { title: "Vimeo", value: "vimeo" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
});

export const missionItem = defineType({
  name: "missionItem",
  title: "Mission Item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Completed", value: "completed" },
          { title: "Upcoming", value: "upcoming" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: "relatedProject",
      title: "Related Project",
      type: "reference",
      to: [{ type: "project" }],
    }),
    defineField({
      name: "relatedEngineeringLog",
      title: "Related Engineering Log",
      type: "reference",
      to: [{ type: "engineeringLog" }],
    }),
  ],
  preview: {
    select: { label: "label", status: "status" },
    prepare({ label, status }) {
      return {
        title: label,
        subtitle: status,
      };
    },
  },
});
