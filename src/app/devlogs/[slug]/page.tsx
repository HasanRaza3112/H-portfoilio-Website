import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DevlogDetailView } from "@/features/devlogs";
import { DevlogJsonLd } from "@/features/devlogs/components/devlog-json-ld";
import {
  getCachedDevlogBySlug,
  getCachedDevlogSlugs,
  getCachedDevlogs,
  getCachedSiteSettings,
} from "@/features/devlogs/lib/devlog-data";
import { buildDevlogDetailMetadata } from "@/lib/seo";

interface DevlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getCachedDevlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: DevlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [devlog, siteSettings] = await Promise.all([
    getCachedDevlogBySlug(slug),
    getCachedSiteSettings(),
  ]);

  if (!devlog) {
    return { title: "Entry Not Found" };
  }

  return buildDevlogDetailMetadata(devlog, siteSettings);
}

export default async function DevlogPage({ params }: DevlogPageProps) {
  const { slug } = await params;
  const [devlog, allDevlogs, siteSettings] = await Promise.all([
    getCachedDevlogBySlug(slug),
    getCachedDevlogs(),
    getCachedSiteSettings(),
  ]);

  if (!devlog) {
    notFound();
  }

  return (
    <>
      <DevlogJsonLd devlog={devlog} siteSettings={siteSettings} />
      <DevlogDetailView devlog={devlog} allDevlogs={allDevlogs} />
    </>
  );
}
