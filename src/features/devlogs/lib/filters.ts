import type { DevlogCard } from "@/types";

export interface DevlogFilters {
  tag?: string;
  q?: string;
}

export interface DevlogTagCount {
  tag: string;
  count: number;
}

export interface DevlogMonthGroup {
  key: string;
  label: string;
  entries: DevlogCard[];
}

function normalizeQuery(query: string): string {
  return query.trim().toLowerCase();
}

export function parseDevlogFilters(
  params: Record<string, string | string[] | undefined>,
): DevlogFilters {
  const tag = typeof params.tag === "string" ? params.tag : undefined;
  const q = typeof params.q === "string" ? params.q : undefined;

  return { tag, q };
}

export function hasActiveDevlogFilters(filters: DevlogFilters): boolean {
  return Boolean(filters.tag || filters.q?.trim());
}

export function extractDevlogTags(devlogs: DevlogCard[]): DevlogTagCount[] {
  const counts = new Map<string, number>();

  for (const devlog of devlogs) {
    for (const tag of devlog.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function matchesDevlogSearch(devlog: DevlogCard, query: string): boolean {
  const normalized = normalizeQuery(query);
  if (!normalized) {
    return true;
  }

  const haystack = [
    devlog.title,
    devlog.summary ?? "",
    ...(devlog.tags ?? []),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalized);
}

export function filterDevlogs(
  devlogs: DevlogCard[],
  filters: DevlogFilters,
): DevlogCard[] {
  return devlogs.filter((devlog) => {
    if (filters.tag && !devlog.tags?.includes(filters.tag)) {
      return false;
    }

    if (filters.q && !matchesDevlogSearch(devlog, filters.q)) {
      return false;
    }

    return true;
  });
}

export function groupDevlogsByMonth(devlogs: DevlogCard[]): DevlogMonthGroup[] {
  const groups = new Map<string, DevlogMonthGroup>();

  for (const devlog of devlogs) {
    const date = devlog.publishedAt ? new Date(devlog.publishedAt) : null;
    const key = date
      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
      : "undated";
    const label = date
      ? date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
      : "Undated";

    const existing = groups.get(key);
    if (existing) {
      existing.entries.push(devlog);
    } else {
      groups.set(key, { key, label, entries: [devlog] });
    }
  }

  return [...groups.values()];
}

export function getRelatedDevlogs(
  allDevlogs: DevlogCard[],
  current: DevlogCard | { slug: string; tags?: string[] | null },
  limit = 3,
): DevlogCard[] {
  const currentTags = new Set(current.tags ?? []);

  return allDevlogs
    .filter((entry) => entry.slug !== current.slug)
    .map((entry) => {
      const overlap = (entry.tags ?? []).filter((tag) => currentTags.has(tag)).length;
      return { entry, overlap };
    })
    .filter((item) => item.overlap > 0)
    .sort((a, b) => {
      if (b.overlap !== a.overlap) {
        return b.overlap - a.overlap;
      }

      const aTime = a.entry.publishedAt ? Date.parse(a.entry.publishedAt) : 0;
      const bTime = b.entry.publishedAt ? Date.parse(b.entry.publishedAt) : 0;
      return bTime - aTime;
    })
    .slice(0, limit)
    .map((item) => item.entry);
}
