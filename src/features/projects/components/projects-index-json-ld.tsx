import type { ProjectCard } from "@/sanity/schemas";
import { buildProjectsCollectionJsonLd } from "@/lib/seo";

interface ProjectsIndexJsonLdProps {
  projects: ProjectCard[];
}

export function ProjectsIndexJsonLd({ projects }: ProjectsIndexJsonLdProps) {
  const schema = buildProjectsCollectionJsonLd(projects);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
