import type { DevlogCard, DevlogDetail, SiteSettings } from "@/sanity/schemas";
import { buildDevlogArticleJsonLd, buildDevlogFeedJsonLd } from "@/lib/seo";

interface DevlogJsonLdProps {
  devlog: DevlogDetail;
  siteSettings: SiteSettings | null;
}

export function DevlogJsonLd({ devlog, siteSettings }: DevlogJsonLdProps) {
  const schema = buildDevlogArticleJsonLd(devlog, siteSettings);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface DevlogFeedJsonLdProps {
  devlogs: DevlogCard[];
}

export function DevlogFeedJsonLd({ devlogs }: DevlogFeedJsonLdProps) {
  const schema = buildDevlogFeedJsonLd(devlogs);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
