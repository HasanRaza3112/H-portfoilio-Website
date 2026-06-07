import { draftMode } from "next/headers";

import { getSiteUrl as getPublicSiteUrl } from "@/lib/constants";
import { documentTypes, sanityTags, singletonIds } from "@/sanity/env";

export async function isPreviewMode(): Promise<boolean> {
  try {
    const { isEnabled } = await draftMode();
    return isEnabled;
  } catch {
    // draftMode() is unavailable during static generation (e.g. generateStaticParams).
    return false;
  }
}

export function resolvePreviewPath(
  documentType: string,
  slug?: string | null,
): string | null {
  if (!slug) {
    return null;
  }

  switch (documentType) {
    case documentTypes.project:
      return `/projects/${slug}`;
    case documentTypes.engineeringLog:
      return `/engineering/${slug}`;
    case documentTypes.devlog:
      return `/devlogs/${slug}`;
    default:
      return null;
  }
}

export function resolveSingletonPreviewPath(documentId: string): string {
  switch (documentId) {
    case singletonIds.homepage:
      return "/";
    case singletonIds.siteSettings:
    case singletonIds.personProfile:
    case singletonIds.currentMission:
      return "/";
    default:
      return "/";
  }
}

/** Tags invalidated alongside a document type (dependency graph). */
export const revalidationGraph: Record<string, readonly string[]> = {
  [documentTypes.project]: [
    sanityTags.projects,
    sanityTags.homepage,
    sanityTags.projectCategories,
  ],
  [documentTypes.projectCategory]: [
    sanityTags.projectCategories,
    sanityTags.projects,
    sanityTags.engineeringLogs,
  ],
  [documentTypes.engineeringLog]: [
    sanityTags.engineeringLogs,
    sanityTags.homepage,
  ],
  [documentTypes.devlog]: [sanityTags.devlogs, sanityTags.homepage],
  [documentTypes.experience]: [sanityTags.experience, sanityTags.homepage],
  [singletonIds.siteSettings]: [sanityTags.siteSettings],
  [singletonIds.personProfile]: [sanityTags.personProfile, sanityTags.homepage],
  [singletonIds.homepage]: [sanityTags.homepage],
  [singletonIds.currentMission]: [sanityTags.currentMission, sanityTags.homepage],
};

export function getRevalidationTags(payload: {
  _type?: string;
  _id?: string;
  slug?: { current?: string };
}): string[] {
  const type = payload._type ?? payload._id;
  if (!type) {
    return [];
  }

  const baseTags = revalidationGraph[type] ?? [];
  const tags = new Set<string>(baseTags);

  const slug = payload.slug?.current;
  if (slug && payload._type) {
    tags.add(`${payload._type}:${slug}`);
  }

  return [...tags];
}

export function getSiteUrl(): string {
  return getPublicSiteUrl();
}
