import type { Metadata } from "next";
import { Suspense } from "react";

import { EngineeringIndexView } from "@/features/engineering";
import { EngineeringIndexJsonLd } from "@/features/engineering/components/engineering-index-json-ld";
import {
  getEngineeringCategoriesForFilter,
  parseEngineeringFilters,
  sortCategoriesForDisplay,
} from "@/features/engineering/lib/filters";
import {
  getCachedEngineeringCategories,
  getCachedEngineeringLogs,
  getCachedSiteSettings,
} from "@/features/engineering/lib/engineering-data";
import { buildEngineeringIndexMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getCachedSiteSettings();
  return buildEngineeringIndexMetadata(siteSettings);
}

export default async function EngineeringPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = parseEngineeringFilters(params);
  const [logs, categories] = await Promise.all([
    getCachedEngineeringLogs(),
    getCachedEngineeringCategories(),
  ]);

  const engineeringCategories = sortCategoriesForDisplay(
    getEngineeringCategoriesForFilter(categories),
  );

  return (
    <>
      <EngineeringIndexJsonLd logs={logs} />
      <Suspense
      fallback={
        <div className="mx-auto max-w-container-content px-[var(--container-padding)] py-section-md text-muted">
          Loading engineering logs…
        </div>
      }
    >
      <EngineeringIndexView
        logs={logs}
        categories={engineeringCategories}
        filters={filters}
      />
      </Suspense>
    </>
  );
}
