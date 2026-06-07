import { Section } from "@/components/layout/section";

interface ResumeSummarySectionProps {
  summary?: string | null;
}

export function ResumeSummarySection({ summary }: ResumeSummarySectionProps) {
  const content =
    summary ??
    "Technical game engineer focused on gameplay systems, SDK development, and shipping playable technology.";

  return (
    <Section
      id="resume-summary"
      aria-labelledby="resume-summary-heading"
      spacing="md"
      containerSize="narrow"
      eyebrow="Overview"
      title="Professional Summary"
      titleId="resume-summary-heading"
    >
      <p className="max-w-3xl text-body-lg text-muted text-pretty">{content}</p>
      {!summary ? (
        <p className="mt-3 text-body-sm text-muted">
          Add a professional summary in Sanity Person Profile to customize this section.
        </p>
      ) : null}
    </Section>
  );
}
