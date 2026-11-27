import type { Transition } from "motion/react";

export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;
export const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;

/** Critically damped UI spring: smooth settle with zero cheap bounce */
export const SPRING_UI: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.32,
};

/** Fast micro-interaction spring for segmented controls and toggles */
export const SPRING_SNAPPY: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.24,
};

/** Physical momentum spring reserved for direct interactive scrubbing/cards */
export const SPRING_PHYSICAL: Transition = {
  type: "spring",
  bounce: 0.14,
  duration: 0.4,
};

export const CLIP_REVEAL_TRANSITION: Transition = {
  duration: 0.52,
  ease: EASE_IN_OUT,
};
