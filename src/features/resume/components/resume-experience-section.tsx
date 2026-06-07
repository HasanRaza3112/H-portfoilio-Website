import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { ResumeExperienceEntry } from "@/features/resume/components/resume-experience-entry";
import type { Experience } from "@/types";

interface ResumeExperienceSectionProps {
  experiences: Experience[];
}

export function ResumeExperienceSection({
  experiences,
}: ResumeExperienceSectionProps) {
  return (
    <Section
      id="resume-experience"
      aria-labelledby="resume-experience-heading"
      divider="top"
      spacing="lg"
      containerSize="narrow"
      eyebrow="Career"
      title="Experience"
      titleId="resume-experience-heading"
      description="Roles, impact, and the systems shipped along the way."
    >
      {experiences.length > 0 ? (
        <div>
          {experiences.map((experience) => (
            <ResumeExperienceEntry key={experience._id} experience={experience} />
          ))}
        </div>
      ) : (
        <p className="text-body-lg text-muted">
          Published experience entries from Sanity will appear here.
        </p>
      )}

      <div className="mt-8 border-t border-border-subtle pt-6">
        <Link
          href="/experience"
          className="inline-flex items-center gap-2 text-body-sm font-medium text-accent transition-colors-token hover:text-accent-hover"
        >
          View full career timeline
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </div>
    </Section>
  );
}
