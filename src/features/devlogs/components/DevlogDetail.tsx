import Link from "next/link";

import { Container } from "@/components/shared/Container";
import { ProseBody } from "@/components/shared/ContentSection";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Devlog } from "@/types";

interface DevlogDetailProps {
  post: Devlog;
}

export function DevlogDetail({ post }: DevlogDetailProps) {
  return (
    <Container className="py-16 sm:py-20">
      <Link
        href="/devlogs"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Devlogs
      </Link>

      <article className="mx-auto mt-8 max-w-3xl">
        <time
          dateTime={post.publishedAt}
          className="font-mono text-xs text-muted-foreground"
        >
          {formatDate(post.publishedAt)}
        </time>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {post.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <ProseBody body={post.body} />
      </article>
    </Container>
  );
}
