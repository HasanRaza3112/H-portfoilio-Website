"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <Hero3DLoadingState />,
});

const SPLINE_SCENE_URL = process.env.NEXT_PUBLIC_SPLINE_HERO_URL?.trim() ?? "";
const SPLINE_EMBED_URL =
  process.env.NEXT_PUBLIC_SPLINE_HERO_EMBED_URL?.trim() ?? "";

function Hero3DLoadingState() {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-4 bg-surface-secondary/80 p-6"
      aria-hidden
    >
      <div className="size-10 animate-pulse rounded-full border-2 border-accent border-t-transparent" />
      <p className="font-mono text-caption uppercase tracking-widest text-accent">
        Loading 3D Scene…
      </p>
      <p className="text-center font-mono text-[0.625rem] text-muted">
        {`// AVATAR.SYS · RENDER_INIT`}
      </p>
    </div>
  );
}

function Hero3DFallback() {
  if (SPLINE_EMBED_URL) {
    return (
      <iframe
        src={SPLINE_EMBED_URL}
        title="3D Developer Avatar"
        className="h-full w-full border-0"
        loading="lazy"
        allow="fullscreen"
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 border border-dashed border-border-accent bg-surface-secondary/60 p-6 text-center">
      <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-accent">
        {`// 3D_SCENE.PENDING`}
      </span>
      <p className="max-w-xs font-mono text-caption text-muted">
        Set <code className="text-accent">NEXT_PUBLIC_SPLINE_HERO_URL</code> or{" "}
        <code className="text-accent">NEXT_PUBLIC_SPLINE_HERO_EMBED_URL</code>{" "}
        to load the zombie developer model.
      </p>
      <div
        className="mt-2 h-32 w-32 rounded-full border border-accent/40 bg-accent-subtle shadow-glow-red"
        aria-hidden
      />
    </div>
  );
}

interface Hero3DCanvasProps {
  className?: string;
}

export function Hero3DCanvas({ className }: Hero3DCanvasProps) {
  const [loadError, setLoadError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setLoadError(false);
  }, []);

  useEffect(() => {
    if (!SPLINE_SCENE_URL || isLoaded || loadError) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setLoadError(true);
    }, 15000);

    return () => window.clearTimeout(timeout);
  }, [isLoaded, loadError]);

  const showSpline = SPLINE_SCENE_URL && !loadError;

  return (
    <div
      className={cn("hero-viewport-panel relative w-full", className)}
      aria-label="3D developer avatar"
    >
      <span
        className="pointer-events-none absolute top-3 left-4 z-20 font-mono text-[0.625rem] uppercase tracking-widest text-accent/80"
        aria-hidden
      >
        {`// AVATAR.3D`}
      </span>
      <span
        className="pointer-events-none absolute top-3 right-4 z-20 font-mono text-[0.625rem] uppercase tracking-widest text-muted"
        aria-hidden
      >
        RENDER.LIVE
      </span>

      <div className="hero-viewport-grid pointer-events-none absolute inset-0 z-10" aria-hidden />

      <div
        className={cn(
          "relative z-0 w-full overflow-hidden bg-surface-secondary/40",
          "aspect-square md:aspect-auto md:h-[500px]",
        )}
      >
        {!showSpline ? (
          <Hero3DFallback />
        ) : (
          <>
            {!isLoaded ? <Hero3DLoadingState /> : null}
            <Spline
              scene={SPLINE_SCENE_URL}
              className={cn("h-full w-full", !isLoaded && "sr-only")}
              onLoad={handleLoad}
            />
          </>
        )}
      </div>
    </div>
  );
}
