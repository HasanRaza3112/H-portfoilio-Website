import type { EngineeringLogDetail, SiteSettings } from "@/sanity/schemas";
import { buildArticleJsonLd } from "@/lib/seo";

interface EngineeringJsonLdProps {
  log: EngineeringLogDetail;
  siteSettings: SiteSettings | null;
}

export function EngineeringJsonLd({ log, siteSettings }: EngineeringJsonLdProps) {
  const schema = buildArticleJsonLd(log, siteSettings);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
