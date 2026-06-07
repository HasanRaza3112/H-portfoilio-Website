/**
 * Seeds Phase 1 (Person Profile, Site Settings) and Phase 2 (Experience, Engineering Logs)
 * into Sanity CMS.
 *
 * Usage:
 *   1. Copy .env.example → .env.local and fill Sanity + write token
 *   2. npm run seed:phase-1-2
 *
 * Requires SANITY_API_WRITE_TOKEN with create/update permissions.
 */
import { createClient } from "@sanity/client";
import { createReadStream, existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  ENGINEERING_CATEGORY_SEED,
  SEED_CONTACT,
  SEED_ENGINEERING_LOGS,
  SEED_EXPERIENCE_TOBA,
  SEED_PERSON_PROFILE,
} from "../sanity/seed/phase-1-2-content";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

function loadEnvFiles() {
  for (const file of [".env.local", ".env"]) {
    const path = join(ROOT, file);
    if (!existsSync(path)) {
      continue;
    }

    for (const line of readFileSync(path, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const separator = trimmed.indexOf("=");
      if (separator === -1) {
        continue;
      }

      const key = trimmed.slice(0, separator).trim();
      const value = trimmed.slice(separator + 1).trim().replace(/^['"]|['"]$/g, "");
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  }
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}. Add it to .env.local before running the seed script.`);
  }

  return value;
}

function assetPath(relativePath: string): string {
  return join(ROOT, relativePath);
}

async function uploadImage(
  client: ReturnType<typeof createClient>,
  path: string,
  filename: string,
) {
  if (!existsSync(path)) {
    throw new Error(`Asset not found: ${path}`);
  }

  const asset = await client.assets.upload("image", createReadStream(path), {
    filename,
  });

  return {
    _type: "image" as const,
    asset: {
      _type: "reference" as const,
      _ref: asset._id,
    },
  };
}

async function uploadFile(
  client: ReturnType<typeof createClient>,
  path: string,
  filename: string,
) {
  if (!existsSync(path)) {
    throw new Error(`Asset not found: ${path}`);
  }

  return client.assets.upload("file", createReadStream(path), {
    filename,
    contentType: "application/pdf",
  });
}

async function main() {
  loadEnvFiles();

  const projectId = requireEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  const token = requireEnv("SANITY_API_WRITE_TOKEN");

  const client = createClient({
    projectId,
    dataset,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
    token,
    useCdn: false,
  });

  console.log("Uploading brand assets…");
  const [profileImage, ogImage, resumeAsset] = await Promise.all([
    uploadImage(
      client,
      assetPath("public/brand/mascot-profile.png"),
      "mascot-profile.png",
    ),
    uploadImage(client, assetPath("public/brand/og-default.png"), "og-default.png"),
    uploadFile(
      client,
      assetPath("public/downloads/mohammed-hasan-raza-resume.pdf"),
      "Mohammed-Hasan-Raza-Resume.pdf",
    ),
  ]);

  console.log("Seeding engineering categories…");
  for (const category of ENGINEERING_CATEGORY_SEED) {
    await client.createOrReplace(category);
  }

  const categoryRefs = Object.fromEntries(
    ENGINEERING_CATEGORY_SEED.map((category) => [
      category.slug.current,
      { _type: "reference" as const, _ref: category._id },
    ]),
  );

  console.log("Seeding Site Settings…");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "Mohammed Hasan Raza OS",
    contactEmail: SEED_CONTACT.email,
    linkedinUrl: SEED_CONTACT.linkedinUrl,
    githubUrl: SEED_CONTACT.githubUrl,
    resumeFile: {
      _type: "file",
      asset: {
        _type: "reference",
        _ref: resumeAsset._id,
      },
    },
    defaultOgImage: {
      ...ogImage,
      alt: "Mohammed Hasan Raza — Technical Game Engineer portfolio",
    },
  });

  console.log("Seeding Person Profile…");
  await client.createOrReplace({
    _id: "personProfile",
    _type: "personProfile",
    name: SEED_PERSON_PROFILE.name,
    title: SEED_PERSON_PROFILE.title,
    tagline: SEED_PERSON_PROFILE.tagline,
    currentRole: SEED_PERSON_PROFILE.currentRole,
    currentCompany: SEED_PERSON_PROFILE.currentCompany,
    professionalSummary: SEED_PERSON_PROFILE.professionalSummary,
    expertiseAreas: [...SEED_PERSON_PROFILE.expertiseAreas],
    profileImage: {
      ...profileImage,
      alt: SEED_PERSON_PROFILE.profileImageAlt,
    },
  });

  console.log("Seeding Experience (ToBa Tech)…");
  await client.createOrReplace({
    _id: SEED_EXPERIENCE_TOBA._id,
    _type: "experience",
    company: SEED_EXPERIENCE_TOBA.company,
    role: SEED_EXPERIENCE_TOBA.role,
    location: SEED_EXPERIENCE_TOBA.location,
    startDate: SEED_EXPERIENCE_TOBA.startDate,
    endDate: SEED_EXPERIENCE_TOBA.endDate,
    duration: SEED_EXPERIENCE_TOBA.duration,
    order: SEED_EXPERIENCE_TOBA.order,
    technologies: [...SEED_EXPERIENCE_TOBA.technologies],
    responsibilities: [...SEED_EXPERIENCE_TOBA.responsibilities],
    accomplishments: [...SEED_EXPERIENCE_TOBA.accomplishments],
    featuredAccomplishment: SEED_EXPERIENCE_TOBA.featuredAccomplishment,
    publishStatus: "published",
    publishedAt: SEED_EXPERIENCE_TOBA.startDate + "T09:00:00.000Z",
  });

  console.log("Seeding Engineering Logs…");
  for (const log of SEED_ENGINEERING_LOGS) {
    await client.createOrReplace({
      _id: log._id,
      _type: "engineeringLog",
      title: log.title,
      slug: { _type: "slug", current: log.slug },
      summary: log.summary,
      category: categoryRefs[log.categorySlug],
      problem: log.problem,
      context: log.context,
      solution: log.solution,
      tradeoffs: log.tradeoffs,
      outcome: log.outcome,
      technologies: [...log.technologies],
      readTime: log.readTime,
      content: [...log.body],
      publishStatus: "published",
      publishedAt: log.publishedAt,
    });
  }

  console.log("Seeding Homepage defaults…");
  await client.createOrReplace({
    _id: "homepage",
    _type: "homepage",
    heroEyebrow: null,
    showMissionSection: true,
    showExperienceSnapshot: true,
    showDevlogsSection: true,
    featuredProjects: [],
    featuredEngineeringLogs: SEED_ENGINEERING_LOGS.map((log) => ({
      _type: "reference",
      _ref: log._id,
      _key: log._id,
    })),
    experienceSnapshot: {
      _type: "reference",
      _ref: SEED_EXPERIENCE_TOBA._id,
    },
    featuredDevlogs: [],
    contactCtaHeadline: "Open to game industry opportunities",
    contactCtaDescription:
      "Recruiting for gameplay systems, SDK engineering, and playable technology roles. Let's talk about what you're building.",
  });

  console.log("Seeding Current Mission placeholder…");
  await client.createOrReplace({
    _id: "currentMission",
    _type: "currentMission",
    sectionTitle: "What I'm building right now",
    sectionDescription:
      "Active focus across playable pipelines, SDK hardening, and shipped mobile titles at ToBa Tech Solutions.",
    items: [
      {
        _type: "missionItem",
        _key: "mission-playables",
        label: "Playables SDK pipeline",
        status: "active",
        description:
          "Scaling multi-platform playable builds with profile-driven SDK selection and validator tooling.",
        relatedEngineeringLog: {
          _type: "reference",
          _ref: "engineeringLog-playables-pipeline",
        },
      },
      {
        _type: "missionItem",
        _key: "mission-sdk",
        label: "Intelliverse-X SDK",
        status: "completed",
        description:
          "UPM-ready backend SDK integration shipped and reused across studio titles.",
        relatedEngineeringLog: {
          _type: "reference",
          _ref: "engineeringLog-colorcrush-sdk",
        },
      },
    ],
  });

  console.log("\nPhase 1–2 seed complete.");
  console.log("- Person Profile + mascot avatar");
  console.log("- Site Settings + resume PDF + OG image");
  console.log("- ToBa Tech experience");
  console.log("- 2 engineering logs + categories");
  console.log("- Homepage featured engineering + experience snapshot");
  console.log("\nNext: run Phase 3 to seed projects and link references.");
}

main().catch((error) => {
  console.error("\nSeed failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
