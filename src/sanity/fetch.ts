import type { z } from "zod";
import "server-only";

import { getSanityClient } from "@/sanity/client";
import { defaultRevalidateSeconds } from "@/sanity/config";
import { isPreviewMode } from "@/sanity/preview";
import { isSanityConfigured } from "@/lib/env";

export interface SanityFetchOptions<T> {
  query: string;
  params?: Record<string, unknown>;
  schema: z.ZodType<T>;
  tags?: string[];
  /** Override preview detection (defaults to Next.js draft mode). */
  preview?: boolean;
  revalidate?: number | false;
}

async function resolvePreview(explicit?: boolean): Promise<boolean> {
  if (explicit !== undefined) {
    return explicit;
  }

  return isPreviewMode();
}

/**
 * Validated Sanity fetch — the only path from repositories to Sanity.
 * Query strings live in src/sanity/queries/, never in route or feature modules.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  schema,
  tags = [],
  preview: previewOverride,
  revalidate = defaultRevalidateSeconds,
}: SanityFetchOptions<T>): Promise<T | null> {
  if (!isSanityConfigured()) {
    return null;
  }

  const preview = await resolvePreview(previewOverride);
  const client = getSanityClient({ preview });

  if (!client) {
    return null;
  }

  try {
    const data = await client.fetch<T | null>(
      query,
      { ...params, preview },
      {
        next: {
          tags,
          ...(revalidate === false ? { revalidate: false } : { revalidate }),
        },
      },
    );

    if (data === null || data === undefined) {
      return null;
    }

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      console.error("[sanityFetch] Validation failed:", parsed.error.flatten());
      return null;
    }

    return parsed.data;
  } catch (error) {
    console.error("[sanityFetch] Request failed:", error);
    return null;
  }
}

export async function sanityFetchList<T>(
  options: SanityFetchOptions<T[]>,
): Promise<T[]> {
  const result = await sanityFetch(options);
  return result ?? [];
}

export async function sanityFetchRequired<T>(
  options: SanityFetchOptions<T>,
): Promise<T | null> {
  return sanityFetch(options);
}
