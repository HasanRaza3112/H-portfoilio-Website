import { RichText } from "@/components/content/rich-text";
import { Container } from "@/components/layout/container";
import type { PortableTextBlock } from "@/types";

interface DevlogArticleBodyProps {
  content: PortableTextBlock[] | null | undefined;
}

export function DevlogArticleBody({ content }: DevlogArticleBodyProps) {
  if (!content?.length) {
    return null;
  }

  return (
    <div className="py-section-md">
      <Container size="narrow">
        <RichText
          value={content}
          className="devlog-article [&_h2]:text-h2 [&_h2]:text-foreground [&_h3]:text-h3 [&_h3]:text-foreground [&_p]:text-body-lg [&_p]:leading-relaxed [&_p]:text-muted"
        />
      </Container>
    </div>
  );
}
