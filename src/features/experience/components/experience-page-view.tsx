import { ExperienceTimeline } from "@/features/experience/components/experience-timeline";
import { Heading } from "@/components/ui/heading";
import type { Experience, PersonProfile } from "@/types";

interface ExperiencePageViewProps {
  experiences: Experience[];
  profile: PersonProfile | null;
}

export function ExperiencePageView({
  experiences,
  profile,
}: ExperiencePageViewProps) {
  return (
    <>
      <section
        aria-labelledby="experience-page-heading"
        className="border-b border-border-subtle py-section-md"
      >
        <div className="mx-auto w-full max-w-container-content px-[var(--container-padding)]">
          <Heading variant="overline" tone="accent">
            Career
          </Heading>
          <Heading variant="h1" as="h1" id="experience-page-heading" className="mt-3">
            Experience
          </Heading>
          <p className="mt-4 max-w-2xl text-body-lg text-muted text-pretty">
            {profile?.professionalSummary ??
              "A timeline of roles, impact, and the technologies used to ship game systems and engineering work."}
          </p>
        </div>
      </section>
      <ExperienceTimeline experiences={experiences} />
    </>
  );
}
