"use client";

import type { Container, ISourceOptions } from "@tsparticles/engine";
import Particles, { useParticlesProvider } from "@tsparticles/react";
import { motion, useAnimation } from "framer-motion";
import { useId, useMemo } from "react";

import { cn } from "@/lib/utils";

type SparklesCoreProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
  interactive?: boolean;
};

function buildParticleOptions({
  background = "#050505",
  minSize = 1,
  maxSize = 3,
  speed = 4,
  particleColor = "#ffffff",
  particleDensity = 120,
  interactive = false,
}: Omit<SparklesCoreProps, "id" | "className">): ISourceOptions {
  return {
    background: {
      color: {
        value: background,
      },
    },
    fullScreen: {
      enable: false,
      zIndex: 1,
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: interactive,
          mode: "push",
        },
        onHover: {
          enable: false,
          mode: "repulse",
        },
        resize: {
          enable: true,
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: particleColor,
      },
      move: {
        enable: true,
        direction: "none",
        random: false,
        straight: false,
        outModes: {
          default: "out",
        },
        speed: {
          min: 0.1,
          max: 1,
        },
      },
      number: {
        density: {
          enable: true,
          width: 400,
          height: 400,
        },
        value: particleDensity,
      },
      opacity: {
        value: {
          min: 0.1,
          max: 1,
        },
        animation: {
          enable: true,
          speed,
          sync: false,
          mode: "auto",
          startValue: "random",
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: {
          min: minSize,
          max: maxSize,
        },
      },
      links: {
        enable: false,
      },
    },
    detectRetina: true,
  };
}

export function SparklesCore({
  id,
  className,
  background,
  minSize,
  maxSize,
  speed,
  particleColor,
  particleDensity,
  interactive = false,
}: SparklesCoreProps) {
  const { loaded } = useParticlesProvider();
  const controls = useAnimation();
  const generatedId = useId();

  const options = useMemo(
    () =>
      buildParticleOptions({
        background,
        minSize,
        maxSize,
        speed,
        particleColor,
        particleDensity,
        interactive,
      }),
    [background, minSize, maxSize, speed, particleColor, particleDensity, interactive],
  );

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      await controls.start({
        opacity: 1,
        transition: { duration: 1 },
      });
    }
  };

  return (
    <motion.div animate={controls} className={cn("opacity-0", className)}>
      {loaded ? (
        <Particles
          id={id ?? generatedId}
          className="h-full w-full"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      ) : null}
    </motion.div>
  );
}
