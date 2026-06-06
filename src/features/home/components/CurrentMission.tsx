import { Container } from "@/components/shared/Container";
import { EmptyState } from "@/components/shared/EmptyState";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { missionStatusLabels } from "@/lib/labels";
import { cn } from "@/lib/utils";
import type { MissionItem } from "@/types";

const statusStyles = {
  active: "border-success/30 bg-success/5 text-success",
  completed: "border-border text-muted-foreground",
  upcoming: "border-warning/30 bg-warning/5 text-warning",
};

interface CurrentMissionProps {
  missions: MissionItem[];
}

export function CurrentMission({ missions }: CurrentMissionProps) {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader
          label="Current Mission"
          title="What I'm building right now"
          description="Active engineering work and upcoming priorities."
        />

        {missions.length === 0 ? (
          <EmptyState
            title="No active missions"
            description="Mission updates will appear here once published in Sanity."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {missions.map((item) => (
              <Card key={item.label}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-medium">
                    {item.label}
                  </CardTitle>
                  <Badge
                    className={cn(
                      "font-sans capitalize",
                      statusStyles[item.status],
                    )}
                  >
                    {missionStatusLabels[item.status]}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
