import type { Metadata } from "next";

import { ProjectList } from "@/features/projects/components/ProjectList";
import { getProjects } from "@/features/projects/api";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Engineering case studies across SDK development, playable ads, and gameplay systems.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectList projects={projects} />;
}
