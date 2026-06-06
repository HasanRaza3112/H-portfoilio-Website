import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/shared/Container";
import {
  ContentSection,
  ProseBody,
} from "@/components/shared/ContentSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projectCategoryLabels } from "@/lib/labels";
import type { Project } from "@/types";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <Container className="py-16 sm:py-20">
      <Link
        href="/projects"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← All Projects
      </Link>

      <div className="mt-8 max-w-3xl">
        <Badge>{projectCategoryLabels[project.category]}</Badge>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {project.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </div>

      {project.gallery && project.gallery.length > 0 ? (
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {project.gallery.map((item) => (
            <div
              key={item.url}
              className="relative aspect-video overflow-hidden rounded-lg border border-border"
            >
              <Image
                src={item.url}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      ) : null}

      <div className="max-w-3xl">
        <section className="mt-12">
          <h2 className="font-mono text-xs uppercase tracking-widest text-primary">
            Overview
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {project.overview}
          </p>
        </section>

        <ContentSection title="Responsibilities" items={project.responsibilities} />
        <ContentSection title="Challenges" items={project.challenges} />
        <ContentSection title="Solutions" items={project.solutions} />
        <ContentSection title="Lessons Learned" items={project.lessonsLearned} />

        {project.externalLinks.length > 0 ? (
          <section className="mt-12">
            <h2 className="font-mono text-xs uppercase tracking-widest text-primary">
              External Links
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {project.externalLinks.map((link) => (
                <Button key={link.url} asChild variant="secondary" size="sm">
                  <Link href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </Link>
                </Button>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </Container>
  );
}
