export function compactRelated<T>(items: (T | null | undefined)[] | null | undefined): T[] {
  return (items ?? []).filter((item): item is T => item != null);
}

export function formatPublishedDate(value?: string | null): string | null {
  if (!value) {
    return null;
  }

  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatPublishedDateShort(value?: string | null): string | null {
  if (!value) {
    return null;
  }

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
