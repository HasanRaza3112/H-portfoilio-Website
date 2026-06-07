import Link from "next/link";

import { MotionReveal } from "@/components/shared/motion-reveal";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  missionStatusBadgeVariant,
  missionStatusLabels,
} from "@/lib/labels";
import type { CurrentMission } from "@/types";

interface CurrentMissionSectionProps {
  mission: CurrentMission;
}

export function CurrentMissionSection({ mission }: CurrentMissionSectionProps) {
  const items = mission.items ?? [];

  if (items.length === 0) {
    return null;
  }

  return (
    <Section
      id="current-mission"
      aria-labelledby="current-mission-heading"
      divider="top"
      eyebrow="Current Mission"
      title={mission.sectionTitle}
      titleId="current-mission-heading"
      description={mission.sectionDescription ?? undefined}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item, index) => {
          const href =
            item.relatedProject?.slug
              ? `/projects/${item.relatedProject.slug}`
              : item.relatedEngineeringLog?.slug
                ? `/engineering/${item.relatedEngineeringLog.slug}`
                : null;

          const card = (
            <Card variant="elevated" className="h-full">
              <CardHeader className="gap-3">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle>{item.label}</CardTitle>
                  <Badge
                    variant={
                      missionStatusBadgeVariant[item.status] as "default"
                    }
                  >
                    {missionStatusLabels[item.status]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-body-sm text-muted text-pretty">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          );

          return (
            <MotionReveal key={item._key} delay={index * 0.05}>
              {href ? (
                <Link
                  href={href}
                  className="block h-full focus-visible:outline-none"
                >
                  {card}
                </Link>
              ) : (
                card
              )}
            </MotionReveal>
          );
        })}
      </div>
    </Section>
  );
}
