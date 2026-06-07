import { Container } from "@/components/layout/container";
import { Heading } from "@/components/ui/heading";
import type { Experience } from "@/types";

import { ExperienceTimelineItem } from "./experience-timeline-item";

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  if (experiences.length === 0) {
    return (
      <Container className="py-section-lg">
        <div className="rounded-lg border border-border-subtle bg-surface-secondary p-10 text-center">
          <p className="text-body-lg text-muted">
            Experience entries will appear here once published in the CMS.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <section aria-labelledby="experience-timeline-heading" className="py-section-md md:py-section-lg">
      <Container size="content">
        <Heading variant="h2" as="h2" id="experience-timeline-heading" className="sr-only">
          Career timeline
        </Heading>
        <ol className="relative ml-3 list-none">
          {experiences.map((experience, index) => (
            <ExperienceTimelineItem
              key={experience._id}
              experience={experience}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </ol>
      </Container>
    </section>
  );
}
