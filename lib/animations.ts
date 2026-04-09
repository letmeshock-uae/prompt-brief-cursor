import type { Variants, Transition } from 'framer-motion'

export const vibeSpring: Transition = {
  type: 'spring',
  stiffness: 80,
  damping: 18,
  mass: 0.8,
}

export const vibeFade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const vibeFadeTransition: Transition = {
  duration: 0.4,
  ease: [0.25, 0.1, 0.25, 1],
}

export const vibeSlideUp: Variants = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 32 },
}

export const vibeSlideUpTransition: Transition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1],
}

export const vibeSlideLeft: Variants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 24 },
}

export const vibeSlideLeftTransition: Transition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1],
}

export const vibeScale: Variants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
}

export const vibeScaleTransition: Transition = {
  duration: 0.45,
  ease: [0.25, 0.1, 0.25, 1],
}

export const vibeStagger: Variants = {
  animate: {
    transition: { staggerChildren: 0.08 },
  },
}

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

export const pageTransitionConfig: Transition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1],
}

export const marqueeSpeed = 30
