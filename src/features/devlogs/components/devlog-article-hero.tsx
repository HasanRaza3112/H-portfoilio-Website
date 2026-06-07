import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Heading } from "@/components/ui/heading";
import { Tag } from "@/components/ui/tag";
import { formatPublishedDate } from "@/features/devlogs/lib/devlog-utils";
import type { DevlogDetail } from "@/types";

interface DevlogArticleHeroProps {
  devlog: DevlogDetail;
}

export function DevlogArticleHero({ devlog }: DevlogArticleHeroProps) {
  const publishedLabel = formatPublishedDate(devlog.publishedAt);

  return (
    <header
      aria-labelledby="devlog-article-heading"
      className="border-b border-border-subtle"
    >
      <div className="mx-auto w-full max-w-container-narrow px-[var(--container-padding)] py-section-md md:py-section-lg">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1 text-caption text-muted">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="size-3.5" />
            </li>
            <li>
              <Link href="/devlogs" className="hover:text-foreground">
                Devlogs
              </Link>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col gap-5">
          <p className="text-overline uppercase tracking-wider text-accent">
            Journal Entry
          </p>
          <Heading variant="h1" as="h1" id="devlog-article-heading">
            {devlog.title}
          </Heading>
          {devlog.summary ? (
            <p className="text-body-lg text-muted text-pretty">{devlog.summary}</p>
          ) : null}
          {publishedLabel && devlog.publishedAt ? (
            <time className="text-body-sm text-muted" dateTime={devlog.publishedAt}>
              {publishedLabel}
            </time>
          ) : null}
          {devlog.tags?.length ? (
            <ul className="flex flex-wrap gap-2" aria-label="Entry tags">
              {devlog.tags.map((tag) => (
                <li key={tag}>
                  <Link href={`/devlogs?tag=${encodeURIComponent(tag)}`}>
                    <Tag variant="accent">{tag}</Tag>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </header>
  );
}
