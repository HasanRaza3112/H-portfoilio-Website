export function resolveResumeFilename(
  originalFilename?: string | null,
  fallbackName?: string | null,
): string {
  if (originalFilename?.trim()) {
    return originalFilename.trim();
  }

  const slug = (fallbackName ?? "resume")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${slug || "resume"}.pdf`;
}
