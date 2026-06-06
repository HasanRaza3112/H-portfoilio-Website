import Link from "next/link";

import { Container } from "@/components/shared/Container";
import { EmptyState } from "@/components/shared/EmptyState";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projectCategoryLabels } from "@/lib/labels";
import type { ProjectListItem } from "@/types";

interface FeaturedProjectsProps {
  projects: ProjectListItem[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="border-y border-border bg-muted/20 py-20">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            label="Featured Projects"
            title="Systems I've shipped"
            description="Engineering case studies across SDK development, playable ads, and gameplay systems."
            className="mb-0"
          />
          <Button asChild variant="ghost" className="shrink-0">
            <Link href="/projects">All Projects →</Link>
          </Button>
        </div>

        {projects.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="No featured projects"
              description="Mark projects as featured in Sanity to highlight them here."
              actionLabel="View all projects"
              actionHref="/projects"
            />
          </div>
        ) : (
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`}>
                <Card className="h-full transition-colors hover:bg-accent/50">
                  <CardHeader>
                    <Badge className="w-fit">
                      {projectCategoryLabels[project.category]}
                    </Badge>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {project.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 3).map((tech) => (
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
    </section>
  );
}
