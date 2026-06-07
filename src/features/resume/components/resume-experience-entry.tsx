import { SanityImage } from "@/components/shared/sanity-image";
import { Tag } from "@/components/ui/tag";
import { Heading } from "@/components/ui/heading";
import { isPresentRole } from "@/features/experience/lib/experience-data";
import type { Experience } from "@/types";

interface ResumeExperienceEntryProps {
  experience: Experience;
}

export function ResumeExperienceEntry({ experience }: ResumeExperienceEntryProps) {
  const headingId = `resume-${experience._id}-heading`;
  const isCurrent = isPresentRole(experience.endDate);

  return (
    <article aria-labelledby={headingId} className="border-b border-border-subtle py-8 last:border-b-0">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <SanityImage
            image={experience.companyLogo}
            alt={`${experience.company} logo`}
            className="size-10 shrink-0 rounded-md border border-border-subtle"
            sizes="40px"
            fill
          />
          <div>
            <Heading variant="h3" as="h3" id={headingId}>
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
          </div>
        </div>
        {isCurrent ? <Tag variant="accent">Current</Tag> : null}
      </header>

      <div className="mt-5 space-y-5">
        {experience.accomplishments?.length ? (
          <div>
            <h4 className="text-overline uppercase tracking-wider text-muted">
              Key Accomplishments
            </h4>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {experience.accomplishments.map((item, index) => (
                <li key={`${item}-${index}`} className="text-body-sm text-muted text-pretty">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {experience.responsibilities?.length ? (
          <div>
            <h4 className="text-overline uppercase tracking-wider text-muted">
              Responsibilities
            </h4>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {experience.responsibilities.map((item, index) => (
                <li key={`${item}-${index}`} className="text-body-sm text-muted text-pretty">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {experience.technologies?.length ? (
          <div>
            <h4 className="text-overline uppercase tracking-wider text-muted">
              Technologies
            </h4>
            <ul
              className="mt-3 flex flex-wrap gap-2"
              aria-label={`Technologies used at ${experience.company}`}
            >
              {experience.technologies.map((tech) => (
                <li key={tech}>
                  <Tag size="sm" variant="mono">
                    {tech}
                  </Tag>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}
