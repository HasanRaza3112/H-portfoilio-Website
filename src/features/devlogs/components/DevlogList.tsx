import Link from "next/link";

import { Container } from "@/components/shared/Container";
import { EmptyState } from "@/components/shared/EmptyState";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import type { Devlog } from "@/types";

interface DevlogListProps {
  devlogs: Devlog[];
}

export function DevlogList({ devlogs }: DevlogListProps) {
  return (
    <Container className="py-16 sm:py-20">
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">
          Devlogs
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Growth & learning
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Long-form notes on onboarding, systems thinking, and the journey of
          becoming a technical game engineer.
        </p>
      </div>

      {devlogs.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            title="No devlogs published"
            description="Write and publish devlogs in Sanity to document your growth."
          />
        </div>
      ) : (
        <div className="mt-12 space-y-4">
          {devlogs.map((post) => (
            <Link key={post.slug} href={`/devlogs/${post.slug}`}>
              <Card className="block transition-colors hover:bg-accent/50">
                <CardHeader>
                  <time
                    dateTime={post.publishedAt}
                    className="font-mono text-xs text-muted-foreground"
                  >
                    {formatDate(post.publishedAt)}
                  </time>
                  <CardTitle className="mt-2 text-lg">{post.title}</CardTitle>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {post.summary}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <Badge key={tag} className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
