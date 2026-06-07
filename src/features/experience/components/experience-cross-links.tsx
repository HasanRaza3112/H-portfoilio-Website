import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { RelatedDocument } from "@/types";

import { compactRelated } from "../lib/experience-data";

interface ExperienceCrossLinksProps {
  projects?: RelatedDocument[] | null;
  engineeringLogs?: RelatedDocument[] | null;
}

export function ExperienceCrossLinks({
  projects,
  engineeringLogs,
}: ExperienceCrossLinksProps) {
  const projectLinks = compactRelated(projects).filter((item) => item.slug);
  const logLinks = compactRelated(engineeringLogs).filter((item) => item.slug);

  if (projectLinks.length === 0 && logLinks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 border-t border-border-subtle pt-5">
      {projectLinks.length > 0 ? (
        <div>
          <h4 className="text-overline uppercase tracking-wider text-muted">
            Related Projects
          </h4>
          <ul className="mt-3 space-y-2">
            {projectLinks.map((project) => (
              <li key={project._id}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group inline-flex items-start gap-2 text-body-sm text-foreground transition-colors-token hover:text-accent"
                >
                  <ArrowUpRight
                    className="mt-0.5 size-4 shrink-0 opacity-60 group-hover:opacity-100"
                    aria-hidden
                  />
                  <span>
                    {project.title}
                    {project.description ? (
                      <span className="mt-0.5 block text-caption text-muted line-clamp-1">
                        {project.description}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {logLinks.length > 0 ? (
        <div>
          <h4 className="text-overline uppercase tracking-wider text-muted">
            Related Engineering Logs
          </h4>
          <ul className="mt-3 space-y-2">
            {logLinks.map((log) => (
              <li key={log._id}>
                <Link
                  href={`/engineering/${log.slug}`}
                  className="group inline-flex items-start gap-2 text-body-sm text-foreground transition-colors-token hover:text-accent"
                >
                  <ArrowUpRight
                    className="mt-0.5 size-4 shrink-0 opacity-60 group-hover:opacity-100"
                    aria-hidden
                  />
                  <span>
                    {log.title}
                    {log.summary ? (
                      <span className="mt-0.5 block text-caption text-muted line-clamp-1">
                        {log.summary}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

interface ExperienceAccomplishmentsProps {
  featured?: string | null;
  accomplishments?: string[] | null;
}

export function ExperienceAccomplishments({
  featured,
  accomplishments,
}: ExperienceAccomplishmentsProps) {
  const items = accomplishments ?? [];
  const highlight = featured?.trim() || items[0];

  if (!highlight && items.length === 0) {
    return null;
  }

  const remaining = items.filter((item) => item !== highlight);

  return (
    <div className="space-y-4">
      {highlight ? (
        <div className="rounded-lg border border-border-accent bg-accent-subtle p-4 shadow-accent">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="default">Highlight</Badge>
          </div>
          <p className="text-body text-foreground text-pretty">{highlight}</p>
        </div>
      ) : null}

      {remaining.length > 0 ? (
        <div>
          <h4 className="text-overline uppercase tracking-wider text-muted">
            Key Accomplishments
          </h4>
          <ul className="mt-3 space-y-2">
            {remaining.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="flex gap-3 text-body-sm text-muted"
              >
                <span className="font-mono text-caption text-accent" aria-hidden>
                  •
                </span>
                <span className="text-pretty">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
