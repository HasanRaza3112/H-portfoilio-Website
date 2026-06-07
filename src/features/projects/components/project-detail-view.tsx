import { Section } from "@/components/layout/section";
import {
  ProjectGallery,
} from "@/features/projects/components/project-gallery";
import { ProjectHero } from "@/features/projects/components/project-hero";
import {
  ProjectListSection,
  ProjectTechnologies,
} from "@/features/projects/components/project-list-section";
import { RelatedEngineeringLogs } from "@/features/projects/components/related-engineering-logs";
import { compactRelated } from "@/features/projects/lib/project-data";
import type { ProjectDetail } from "@/types";

interface ProjectDetailViewProps {
  project: ProjectDetail;
}

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const challenges = project.challenges ?? [];
  const solutions = project.solutions ?? [];
  const lessonsLearned = project.lessonsLearned ?? [];
  const technologies = project.technologies ?? [];
  const gallery = project.gallery ?? [];
  const relatedLogs = compactRelated(project.relatedEngineeringLogs);

  return (
    <>
      <ProjectHero project={project} />
      {project.overview ? (
        <Section
          id="project-overview"
          aria-labelledby="project-overview-heading"
          divider="top"
          eyebrow="Case Study"
          title="Overview"
          titleId="project-overview-heading"
        >
          <p className="max-w-3xl text-body-lg text-muted text-pretty whitespace-pre-line">
            {project.overview}
          </p>
        </Section>
      ) : null}
      <ProjectGallery gallery={gallery} videos={project.videos} />
      <ProjectTechnologies technologies={technologies} />
      <ProjectListSection
        id="project-challenges"
        eyebrow="Problem Space"
        title="Challenges"
        items={challenges}
      />
      <ProjectListSection
        id="project-solutions"
        eyebrow="Approach"
        title="Solutions"
        items={solutions}
      />
      <ProjectListSection
        id="project-lessons"
        eyebrow="Outcomes"
        title="Lessons Learned"
        items={lessonsLearned}
      />
      <RelatedEngineeringLogs logs={relatedLogs} />
    </>
  );
}
