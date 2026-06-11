import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/8bit-card";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";
import type { DevlogCard } from "@/types";

interface DevlogCardLinkProps {
  devlog: DevlogCard;
  className?: string;
}

function formatDate(value?: string | null): string | null {
  if (!value) {
    return null;
  }

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function DevlogCardLink({ devlog, className }: DevlogCardLinkProps) {
  const publishedLabel = formatDate(devlog.publishedAt);

  return (
    <Link
      href={`/devlogs/${devlog.slug}`}
      className={cn("group block focus-visible:outline-none", className)}
    >
      <Card className="h-full">
        <CardHeader className="gap-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              {publishedLabel ? (
                <time
                  className="text-caption text-muted"
                  dateTime={devlog.publishedAt ?? undefined}
                >
                  {publishedLabel}
                </time>
              ) : null}
              <CardTitle className="group-hover:text-accent transition-colors-token">
                {devlog.title}
              </CardTitle>
            </div>
            <ArrowUpRight
              className="size-4 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100"
              aria-hidden
            />
          </div>
          {devlog.summary ? (
            <CardDescription className="line-clamp-2">{devlog.summary}</CardDescription>
          ) : null}
          {devlog.tags?.length ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {devlog.tags.slice(0, 4).map((tag) => (
                <Tag key={tag} size="sm">
                  {tag}
                </Tag>
              ))}
            </div>
          ) : null}
        </CardHeader>
      </Card>
    </Link>
  );
}
