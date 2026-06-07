import { DevlogArticleBody } from "@/features/devlogs/components/devlog-article-body";
import { DevlogArticleHero } from "@/features/devlogs/components/devlog-article-hero";
import { DevlogRelatedContent } from "@/features/devlogs/components/devlog-related-content";
import { compactRelated } from "@/features/devlogs/lib/devlog-utils";
import { getRelatedDevlogs } from "@/features/devlogs/lib/filters";
import type { DevlogCard, DevlogDetail } from "@/types";

interface DevlogDetailViewProps {
  devlog: DevlogDetail;
  allDevlogs: DevlogCard[];
}

export function DevlogDetailView({ devlog, allDevlogs }: DevlogDetailViewProps) {
  const relatedProjects = compactRelated(devlog.relatedProjects);
  const relatedDevlogs = getRelatedDevlogs(allDevlogs, devlog);

  return (
    <article>
      <DevlogArticleHero devlog={devlog} />
      <DevlogArticleBody content={devlog.content} />
      <DevlogRelatedContent
        relatedProjects={relatedProjects}
        relatedDevlogs={relatedDevlogs}
      />
    </article>
  );
}
