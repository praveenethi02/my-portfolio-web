"use client";

import { MotionConfig, motion } from "motion/react";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

// Fades and slides its children up the first time they scroll into view
export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  return (
    // reducedMotion="user": skips the slide for visitors who turned on "reduce motion"
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
