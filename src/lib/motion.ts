import type { Transition, Variants } from "framer-motion";

import { motion as motionTokens } from "@/lib/design-tokens";

const ms = (value: number) => value / 1000;

export const transitions = {
  fast: {
    duration: ms(motionTokens.duration.fast),
    ease: motionTokens.ease.standard,
  } satisfies Transition,
  normal: {
    duration: ms(motionTokens.duration.normal),
    ease: motionTokens.ease.out,
  } satisfies Transition,
  slow: {
    duration: ms(motionTokens.duration.slow),
    ease: motionTokens.ease.emphasis,
  } satisfies Transition,
} as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.normal,
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.normal,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.normal,
  },
};
