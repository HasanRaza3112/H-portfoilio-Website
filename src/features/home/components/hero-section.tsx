import Link from "next/link";

import { MotionHero, MotionHeroItem } from "@/components/shared/motion-reveal";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Tag } from "@/components/ui/tag";
import { resolveHeroEyebrow, resolvePersonProfile } from "@/features/home/lib/home-data";
import type { HomePageData } from "@/types";

interface HeroSectionProps {
  data: HomePageData | null;
}

export function HeroSection({ data }: HeroSectionProps) {
  const profile = resolvePersonProfile(data?.personProfile);
  const eyebrow = resolveHeroEyebrow(data?.homepage?.heroEyebrow, data?.personProfile);

  return (
    <section
      aria-labelledby="hero-heading"
      className="border-b border-border-subtle py-12 md:py-24"
    >
      <div className="mx-auto w-full max-w-container-content px-[var(--container-padding)]">
        <MotionHero className="flex max-w-4xl flex-col gap-6 md:gap-8">
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
            <p className="text-h3 text-muted text-balance">{profile.title}</p>
          </MotionHeroItem>
          <MotionHeroItem>
            <p className="max-w-2xl text-body-lg text-muted text-pretty">
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
                    <Tag variant="accent" className="max-w-full whitespace-normal break-words">
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
      </div>
    </section>
  );
}
