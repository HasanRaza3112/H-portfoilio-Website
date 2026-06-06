import Link from "next/link";

import { Container } from "@/components/shared/Container";
import { EmptyState } from "@/components/shared/EmptyState";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import type { Devlog } from "@/types";

interface LatestDevlogsProps {
  devlogs: Devlog[];
}

export function LatestDevlogs({ devlogs }: LatestDevlogsProps) {
  return (
    <section className="py-20">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            label="Latest Devlogs"
            title="Growth & learning"
            description="Long-form notes on engineering growth and systems thinking."
            className="mb-0"
          />
          <Button asChild variant="ghost" className="shrink-0">
            <Link href="/devlogs">All Devlogs →</Link>
          </Button>
        </div>

        {devlogs.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="No devlogs yet"
              description="Publish devlogs in Sanity to document your engineering journey."
              actionLabel="View devlogs"
              actionHref="/devlogs"
            />
          </div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {devlogs.map((post) => (
              <Link key={post.slug} href={`/devlogs/${post.slug}`}>
                <Card className="h-full transition-colors hover:bg-accent/50">
                  <CardHeader>
                    <time
                      dateTime={post.publishedAt}
                      className="font-mono text-xs text-muted-foreground"
                    >
                      {formatDate(post.publishedAt)}
                    </time>
                    <CardTitle className="text-base">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {post.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
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
    </section>
  );
}
