import Link from "next/link";

import { MotionReveal } from "@/components/shared/motion-reveal";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { BRAND } from "@/lib/constants";

interface ContactCtaSectionProps {
  headline: string;
  description?: string | null;
}

export function ContactCtaSection({
  headline,
  description,
}: ContactCtaSectionProps) {
  return (
    <Section
      id="contact-cta"
      aria-labelledby="contact-cta-heading"
      divider="top"
      spacing="lg"
    >
      <MotionReveal>
        <div className="rounded-xl border border-border-accent bg-surface-secondary p-8 shadow-accent md:p-12">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <Heading variant="h2" as="h2" id="contact-cta-heading">
              {headline}
            </Heading>
            {description ? (
              <p className="text-body-lg text-muted text-pretty">{description}</p>
            ) : (
              <p className="text-body-lg text-muted text-pretty">
                Open to game industry opportunities. Let&apos;s talk about systems,
                gameplay, and what {BRAND.name.split(" ")[0]} is building next.
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Button asChild size="lg">
                <Link href="/contact">Start a Conversation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/resume">View Resume</Link>
              </Button>
            </div>
          </div>
        </div>
      </MotionReveal>
    </Section>
  );
}
