import Link from "next/link";
import { Code2, ExternalLink } from "lucide-react";

import { SanityImage } from "@/components/shared/sanity-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import {
  projectStatusBadgeVariant,
  projectStatusLabels,
} from "@/lib/labels";
import type { ProjectDetail } from "@/types";

interface ProjectHeroProps {
  project: ProjectDetail;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const status = project.status;
  const statusLabel = status ? projectStatusLabels[status] : null;
  const badgeVariant = status ? projectStatusBadgeVariant[status] : "secondary";

  return (
    <section aria-labelledby="project-hero-heading" className="border-b border-border-subtle">
      <div className="mx-auto grid w-full max-w-container-wide gap-8 px-[var(--container-padding)] py-section-md lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-section-lg">
        <div className="flex flex-col gap-5">
          {project.category?.title ? (
            <Badge variant="default">{project.category.title}</Badge>
          ) : null}
          <Heading variant="h1" as="h1" id="project-hero-heading">
            {project.title}
          </Heading>
          {project.description ? (
            <p className="max-w-2xl text-body-lg text-muted text-pretty">
              {project.description}
            </p>
          ) : null}
          <dl className="grid gap-3 sm:grid-cols-2">
            {project.role ? (
              <div>
                <dt className="text-caption uppercase tracking-wider text-muted">Role</dt>
                <dd className="text-body-sm text-foreground">{project.role}</dd>
              </div>
            ) : null}
            {project.teamSize ? (
              <div>
                <dt className="text-caption uppercase tracking-wider text-muted">Team</dt>
                <dd className="text-body-sm text-foreground">{project.teamSize}</dd>
              </div>
            ) : null}
            {project.duration ? (
              <div>
                <dt className="text-caption uppercase tracking-wider text-muted">Duration</dt>
                <dd className="text-body-sm text-foreground">{project.duration}</dd>
              </div>
            ) : null}
            {statusLabel ? (
              <div>
                <dt className="text-caption uppercase tracking-wider text-muted">Status</dt>
                <dd>
                  <Badge variant={badgeVariant as "default"}>{statusLabel}</Badge>
                </dd>
              </div>
            ) : null}
          </dl>
          <div className="flex flex-wrap gap-3 pt-2">
            {project.playableUrl ? (
              <Button asChild>
                <Link href={project.playableUrl} target="_blank" rel="noopener noreferrer">
                  Play / Demo
                  <ExternalLink className="size-4" aria-hidden />
                </Link>
              </Button>
            ) : null}
            {project.githubUrl ? (
              <Button asChild variant="secondary">
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Code2 className="size-4" aria-hidden />
                  Source
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
        <SanityImage
          image={project.featuredImage}
          alt={project.featuredImage?.alt ?? project.title}
          className="aspect-[16/10] w-full rounded-xl border border-border-subtle shadow-elevated"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
    </section>
  );
}
