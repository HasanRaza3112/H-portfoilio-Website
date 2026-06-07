import type { Experience } from "@/sanity/schemas";
import { buildExperienceTimelineJsonLd } from "@/lib/seo";

interface ExperienceJsonLdProps {
  experiences: Experience[];
}

export function ExperienceJsonLd({ experiences }: ExperienceJsonLdProps) {
  const schema = buildExperienceTimelineJsonLd(experiences);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
