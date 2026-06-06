import { createClient, type SanityClient } from "next-sanity";

import { isSanityConfigured, sanityConfig } from "./env";

let client: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
  if (!isSanityConfigured) {
    return null;
  }

  if (!client) {
    client = createClient({
      ...sanityConfig,
      stega: {
        enabled: false,
        studioUrl: "/studio",
      },
    });
  }

  return client;
}
