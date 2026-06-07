import { Section } from "@/components/layout/section";
import { Tag } from "@/components/ui/tag";

interface ResumeExpertiseSectionProps {
  expertiseAreas?: string[] | null;
}

export function ResumeExpertiseSection({
  expertiseAreas,
}: ResumeExpertiseSectionProps) {
  const areas = expertiseAreas?.length ? expertiseAreas : [];

  if (areas.length === 0) {
    return null;
  }

  return (
    <Section
      id="resume-expertise"
      aria-labelledby="resume-expertise-heading"
      divider="top"
      spacing="md"
      containerSize="narrow"
      eyebrow="Skills"
      title="Core Expertise"
      titleId="resume-expertise-heading"
    >
      <ul className="flex flex-wrap gap-2" aria-label="Core expertise areas">
        {areas.map((area) => (
          <li key={area}>
            <Tag variant="mono">{area}</Tag>
          </li>
        ))}
      </ul>
    </Section>
  );
}
