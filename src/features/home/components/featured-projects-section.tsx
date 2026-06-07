import { EngineeringLogCardLink } from "@/components/shared/engineering-log-card";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { ProjectCardLink } from "@/components/shared/project-card";
import { SectionLink } from "@/components/shared/section-link";
import { Section } from "@/components/layout/section";
import type { EngineeringLogCard, ProjectCard } from "@/types";

interface FeaturedProjectsSectionProps {
  projects: ProjectCard[];
}

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <Section
      id="featured-projects"
      aria-labelledby="featured-projects-heading"
      divider="top"
      eyebrow="Featured Work"
      title="Featured Projects"
      titleId="featured-projects-heading"
      description="Case studies across gameplay systems, SDK work, and shipped titles."
    >
      <div className="mb-8 flex justify-end">
        <SectionLink href="/projects" label="View all projects" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <MotionReveal key={project._id} delay={index * 0.06}>
            <ProjectCardLink project={project} priorityImage={index === 0} />
          </MotionReveal>
        ))}
      </div>
    </Section>
  );
}

interface EngineeringFocusSectionProps {
  logs: EngineeringLogCard[];
}

export function EngineeringFocusSection({ logs }: EngineeringFocusSectionProps) {
  if (logs.length === 0) {
    return null;
  }

  return (
    <Section
      id="engineering-focus"
      aria-labelledby="engineering-focus-heading"
      divider="top"
      eyebrow="Technical Thinking"
      title="Engineering Focus"
      titleId="engineering-focus-heading"
      description="Deep dives into systems, tradeoffs, and how problems were solved."
    >
      <div className="mb-8 flex justify-end">
        <SectionLink href="/engineering" label="View engineering logs" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {logs.map((log, index) => (
          <MotionReveal key={log._id} delay={index * 0.06}>
            <EngineeringLogCardLink log={log} />
          </MotionReveal>
        ))}
      </div>
    </Section>
  );
}
