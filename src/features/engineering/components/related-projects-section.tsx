import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ProjectCardLink } from "@/components/shared/project-card";
import { Section } from "@/components/layout/section";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProjectCard, RelatedDocument } from "@/types";

interface RelatedProjectsSectionProps {
  projects: RelatedDocument[];
}

export function RelatedProjectsSection({ projects }: RelatedProjectsSectionProps) {
  if (projects.length === 0) {
    return null;
  }

  const cardProjects: ProjectCard[] = projects
    .filter((project): project is RelatedDocument & { slug: string } =>
      Boolean(project.slug),
    )
    .map((project) => ({
      _id: project._id,
      title: project.title,
      slug: project.slug,
      description: project.description,
      featuredImage: project.featuredImage ?? null,
    }));

  return (
    <Section
      id="related-projects"
      aria-labelledby="related-projects-heading"
      divider="top"
      eyebrow="Applied Work"
      title="Related Projects"
      titleId="related-projects-heading"
      description="Case studies where these ideas were implemented or validated."
    >
      {cardProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {cardProjects.map((project) => (
            <ProjectCardLink key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project._id}
              href={`/projects/${project.slug}`}
              className="group block focus-visible:outline-none"
            >
              <Card variant="interactive" className="h-full">
                <CardHeader className="gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="group-hover:text-accent transition-colors-token">
                      {project.title}
                    </CardTitle>
                    <ArrowUpRight
                      className="size-4 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden
                    />
                  </div>
                  {project.description ? (
                    <CardDescription className="line-clamp-3">
                      {project.description}
                    </CardDescription>
                  ) : null}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </Section>
  );
}
