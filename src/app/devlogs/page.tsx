import type { Metadata } from "next";
import { Suspense } from "react";

import { DevlogsIndexView } from "@/features/devlogs";
import { DevlogFeedJsonLd } from "@/features/devlogs/components/devlog-json-ld";
import {
  getCachedDevlogs,
  getCachedSiteSettings,
} from "@/features/devlogs/lib/devlog-data";
import { parseDevlogFilters } from "@/features/devlogs/lib/filters";
import { buildDevlogsIndexMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getCachedSiteSettings();
  return buildDevlogsIndexMetadata(siteSettings);
}

export default async function DevlogsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = parseDevlogFilters(params);
  const devlogs = await getCachedDevlogs();

  return (
    <>
      <DevlogFeedJsonLd devlogs={devlogs} />
      <Suspense
        fallback={
          <div className="mx-auto max-w-container-narrow px-[var(--container-padding)] py-section-md text-muted">
            Loading journal…
          </div>
        }
      >
        <DevlogsIndexView devlogs={devlogs} filters={filters} />
      </Suspense>
    </>
  );
}
