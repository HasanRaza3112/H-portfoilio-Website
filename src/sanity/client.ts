import { createClient, type SanityClient } from "@sanity/client";

import { getServerEnv } from "@/lib/env";
import { isSanityConfigured } from "@/lib/env";
import { sanityConfig } from "@/sanity/env";

let publishedClient: SanityClient | null = null;
let previewClient: SanityClient | null = null;

function createPublishedClient(): SanityClient {
  return createClient({
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
    apiVersion: sanityConfig.apiVersion,
    useCdn: sanityConfig.useCdn,
    perspective: "published",
  });
}

function createPreviewClient(token: string): SanityClient {
  return createClient({
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
    apiVersion: sanityConfig.apiVersion,
    useCdn: false,
    token,
    perspective: "previewDrafts",
  });
}

/**
 * Lazy Sanity client — safe to import during build without CMS credentials.
 * Use `{ preview: true }` for draft content (requires SANITY_API_READ_TOKEN).
 */
export function getSanityClient(options?: { preview?: boolean }): SanityClient | null {
  if (!isSanityConfigured()) {
    return null;
  }

  if (options?.preview) {
    const token = getServerEnv().SANITY_API_READ_TOKEN;
    if (!token) {
      console.error("[getSanityClient] Preview requested but SANITY_API_READ_TOKEN is missing");
      return null;
    }

    previewClient ??= createPreviewClient(token);
    return previewClient;
  }

  publishedClient ??= createPublishedClient();
  return publishedClient;
}
