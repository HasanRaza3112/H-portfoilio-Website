import { Resend } from "resend";

import { isResendConfigured } from "@/lib/env";

let resend: Resend | null = null;

/**
 * Lazy Resend client — wired in Phase 11 (Contact).
 */
export function getResendClient(): Resend | null {
  if (!isResendConfigured()) {
    return null;
  }

  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }

  return resend;
}
