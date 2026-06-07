import { defineArrayMember, defineField, defineType } from "sanity";

import { requiredString } from "../../lib/validation";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "sections", title: "Sections" },
    { name: "featured", title: "Featured Content" },
    { name: "cta", title: "Contact CTA" },
  ],
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow Override",
      type: "string",
      description: "Leave empty to use current role @ company from Person Profile",
      group: "hero",
    }),
    defineField({
      name: "showMissionSection",
      title: "Show Current Mission Section",
      type: "boolean",
      initialValue: true,
      group: "sections",
    }),
    defineField({
      name: "showExperienceSnapshot",
      title: "Show Experience Snapshot",
      type: "boolean",
      initialValue: true,
      group: "sections",
    }),
    defineField({
      name: "showDevlogsSection",
      title: "Show Latest Devlogs Section",
      type: "boolean",
      initialValue: true,
      group: "sections",
    }),
    defineField({
      name: "featuredProjects",
      title: "Featured Projects",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "project" }],
        }),
      ],
      validation: (rule) => rule.max(3),
      group: "featured",
    }),
    defineField({
      name: "featuredEngineeringLogs",
      title: "Featured Engineering Logs",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "engineeringLog" }],
        }),
      ],
      validation: (rule) => rule.max(4),
      group: "featured",
    }),
    defineField({
      name: "experienceSnapshot",
      title: "Experience Snapshot",
      type: "reference",
      to: [{ type: "experience" }],
      description: "Primary role shown on homepage timeline preview",
      group: "featured",
    }),
    defineField({
      name: "featuredDevlogs",
      title: "Featured Devlogs",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "devlog" }],
        }),
      ],
      validation: (rule) => rule.max(3),
      group: "featured",
    }),
    defineField({
      name: "contactCtaHeadline",
      title: "Contact CTA Headline",
      type: "string",
      initialValue: "Open to game industry opportunities",
      group: "cta",
      validation: (rule) => requiredString()(rule),
    }),
    defineField({
      name: "contactCtaDescription",
      title: "Contact CTA Description",
      type: "text",
      rows: 3,
      group: "cta",
    }),
    defineField({
      name: "seo",
      title: "Homepage SEO",
      type: "seo",
      group: "cta",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage" };
    },
  },
});

export const currentMission = defineType({
  name: "currentMission",
  title: "Current Mission",
  type: "document",
  fields: [
    defineField({
      name: "sectionTitle",
      title: "Section Title",
      type: "string",
      initialValue: "What I'm building right now",
      validation: (rule) => requiredString()(rule),
    }),
    defineField({
      name: "sectionDescription",
      title: "Section Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "items",
      title: "Mission Items",
      type: "array",
      of: [defineArrayMember({ type: "missionItem" })],
      validation: (rule) => rule.max(6),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Current Mission" };
    },
  },
});
