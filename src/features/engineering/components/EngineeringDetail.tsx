import Link from "next/link";

import { Container } from "@/components/shared/Container";
import { ProseBody } from "@/components/shared/ContentSection";
import { Badge } from "@/components/ui/badge";
import { engineeringCategoryLabels } from "@/lib/labels";
import { formatDate } from "@/lib/utils";
import type { EngineeringArticle } from "@/types";

interface EngineeringDetailProps {
  article: EngineeringArticle;
}

export function EngineeringDetail({ article }: EngineeringDetailProps) {
  return (
    <Container className="py-16 sm:py-20">
      <Link
        href="/engineering"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Engineering
      </Link>

      <article className="mx-auto mt-8 max-w-3xl">
        <Badge>{engineeringCategoryLabels[article.category]}</Badge>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {article.summary}
        </p>
        <p className="mt-4 font-mono text-xs text-muted-foreground">
          {formatDate(article.publishedAt)}
          {article.readTime ? ` · ${article.readTime} read` : ""}
        </p>

        <ProseBody body={article.body} />
      </article>
    </Container>
  );
}
