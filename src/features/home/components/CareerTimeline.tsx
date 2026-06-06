import Link from "next/link";

import { Container } from "@/components/shared/Container";
import { EmptyState } from "@/components/shared/EmptyState";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import type { ExperienceEntry } from "@/types";

interface CareerTimelineProps {
  experience: ExperienceEntry[];
}

export function CareerTimeline({ experience }: CareerTimelineProps) {
  return (
    <section className="border-y border-border bg-muted/20 py-20">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            label="Career Timeline"
            title="Accomplishments, not job descriptions"
            description="Impact-focused highlights from professional work."
            className="mb-0"
          />
          <Button asChild variant="ghost" className="shrink-0">
            <Link href="/experience">Full Experience →</Link>
          </Button>
        </div>

        {experience.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="No experience entries"
              description="Add accomplishment-focused experience entries in Sanity."
              actionLabel="View experience"
              actionHref="/experience"
            />
          </div>
        ) : (
          <div className="mt-10 space-y-8">
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
                  <h3 className="font-medium text-foreground">{entry.role}</h3>
                  <span className="text-sm text-muted-foreground">
                    {entry.company}
                    {entry.location ? ` · ${entry.location}` : ""}
                  </span>
                  <span className="font-mono text-xs text-primary sm:ml-auto">
                    {entry.period}
                  </span>
                </div>
                <ul className="mt-4 space-y-2">
                  {entry.accomplishments.slice(0, 3).map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                {entry.accomplishments.length > 3 ? (
                  <Link
                    href="/experience"
                    className="mt-3 inline-block text-sm text-primary hover:underline"
                  >
                    +{entry.accomplishments.length - 3} more accomplishments
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
