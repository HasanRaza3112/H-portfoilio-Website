"use client";

import { useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";

const DynamicHero3DCanvas = dynamic(
  () =>
    import("@/features/home/components/hero-3d-canvas").then(
      (m) => m.Hero3DCanvas,
    ),
  { ssr: false, loading: () => <Hero3DLoadingState /> },
);

function Hero3DLoadingState() {
  return (
    <div
      className="flex h-[400px] md:h-[500px] w-full flex-col items-center justify-center gap-4 bg-surface-secondary/80 p-6"
      aria-hidden
    >
      <div className="size-10 animate-pulse rounded-full border-2 border-accent border-t-transparent" />
      <p className="font-mono text-caption uppercase tracking-widest text-accent">
        Loading 3D Scene…
      </p>
      <p className="text-center font-mono text-[0.625rem] text-muted">
        AVATAR.SYS · RENDER_INIT
      </p>
    </div>
  );
}

export function ClientHero3DCanvas() {
  return <DynamicHero3DCanvas />;
}

function useParallax(speed = 0.08, max = 40) {
  const [y, setY] = useState(0);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const offset = Math.max(-max, Math.min(max, window.scrollY * speed));
        setY(-offset);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [speed, max]);

  return y;
}

export function HeroParallaxWrapper({ children }: { children: ReactNode }) {
  const parallaxY = useParallax(0.08, 40);
  return (
    <div
      style={{ transform: `translateY(${parallaxY}px)` }}
      className="will-change-transform flex flex-col gap-6 md:gap-8"
    >
      {children}
    </div>
  );
}

export function TypingCallsign({ text }: { text: string }) {
  const [chars, setChars] = useState(0);
  useEffect(() => {
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setChars(i);
      if (i >= text.length) window.clearInterval(id);
    }, 60);
    return () => window.clearInterval(id);
  }, [text]);
  return (
    <span className="font-mono text-[0.625rem] uppercase tracking-widest text-accent/80">
      {text.slice(0, chars)}
      <span className="ml-0.5 inline-block h-2 w-[2px] animate-pulse bg-accent align-middle" />
    </span>
  );
}
