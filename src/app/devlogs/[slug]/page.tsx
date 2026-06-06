import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DevlogDetail } from "@/features/devlogs/components/DevlogDetail";
import { getDevlogBySlug, getDevlogSlugs } from "@/features/devlogs/api";

interface DevlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getDevlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: DevlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getDevlogBySlug(slug);

  if (!post) {
    return { title: "Devlog Not Found" };
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function DevlogDetailPage({ params }: DevlogPageProps) {
  const { slug } = await params;
  const post = await getDevlogBySlug(slug);

  if (!post) {
    notFound();
  }

  return <DevlogDetail post={post} />;
}
