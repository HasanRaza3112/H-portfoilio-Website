import Link from "next/link";

import {
  MotionHero,
  MotionHeroItem,
  MotionReveal,
} from "@/components/shared/motion-reveal";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Tag } from "@/components/ui/tag";
import { Hero3DCanvas } from "@/features/home/components/hero-3d-canvas";
import {
  resolveHeroEyebrow,
  resolvePersonProfile,
} from "@/features/home/lib/home-data";
import type { HomePageData } from "@/types";

interface HeroSectionProps {
  data: HomePageData | null;
}

function OpenToWorkIndicator() {
  return (
    <div className="relative inline-flex items-center gap-3">
      <span
        className="status-breathe pointer-events-none absolute -left-3 top-1/2 size-8 -translate-y-1/2 rounded-full bg-amber/30 blur-md"
        aria-hidden
      />
      <div className="relative inline-flex items-center gap-2.5 rounded-none border border-border-accent bg-accent-subtle px-3 py-1.5">
        <span className="relative flex size-2.5" aria-hidden>
          <span className="status-pulse absolute inline-flex size-full rounded-full bg-success" />
          <span className="relative inline-flex size-2.5 rounded-full bg-success ring-2 ring-amber/50" />
        </span>
        <span className="font-mono text-caption font-medium uppercase tracking-widest text-accent">
          Open to Work
        </span>
      </div>
    </div>
  );
}

export function HeroSection({ data }: HeroSectionProps) {
  const profile = resolvePersonProfile(data?.personProfile);
  const eyebrow = resolveHeroEyebrow(
    data?.homepage?.heroEyebrow,
    data?.personProfile,
  );

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative border-b border-border-subtle py-12 md:py-24 glow-mesh"
    >
      <div className="mx-auto w-full max-w-container-content px-[var(--container-padding)]">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <MotionHero className="flex flex-col gap-6 md:gap-8">
            <MotionHeroItem>
              <Heading variant="overline" tone="accent" id="hero-eyebrow">
                {eyebrow}
              </Heading>
            </MotionHeroItem>
            <MotionHeroItem>
              <Heading variant="display" as="h1" id="hero-heading">
                {profile.name}
              </Heading>
            </MotionHeroItem>
            <MotionHeroItem>
              <p className="font-heading text-h3 text-accent text-balance">
                {profile.title}
              </p>
            </MotionHeroItem>
            <MotionHeroItem>
              <OpenToWorkIndicator />
            </MotionHeroItem>
            <MotionHeroItem>
              <p className="max-w-xl text-body-lg text-muted text-pretty">
                {profile.tagline}
              </p>
            </MotionHeroItem>
            {profile.expertiseAreas.length > 0 ? (
              <MotionHeroItem>
                <ul
                  className="flex max-w-full flex-wrap gap-2"
                  aria-label="Areas of expertise"
                >
                  {profile.expertiseAreas.map((area) => (
                    <li key={area} className="max-w-full min-w-0">
                      <Tag
                        variant="accent"
                        className="max-w-full whitespace-normal break-words"
                      >
                        {area}
                      </Tag>
                    </li>
                  ))}
                </ul>
              </MotionHeroItem>
            ) : null}
            <MotionHeroItem>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild size="lg">
                  <Link href="/projects">View Projects</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </MotionHeroItem>
          </MotionHero>

          <MotionReveal className="w-full" delay={0.15}>
            <Hero3DCanvas />
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
