"use client";

import { useMemo } from "react";

import { ProjectCardLink } from "@/components/shared/project-card";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/heading";
import type { ProjectCategory, ProjectCard } from "@/types";

import {
  filterProjects,
  getFeaturedProjects,
  hasActiveFilters,
  type ProjectFilters,
} from "../lib/filters";
import { ProjectFiltersBar } from "./project-filters-bar";

interface ProjectsIndexViewProps {
  projects: ProjectCard[];
  categories: ProjectCategory[];
  filters: ProjectFilters;
}

export function ProjectsIndexView({
  projects,
  categories,
  filters,
}: ProjectsIndexViewProps) {
  const filteredProjects = useMemo(
    () => filterProjects(projects, filters),
    [projects, filters],
  );

  const showFeatured = !hasActiveFilters(filters);
  const featuredProjects = useMemo(() => getFeaturedProjects(projects), [projects]);

  const gridProjects = useMemo(() => {
    if (!showFeatured) {
      return filteredProjects;
    }

    const featuredIds = new Set(featuredProjects.map((project) => project._id));
    return filteredProjects.filter((project) => !featuredIds.has(project._id));
  }, [filteredProjects, featuredProjects, showFeatured]);

  return (
    <>
      <section
        aria-labelledby="projects-heading"
        className="border-b border-border-subtle py-section-md"
      >
        <div className="mx-auto w-full max-w-container-content px-[var(--container-padding)]">
          <Heading variant="overline" tone="accent">
            Case Studies
          </Heading>
          <Heading variant="h1" as="h1" id="projects-heading" className="mt-3">
            Projects
          </Heading>
          <p className="mt-4 max-w-2xl text-body-lg text-muted text-pretty">
            Shipped games, SDK integrations, and systems engineering work — documented
            as recruiter-ready case studies.
          </p>
        </div>
      </section>

      <Section spacing="md" containerSize="content">
        <ProjectFiltersBar
          categories={categories}
          projects={projects}
          filters={filters}
          resultCount={filteredProjects.length}
        />
      </Section>

      {showFeatured && featuredProjects.length > 0 ? (
        <Section
          id="featured-projects"
          aria-labelledby="featured-projects-heading"
          divider="top"
          spacing="md"
          eyebrow="Featured"
          title="Featured Projects"
          titleId="featured-projects-heading"
          description="Highlighted work selected for depth, impact, and technical scope."
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <MotionReveal key={project._id} delay={index * 0.05}>
                <ProjectCardLink project={project} priorityImage={index === 0} />
              </MotionReveal>
            ))}
          </div>
        </Section>
      ) : null}

      <Section
        id="all-projects"
        aria-labelledby="all-projects-heading"
        divider="top"
        spacing="lg"
        title={showFeatured ? "All Projects" : "Results"}
        titleId="all-projects-heading"
      >
        {gridProjects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {gridProjects.map((project, index) => (
              <MotionReveal key={project._id} delay={index * 0.04}>
                <ProjectCardLink project={project} />
              </MotionReveal>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border-subtle bg-surface-secondary p-10 text-center">
            <p className="text-body-lg text-muted">
              No projects match the current filters.
            </p>
          </div>
        )}
      </Section>
    </>
  );
}
