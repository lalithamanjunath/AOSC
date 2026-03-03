/**
 * Card Animation Utilities
 * Provides reusable animation configurations and helpers for card components
 */

/**
 * Standard card hover animation configuration
 * Provides consistent timing and easing across all cards
 */
export const cardAnimationConfig = {
  // Hover animation timing
  hoverDuration: 0.5, // 500ms - primary hover effect
  shadowDuration: 0.6, // 600ms - shadow depth
  scaleDuration: 0.55, // 550ms - scale effect
  filterDuration: 0.7, // 700ms - grayscale → color transition

  // Easing curves (professional, smooth)
  easing: 'easeOut', // Use Framer Motion's built-in easing
  easingCubic: [0.25, 0.46, 0.45, 0.94], // cubic-bezier for custom timing

  // Scale values
  scaleHover: 1.02, // Subtle upward scale on hover
  scaleActive: 1.01, // Even subtler on touch/active

  // Shadow depths (layered shadow effect)
  shadowRest: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  shadowHover: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  shadowHeavy: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
};

/**
 * Framer Motion variant presets for card animations
 */
export const cardVariants = {
  // Entry animations (for scroll reveal)
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  },

  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  },

  // Hover animations
  cardHover: {
    y: -4, // Subtle lift effect
    boxShadow: cardAnimationConfig.shadowHover,
    transition: {
      duration: cardAnimationConfig.hoverDuration,
      ease: cardAnimationConfig.easingCubic,
    },
  },

  cardRest: {
    y: 0,
    boxShadow: cardAnimationConfig.shadowRest,
    transition: {
      duration: cardAnimationConfig.hoverDuration,
      ease: cardAnimationConfig.easingCubic,
    },
  },
};

/**
 * CSS class names for card animations (Tailwind compatible)
 * Use these for components that don't use Framer Motion
 */
export const cardClasses = {
  // Base card styling with transition setup
  base: 'rounded-2xl border border-slate-100 transition-all duration-500 cursor-hover',

  // Hover states
  hoverShadow: 'hover:shadow-xl',
  hoverBorder: 'hover:border-slate-200',

  // Image styling
  imageContainer: 'relative h-48 overflow-hidden bg-slate-100',
  image: 'w-full h-full object-cover transition-all duration-700',
  imageHover: 'group-hover:scale-105 group-hover:brightness-110',

  // Grayscale filter effect
  imageGrayscale: 'group-hover:saturate-100 saturate-0 transition-all duration-700',
};

/**
 * Generate dynamic shadow styles based on card state
 *
 * @param {string} state - 'rest', 'hover', or 'heavy'
 * @returns {Object} Shadow style object
 */
export function getShadowStyle(state = 'rest') {
  const shadows = {
    rest: cardAnimationConfig.shadowRest,
    hover: cardAnimationConfig.shadowHover,
    heavy: cardAnimationConfig.shadowHeavy,
  };

  return {
    boxShadow: shadows[state] || shadows.rest,
    transition: `box-shadow ${cardAnimationConfig.shadowDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
  };
}

/**
 * Generate scale transform styles
 *
 * @param {boolean} isHovered - Hover state
 * @returns {Object} Transform style object
 */
export function getScaleStyle(isHovered = false) {
  const scale = isHovered ? cardAnimationConfig.scaleHover : 1;

  return {
    transform: `scale(${scale})`,
    transition: `transform ${cardAnimationConfig.scaleDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
    transformOrigin: 'center',
  };
}

/**
 * Generate grayscale filter animation styles
 * Creates smooth transition from grayscale (100%) to color (0%)
 *
 * @returns {Object} Filter style object
 */
export function getGrayscaleStyle() {
  return {
    filter: 'saturate(0%)',
    transition: `filter ${cardAnimationConfig.filterDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
  };
}

/**
 * Get hover grayscale style (removes grayscale filter)
 *
 * @returns {Object} Filter style object
 */
export function getGrayscaleHoverStyle() {
  return {
    filter: 'saturate(100%) brightness(1.05)',
    transition: `filter ${cardAnimationConfig.filterDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
  };
}

/**
 * Combine multiple animation styles
 *
 * @param {Object[]} styles - Array of style objects to merge
 * @returns {Object} Merged styles
 */
export function mergeAnimationStyles(...styles) {
  return Object.assign({}, ...styles);
}

/**
 * Create a complete card hover state handler
 * Returns functions to update card state
 *
 * @returns {Object} { onHoverStart, onHoverEnd }
 */
export function useCardHoverHandlers() {
  return {
    onHoverStart: (event) => {
      // Optional: Add custom hover start logic
      // e.g., play animation, fetch data, analytics
    },
    onHoverEnd: (event) => {
      // Optional: Add custom hover end logic
    },
    onTapStart: (event) => {
      // Handle touch/click interactions
    },
  };
}

/**
 * Performance optimization: Use will-change for hardware acceleration
 * Only apply during hover to avoid memory waste
 *
 * @returns {Object} Will-change style
 */
export function getHardwareAccelerationStyle() {
  return {
    willChange: 'transform, box-shadow, filter',
  };
}

/**
 * Remove will-change after animation completes
 *
 * @param {HTMLElement} element - Element to optimize
 */
export function resetHardwareAcceleration(element) {
  if (element) {
    element.style.willChange = 'auto';
  }
}
