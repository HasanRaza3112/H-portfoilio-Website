import { Section } from "@/components/layout/section";
import { RESUME_EDUCATION } from "@/lib/resume-education";

export function ResumeEducationSection() {
  return (
    <Section
      id="resume-education"
      aria-labelledby="resume-education-heading"
      divider="top"
      spacing="md"
      containerSize="narrow"
      eyebrow="Education"
      title="Academic Background"
      titleId="resume-education-heading"
    >
      <article className="border border-border-subtle bg-surface p-6 hud-clip">
        <h3 className="font-heading text-h4 text-foreground">{RESUME_EDUCATION.degree}</h3>
        <p className="mt-2 text-body-sm text-muted">{RESUME_EDUCATION.institution}</p>
        <p className="mt-1 font-mono text-caption uppercase tracking-wider text-accent">
          {RESUME_EDUCATION.year}
        </p>
      </article>
    </Section>
  );
}
