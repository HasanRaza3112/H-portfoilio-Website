import Link from "next/link";

import { MotionReveal } from "@/components/shared/motion-reveal";
import { SanityImage } from "@/components/shared/sanity-image";
import { SectionLink } from "@/components/shared/section-link";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import type { Experience } from "@/types";

interface ExperienceSnapshotSectionProps {
  experience: Experience;
}

export function ExperienceSnapshotSection({
  experience,
}: ExperienceSnapshotSectionProps) {
  return (
    <Section
      id="experience-snapshot"
      aria-labelledby="experience-snapshot-heading"
      divider="top"
      eyebrow="Career"
      title="Experience Snapshot"
      titleId="experience-snapshot-heading"
      description="Current role and recent impact at a glance."
    >
      <MotionReveal>
        <Card variant="elevated" padding="lg" className="overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-start">
            <div className="flex items-start gap-4">
              <SanityImage
                image={experience.companyLogo}
                alt={`${experience.company} logo`}
                className="size-14 shrink-0 rounded-lg border border-border-subtle"
                sizes="56px"
                fill
              />
              <div>
                <CardHeader className="p-0 pb-0">
                  <CardTitle className="text-h3">{experience.role}</CardTitle>
                </CardHeader>
                <p className="text-body text-muted">{experience.company}</p>
                {experience.duration ? (
                  <p className="text-body-sm text-muted">{experience.duration}</p>
                ) : null}
              </div>
            </div>
            <CardContent className="space-y-4 p-0">
              {experience.featuredAccomplishment ? (
                <p className="text-body-lg text-foreground text-pretty">
                  {experience.featuredAccomplishment}
                </p>
              ) : experience.accomplishments?.[0] ? (
                <p className="text-body-lg text-foreground text-pretty">
                  {experience.accomplishments[0]}
                </p>
              ) : null}
              {experience.technologies?.length ? (
                <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
                  {experience.technologies.slice(0, 6).map((tech) => (
                    <li key={tech}>
                      <Tag variant="mono">{tech}</Tag>
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button asChild variant="secondary">
                  <Link href="/experience">Full experience</Link>
                </Button>
                <SectionLink href="/experience" label="View timeline" />
              </div>
            </CardContent>
          </div>
        </Card>
      </MotionReveal>
    </Section>
  );
}
