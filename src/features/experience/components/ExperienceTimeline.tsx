import { Container } from "@/components/shared/Container";
import { EmptyState } from "@/components/shared/EmptyState";
import type { ExperienceEntry } from "@/types";

interface ExperienceTimelineProps {
  experience: ExperienceEntry[];
}

export function ExperienceTimeline({ experience }: ExperienceTimelineProps) {
  return (
    <Container className="py-16 sm:py-20">
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">
          Experience
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Professional timeline
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Impact-focused accomplishments — what I shipped, built, and improved.
        </p>
      </div>

      {experience.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            title="No experience entries"
            description="Add accomplishment-focused roles in Sanity CMS."
          />
        </div>
      ) : (
        <div className="mt-12 space-y-12">
          {experience.map((entry) => (
            <div
              key={entry.id}
              className="relative border-l border-border pl-6 sm:pl-8"
            >
              <div
                className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background"
                aria-hidden
              />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                <h2 className="text-xl font-medium text-foreground">
                  {entry.role}
                </h2>
                <span className="text-muted-foreground">{entry.company}</span>
                {entry.location ? (
                  <span className="text-sm text-muted-foreground">
                    · {entry.location}
                  </span>
                ) : null}
                <span className="font-mono text-sm text-primary sm:ml-auto">
                  {entry.period}
                </span>
              </div>

              <ul className="mt-6 space-y-3">
                {entry.accomplishments.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
