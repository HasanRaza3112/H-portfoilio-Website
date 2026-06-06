import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EngineeringDetail } from "@/features/engineering/components/EngineeringDetail";
import {
  getEngineeringArticleBySlug,
  getEngineeringSlugs,
} from "@/features/engineering/api";

interface EngineeringDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getEngineeringSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: EngineeringDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getEngineeringArticleBySlug(slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.title,
    description: article.summary,
  };
}

export default async function EngineeringDetailPage({
  params,
}: EngineeringDetailProps) {
  const { slug } = await params;
  const article = await getEngineeringArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <EngineeringDetail article={article} />;
}
