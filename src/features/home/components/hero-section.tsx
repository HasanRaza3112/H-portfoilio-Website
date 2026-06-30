import Link from "next/link";

import {
  MotionHero,
  MotionHeroItem,
  MotionReveal,
} from "@/components/shared/motion-reveal";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Tag } from "@/components/ui/tag";
import {
  resolvePersonProfile,
} from "@/features/home/lib/home-data";
import { HeroParallaxWrapper, TypingCallsign, ClientHero3DCanvas } from "./hero-client-components";
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
  const callsignText = `CALLSIGN · ${profile.name.toUpperCase().replace(/\s+/g, ".")}`;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-border-subtle py-12 md:py-24 glow-mesh vignette"
    >
      {/* Background Grid & Vignette Mask */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25 scanlines-bg"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-60 vignette-edge"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 75% 50%, rgba(255,70,85,0.08), transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-container-content px-[var(--container-padding)]">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Left: Text & Readouts (wrapped in client parallax) */}
          <HeroParallaxWrapper>
            <MotionHero className="flex flex-col gap-6 md:gap-8">
              <MotionHeroItem>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-accent" aria-hidden />
                  <TypingCallsign text={callsignText} />
                </div>
              </MotionHeroItem>
              <MotionHeroItem>
                <Heading
                  variant="display"
                  as="h1"
                  id="hero-heading"
                  className="text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] md:leading-[1]"
                >
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
              
              {/* Monospace Stat Row */}
              <MotionHeroItem>
                <div className="grid grid-cols-3 gap-4 border-y border-border-accent/20 py-4 font-mono text-caption uppercase tracking-wider text-muted">
                  <div>
                    <div className="text-[0.625rem] text-text-tertiary">YRS SHIPPED</div>
                    <div className="font-semibold text-accent mt-1">03+ Years</div>
                  </div>
                  <div>
                    <div className="text-[0.625rem] text-text-tertiary">ENGINES</div>
                    <div className="font-semibold text-foreground mt-1">UNITY · UNREAL · GODOT</div>
                  </div>
                  <div>
                    <div className="text-[0.625rem] text-text-tertiary">CURRENT MISSION</div>
                    <div className="font-semibold text-foreground mt-1">SDK & GAME DEV</div>
                  </div>
                </div>
              </MotionHeroItem>

              <MotionHeroItem>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button asChild size="lg" className="hud-clip-sm shadow-glow-crimson">
                    <Link href="/projects">View Work →</Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg" className="hud-clip-sm">
                    <Link href="/contact">Contact</Link>
                  </Button>
                </div>
              </MotionHeroItem>
            </MotionHero>
          </HeroParallaxWrapper>

          {/* Right: 3D Viewport in HUD clip frame */}
          <MotionReveal className="w-full" delay={0.15}>
            <div className="hud-frame glow-bleed scanlines border border-border-accent/40 bg-surface-secondary/40 shadow-hud-glow hud-clip-lg overflow-hidden relative aspect-square md:aspect-[4/5] w-full">
              <span className="hud-frame-bl" aria-hidden />
              <span className="hud-frame-br" aria-hidden />
              
              <div className="pointer-events-none absolute left-4 top-3 z-20 font-mono text-[0.625rem] uppercase tracking-widest text-accent/80">
                AVATAR.3D
              </div>
              <div className="pointer-events-none absolute right-4 bottom-3 z-20 font-mono text-[0.625rem] uppercase tracking-widest text-success">
                STATUS: ACTIVE
              </div>
              
              <ClientHero3DCanvas />
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
