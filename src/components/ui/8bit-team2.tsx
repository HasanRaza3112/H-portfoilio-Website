import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/8bit-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit-card";
import { Separator } from "@/components/ui/8bit-separator";

import "@/components/ui/8bit/styles/retro.css";

export interface ChangelogEntry {
  badge?: string;
  date: string;
  description: string;
  title: string;
}

interface Team2Props {
  className?: string;
  description?: string;
  entries?: ChangelogEntry[];
  title?: string;
}

const defaultEntries: ChangelogEntry[] = [
  {
    date: "Mar 2026",
    title: "v2.0 — Hasan Raza OS",
    description:
      "Red & black 8-bit gaming HUD theme, 3D hero canvas, and pixel-perfect navigation panel.",
    badge: "LATEST",
  },
  {
    date: "Feb 2026",
    title: "v1.5 — Portfolio Platform",
    description:
      "Projects, engineering logs, experience timeline, devlogs, resume, and contact form shipped.",
  },
  {
    date: "Jan 2026",
    title: "v1.0 — CMS Foundation",
    description:
      "Sanity CMS integration, seed content, SEO, analytics, and Vercel deployment pipeline.",
  },
];

export default function Team2({
  title = "Changelog",
  description = "What we shipped and when",
  entries = defaultEntries,
  className,
}: Team2Props) {
  return (
    <section className={cn("w-full px-4 py-16", className)}>
      <div className="mx-auto max-w-2xl">
        {(title || description) && (
          <div className="mb-10 text-center">
            {title ? (
              <h2 className="retro mb-3 text-2xl font-bold tracking-tight md:text-3xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="retro text-[9px] text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
        )}

        <div className="flex flex-col gap-4">
          {entries.map((entry, idx) => (
            <div key={entry.title}>
              <Card className="relative">
                {entry.badge ? (
                  <div className="absolute top-2 right-4 z-10">
                    <Badge className="text-[9px]">{entry.badge}</Badge>
                  </div>
                ) : null}
                <CardHeader className="pb-2">
                  <div className="retro mb-1 text-[10px] text-muted-foreground">
                    {entry.date}
                  </div>
                  <CardTitle className="retro text-sm">{entry.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="retro text-[9px] leading-relaxed">
                    {entry.description}
                  </CardDescription>
                </CardContent>
              </Card>
              {idx < entries.length - 1 ? <Separator className="mt-4" /> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
