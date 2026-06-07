import { Section } from "@/components/layout/section";
import { Tag } from "@/components/ui/tag";

interface ProjectListSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  items: string[];
}

export function ProjectListSection({
  id,
  eyebrow,
  title,
  items,
}: ProjectListSectionProps) {
  if (items.length === 0) {
    return null;
  }

  const headingId = `${id}-heading`;

  return (
    <Section
      id={id}
      aria-labelledby={headingId}
      divider="top"
      eyebrow={eyebrow}
      title={title}
      titleId={headingId}
    >
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={`${id}-${index}`}
            className="flex gap-3 rounded-lg border border-border-subtle bg-surface-secondary px-4 py-3 text-body text-muted"
          >
            <span className="mt-0.5 font-mono text-caption text-accent" aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-pretty">{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

interface ProjectTechnologiesProps {
  technologies: string[];
}

export function ProjectTechnologies({ technologies }: ProjectTechnologiesProps) {
  if (technologies.length === 0) {
    return null;
  }

  return (
    <Section
      id="project-technologies"
      aria-labelledby="project-technologies-heading"
      divider="top"
      eyebrow="Stack"
      title="Technologies"
      titleId="project-technologies-heading"
    >
      <ul className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <li key={tech}>
            <Tag variant="mono">{tech}</Tag>
          </li>
        ))}
      </ul>
    </Section>
  );
}
