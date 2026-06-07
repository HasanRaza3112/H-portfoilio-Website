import { EngineeringArticleBody } from "@/features/engineering/components/engineering-article-body";
import { EngineeringLogHero } from "@/features/engineering/components/engineering-log-hero";
import { EngineeringThinkingSection } from "@/features/engineering/components/engineering-thinking-section";
import { RelatedProjectsSection } from "@/features/engineering/components/related-projects-section";
import { compactRelated } from "@/features/engineering/lib/engineering-data";
import type { EngineeringLogDetail } from "@/types";

interface EngineeringDetailViewProps {
  log: EngineeringLogDetail;
}

export function EngineeringDetailView({ log }: EngineeringDetailViewProps) {
  const relatedProjects = compactRelated(log.relatedProjects);

  return (
    <article>
      <EngineeringLogHero log={log} />
      <EngineeringThinkingSection log={log} />
      <EngineeringArticleBody content={log.content} />
      <RelatedProjectsSection projects={relatedProjects} />
    </article>
  );
}
