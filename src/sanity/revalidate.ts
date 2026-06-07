import { revalidateTag } from "next/cache";

import { getRevalidationTags } from "@/sanity/preview";

export interface SanityWebhookPayload {
  _type?: string;
  _id?: string;
  slug?: { current?: string };
}

export function revalidateSanityDocument(payload: SanityWebhookPayload): string[] {
  const tags = getRevalidationTags(payload);

  for (const tag of tags) {
    revalidateTag(tag);
  }

  return tags;
}
