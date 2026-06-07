import { DevlogCardLink } from "@/components/shared/devlog-card";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { SectionLink } from "@/components/shared/section-link";
import { Section } from "@/components/layout/section";
import type { DevlogCard } from "@/types";

interface LatestDevlogsSectionProps {
  devlogs: DevlogCard[];
}

export function LatestDevlogsSection({ devlogs }: LatestDevlogsSectionProps) {
  if (devlogs.length === 0) {
    return null;
  }

  return (
    <Section
      id="latest-devlogs"
      aria-labelledby="latest-devlogs-heading"
      divider="top"
      eyebrow="Devlogs"
      title="Latest Devlogs"
      titleId="latest-devlogs-heading"
      description="Short-form updates on builds, experiments, and in-progress work."
    >
      <div className="mb-8 flex justify-end">
        <SectionLink href="/devlogs" label="View all devlogs" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {devlogs.map((devlog, index) => (
          <MotionReveal key={devlog._id} delay={index * 0.05}>
            <DevlogCardLink devlog={devlog} />
          </MotionReveal>
        ))}
      </div>
    </Section>
  );
}
