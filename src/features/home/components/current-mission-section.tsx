"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { MotionReveal } from "@/components/shared/motion-reveal";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import type { CurrentMission } from "@/types";

interface CurrentMissionSectionProps {
  mission: CurrentMission;
}

function ShippingYearsCounter() {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setCount(3);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && !hasRun) {
          setHasRun(true);
          let current = 0;
          const target = 3;
          const duration = 800; // 0.8s
          const step = Math.floor(duration / target);

          const timer = setInterval(() => {
            current += 1;
            setCount(current);
            if (current >= target) {
              clearInterval(timer);
            }
          }, step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasRun]);

  return (
    <span ref={elementRef} className="stat-readout text-accent font-semibold">
      {String(count).padStart(2, "0")}
    </span>
  );
}

export function CurrentMissionSection({ mission }: CurrentMissionSectionProps) {
  const paragraphs = mission.sectionDescription
    ? mission.sectionDescription.split(/\n\n+/)
    : [];

  return (
    <Section
      id="current-mission"
      aria-labelledby="current-mission-heading"
      divider="top"
      eyebrow="SECTION.03 · SYSTEM_STATUS"
      title="Current Mission"
      titleId="current-mission-heading"
    >
      <div className="grid gap-10 md:grid-cols-5 md:gap-12 lg:gap-16">
        {/* LEFT (col-span-2, sticky): STATUS PANEL */}
        <aside className="md:col-span-2">
          <MotionReveal className="hud-frame relative border border-border-accent/40 bg-surface-secondary/40 p-6 shadow-panel hud-clip-sm md:sticky md:top-24">
            <span className="hud-frame-bl" aria-hidden />
            <span className="hud-frame-br" aria-hidden />
            
            <h3 className="font-mono text-[0.75rem] font-bold uppercase tracking-[0.2em] text-accent mb-6 border-b border-border-accent/20 pb-2">
              SYSTEM.STATUS
            </h3>
            
            <dl className="space-y-4 font-mono text-caption uppercase tracking-wider text-muted">
              <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                <dt className="text-text-tertiary">YEARS.SHIPPING</dt>
                <dd className="text-foreground">
                  :: <ShippingYearsCounter />
                </dd>
              </div>
              <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                <dt className="text-text-tertiary">ENGINES</dt>
                <dd className="text-foreground text-right">
                  :: <span className="text-accent font-semibold">UNITY · UNREAL · GODOT</span>
                </dd>
              </div>
              <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                <dt className="text-text-tertiary">LOCATION</dt>
                <dd className="text-foreground">
                  :: REMOTE
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-text-tertiary">STATUS</dt>
                <dd className="text-success font-semibold flex items-center gap-1.5">
                  :: AVAILABLE
                  <span className="relative flex size-2" aria-hidden>
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-success" />
                  </span>
                </dd>
              </div>
            </dl>
          </MotionReveal>
        </aside>

        {/* RIGHT (col-span-3): mission heading + paragraphs + contact CTA */}
        <div className="md:col-span-3 flex flex-col justify-center">
          <MotionReveal delay={0.1} className="flex flex-col gap-6">
            <h2 className="font-heading text-h2 text-foreground text-balance">
              {mission.sectionTitle}
            </h2>
            
            {paragraphs.length > 0 ? (
              paragraphs.map((p, i) => (
                <p key={i} className="text-body-lg text-muted text-pretty">
                  {p}
                </p>
              ))
            ) : (
              <p className="text-body-lg text-muted text-pretty">
                {mission.sectionDescription}
              </p>
            )}

            <div className="pt-4">
              <Button asChild size="lg" className="hud-clip-sm shadow-glow-crimson">
                <Link href="/contact">INITIATE CONTACT →</Link>
              </Button>
            </div>
          </MotionReveal>
        </div>
      </div>
    </Section>
  );
}
