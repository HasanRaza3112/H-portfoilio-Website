import { defineField, defineType } from "sanity";

import {
  limits,
  maxChars,
  requiredString,
  validEmail,
  validUrl,
} from "../../lib/validation";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "general", title: "General", default: true },
    { name: "contact", title: "Contact" },
    { name: "resume", title: "Resume" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      description: "Internal label for the site in CMS",
      initialValue: "Mohammed Hasan Raza OS",
      group: "general",
      validation: (rule) => requiredString()(rule),
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      group: "contact",
      validation: (rule) => [requiredString()(rule), validEmail()(rule)],
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
      group: "contact",
      validation: (rule) => validUrl()(rule),
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
      group: "contact",
      validation: (rule) => validUrl()(rule),
    }),
    defineField({
      name: "resumeFile",
      title: "Resume PDF",
      type: "file",
      options: { accept: "application/pdf" },
      group: "resume",
      validation: (rule) =>
        rule.required().error("Resume PDF is required for launch"),
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default OG Image",
      type: "image",
      options: { hotspot: true },
      group: "seo",
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
      name: "seo",
      title: "Default SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});

export const personProfile = defineType({
  name: "personProfile",
  title: "Person Profile",
  type: "document",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "role", title: "Current Role" },
    { name: "expertise", title: "Expertise" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      group: "identity",
      validation: (rule) => requiredString()(rule),
    }),
    defineField({
      name: "title",
      title: "Professional Title",
      type: "string",
      description: "e.g. Technical Game Engineer",
      group: "identity",
      validation: (rule) => requiredString()(rule),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "text",
      rows: 2,
      group: "identity",
      validation: (rule) => [
        requiredString()(rule),
        maxChars(limits.tagline, "Tagline")(rule),
      ],
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
      group: "identity",
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
      name: "currentRole",
      title: "Current Role",
      type: "string",
      group: "role",
      validation: (rule) => requiredString()(rule),
    }),
    defineField({
      name: "currentCompany",
      title: "Current Company",
      type: "string",
      group: "role",
      validation: (rule) => requiredString()(rule),
    }),
    defineField({
      name: "expertiseAreas",
      title: "Expertise Areas",
      type: "array",
      of: [{ type: "string" }],
      group: "expertise",
      validation: (rule) => rule.required().min(3).max(12),
    }),
    defineField({
      name: "professionalSummary",
      title: "Professional Summary",
      type: "text",
      rows: 4,
      description: "Used on resume page and Person structured data",
      group: "identity",
    }),
  ],
  preview: {
    select: { name: "name", title: "title" },
    prepare({ name, title }) {
      return {
        title: name ?? "Person Profile",
        subtitle: title,
      };
    },
  },
});
