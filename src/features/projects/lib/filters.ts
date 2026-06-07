import type { ProjectCard, ProjectCategory } from "@/types";

export type ProjectStatus = NonNullable<ProjectCard["status"]>;

export interface ProjectFilters {
  category?: string;
  status?: ProjectStatus;
  q?: string;
}

export interface ProjectSearchDocument {
  id: string;
  slug: string;
  title: string;
  description: string;
  role: string;
  status: string;
  category: string;
  technologies: string[];
  searchText: string;
}

function normalizeQuery(query: string): string {
  return query.trim().toLowerCase();
}

export function parseProjectFilters(
  params: Record<string, string | string[] | undefined>,
): ProjectFilters {
  const category = typeof params.category === "string" ? params.category : undefined;
  const status =
    typeof params.status === "string" &&
    ["shipped", "in-progress", "confidential"].includes(params.status)
      ? (params.status as ProjectStatus)
      : undefined;
  const q = typeof params.q === "string" ? params.q : undefined;

  return { category, status, q };
}

export function hasActiveFilters(filters: ProjectFilters): boolean {
  return Boolean(filters.category || filters.status || filters.q?.trim());
}

export function buildProjectSearchIndex(projects: ProjectCard[]): ProjectSearchDocument[] {
  return projects.map((project) => {
    const description = project.description ?? "";
    const role = project.role ?? "";
    const category = project.category?.title ?? "";
    const technologies = project.technologies ?? [];
    const status = project.status ?? "";

    const searchText = [
      project.title,
      description,
      role,
      category,
      status,
      ...technologies,
    ]
      .join(" ")
      .toLowerCase();

    return {
      id: project._id,
      slug: project.slug,
      title: project.title,
      description,
      role,
      status,
      category,
      technologies,
      searchText,
    };
  });
}

export function matchesSearch(project: ProjectCard, query: string): boolean {
  const normalized = normalizeQuery(query);
  if (!normalized) {
    return true;
  }

  const index = buildProjectSearchIndex([project])[0];
  return index?.searchText.includes(normalized) ?? false;
}

export function filterProjects(
  projects: ProjectCard[],
  filters: ProjectFilters,
): ProjectCard[] {
  return projects.filter((project) => {
    if (filters.category && project.category?.slug !== filters.category) {
      return false;
    }

    if (filters.status && project.status !== filters.status) {
      return false;
    }

    if (filters.q && !matchesSearch(project, filters.q)) {
      return false;
    }

    return true;
  });
}

export function getFeaturedProjects(projects: ProjectCard[]): ProjectCard[] {
  return projects.filter((project) => project.featured);
}

export function getProjectCategoriesForFilter(
  categories: ProjectCategory[],
): ProjectCategory[] {
  return categories.filter((category) => category.domain === "project");
}

export function countProjectsByCategory(
  projects: ProjectCard[],
  categorySlug: string,
): number {
  return projects.filter((project) => project.category?.slug === categorySlug).length;
}
