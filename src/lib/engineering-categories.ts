/**
 * Constitution-aligned engineering categories (CMS: projectCategory, domain=engineering).
 * Slugs must match Sanity category documents for filters to work.
 */
export const ENGINEERING_CATEGORIES = [
  { slug: "sdk-development", title: "SDK Development" },
  { slug: "wallet-systems", title: "Wallet Systems" },
  { slug: "authentication", title: "Authentication" },
  { slug: "playables", title: "Playables" },
  { slug: "validation-tools", title: "Validation Tools" },
  { slug: "debugging-stories", title: "Debugging Stories" },
] as const;

export type EngineeringCategorySlug =
  (typeof ENGINEERING_CATEGORIES)[number]["slug"];
