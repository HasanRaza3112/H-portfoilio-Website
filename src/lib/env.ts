import { z } from "zod";

const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  SANITY_API_READ_TOKEN: z.string().optional(),
  SANITY_REVALIDATE_SECRET: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().optional(),
  CONTACT_FORM_TO_EMAIL: z.string().email().optional(),
  PREVIEW_SECRET: z.string().optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? undefined : value,
    z.string().url().default("https://mohammedhasanraza.com"),
  ),
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().optional(),
  NEXT_PUBLIC_SANITY_DATASET: z.string().default("production"),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().default("2024-01-01"),
});

export type ServerEnv = z.infer<typeof serverSchema>;
export type ClientEnv = z.infer<typeof clientSchema>;

export function getServerEnv(): ServerEnv {
  return serverSchema.parse(process.env);
}

export function getClientEnv(): ClientEnv {
  return clientSchema.parse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  });
}

export function isSanityConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
}

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export function getContactFormToEmail(): string | undefined {
  return process.env.CONTACT_FORM_TO_EMAIL;
}

export function getContactFormFromEmail(brandName: string): string {
  return (
    process.env.RESEND_FROM_EMAIL ??
    `${brandName} Portfolio <onboarding@resend.dev>`
  );
}

export function isContactFormConfigured(): boolean {
  return isResendConfigured();
}
