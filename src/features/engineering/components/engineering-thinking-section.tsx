import { Section } from "@/components/layout/section";
import type { EngineeringLogDetail } from "@/types";

interface ThinkingField {
  id: string;
  label: string;
  value?: string | null;
}

interface EngineeringThinkingSectionProps {
  log: EngineeringLogDetail;
}

export function EngineeringThinkingSection({ log }: EngineeringThinkingSectionProps) {
  const fields: ThinkingField[] = [
    { id: "problem", label: "Problem", value: log.problem },
    { id: "context", label: "Context", value: log.context },
    { id: "solution", label: "Solution", value: log.solution },
    { id: "tradeoffs", label: "Tradeoffs", value: log.tradeoffs },
    { id: "outcome", label: "Outcome", value: log.outcome },
  ];

  const visibleFields = fields.filter((field) => field.value?.trim());

  if (visibleFields.length === 0) {
    return null;
  }

  return (
    <Section
      id="engineering-thinking"
      aria-labelledby="engineering-thinking-heading"
      divider="top"
      containerSize="narrow"
      eyebrow="Framework"
      title="Technical Thinking"
      titleId="engineering-thinking-heading"
      description="Structured breakdown before the full write-up."
    >
      <div className="space-y-6">
        {visibleFields.map((field) => (
          <article
            key={field.id}
            aria-labelledby={`${field.id}-label`}
            className="rounded-lg border border-border-subtle bg-surface-secondary p-5 shadow-panel"
          >
            <h3
              id={`${field.id}-label`}
              className="text-overline uppercase tracking-wider text-accent"
            >
              {field.label}
            </h3>
            <p className="mt-3 text-body text-muted text-pretty whitespace-pre-line">
              {field.value}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
