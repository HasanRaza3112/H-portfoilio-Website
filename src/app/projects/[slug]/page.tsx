import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetailView } from "@/features/projects";
import { ProjectJsonLd } from "@/features/projects/components/project-json-ld";
import { ContentViewTracker } from "@/components/shared/content-view-tracker";
import {
  getCachedProjectBySlug,
  getCachedProjectSlugs,
  getCachedSiteSettings,
} from "@/features/projects/lib/project-data";
import { buildProjectDetailMetadata } from "@/lib/seo";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getCachedProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [project, siteSettings] = await Promise.all([
    getCachedProjectBySlug(slug),
    getCachedSiteSettings(),
  ]);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return buildProjectDetailMetadata(project, siteSettings);
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, siteSettings] = await Promise.all([
    getCachedProjectBySlug(slug),
    getCachedSiteSettings(),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <>
      <ContentViewTracker event="project_view" slug={project.slug} />
      <ProjectJsonLd project={project} siteSettings={siteSettings} />
      <ProjectDetailView project={project} />
    </>
  );
}
