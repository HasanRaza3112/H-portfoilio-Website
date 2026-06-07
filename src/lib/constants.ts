/**
 * Build-time brand fallbacks only.
 * CMS (siteSettings) is the runtime source of truth from Phase 2 onward.
 * @see Project_Constitution.md — Content Ownership
 */
export const BRAND = {
  name: "Mohammed Hasan Raza",
  title: "Technical Game Engineer",
  tagline: "Building Games, Systems, and the Future I Once Dreamed of Playing.",
  currentRole: "Junior Game Developer",
  currentCompany: "ToBa Tech Solutions",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mohammedhasanraza.com",
} as const;

export type Brand = typeof BRAND;
