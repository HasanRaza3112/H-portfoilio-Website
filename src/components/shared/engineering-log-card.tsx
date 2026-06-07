import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";
import type { EngineeringLogCard } from "@/types";

interface EngineeringLogCardLinkProps {
  log: EngineeringLogCard;
  className?: string;
}

export function EngineeringLogCardLink({
  log,
  className,
}: EngineeringLogCardLinkProps) {
  return (
    <Link
      href={`/engineering/${log.slug}`}
      className={cn("group block h-full focus-visible:outline-none", className)}
    >
      <Card variant="interactive" className="flex h-full flex-col">
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
        <div className="mt-auto flex flex-wrap items-center gap-2 px-6 pb-6">
          {log.category?.title ? (
            <Badge variant="default">{log.category.title}</Badge>
          ) : null}
          {log.readTime ? (
            <span className="text-caption text-muted">{log.readTime}</span>
          ) : null}
          {log.technologies?.slice(0, 2).map((tech) => (
            <Tag key={tech} variant="mono" size="sm">
              {tech}
            </Tag>
          ))}
        </div>
      </Card>
    </Link>
  );
}
