import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { RelatedDocument } from "@/types";

interface RelatedEngineeringLogsProps {
  logs: RelatedDocument[];
}

export function RelatedEngineeringLogs({ logs }: RelatedEngineeringLogsProps) {
  if (logs.length === 0) {
    return null;
  }

  return (
    <Section
      id="related-engineering"
      aria-labelledby="related-engineering-heading"
      divider="top"
      eyebrow="Technical Depth"
      title="Related Engineering Logs"
      titleId="related-engineering-heading"
      description="Further reading on the systems and decisions behind this project."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {logs.map((log) => (
          <Link
            key={log._id}
            href={`/engineering/${log.slug}`}
            className="group block focus-visible:outline-none"
          >
            <Card variant="interactive" className="h-full">
              <CardHeader className="gap-3">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="group-hover:text-accent transition-colors-token">
                    {log.title}
                  </CardTitle>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  />
                </div>
                {log.summary ? (
                  <CardDescription className="line-clamp-3">{log.summary}</CardDescription>
                ) : null}
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
