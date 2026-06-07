import { type NextRequest } from "next/server";

import {
  contactFormSchema,
  type ContactApiErrorResponse,
  type ContactApiSuccessResponse,
} from "@/features/contact/lib/contact-schema";
import { checkContactSpam } from "@/features/contact/lib/contact-spam";
import { sendContactEmail } from "@/features/contact/lib/send-contact-email";
import { BRAND } from "@/lib/constants";
import { getContactFormFromEmail, getContactFormToEmail } from "@/lib/env";
import { checkRateLimit } from "@/lib/rate-limit";
import { getSiteSettings } from "@/sanity/repositories/site";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function jsonResponse<T>(body: T, status = 200): Response {
  return Response.json(body, { status });
}

export async function POST(request: NextRequest) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse<ContactApiErrorResponse>(
      {
        success: false,
        message: "Invalid request body.",
      },
      400,
    );
  }

  const parsed = contactFormSchema.safeParse(payload);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;

    return jsonResponse<ContactApiErrorResponse>(
      {
        success: false,
        message: "Please fix the highlighted fields and try again.",
        fieldErrors,
      },
      400,
    );
  }

  const spamCheck = checkContactSpam(parsed.data);

  if (!spamCheck.ok) {
    if (spamCheck.reason === "honeypot" || spamCheck.reason === "too_fast") {
      return jsonResponse<ContactApiSuccessResponse>({ success: true });
    }

    return jsonResponse<ContactApiErrorResponse>(
      {
        success: false,
        message: "This form session expired. Refresh the page and try again.",
      },
      400,
    );
  }

  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`contact:${ip}`, RATE_LIMIT, RATE_WINDOW_MS);

  if (!rateLimit.allowed) {
    return jsonResponse<ContactApiErrorResponse>(
      {
        success: false,
        message: "Too many messages sent recently. Please try again later.",
      },
      429,
    );
  }

  const siteSettings = await getSiteSettings();
  const toEmail =
    getContactFormToEmail() ?? siteSettings?.contactEmail ?? null;
  const fromEmail = getContactFormFromEmail(BRAND.name);

  if (!toEmail) {
    return jsonResponse<ContactApiErrorResponse>(
      {
        success: false,
        message: "Contact delivery is not configured yet. Please try again later.",
      },
      503,
    );
  }

  const sendResult = await sendContactEmail(parsed.data, toEmail, fromEmail);

  if (!sendResult.ok) {
    return jsonResponse<ContactApiErrorResponse>(
      {
        success: false,
        message: sendResult.message,
      },
      502,
    );
  }

  return jsonResponse<ContactApiSuccessResponse>({ success: true });
}
