import Link from "next/link";

import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import type { SiteSettings } from "@/types";

interface ContactCTAProps {
  settings: SiteSettings;
}

export function ContactCTA({ settings }: ContactCTAProps) {
  return (
    <section className="border-t border-border">
      <Container className="py-20">
        <div className="rounded-lg border border-border bg-card p-8 sm:p-12">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              Get in Touch
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Open to game industry opportunities
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Recruiters and hiring managers — connect for roles in gameplay
              engineering, SDK development, and platform systems.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/contact">Contact Me</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/resume">View Resume</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/projects">Explore Projects</Link>
              </Button>
            </div>
            {settings.email ? (
              <p className="mt-6 font-mono text-sm text-muted-foreground">
                {settings.email}
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
