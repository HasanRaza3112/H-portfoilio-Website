import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SanityImage } from "@/components/shared/sanity-image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
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

/**
 * Compact HUD mini-card (aspect-[4/5]).
 * Uses the premium liquid-glass design.
 */
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
        hudLabel=""
        className={cn(
          "scan-sweep-on-hover relative flex h-full flex-col overflow-hidden liquid-glass",
          "group-hover:-translate-y-0.5",
        )}
      >
        <div className="relative overflow-hidden aspect-[16/10] w-full shrink-0">
          <SanityImage
            image={project.featuredImage}
            alt={project.featuredImage?.alt ?? project.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priorityImage}
            fill={true}
          />
        </div>
        <CardHeader className="gap-2 p-5 pb-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-heading text-body-sm font-semibold text-foreground group-hover:text-accent transition-colors duration-150 break-words">
              {project.title}
            </h3>
            <ArrowUpRight
              className="size-4 shrink-0 text-muted transition-all duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              aria-hidden
            />
          </div>
          {project.description ? (
            <CardDescription className="line-clamp-2 text-caption text-muted">
              {project.description}
            </CardDescription>
          ) : null}
        </CardHeader>
        <CardContent className="mt-auto flex flex-wrap items-center gap-1.5 p-5 pt-2">
          {statusLabel ? (
            <Badge variant={badgeVariant as "default"} className="text-[10px] px-1.5 py-0.5">{statusLabel}</Badge>
          ) : null}
          {project.category?.title ? (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">{project.category.title}</Badge>
          ) : null}
          {project.technologies?.slice(0, 2).map((tech) => (
            <Tag key={tech} variant="mono" size="sm" className="text-[9px]">
              {tech}
            </Tag>
          ))}
        </CardContent>
      </Card>
    </Link>
  );
}

interface FeaturedProjectCardProps {
  project: ProjectCard;
  priorityImage?: boolean;
}

/**
 * Cinematic 21:9 full-width featured project card with HUD corner brackets.
 * Uses a clean absolute background overlay to completely eliminate negative margins,
 * preventing layout overflows on all screens.
 */
export function FeaturedProjectCard({
  project,
  priorityImage = true,
}: FeaturedProjectCardProps) {
  const status = project.status;
  const statusLabel = status ? projectStatusLabels[status] : null;
  const badgeVariant = status
    ? projectStatusBadgeVariant[status]
    : "secondary";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block focus-visible:outline-none"
      aria-label={`Featured project — ${project.title}`}
    >
      <article className="hud-frame featured-cinematic scan-sweep-on-hover relative w-full overflow-hidden liquid-glass hud-clip-lg">
        <span className="hud-frame-bl" aria-hidden />
        <span className="hud-frame-br" aria-hidden />

        {/* Outer overlay container that acts as a background canvas */}
        <div className="relative w-full min-h-[380px] md:min-h-[460px] flex flex-col justify-end">
          <SanityImage
            image={project.featuredImage}
            alt={project.featuredImage?.alt ?? project.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
            priority={priorityImage}
            fill={true}
          />
          
          {/* Overlay gradient details bottom left */}
          <div className="relative z-10 flex flex-col gap-4 p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2">
              {statusLabel ? (
                <Badge variant={badgeVariant as "default"}>{statusLabel}</Badge>
              ) : null}
              {project.category?.title ? (
                <Badge variant="outline">{project.category.title}</Badge>
              ) : null}
              {project.duration ? (
                <span className="font-mono text-caption uppercase tracking-wider text-accent/80">
                  {project.duration}
                </span>
              ) : null}
            </div>
            
            <h2 className="font-heading text-h2 md:text-h1 text-foreground text-balance transition-colors duration-150 group-hover:text-accent">
              {project.title}
            </h2>
            
            {project.description ? (
              <p className="max-w-2xl text-body-md md:text-body-lg text-muted text-pretty line-clamp-2">
                {project.description}
              </p>
            ) : null}
            
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 font-mono text-body-sm uppercase tracking-widest text-accent transition-transform duration-150 group-hover:translate-x-1">
                VIEW MISSION →
                <ArrowUpRight className="size-4" aria-hidden />
              </span>
              {project.technologies?.slice(0, 4).map((tech) => (
                <Tag key={tech} variant="mono" size="sm">
                  {tech}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
