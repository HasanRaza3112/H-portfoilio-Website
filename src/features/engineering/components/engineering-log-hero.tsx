import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Tag } from "@/components/ui/tag";
import { formatPublishedDate } from "@/features/engineering/lib/engineering-data";
import type { EngineeringLogDetail } from "@/types";

interface EngineeringLogHeroProps {
  log: EngineeringLogDetail;
}

export function EngineeringLogHero({ log }: EngineeringLogHeroProps) {
  const publishedLabel = formatPublishedDate(log.publishedAt);

  return (
    <section aria-labelledby="engineering-article-heading" className="border-b border-border-subtle">
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
              <Link href="/engineering" className="hover:text-foreground">
                Engineering
              </Link>
            </li>
            {log.category ? (
              <>
                <li aria-hidden>
                  <ChevronRight className="size-3.5" />
                </li>
                <li>
                  <Link
                    href={`/engineering?category=${log.category.slug}`}
                    className="hover:text-foreground"
                  >
                    {log.category.title}
                  </Link>
                </li>
              </>
            ) : null}
          </ol>
        </nav>

        <div className="flex flex-col gap-5">
          {log.category ? <Badge variant="default">{log.category.title}</Badge> : null}
          <Heading variant="h1" as="h1" id="engineering-article-heading">
            {log.title}
          </Heading>
          {log.summary ? (
            <p className="text-body-lg text-muted text-pretty">{log.summary}</p>
          ) : null}
          <div className="flex flex-wrap items-center gap-4 text-body-sm text-muted">
            {publishedLabel && log.publishedAt ? (
              <time dateTime={log.publishedAt}>Published {publishedLabel}</time>
            ) : null}
            {log.readTime ? <span>{log.readTime}</span> : null}
          </div>
          {log.technologies?.length ? (
            <ul className="flex flex-wrap gap-2" aria-label="Technologies discussed">
              {log.technologies.map((tech) => (
                <li key={tech}>
                  <Tag variant="mono">{tech}</Tag>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
