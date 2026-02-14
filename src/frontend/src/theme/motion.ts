export const motion = {
  easing: {
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    snappy: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    linear: 'linear',
  },
  duration: {
    instant: 100,
    fast: 200,
    normal: 300,
    slow: 500,
    verySlow: 800,
  },
  spring: {
    stiff: { stiffness: 300, damping: 30 },
    gentle: { stiffness: 120, damping: 14 },
    wobbly: { stiffness: 180, damping: 12 },
  },
};

export const getTransition = (duration: keyof typeof motion.duration = 'normal', easing: keyof typeof motion.easing = 'smooth') => {
  return `${motion.duration[duration]}ms ${motion.easing[easing]}`;
};
