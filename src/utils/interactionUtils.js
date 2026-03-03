/**
 * Interaction Utilities
 * Provides reusable handlers and hooks for carousels, modals, and forms
 */

/**
 * Carousel interaction configuration
 */
export const carouselConfig = {
  autoplayDuration: 5000,        // Base duration per item (ms)
  pauseDuration: 500,            // Pause pause duration on hover (ms)
  transitionEasing: 'linear',
  dragThreshold: 50,             // Minimum pixels to trigger drag
  momentumDuration: 0.6,         // Momentum scroll duration (s)
};

/**
 * Modal interaction configuration
 */
export const modalConfig = {
  openDuration: 0.3,             // Modal enter animation (s)
  closeDuration: 0.25,           // Modal exit animation (s)
  backdropFadeDuration: 0.2,     // Backdrop fade (s)
  easing: 'easeInOut',
  scaleEnter: { scale: 0.95, opacity: 0 },
  scaleExit: { scale: 0.9, opacity: 0 },
};

/**
 * Form interaction configuration
 */
export const formConfig = {
  focusDuration: 0.2,            // Input focus animation (s)
  errorDuration: 0.25,           // Error state animation (s)
  successDuration: 0.3,          // Success state animation (s)
  submitDuration: 0.6,           // Submit button animation (s)
};

/**
 * Carousel interaction handler
 * Manages autoplay pause/resume on hover with Lenis compatibility
 *
 * @param {React.MutableRefObject} animationRef - Framer Motion animation ref
 * @param {React.MutableRefObject} pauseTimeoutRef - Pause timeout ref
 * @param {Function} setIsPlaying - State setter for play status
 * @returns {Object} { onMouseEnter, onMouseLeave }
 */
export function useCarouselInteraction(animationRef, pauseTimeoutRef, setIsPlaying) {
  return {
    onMouseEnter: () => {
      // Pause animation immediately
      if (animationRef?.current) {
        animationRef.current.speed = 0;
      }
      setIsPlaying(false);

      // Clear any pending resume
      if (pauseTimeoutRef?.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    },

    onMouseLeave: () => {
      // Resume after brief delay (allows quick hover without interruption)
      pauseTimeoutRef.current = setTimeout(() => {
        if (animationRef?.current) {
          animationRef.current.speed = 1;
        }
        setIsPlaying(true);
      }, carouselConfig.pauseDuration);
    },

    onTouchStart: () => {
      // Mirror hover behavior for touch
      if (animationRef?.current) {
        animationRef.current.speed = 0;
      }
      setIsPlaying(false);
    },

    onTouchEnd: () => {
      // Resume on touch end
      if (pauseTimeoutRef?.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
      pauseTimeoutRef.current = setTimeout(() => {
        if (animationRef?.current) {
          animationRef.current.speed = 1;
        }
        setIsPlaying(true);
      }, carouselConfig.pauseDuration);
    },
  };
}

/**
 * Modal scroll lock using Lenis
 * Prevents page scroll while modal is open
 *
 * @param {boolean} isOpen - Modal open state
 * @param {Object} lenis - Lenis instance
 */
export function useModalScrollLock(isOpen, lenis) {
  if (!lenis) return;

  if (isOpen) {
    lenis.stop();
  } else {
    lenis.start();
  }
}

/**
 * Get modal animation variants
 * Smooth fade + scale transition
 */
export const modalVariants = {
  backdropInitial: { opacity: 0 },
  backdropAnimate: { opacity: 1 },
  backdropExit: { opacity: 0 },

  contentInitial: modalConfig.scaleEnter,
  contentAnimate: { scale: 1, opacity: 1 },
  contentExit: modalConfig.scaleExit,
};

/**
 * Form input focus handler
 * Manages input state animations
 *
 * @returns {Object} { onFocus, onBlur, onError, onSuccess }
 */
export function useFormInteraction() {
  return {
    onFocus: (e) => {
      // Add visual focus state
      e.target.classList.add('ring-2', 'ring-offset-2', 'ring-cyan-500');
    },

    onBlur: (e) => {
      // Remove focus styles
      e.target.classList.remove('ring-2', 'ring-offset-2', 'ring-cyan-500');
    },

    onError: (e) => {
      // Add error styling
      e.target.classList.add('border-red-500', 'bg-red-50');
    },

    onSuccess: (e) => {
      // Add success styling
      e.target.classList.add('border-green-500', 'bg-green-50');
    },

    clearState: (e) => {
      // Reset all states
      e.target.classList.remove(
        'ring-2', 'ring-offset-2', 'ring-cyan-500',
        'border-red-500', 'bg-red-50',
        'border-green-500', 'bg-green-50'
      );
    },
  };
}

/**
 * Carousel animation values for different interaction states
 */
export const carouselAnimationStates = {
  playing: {
    transition: {
      duration: carouselConfig.autoplayDuration / 1000,
      ease: carouselConfig.transitionEasing,
    },
  },
  paused: {
    transition: { duration: 0 },
  },
  dragging: {
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
};

/**
 * Submit button animation states
 * For loading and success feedback
 */
export const submitButtonVariants = {
  initial: { scale: 1, opacity: 1 },
  loading: { scale: 0.95, opacity: 0.7 },
  success: { scale: 1.05, opacity: 1 },
  error: { scale: 0.98, opacity: 1 },
};

/**
 * Input validation animation
 * Error shake effect
 */
export const inputErrorVariants = {
  initial: { x: 0 },
  error: {
    x: [-8, 8, -8, 8, 0],
    transition: { duration: 0.4 },
  },
};

/**
 * Get Framer Motion transition config
 * Ensures consistent timing across interactions
 */
export function getTransitionConfig(type = 'standard') {
  const transitions = {
    standard: { duration: 0.3, ease: 'easeOut' },
    smooth: { duration: 0.5, ease: 'easeInOut' },
    fast: { duration: 0.15, ease: 'easeOut' },
    spring: { type: 'spring', stiffness: 300, damping: 30 },
  };

  return transitions[type] || transitions.standard;
}

/**
 * Accessibility-aware animation
 * Respects prefers-reduced-motion
 */
export function shouldAnimateMotion() {
  if (typeof window === 'undefined') return true;

  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get reduced motion-safe animation config
 */
export function getSafeMotionConfig(config = {}) {
  if (!shouldAnimateMotion()) {
    return { duration: 0, ...config };
  }
  return config;
}
