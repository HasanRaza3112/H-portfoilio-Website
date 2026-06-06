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
import { engineeringCategoryLabels } from "@/lib/labels";
import type { EngineeringArticle } from "@/types";

interface EngineeringFocusProps {
  articles: EngineeringArticle[];
}

export function EngineeringFocus({ articles }: EngineeringFocusProps) {
  const featured = articles.slice(0, 4);

  return (
    <section className="py-20">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            label="Engineering Focus"
            title="Technical thinking"
            description="Notes on SDK design, validation tooling, authentication flows, and debugging at scale."
            className="mb-0"
          />
          <Button asChild variant="ghost" className="shrink-0">
            <Link href="/engineering">All Engineering →</Link>
          </Button>
        </div>

        {featured.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="No engineering articles"
              description="Publish engineering notes in Sanity to showcase technical thinking."
              actionLabel="Go to engineering"
              actionHref="/engineering"
            />
          </div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {featured.map((article) => (
              <Link key={article.slug} href={`/engineering/${article.slug}`}>
                <Card className="h-full transition-colors hover:bg-accent/50">
                  <CardHeader>
                    <Badge className="w-fit">
                      {engineeringCategoryLabels[article.category]}
                    </Badge>
                    <CardTitle className="text-base">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {article.summary}
                    </p>
                    {article.readTime ? (
                      <p className="mt-4 font-mono text-xs text-muted-foreground">
                        {article.readTime} read
                      </p>
                    ) : null}
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
