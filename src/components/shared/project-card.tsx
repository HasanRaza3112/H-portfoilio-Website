import Link from "next/link";
import { ArrowUpRight, Gamepad2, Smartphone } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

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

interface ProjectNameLogoProps {
  title: string;
  slug: string;
  backgroundOnly?: boolean;
}

function ProjectNameLogo({ title, slug, backgroundOnly = false }: ProjectNameLogoProps) {
  let gradientClass = "from-red-950/40 to-black";
  let neonColor = "rgba(255, 70, 85, 0.4)";
  let textColor = "text-accent";
  let subtitle = "SYSTEM FILE";
  let badgeText = "GAME";

  const s = slug.toLowerCase();
  if (s.includes("quizverse")) {
    gradientClass = "from-amber-950/40 via-yellow-950/20 to-black";
    neonColor = "rgba(255, 181, 71, 0.4)";
    textColor = "text-amber-400";
    subtitle = "LIVE TRIVIA PROTOCOL";
    badgeText = "MOBILE";
  } else if (s.includes("cricketx")) {
    gradientClass = "from-emerald-950/40 via-green-950/20 to-black";
    neonColor = "rgba(74, 222, 128, 0.4)";
    textColor = "text-emerald-400";
    subtitle = "MULTIPLAYER STRIKE";
    badgeText = "MOBILE";
  } else if (s.includes("colorcrush")) {
    gradientClass = "from-purple-950/40 via-pink-950/20 to-black";
    neonColor = "rgba(244, 63, 94, 0.4)";
    textColor = "text-pink-400";
    subtitle = "CASUAL MATCHER";
    badgeText = "MOBILE";
  } else if (s.includes("rotator")) {
    gradientClass = "from-orange-950/40 via-stone-900/20 to-black";
    neonColor = "rgba(249, 115, 22, 0.4)";
    textColor = "text-orange-400";
    subtitle = "PUZZLE MECHANICS";
    badgeText = "MOBILE";
  } else if (s.includes("sdk")) {
    gradientClass = "from-cyan-950/40 via-slate-900/20 to-black";
    neonColor = "rgba(56, 189, 248, 0.4)";
    textColor = "text-cyan-400";
    subtitle = "CROSS-ENGINE CORE";
    badgeText = "SDK";
  } else if (s.includes("sharpshooter")) {
    gradientClass = "from-red-950/50 via-rose-950/10 to-black";
    neonColor = "rgba(239, 68, 68, 0.4)";
    textColor = "text-red-500";
    subtitle = "TACTICAL SHOOTER";
    badgeText = "PC DEV";
  } else if (s.includes("run-king")) {
    gradientClass = "from-orange-950/30 via-amber-950/10 to-black";
    neonColor = "rgba(245, 158, 11, 0.4)";
    textColor = "text-amber-500";
    subtitle = "ENDLESS SPRINT";
    badgeText = "PC DEV";
  } else if (s.includes("maze-bunker")) {
    gradientClass = "from-stone-950 via-neutral-900 to-black";
    neonColor = "rgba(100, 116, 139, 0.3)";
    textColor = "text-slate-400";
    subtitle = "SURVIVAL HORROR";
    badgeText = "PC DEV";
  } else if (s.includes("slender")) {
    gradientClass = "from-indigo-950/40 via-violet-950/15 to-black";
    neonColor = "rgba(139, 92, 246, 0.4)";
    textColor = "text-violet-400";
    subtitle = "DARK PROTOCOL";
    badgeText = "PROTOTYPE";
  } else if (s.includes("galaxy")) {
    gradientClass = "from-blue-950/40 via-indigo-950/15 to-black";
    neonColor = "rgba(59, 130, 246, 0.4)";
    textColor = "text-blue-400";
    subtitle = "SPACE ARCADE";
    badgeText = "PC DEV";
  } else if (s.includes("rocketgo")) {
    gradientClass = "from-rose-950/40 via-orange-950/10 to-black";
    neonColor = "rgba(244, 63, 94, 0.4)";
    textColor = "text-rose-400";
    subtitle = "GRAVITY PILOT";
    badgeText = "PC DEV";
  } else if (s.includes("bus-sim")) {
    gradientClass = "from-teal-950/30 via-slate-900/10 to-black";
    neonColor = "rgba(20, 184, 166, 0.4)";
    textColor = "text-teal-400";
    subtitle = "PHYSICS SIMULATOR";
    badgeText = "PC DEV";
  }

  if (backgroundOnly) {
    return (
      <div
        className={cn(
          "absolute inset-0 w-full h-full bg-gradient-to-br transition-all duration-500",
          gradientClass
        )}
        style={{
          boxShadow: `inset 0 0 30px rgba(0, 0, 0, 0.8), inset 0 0 2px ${neonColor}`,
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,21,29,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(18,21,29,0.06)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-30" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-br p-6 overflow-hidden border-b border-border-subtle select-none transition-all duration-500",
        gradientClass
      )}
      style={{
        boxShadow: `inset 0 0 30px rgba(0, 0, 0, 0.8), inset 0 0 2px ${neonColor}`,
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,21,29,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(18,21,29,0.06)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-30" />

      <div className="absolute top-3 left-3 size-2 border-t border-l border-white/20" />
      <div className="absolute top-3 right-3 size-2 border-t border-r border-white/20" />
      <div className="absolute bottom-3 left-3 size-2 border-b border-l border-white/20" />
      <div className="absolute bottom-3 right-3 size-2 border-b border-r border-white/20" />

      <div className="absolute top-3 left-7 right-7 flex items-center justify-between text-[8px] font-mono tracking-widest text-muted/30">
        <span>PRJ.TYPE // {badgeText}</span>
        <span>INDEX.LOCKED</span>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-1.5 transition-transform duration-300 group-hover:scale-[1.04]">
        <h4
          className={cn(
            "font-mono text-body-lg font-black uppercase tracking-[0.2em] text-center filter",
            textColor
          )}
          style={{
            textShadow: `0 0 10px ${neonColor}, 0 0 20px ${neonColor.replace("0.4", "0.1")}`,
          }}
        >
          {title}
        </h4>
        <span className="font-mono text-[9px] font-semibold tracking-[0.3em] text-muted/40 uppercase">
          {subtitle}
        </span>
      </div>

      <div className="absolute bottom-7 left-12 right-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

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
  priorityImage: _priorityImage = false,
}: ProjectCardLinkProps) {
  const status = project.status;
  const statusLabel = status ? projectStatusLabels[status] : null;
  const badgeVariant = status
    ? projectStatusBadgeVariant[status]
    : "secondary";

  return (
    <div
      className={cn("group block h-full relative focus-visible:outline-none", className)}
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
          <ProjectNameLogo title={project.title} slug={project.slug} />
        </div>
        <CardHeader className="gap-2 p-5 pb-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-heading text-body-sm font-semibold text-foreground group-hover:text-accent transition-colors duration-150 break-words">
              <Link
                href={`/projects/${project.slug}`}
                className="focus:outline-none after:absolute after:inset-0 after:z-0"
              >
                {project.title}
              </Link>
            </h3>
            <ArrowUpRight
              className="size-4 shrink-0 text-muted transition-all duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent relative z-10"
              aria-hidden
            />
          </div>
          {project.description ? (
            <CardDescription className="line-clamp-2 text-caption text-muted">
              {project.description}
            </CardDescription>
          ) : null}
        </CardHeader>
        <CardContent className="mt-auto flex flex-col gap-4 p-5 pt-2">
          <div className="flex flex-wrap items-center gap-1.5">
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
          </div>

          {(project.githubUrl || project.playableUrl || project.appStoreUrl) ? (
            <div className="flex flex-wrap gap-2 pt-3 border-t border-border-subtle/50 relative z-10">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-muted hover:text-accent transition-colors duration-150 py-1 px-2 border border-border-subtle bg-surface-secondary/40 hover:bg-surface-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <GithubIcon className="size-3.5" />
                  <span>Repo</span>
                </a>
              ) : null}
              {project.playableUrl ? (
                <a
                  href={project.playableUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-muted hover:text-accent transition-colors duration-150 py-1 px-2 border border-border-subtle bg-surface-secondary/40 hover:bg-surface-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {project.playableUrl.includes("itch.io") ? <Gamepad2 className="size-3.5" /> : <Smartphone className="size-3.5" />}
                  <span>{project.playableUrl.includes("itch.io") ? "Itch" : "Play Store"}</span>
                </a>
              ) : null}
              {project.appStoreUrl ? (
                <a
                  href={project.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-muted hover:text-accent transition-colors duration-150 py-1 px-2 border border-border-subtle bg-surface-secondary/40 hover:bg-surface-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <Smartphone className="size-3.5" />
                  <span>App Store</span>
                </a>
              ) : null}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
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
    <div
      className="group block relative focus-visible:outline-none"
      aria-label={`Featured project — ${project.title}`}
    >
      <article className="hud-frame featured-cinematic scan-sweep-on-hover relative w-full overflow-hidden liquid-glass hud-clip-lg">
        <span className="hud-frame-bl" aria-hidden />
        <span className="hud-frame-br" aria-hidden />

        {/* Outer overlay container that acts as a background canvas */}
        <div className="relative w-full min-h-[380px] md:min-h-[460px] flex flex-col justify-end">
          {project.featuredImage?.url ? (
            <SanityImage
              image={project.featuredImage}
              alt={project.featuredImage?.alt ?? project.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="100vw"
              priority={priorityImage}
              fill={true}
            />
          ) : (
            <ProjectNameLogo title={project.title} slug={project.slug} backgroundOnly />
          )}
          
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
              <Link
                href={`/projects/${project.slug}`}
                className="focus:outline-none after:absolute after:inset-0 after:z-0"
              >
                {project.title}
              </Link>
            </h2>
            
            {project.description ? (
              <p className="max-w-2xl text-body-md md:text-body-lg text-muted text-pretty line-clamp-2">
                {project.description}
              </p>
            ) : null}
            
            <div className="mt-2 flex flex-wrap items-center gap-4 relative z-10">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-2 font-mono text-body-sm uppercase tracking-widest text-accent transition-transform duration-150 hover:translate-x-1 focus-visible:outline-none"
              >
                VIEW MISSION →
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>

              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted hover:text-accent transition-colors duration-150 py-1 px-2.5 border border-border-subtle bg-surface-secondary/60 hover:bg-surface-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <GithubIcon className="size-3.5" />
                  <span>Repo</span>
                </a>
              ) : null}

              {project.playableUrl ? (
                <a
                  href={project.playableUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted hover:text-accent transition-colors duration-150 py-1 px-2.5 border border-border-subtle bg-surface-secondary/60 hover:bg-surface-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {project.playableUrl.includes("itch.io") ? <Gamepad2 className="size-3.5" /> : <Smartphone className="size-3.5" />}
                  <span>{project.playableUrl.includes("itch.io") ? "Itch" : "Play Store"}</span>
                </a>
              ) : null}

              {project.appStoreUrl ? (
                <a
                  href={project.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted hover:text-accent transition-colors duration-150 py-1 px-2.5 border border-border-subtle bg-surface-secondary/60 hover:bg-surface-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <Smartphone className="size-3.5" />
                  <span>App Store</span>
                </a>
              ) : null}

              <div className="ml-auto hidden sm:flex gap-1.5">
                {project.technologies?.slice(0, 3).map((tech) => (
                  <Tag key={tech} variant="mono" size="sm">
                    {tech}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
