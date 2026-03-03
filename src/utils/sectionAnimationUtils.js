/**
 * Section Animation Utilities
 * Provides reusable animation configurations and helpers for section components
 */

/**
 * Standard section animation timing and easing
 */
export const sectionAnimationConfig = {
  // Entry animation timing
  titleDuration: 0.6,        // Section title fade + slide
  contentDuration: 0.7,      // Main content animations
  cardStaggerDelay: 0.08,    // Delay between staggered cards
  maxStaggerCards: 12,       // Maximum cards to stagger (performance)

  // Easing curves
  titleEasing: 'easeOut',
  contentEasing: [0.25, 0.46, 0.45, 0.94], // cubic-bezier
  staggerEasing: 'easeOut',

  // Scroll behavior
  scrollOffsetStart: 100,    // Pixels before element triggers animation
  scrollOffsetEnd: -100,     // Pixels after element to keep animating

  // Grid animation
  gridBlockDuration: 0.5,    // Grid block fade duration
  gridOpacity: 0.04,         // Grid pattern opacity (subtle)
};

/**
 * Framer Motion variants for section animations
 */
export const sectionVariants = {
  // Container for staggered children
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: sectionAnimationConfig.cardStaggerDelay,
        delayChildren: 0.1,
      },
    },
  },

  // Individual item animation
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: sectionAnimationConfig.contentDuration,
        ease: sectionAnimationConfig.staggerEasing,
      },
    },
  },

  // Title animation
  titleVariant: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: sectionAnimationConfig.titleDuration,
        ease: sectionAnimationConfig.titleEasing,
      },
    },
  },

  // Subtitle animation
  subtitleVariant: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: sectionAnimationConfig.contentDuration,
        delay: 0.2,
      },
    },
  },
};

/**
 * Generate grid background CSS style
 * Creates subtle grid pattern for section backing
 *
 * @param {number} gridSize - Grid cell size in pixels (default: 56)
 * @param {string} color - Grid line color with opacity (default: rgba)
 * @returns {Object} Style object with backgroundImage and backgroundSize
 */
export function createGridBackground(gridSize = 56, color = 'rgba(15, 23, 42, 0.04)') {
  return {
    backgroundImage: `
      linear-gradient(90deg, ${color} 1px, transparent 1px),
      linear-gradient(0deg, ${color} 1px, transparent 1px)
    `.trim(),
    backgroundSize: `${gridSize}px ${gridSize}px`,
    backgroundAttachment: 'fixed', // Creates parallax effect
    backgroundPosition: '0 0',
  };
}

/**
 * Get responsive grid size based on viewport
 *
 * @param {number} screenWidth - Current viewport width
 * @returns {number} Optimal grid size
 */
export function getResponsiveGridSize(screenWidth) {
  if (screenWidth < 640) return 32;   // Mobile
  if (screenWidth < 1024) return 40;  // Tablet
  return 56;                           // Desktop
}

/**
 * Generate section reveal style (for section-level animations)
 *
 * @returns {Object|null} Animation style object or null if not in view
 */
export function getSectionRevealStyle(isInView) {
  return {
    opacity: isInView ? 1 : 0,
    transition: `opacity ${sectionAnimationConfig.contentDuration}s ${sectionAnimationConfig.titleEasing}`,
  };
}

/**
 * Calculate stagger delay for nth item in list
 * Prevents too many simultaneous animations (performance)
 *
 * @param {number} index - Item index
 * @param {number} delay - Base delay in seconds
 * @returns {number} Calculated delay for this item
 */
export function getStaggerDelay(index, delay = sectionAnimationConfig.cardStaggerDelay) {
  return index * delay;
}

/**
 * Get container animation variants with custom stagger
 *
 * @param {number} staggerDelay - Delay between children
 * @returns {Object} Framer Motion variants object
 */
export function getStaggerContainerVariants(staggerDelay = sectionAnimationConfig.cardStaggerDelay) {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };
}

/**
 * Optimize card animation delays for large lists
 * Prevents long stagger chains (performance optimization)
 *
 * @param {number} cardCount - Number of cards to animate
 * @param {number} maxCards - Maximum cards to fully stagger (default: 12)
 * @returns {number} Adjusted stagger delay
 */
export function getOptimizedStaggerDelay(cardCount, maxCards = sectionAnimationConfig.maxStaggerCards) {
  if (cardCount <= maxCards) {
    return sectionAnimationConfig.cardStaggerDelay;
  }
  // Reduce stagger for many cards to keep animation under ~1.5s total
  return (1.5 / cardCount);
}

/**
 * Create viewport object for Framer Motion whileInView
 * Configures when animations should trigger
 *
 * @param {boolean} once - Animate only once (default: true)
 * @param {number} amount - Percentage of element visible to trigger (0-1)
 * @returns {Object} Viewport configuration object
 */
export function getViewportConfig(once = true, amount = 0.2) {
  return {
    once,
    amount,
    margin: '0px 0px -100px 0px', // Start animation 100px before entering view
  };
}

/**
 * Generate section header animation sequence
 * For coordinated title + subtitle + content reveals
 *
 * @returns {Object} Animation timing configuration
 */
export function getSectionHeaderTimings() {
  return {
    title: {
      delay: 0,
      duration: sectionAnimationConfig.titleDuration,
    },
    subtitle: {
      delay: 0.15,
      duration: sectionAnimationConfig.contentDuration,
    },
    description: {
      delay: 0.25,
      duration: sectionAnimationConfig.contentDuration,
    },
    cta: {
      delay: 0.4,
      duration: 0.5,
    },
  };
}

/**
 * Generate CSS class names for section styling
 * Tailwind-compatible classes
 */
export const sectionClasses = {
  // Base section styling
  base: 'py-24 px-4 sm:px-8 lg:px-16 relative overflow-hidden',
  baseSmall: 'py-16 px-4 sm:px-8 lg:px-16 relative overflow-hidden',
  baseLarge: 'py-32 px-4 sm:px-8 lg:px-16 relative overflow-hidden',

  // Background variants
  bgWhite: 'bg-white',
  bgLight: 'bg-slate-50',
  bgGray: 'bg-slate-100',

  // Container
  container: 'max-w-6xl mx-auto',
  containerLarge: 'max-w-7xl mx-auto',
  containerSmall: 'max-w-4xl mx-auto',

  // Section divider
  divider: 'border-t border-slate-100',
  dividerGray: 'border-t border-slate-200',

  // Utilities
  gridBg: 'relative', // Will have grid background applied via style
};

/**
 * Combine section classes efficiently
 *
 * @param {...string} classes - Classes to combine
 * @returns {string} Combined class string
 */
export function combineSectionClasses(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Create smooth scroll reveal animation for section content
 * Uses scroll progress from `useScrollProgress` hook
 *
 * @param {number} progress - Scroll progress (0-1) from useScrollProgress
 * @param {Object} options - Configuration options
 * @returns {Object} Animation values for section content
 */
export function getSectionScrollRevealValues(progress, options = {}) {
  const {
    maxYOffset = 40,      // Maximum Y translation
    minOpacity = 0.6,     // Minimum opacity during scroll
  } = options;

  // Linear easing for scroll-based animations
  const opacity = Math.min(1, minOpacity + (progress * (1 - minOpacity)));
  const yOffset = Math.max(0, maxYOffset - (progress * maxYOffset));

  return {
    opacity,
    y: yOffset,
    transform: `translateY(${yOffset}px)`,
  };
}

/**
 * Performance hint: Use these for heavy animations
 * Apply will-change sparingly to avoid memory issues
 */
export const performanceOpts = {
  willChangeItems: 'will-change: transform, opacity;',
  willChangeSectionBg: 'will-change: auto;', // Grid bg doesn't need will-change
};
