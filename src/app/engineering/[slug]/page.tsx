import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EngineeringDetailView } from "@/features/engineering";
import { EngineeringJsonLd } from "@/features/engineering/components/engineering-json-ld";
import { ContentViewTracker } from "@/components/shared/content-view-tracker";
import {
  getCachedEngineeringLogBySlug,
  getCachedEngineeringLogSlugs,
  getCachedSiteSettings,
} from "@/features/engineering/lib/engineering-data";
import { buildEngineeringDetailMetadata } from "@/lib/seo";

interface EngineeringArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getCachedEngineeringLogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: EngineeringArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const [log, siteSettings] = await Promise.all([
    getCachedEngineeringLogBySlug(slug),
    getCachedSiteSettings(),
  ]);

  if (!log) {
    return { title: "Article Not Found" };
  }

  return buildEngineeringDetailMetadata(log, siteSettings);
}

export default async function EngineeringArticlePage({
  params,
}: EngineeringArticlePageProps) {
  const { slug } = await params;
  const [log, siteSettings] = await Promise.all([
    getCachedEngineeringLogBySlug(slug),
    getCachedSiteSettings(),
  ]);

  if (!log) {
    notFound();
  }

  return (
    <>
      <ContentViewTracker event="engineering_view" slug={log.slug} />
      <EngineeringJsonLd log={log} siteSettings={siteSettings} />
      <EngineeringDetailView log={log} />
    </>
  );
}
