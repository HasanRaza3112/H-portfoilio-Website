"use client";

import { useEffect, useRef } from "react";

/**
 * Thin crimson scroll-progress bar pinned to the top of the viewport.
 * Uses rAF + transform scaleX (no React re-renders, no layout thrash).
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? Math.min(1, doc.scrollTop / max) : 0;
      el.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="scroll-progress-bar"
      style={{ transform: "scaleX(0)" }}
      aria-hidden
    />
  );
}
