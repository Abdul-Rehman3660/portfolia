/**
 * Optimized Animation Variants
 * Performance-focused Framer Motion configurations
 */

// Fast, smooth fade up - for most sections
export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1], // Smooth easing
    }
  },
  viewport: { once: true, margin: "-50px" },
}

// Stagger children animations
export const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    }
  },
  viewport: { once: true },
}

export const staggerItem = {
  initial: { opacity: 0, y: 12 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    }
  },
}

// Scale animations (use sparingly - more expensive)
export const scaleUp = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    }
  },
  viewport: { once: true },
}

// Slide animations
export const slideIn = (direction: 'left' | 'right' | 'up' | 'down' = 'up') => ({
  initial: { 
    opacity: 0, 
    x: direction === 'left' ? -20 : direction === 'right' ? 20 : 0,
    y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
  },
  whileInView: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    }
  },
  viewport: { once: true },
})

// Button hover effects (GPU accelerated)
export const buttonHover = {
  scale: 1.02,
  transition: { duration: 0.15 },
}

// Card hover (subtle lift)
export const cardHover = {
  y: -4,
  transition: { duration: 0.2 },
}

// Skeleton loading animation
export const shimmer = {
  initial: { backgroundPosition: '200% 0' },
  animate: {
    backgroundPosition: '-200% 0',
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: 'linear',
    }
  },
}

// Progress bar
export const progressBar = {
  initial: { width: 0 },
  animate: (width: string) => ({
    width,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    }
  }),
}

// Number counter animation
export const counterAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    }
  },
}

// Modal/Dialog animation
export const modalAnimation = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
    }
  },
}

// Page transition (use sparingly)
export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    }
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.3,
    }
  },
}
