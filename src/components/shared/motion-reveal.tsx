"use client";

import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";

import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface MotionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof typeof motion;
}

export function MotionReveal({
  children,
  className,
  delay = 0,
  as = "div",
}: MotionRevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as] as typeof motion.div;

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Component
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

interface MotionHeroProps {
  children: React.ReactNode;
  className?: string;
}

export function MotionHero({ children, className }: MotionHeroProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1, delayChildren: 0.05 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function MotionHeroItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={fadeInUp}>
      {children}
    </motion.div>
  );
}
