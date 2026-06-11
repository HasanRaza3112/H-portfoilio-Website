"use client";

import type { Engine } from "@tsparticles/engine";
import { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useSyncExternalStore } from "react";

import { SparklesCore } from "@/components/ui/sparkles-core";

async function initParticles(engine: Engine) {
  await loadSlim(engine);
}

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");

  media.addEventListener("change", onStoreChange);

  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function SiteBackgroundCanvas() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  return (
    <div aria-hidden className="site-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {prefersReducedMotion ? null : (
        <SparklesCore
          className="absolute inset-0 h-full w-full"
          background="#050505"
          particleColor="#ff2a2a"
          minSize={0.4}
          maxSize={2.2}
          speed={3}
          particleDensity={90}
        />
      )}
      <div className="site-bg__vignette" />
    </div>
  );
}

export function SiteBackground() {
  return (
    <ParticlesProvider init={initParticles}>
      <SiteBackgroundCanvas />
    </ParticlesProvider>
  );
}
