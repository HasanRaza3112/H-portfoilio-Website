import "server-only";

import type { ContactFormData } from "@/features/contact/lib/contact-schema";
import { getResendClient } from "@/lib/resend";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildContactEmailHtml(data: ContactFormData): string {
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ...(data.company ? [["Company", data.company] as const] : []),
    ["Subject", data.subject],
    ["Message", data.message],
  ];

  const body = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 12px;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `<!DOCTYPE html><html><body><table style="border-collapse:collapse;width:100%;max-width:640px;">${body}</table></body></html>`;
}

function buildContactEmailText(data: ContactFormData): string {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : null,
    `Subject: ${data.subject}`,
    "",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendContactEmail(
  data: ContactFormData,
  toEmail: string,
  fromEmail: string,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const resend = getResendClient();

  if (!resend) {
    return { ok: false, message: "Email service is not configured." };
  }

  const result = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: data.email,
    subject: `[Portfolio Contact] ${data.subject}`,
    html: buildContactEmailHtml(data),
    text: buildContactEmailText(data),
  });

  if (result.error) {
    return {
      ok: false,
      message: result.error.message ?? "Unable to send message.",
    };
  }

  return { ok: true };
}
