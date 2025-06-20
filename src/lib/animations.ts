// View Transition Animations
export const slideInFromRight = {
  old: {
    name: "slideOut",
    duration: "0.3s",
    easing: "ease-out",
    fillMode: "forwards",
  },
  new: {
    name: "slideIn",
    duration: "0.3s",
    easing: "ease-out",
    fillMode: "backwards",
  },
};

export const fadeInOut = {
  old: {
    name: "fadeOut",
    duration: "0.3s",
    easing: "ease-out",
    fillMode: "forwards",
  },
  new: {
    name: "fadeIn",
    duration: "0.3s",
    easing: "ease-out",
    fillMode: "backwards",
  },
};

// Keyframe Animations
export const keyframes = {
  slideIn: {
    from: { transform: "translateX(100%)", opacity: 0 },
    to: { transform: "translateX(0)", opacity: 1 },
  },
  slideOut: {
    from: { transform: "translateX(0)", opacity: 1 },
    to: { transform: "translateX(-100%)", opacity: 0 },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  fadeOut: {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
};
// Gradient Animations
export const gradients = {
  color: {
    blob: "radial-gradient(circle at center, oklch(90.67 0 0), transparent 30%)",
    blur: "blur(100px)",
  },
} as const;

// Menu Animations
export const menuTransition = {
  type: "spring",
  bounce: 0.3,
  duration: 0.4,
  damping: 20,
  stiffness: 350,
} as const;

export const menuAnimations = {
  stagger: {
    open: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  },
  item: {
    open: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
    closed: {
      y: 20,
      opacity: 0,
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  },
} as const;
