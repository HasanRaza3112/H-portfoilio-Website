import Link from "next/link";

import { MotionReveal } from "@/components/shared/motion-reveal";
import { Tag } from "@/components/ui/tag";
import { formatPublishedDateShort } from "@/features/devlogs/lib/devlog-utils";
import type { DevlogCard } from "@/types";

interface DevlogJournalEntryProps {
  devlog: DevlogCard;
  index: number;
}

export function DevlogJournalEntry({ devlog, index }: DevlogJournalEntryProps) {
  const publishedLabel = formatPublishedDateShort(devlog.publishedAt);

  return (
    <MotionReveal delay={index * 0.04}>
      <article aria-labelledby={`devlog-${devlog._id}-title`}>
        <div className="group border-b border-border-subtle py-8 last:border-b-0">
          {publishedLabel && devlog.publishedAt ? (
            <time
              className="text-caption text-muted"
              dateTime={devlog.publishedAt}
            >
              {publishedLabel}
            </time>
          ) : null}
          <h2
            id={`devlog-${devlog._id}-title`}
            className="mt-2 text-h3 text-foreground"
          >
            <Link
              href={`/devlogs/${devlog.slug}`}
              className="transition-colors-token hover:text-accent focus-visible:outline-none"
            >
              {devlog.title}
            </Link>
          </h2>
          {devlog.summary ? (
            <p className="mt-3 max-w-3xl text-body-lg text-muted text-pretty">
              {devlog.summary}
            </p>
          ) : null}
          {devlog.tags?.length ? (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Entry tags">
              {devlog.tags.map((tag) => (
                <li key={tag}>
                  <Link href={`/devlogs?tag=${encodeURIComponent(tag)}`}>
                    <Tag size="sm">{tag}</Tag>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
          <Link
            href={`/devlogs/${devlog.slug}`}
            className="mt-4 inline-flex text-body-sm font-medium text-accent transition-colors-token hover:text-accent-hover"
          >
            Read entry
          </Link>
        </div>
      </article>
    </MotionReveal>
  );
}
