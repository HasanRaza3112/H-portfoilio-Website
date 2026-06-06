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
import { engineeringCategoryLabels } from "@/lib/labels";
import { formatDate } from "@/lib/utils";
import type { EngineeringArticle } from "@/types";

interface EngineeringListProps {
  articles: EngineeringArticle[];
}

export function EngineeringList({ articles }: EngineeringListProps) {
  const categories = Object.entries(engineeringCategoryLabels);

  return (
    <Container className="py-16 sm:py-20">
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">
          Engineering
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Technical thinking
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Architecture notes, debugging stories, and engineering decisions from
          building game platform systems.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map(([key, label]) => (
          <Badge key={key}>{label}</Badge>
        ))}
      </div>

      {articles.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            title="No engineering articles"
            description="Publish technical articles in Sanity to document your engineering thinking."
          />
        </div>
      ) : (
        <div className="mt-12 space-y-4">
          {articles.map((article) => (
            <Link key={article.slug} href={`/engineering/${article.slug}`}>
              <Card className="block transition-colors hover:bg-accent/50">
                <CardHeader>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <Badge className="mb-3 w-fit">
                        {engineeringCategoryLabels[article.category]}
                      </Badge>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {article.summary}
                      </p>
                    </div>
                    <div className="shrink-0 font-mono text-xs text-muted-foreground">
                      <p>{formatDate(article.publishedAt)}</p>
                      {article.readTime ? (
                        <p className="mt-1">{article.readTime}</p>
                      ) : null}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
