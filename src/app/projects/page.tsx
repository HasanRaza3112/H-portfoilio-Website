import type { Metadata } from "next";
import { Suspense } from "react";

import { ProjectsIndexView } from "@/features/projects";
import { ProjectsIndexJsonLd } from "@/features/projects/components/projects-index-json-ld";
import {
  getCachedProjectCategories,
  getCachedProjects,
  getCachedSiteSettings,
} from "@/features/projects/lib/project-data";
import {
  getProjectCategoriesForFilter,
  parseProjectFilters,
} from "@/features/projects/lib/filters";
import { buildProjectsIndexMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getCachedSiteSettings();
  return buildProjectsIndexMetadata(siteSettings);
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = parseProjectFilters(params);
  const [projects, categories] = await Promise.all([
    getCachedProjects(),
    getCachedProjectCategories(),
  ]);

  const projectCategories = getProjectCategoriesForFilter(categories);

  return (
    <>
      <ProjectsIndexJsonLd projects={projects} />
      <Suspense
      fallback={
        <div className="mx-auto max-w-container-content px-[var(--container-padding)] py-section-md text-muted">
          Loading projects…
        </div>
      }
    >
      <ProjectsIndexView
        projects={projects}
        categories={projectCategories}
        filters={filters}
      />
      </Suspense>
    </>
  );
}
