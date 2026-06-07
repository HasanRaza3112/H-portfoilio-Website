import type { ProjectDetail, SiteSettings } from "@/sanity/schemas";
import { buildCreativeWorkJsonLd } from "@/lib/seo";

interface ProjectJsonLdProps {
  project: ProjectDetail;
  siteSettings: SiteSettings | null;
}

export function ProjectJsonLd({ project, siteSettings }: ProjectJsonLdProps) {
  const schema = buildCreativeWorkJsonLd(project, siteSettings);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
