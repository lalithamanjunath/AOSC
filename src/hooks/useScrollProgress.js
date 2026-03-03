import { useEffect, useRef, useState } from 'react';
import { getLenisInstance } from './useLenis';

/**
 * Custom hook to track scroll progress of an element
 * Returns progress value (0-1) and other scroll metrics
 *
 * @param {Object} options - Configuration options
 * @returns {Object} - { progress, distance, isInView, elementRef }
 */
export function useScrollProgress(options = {}) {
  const { offsetStart = 0, offsetEnd = 0, threshold = 0.1 } = options;
  const elementRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (!elementRef.current) return;

    const lenis = getLenisInstance();
    let rafId;

    const updateProgress = () => {
      const element = elementRef.current;
      if (!element) return;

      // Get element bounds
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementHeight = rect.height;

      // Calculate window scroll position
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      // Calculate start and end points for animation
      const startPoint = elementTop - windowHeight + offsetStart;
      const endPoint = elementTop + elementHeight + offsetEnd;

      // Calculate progress (0 to 1)
      let calculatedProgress = (scrollTop - startPoint) / (endPoint - startPoint);
      calculatedProgress = Math.max(0, Math.min(1, calculatedProgress));

      // Check if element is in view
      const inViewStart = scrollTop + windowHeight > elementTop - threshold * windowHeight;
      const inViewEnd = scrollTop < elementTop + elementHeight + threshold * windowHeight;
      const currentIsInView = inViewStart && inViewEnd;

      setProgress(calculatedProgress);
      setDistance(scrollTop - startPoint);
      setIsInView(currentIsInView);

      rafId = requestAnimationFrame(updateProgress);
    };

    // Start the animation loop
    rafId = requestAnimationFrame(updateProgress);

    // Cleanup
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [offsetStart, offsetEnd, threshold]);

  return { progress, distance, isInView, elementRef };
}

/**
 * Hook to get current scroll position from Lenis
 * Useful for global scroll-based animations
 */
export function useLenisScroll() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const lenis = getLenisInstance();
    if (!lenis) return;

    let rafId;

    const updateScroll = () => {
      // Get scroll position
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

      setScrollProgress(Math.min(scrollPercent, 1));
      rafId = requestAnimationFrame(updateScroll);
    };

    rafId = requestAnimationFrame(updateScroll);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return scrollProgress;
}

/**
 * Calculate easing values for smooth animations
 */
export function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function easeOutQuad(t) {
  return 1 - (1 - t) * (1 - t);
}
