import "server-only";

import type { ContactFormData } from "@/features/contact/lib/contact-schema";

const MIN_SUBMIT_MS = 3_000;
const MAX_FORM_AGE_MS = 2 * 60 * 60 * 1000;

export type SpamCheckResult =
  | { ok: true }
  | { ok: false; reason: "honeypot" | "too_fast" | "expired" };

export function checkContactSpam(data: ContactFormData): SpamCheckResult {
  if (data.website) {
    return { ok: false, reason: "honeypot" };
  }

  const elapsed = Date.now() - data.formLoadedAt;

  if (elapsed < MIN_SUBMIT_MS) {
    return { ok: false, reason: "too_fast" };
  }

  if (elapsed > MAX_FORM_AGE_MS) {
    return { ok: false, reason: "expired" };
  }

  return { ok: true };
}
