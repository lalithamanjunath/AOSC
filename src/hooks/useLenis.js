import { useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance = null;

/**
 * Custom hook to integrate Lenis smooth scrolling
 * Initializes once globally and cleans up on unmount
 *
 * @param {Object} options - Lenis configuration options
 * @returns {Object|null} - Lenis instance or null
 */
export function useLenis(options = {}) {
  useEffect(() => {
    // Disable browser scroll restoration on initial load
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Prevent multiple instances in strict mode or re-mounts
    if (lenisInstance) {
      // Only reset if scroll is NOT already at 0
      if (window.scrollY > 1) {
        lenisInstance.scrollTo(0, { immediate: true });
      }
      return () => {};
    }

    // Initialize Lenis with sensible defaults
    lenisInstance = new Lenis({
      lerp: 0.1, // Smoothness (0-1, lower = more smooth)
      duration: 1.2, // Duration of scroll animation
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false, // Disable smooth scroll on touch devices
      touchMultiplier: 2,
      infinite: false,
      autoRaf: true, // Automatically manage RAF - DO NOT run manual loop
      syncTouch: true,
      ...options,
    });

    // Only scroll to 0 if page is NOT already scrolled (initial load protection)
    if (window.scrollY > 1) {
      lenisInstance.scrollTo(0, { immediate: true });
    }

    // Cleanup function
    return () => {
      // Don't destroy on unmount - Lenis is global for entire app
      // Just reset position only if user hasn't scrolled
      if (lenisInstance && window.scrollY < 100) {
        lenisInstance.scrollTo(0, { immediate: true });
      }
    };
  }, []);

  return lenisInstance;
}

/**
 * Get the current Lenis instance (useful for scroll control in other components)
 */
export function getLenisInstance() {
  return lenisInstance;
}

/**
 * Scroll to a specific position or element
 */
export function scrollToElement(element, options = {}) {
  if (!lenisInstance) return;
  lenisInstance.scrollTo(element, {
    offset: 0,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    ...options,
  });
}

/**
 * Toggle scroll lock for modals and overlays
 * Disables smooth scrolling and locks body overflow
 */
export function toggleScrollLock(lock = true) {
  if (typeof document === 'undefined') return;

  const lenis = lenisInstance;

  if (lock) {
    // Lock scroll
    if (lenis) lenis.stop();
    document.body.style.overflow = 'hidden';
    // Prevent layout shift by adding scrollbar padding
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  } else {
    // Unlock scroll
    if (lenis) lenis.start();
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
}

