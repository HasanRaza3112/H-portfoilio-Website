/** Next.js cache safety net when webhooks are delayed (seconds). */
export const defaultRevalidateSeconds = 86_400;

/** Sanity Studio draft preview entrypoint (configured in sanity.config.ts). */
export const previewApiPath = "/api/preview" as const;

export const exitPreviewApiPath = "/api/exit-preview" as const;

export const revalidateApiPath = "/api/revalidate" as const;
