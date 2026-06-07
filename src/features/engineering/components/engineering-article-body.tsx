import { RichText } from "@/components/content/rich-text";
import { Container } from "@/components/layout/container";
import type { PortableTextBlock } from "@/types";

interface EngineeringArticleBodyProps {
  content: PortableTextBlock[] | null | undefined;
}

export function EngineeringArticleBody({ content }: EngineeringArticleBodyProps) {
  if (!content?.length) {
    return null;
  }

  return (
    <section aria-labelledby="engineering-article-body-heading" className="py-section-md">
      <Container size="narrow">
        <h2 id="engineering-article-body-heading" className="sr-only">
          Article body
        </h2>
        <RichText
          value={content}
          className="engineering-article [&_h2]:text-h2 [&_h2]:text-foreground [&_h3]:text-h3 [&_h3]:text-foreground [&_p]:text-body-lg [&_p]:leading-relaxed"
        />
      </Container>
    </section>
  );
}
