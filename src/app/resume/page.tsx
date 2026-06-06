import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/shared/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getExperience } from "@/features/experience/api";
import { getSiteSettings } from "@/features/site/api";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: "Resume",
    description: `Resume — ${settings.name}, ${settings.title}.`,
  };
}

export default async function ResumePage() {
  const [settings, experience] = await Promise.all([
    getSiteSettings(),
    getExperience(),
  ]);

  const expertise = settings.expertiseAreas ?? [];

  return (
    <Container className="py-16 sm:py-20">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            Resume
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {settings.name}
          </h1>
          <p className="mt-2 font-mono text-sm text-primary">{settings.title}</p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {settings.tagline}
          </p>
        </div>

        {settings.resumeUrl ? (
          <Button asChild>
            <Link href={settings.resumeUrl} target="_blank" rel="noopener noreferrer">
              Download PDF
            </Link>
          </Button>
        ) : null}
      </div>

      {expertise.length > 0 ? (
        <section className="mt-12 max-w-3xl">
          <h2 className="font-mono text-xs uppercase tracking-widest text-primary">
            Professional Focus
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {expertise.map((area) => (
              <Badge key={area}>{area}</Badge>
            ))}
          </div>
        </section>
      ) : null}

      {experience.length > 0 ? (
        <section className="mt-12 max-w-3xl">
          <h2 className="font-mono text-xs uppercase tracking-widest text-primary">
            Experience
          </h2>
          <div className="mt-6 space-y-8">
            {experience.map((entry) => (
              <div key={entry.id}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                  <h3 className="font-medium text-foreground">{entry.role}</h3>
                  <span className="text-sm text-muted-foreground">
                    {entry.company}
                  </span>
                  <span className="font-mono text-xs text-primary sm:ml-auto">
                    {entry.period}
                  </span>
                </div>
                <ul className="mt-3 space-y-2">
                  {entry.accomplishments.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-12 max-w-3xl">
        <h2 className="font-mono text-xs uppercase tracking-widest text-primary">
          Contact
        </h2>
        {settings.email ? (
          <p className="mt-4 text-sm text-muted-foreground">{settings.email}</p>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-3">
          {settings.linkedin ? (
            <Button asChild variant="secondary" size="sm">
              <Link href={settings.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </Link>
            </Button>
          ) : null}
          {settings.github ? (
            <Button asChild variant="secondary" size="sm">
              <Link href={settings.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </Link>
            </Button>
          ) : null}
          <Button asChild variant="ghost" size="sm">
            <Link href="/contact">Contact Form</Link>
          </Button>
        </div>
      </section>
    </Container>
  );
}
