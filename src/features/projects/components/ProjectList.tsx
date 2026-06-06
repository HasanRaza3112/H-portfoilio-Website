import Link from "next/link";

import { Container } from "@/components/shared/Container";
import { EmptyState } from "@/components/shared/EmptyState";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projectCategoryLabels } from "@/lib/labels";
import type { ProjectListItem } from "@/types";

interface ProjectListProps {
  projects: ProjectListItem[];
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <Container className="py-16 sm:py-20">
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">
          Projects
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Engineering case studies
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Deep dives into systems built — overview, challenges, solutions, and
          lessons learned.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            title="No projects published"
            description="Add projects in Sanity CMS to showcase your engineering work."
          />
        </div>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`}>
              <Card className="h-full transition-colors hover:bg-accent/50">
                <CardHeader>
                  <Badge className="w-fit">
                    {projectCategoryLabels[project.category]}
                  </Badge>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} className="text-[10px]">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
