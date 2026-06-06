import Link from "next/link";

import { Container } from "@/components/shared/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { SiteSettings } from "@/types";

interface HeroProps {
  settings: SiteSettings;
}

export function Hero({ settings }: HeroProps) {
  const expertise = settings.expertiseAreas ?? [];
  const roleLabel = [settings.currentRole, settings.currentCompany]
    .filter(Boolean)
    .join(" · ");

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden />
      <Container className="relative py-20 sm:py-28">
        <div className="max-w-3xl">
          {roleLabel ? (
            <Badge variant="outline" className="mb-6 border-primary/20 text-primary">
              {roleLabel}
            </Badge>
          ) : null}

          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {settings.name}
          </h1>

          <p className="mt-4 font-mono text-sm text-primary sm:text-base">
            {settings.title}
          </p>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {settings.tagline}
          </p>

          {expertise.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-2">
              {expertise.slice(0, 5).map((area) => (
                <Badge key={area}>{area}</Badge>
              ))}
              {expertise.length > 5 ? (
                <Badge>+{expertise.length - 5} more</Badge>
              ) : null}
            </div>
          ) : null}

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/projects">View Projects</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/resume">Download Resume</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/engineering">Engineering Notes →</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
