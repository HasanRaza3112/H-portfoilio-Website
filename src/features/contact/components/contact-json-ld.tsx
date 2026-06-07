import type { PersonProfile, SiteSettings } from "@/sanity/schemas";
import { buildContactPageJsonLd } from "@/lib/seo";

interface ContactJsonLdProps {
  profile: PersonProfile | null;
  siteSettings: SiteSettings | null;
}

export function ContactJsonLd({ profile, siteSettings }: ContactJsonLdProps) {
  const schema = buildContactPageJsonLd(profile, siteSettings);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
