import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/components/ui/tag";
import { SanityImage } from "@/components/shared/sanity-image";
import {
  projectStatusBadgeVariant,
  projectStatusLabels,
} from "@/lib/labels";
import { cn } from "@/lib/utils";
import type { ProjectCard } from "@/types";

interface ProjectCardLinkProps {
  project: ProjectCard;
  className?: string;
  priorityImage?: boolean;
}

export function ProjectCardLink({
  project,
  className,
  priorityImage = false,
}: ProjectCardLinkProps) {
  const status = project.status;
  const statusLabel = status ? projectStatusLabels[status] : null;
  const badgeVariant = status
    ? projectStatusBadgeVariant[status]
    : "secondary";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn("group block h-full focus-visible:outline-none", className)}
    >
      <Card
        variant="interactive"
        padding="none"
        className="flex h-full flex-col overflow-hidden"
      >
        <SanityImage
          image={project.featuredImage}
          alt={project.featuredImage?.alt ?? project.title}
          className="aspect-[16/10] w-full border-b border-border-subtle"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priorityImage}
        />
        <CardHeader className="gap-3 p-5 pb-2">
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
            <CardDescription className="line-clamp-2">
              {project.description}
            </CardDescription>
          ) : null}
        </CardHeader>
        <CardContent className="mt-auto flex flex-wrap items-center gap-2 p-5 pt-2">
          {statusLabel ? (
            <Badge variant={badgeVariant as "default"}>{statusLabel}</Badge>
          ) : null}
          {project.category?.title ? (
            <Badge variant="outline">{project.category.title}</Badge>
          ) : null}
          {project.technologies?.slice(0, 3).map((tech) => (
            <Tag key={tech} variant="mono" size="sm">
              {tech}
            </Tag>
          ))}
        </CardContent>
      </Card>
    </Link>
  );
}
