import type { HomePageData, SiteSettings } from "@/sanity/schemas";
import { buildPersonJsonLd, buildWebSiteJsonLd } from "@/lib/seo";

interface HomeJsonLdProps {
  data: HomePageData | null;
  siteSettings: SiteSettings | null;
}

export function HomeJsonLd({ data, siteSettings }: HomeJsonLdProps) {
  const person = buildPersonJsonLd(data, siteSettings);
  const website = buildWebSiteJsonLd(siteSettings);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
