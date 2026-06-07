import { track } from "@vercel/analytics";

/**
 * Analytics event catalog — @see Project_Constitution.md
 */
export const analyticsEvents = {
  resumeDownload: "resume_download",
  contactSubmit: "contact_submit",
  projectView: "project_view",
  engineeringView: "engineering_view",
} as const;

export type AnalyticsEvent =
  (typeof analyticsEvents)[keyof typeof analyticsEvents];

export interface ResumeDownloadEventProperties {
  source: "resume_page" | "home_cta" | "header";
  filename?: string | null;
}

export function trackResumeDownload(
  properties: ResumeDownloadEventProperties,
): void {
  track(analyticsEvents.resumeDownload, {
    source: properties.source,
    ...(properties.filename ? { filename: properties.filename } : {}),
  });
}

export function trackContactSubmit(): void {
  track(analyticsEvents.contactSubmit);
}

export function trackProjectView(slug: string): void {
  track(analyticsEvents.projectView, { slug });
}

export function trackEngineeringView(slug: string): void {
  track(analyticsEvents.engineeringView, { slug });
}
