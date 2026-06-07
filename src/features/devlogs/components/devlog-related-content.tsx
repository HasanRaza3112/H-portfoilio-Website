import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { DevlogJournalEntry } from "@/features/devlogs/components/devlog-journal-entry";
import { RelatedProjectsSection } from "@/features/engineering/components/related-projects-section";
import { Section } from "@/components/layout/section";
import type { DevlogCard, RelatedDocument } from "@/types";

interface DevlogRelatedContentProps {
  relatedProjects: RelatedDocument[];
  relatedDevlogs: DevlogCard[];
}

export function DevlogRelatedContent({
  relatedProjects,
  relatedDevlogs,
}: DevlogRelatedContentProps) {
  return (
    <>
      <RelatedProjectsSection projects={relatedProjects} />
      {relatedDevlogs.length > 0 ? (
        <Section
          id="related-devlogs"
          aria-labelledby="related-devlogs-heading"
          divider="top"
          spacing="lg"
          containerSize="narrow"
          eyebrow="Continue Reading"
          title="More from the Journal"
          titleId="related-devlogs-heading"
          description="Related entries by shared tags and recent topics."
        >
          <div>
            {relatedDevlogs.map((devlog, index) => (
              <DevlogJournalEntry key={devlog._id} devlog={devlog} index={index} />
            ))}
          </div>
          <div className="mt-8 border-t border-border-subtle pt-6">
            <Link
              href="/devlogs"
              className="inline-flex items-center gap-2 text-body-sm font-medium text-accent hover:text-accent-hover"
            >
              View full journal
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Section>
      ) : null}
    </>
  );
}
