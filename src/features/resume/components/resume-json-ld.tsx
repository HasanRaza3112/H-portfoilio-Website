import type { Experience, PersonProfile, SiteSettings } from "@/sanity/schemas";
import { buildResumePageJsonLd } from "@/lib/seo";

interface ResumeJsonLdProps {
  profile: PersonProfile | null;
  siteSettings: SiteSettings | null;
  experiences: Experience[];
}

export function ResumeJsonLd({
  profile,
  siteSettings,
  experiences,
}: ResumeJsonLdProps) {
  const schema = buildResumePageJsonLd(profile, siteSettings, experiences);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
