import type { z } from "zod";

import { getSanityClient } from "./client";
import { isSanityConfigured } from "./env";

interface SanityFetchOptions<T> {
  query: string;
  params?: Record<string, unknown>;
  schema: z.ZodType<T>;
  tags?: string[];
}

export async function sanityFetch<T>({
  query,
  params = {},
  schema,
  tags = [],
}: SanityFetchOptions<T>): Promise<T | null> {
  if (!isSanityConfigured) {
    return null;
  }

  const client = getSanityClient();

  if (!client) {
    return null;
  }

  try {
    const data = await client.fetch<T | null>(query, params, {
      next: { tags },
    });

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

export async function sanityFetchList<T>({
  query,
  params = {},
  schema,
  tags = [],
}: SanityFetchOptions<T[]>): Promise<T[]> {
  const result = await sanityFetch({
    query,
    params,
    schema,
    tags,
  });

  return result ?? [];
}

export async function sanityFetchRequired<T>({
  query,
  params = {},
  schema,
  tags = [],
}: SanityFetchOptions<T>): Promise<T | null> {
  return sanityFetch({ query, params, schema, tags });
}
