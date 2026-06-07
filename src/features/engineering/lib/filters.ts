import type { EngineeringLogCard, ProjectCategory } from "@/types";

export interface EngineeringFilters {
  category?: string;
  q?: string;
}

export interface EngineeringSearchDocument {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  technologies: string[];
  searchText: string;
}

function normalizeQuery(query: string): string {
  return query.trim().toLowerCase();
}

export function parseEngineeringFilters(
  params: Record<string, string | string[] | undefined>,
): EngineeringFilters {
  const category = typeof params.category === "string" ? params.category : undefined;
  const q = typeof params.q === "string" ? params.q : undefined;

  return { category, q };
}

export function hasActiveEngineeringFilters(filters: EngineeringFilters): boolean {
  return Boolean(filters.category || filters.q?.trim());
}

export function buildEngineeringSearchIndex(
  logs: EngineeringLogCard[],
): EngineeringSearchDocument[] {
  return logs.map((log) => {
    const summary = log.summary ?? "";
    const category = log.category?.title ?? "";
    const technologies = log.technologies ?? [];

    const searchText = [log.title, summary, category, ...technologies]
      .join(" ")
      .toLowerCase();

    return {
      id: log._id,
      slug: log.slug,
      title: log.title,
      summary,
      category,
      technologies,
      searchText,
    };
  });
}

export function matchesEngineeringSearch(
  log: EngineeringLogCard,
  query: string,
): boolean {
  const normalized = normalizeQuery(query);
  if (!normalized) {
    return true;
  }

  const index = buildEngineeringSearchIndex([log])[0];
  return index?.searchText.includes(normalized) ?? false;
}

export function filterEngineeringLogs(
  logs: EngineeringLogCard[],
  filters: EngineeringFilters,
): EngineeringLogCard[] {
  return logs.filter((log) => {
    if (filters.category && log.category?.slug !== filters.category) {
      return false;
    }

    if (filters.q && !matchesEngineeringSearch(log, filters.q)) {
      return false;
    }

    return true;
  });
}

export function getEngineeringCategoriesForFilter(
  categories: ProjectCategory[],
): ProjectCategory[] {
  return categories.filter((category) => category.domain === "engineering");
}

export function countLogsByCategory(
  logs: EngineeringLogCard[],
  categorySlug: string,
): number {
  return logs.filter((log) => log.category?.slug === categorySlug).length;
}

export function sortCategoriesForDisplay(
  categories: ProjectCategory[],
): ProjectCategory[] {
  return [...categories].sort((a, b) => a.title.localeCompare(b.title));
}
