import { MotionReveal } from "@/components/shared/motion-reveal";
import { SanityImage } from "@/components/shared/sanity-image";
import { Tag } from "@/components/ui/tag";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/utils";
import type { Experience } from "@/types";

import { isPresentRole } from "../lib/experience-data";
import {
  ExperienceAccomplishments,
  ExperienceCrossLinks,
} from "./experience-cross-links";

interface ExperienceTimelineItemProps {
  experience: Experience;
  index: number;
  isLast: boolean;
}

export function ExperienceTimelineItem({
  experience,
  index,
  isLast,
}: ExperienceTimelineItemProps) {
  const headingId = `experience-${experience._id}-heading`;
  const isCurrent = isPresentRole(experience.endDate);

  return (
    <MotionReveal delay={index * 0.06}>
      <li className="relative pb-section-md last:pb-0">
        <div
          className={cn(
            "absolute left-0 top-2 h-full w-px -translate-x-1/2 bg-border-subtle",
            isLast && "h-[calc(100%-1rem)]",
          )}
          aria-hidden
        />
        <div
          className={cn(
            "absolute left-0 top-2 size-3 -translate-x-1/2 rounded-full border-2 border-background",
            isCurrent ? "bg-accent shadow-accent" : "bg-surface-overlay",
          )}
          aria-hidden
        />

        <article aria-labelledby={headingId} className="pl-8">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <SanityImage
                image={experience.companyLogo}
                alt={`${experience.company} logo`}
                className="size-12 shrink-0 rounded-lg border border-border-subtle"
                sizes="48px"
                fill
              />
              <div>
                <Heading variant="h3" as="h2" id={headingId}>
                  {experience.role}
                </Heading>
                <p className="mt-1 text-body text-foreground">{experience.company}</p>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-body-sm text-muted">
                  {experience.duration ? (
                    <span>{experience.duration}</span>
                  ) : experience.startDate ? (
                    <time dateTime={experience.startDate}>
                      {experience.startDate}
                      {experience.endDate ? ` — ${experience.endDate}` : ""}
                    </time>
                  ) : null}
                  {experience.location ? <span>{experience.location}</span> : null}
                </div>
                {isCurrent ? (
                  <p className="mt-2">
                    <Tag variant="accent">Current role</Tag>
                  </p>
                ) : null}
              </div>
            </div>
          </header>

          <div className="mt-6 space-y-6">
            <ExperienceAccomplishments
              featured={experience.featuredAccomplishment}
              accomplishments={experience.accomplishments}
            />

            {experience.responsibilities?.length ? (
              <div>
                <h4 className="text-overline uppercase tracking-wider text-muted">
                  Responsibilities
                </h4>
                <ul className="mt-3 space-y-2">
                  {experience.responsibilities.map((item, itemIndex) => (
                    <li
                      key={`${item}-${itemIndex}`}
                      className="text-body-sm text-muted text-pretty"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {experience.technologies?.length ? (
              <div>
                <h4 className="text-overline uppercase tracking-wider text-muted">
                  Technologies Used
                </h4>
                <ul
                  className="mt-3 flex flex-wrap gap-2"
                  aria-label={`Technologies used at ${experience.company}`}
                >
                  {experience.technologies.map((tech) => (
                    <li key={tech}>
                      <Tag variant="mono">{tech}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <ExperienceCrossLinks
              projects={experience.relatedProjects}
              engineeringLogs={experience.relatedEngineeringLogs}
            />
          </div>
        </article>
      </li>
    </MotionReveal>
  );
}
