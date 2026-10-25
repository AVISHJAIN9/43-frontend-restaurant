// Animation Presets
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export const slideDown = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

export const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export const rotateIn = {
  hidden: { opacity: 0, rotate: -180, scale: 0.5 },
  visible: { opacity: 1, rotate: 0, scale: 1 },
};

// Stagger container
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Transition Presets
export const smoothTransition = {
  type: 'spring',
  damping: 25,
  stiffness: 200,
  mass: 1,
};

export const bounceTransition = {
  type: 'spring',
  damping: 10,
  stiffness: 100,
  mass: 0.9,
};

export const easeTransition = {
  duration: 0.6,
  ease: [0.645, 0.045, 0.355, 1], // custom easing
};

// Hover animations
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

export const hoverLift = {
  whileHover: { y: -10 },
  whileTap: { y: -5 },
};

export const hoverGlow = {
  whileHover: {
    boxShadow: '0 0 30px rgba(6, 182, 212, 0.8)',
  },
};

// Page transitions
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
};

// Gradient animation
export const gradientAnimation = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
  },
  transition: {
    duration: 8,
    repeat: Infinity,
  },
};

// Floating animation
export const floatingAnimation = {
  animate: {
    y: [0, 20, 0],
  },
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

// Pulse animation
export const pulseAnimation = {
  animate: {
    opacity: [1, 0.5, 1],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
  },
};

// Rotate animation
export const rotateAnimation = {
  animate: {
    rotate: 360,
  },
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: 'linear',
  },
};

export default {
  fadeIn,
  slideUp,
  slideDown,
  slideLeft,
  slideRight,
  scaleIn,
  rotateIn,
  staggerContainer,
  smoothTransition,
  bounceTransition,
  easeTransition,
  hoverScale,
  hoverLift,
  hoverGlow,
  pageTransition,
  gradientAnimation,
  floatingAnimation,
  pulseAnimation,
  rotateAnimation,
};
