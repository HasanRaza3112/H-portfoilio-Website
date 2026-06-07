/**
 * Build-time brand fallbacks only.
 * CMS (siteSettings) is the runtime source of truth from Phase 2 onward.
 * @see Project_Constitution.md — Content Ownership
 */
export const DEFAULT_SITE_URL = "https://mohammedhasanraza.com";

export const BRAND = {
  name: "Mohammed Hasan Raza",
  title: "Technical Game Engineer",
  tagline: "Building Games, Systems, and the Future I Once Dreamed of Playing.",
  currentRole: "Junior Game Developer",
  currentCompany: "ToBa Tech Solutions",
} as const;

export type Brand = typeof BRAND;

/**
 * Resolves the public site origin for metadata, sitemap, and JSON-LD.
 * Falls back to Vercel's deployment URL when NEXT_PUBLIC_SITE_URL is unset or invalid.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    try {
      return new URL(fromEnv).origin;
    } catch {
      // Ignore invalid NEXT_PUBLIC_SITE_URL values (e.g. empty string on Vercel).
    }
  }

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercelHost) {
    const candidate = vercelHost.startsWith("http")
      ? vercelHost
      : `https://${vercelHost}`;
    try {
      return new URL(candidate).origin;
    } catch {
      // Ignore malformed Vercel host values.
    }
  }

  return DEFAULT_SITE_URL;
}
