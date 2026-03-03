import React, { useState, useEffect } from 'react';
import {
  sectionAnimationConfig,
  createGridBackground,
  getResponsiveGridSize,
  combineSectionClasses,
  sectionClasses,
} from '@/utils/sectionAnimationUtils';

/**
 * AnimatedSection - Reusable section wrapper component
 * Provides:
 * - Responsive grid background
 * - Scroll animation support
 * - Consistent section styling
 * - Optional blur gradient overlays
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Section content
 * @param {string} props.bgVariant - Background color ('white', 'light', 'gray')
 * @param {boolean} props.showGrid - Show grid background pattern (default: true)
 * @param {boolean} props.gradient - Show blur gradient overlays
 * @param {string} props.size - Section padding size ('small', 'normal', 'large')
 * @param {Object} props.gridConfig - Custom grid configuration
 * @param {string} props.className - Additional tailwind classes
 * @param {string} props.id - Section ID for navigation
 * @returns {JSX.Element}
 */
export default function AnimatedSection({
  children,
  bgVariant = 'white',
  showGrid = true,
  gradient = false,
  size = 'normal',
  gridConfig = {},
  className = '',
  id = '',
}) {
  const [gridSize, setGridSize] = useState(56);
  const [gridStyle, setGridStyle] = useState({});

  // Update grid size on window resize for responsiveness
  useEffect(() => {
    const updateGridSize = () => {
      const newGridSize = getResponsiveGridSize(window.innerWidth);
      setGridSize(newGridSize);
    };

    updateGridSize();
    window.addEventListener('resize', updateGridSize);
    return () => window.removeEventListener('resize', updateGridSize);
  }, []);

  // Generate grid background style
  useEffect(() => {
    if (showGrid) {
      const style = createGridBackground(
        gridConfig.size || gridSize,
        gridConfig.color || undefined
      );
      setGridStyle(style);
    }
  }, [gridSize, showGrid, gridConfig]);

  // Determine section padding based on size
  const sectionBaseClass = {
    small: sectionClasses.baseSmall,
    normal: sectionClasses.base,
    large: sectionClasses.baseLarge,
  }[size] || sectionClasses.base;

  // Determine background class
  const bgClass = {
    white: sectionClasses.bgWhite,
    light: sectionClasses.bgLight,
    gray: sectionClasses.bgGray,
  }[bgVariant] || sectionClasses.bgWhite;

  const combinedClasses = combineSectionClasses(sectionBaseClass, bgClass, className);

  return (
    <section id={id} className={combinedClasses} style={showGrid ? gridStyle : {}}>
      {/* Optional: Gradient blur overlays for visual interest */}
      {gradient && (
        <>
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-700/5 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      {/* Main content wrapper */}
      <div className={sectionClasses.container}>
        {children}
      </div>
    </section>
  );
}

/**
 * AnimatedSectionTitle - Reusable title component with animations
 * Provides consistent heading styling and reveal animations
 */
export function AnimatedSectionTitle({
  children,
  as = 'h2',
  variant = 'large',
  className = '',
  animate = true,
}) {
  const Component = as;

  const sizeClasses = {
    small: 'text-2xl sm:text-3xl md:text-4xl',
    normal: 'text-3xl sm:text-4xl md:text-5xl',
    large: 'text-4xl sm:text-5xl md:text-6xl',
  }[variant] || 'text-3xl sm:text-4xl md:text-5xl';

  const baseClasses = `font-bold text-slate-900 ${sizeClasses} ${className}`;

  if (animate) {
    return (
      <div className="relative">
        <Component className={baseClasses}>
          {children}
        </Component>
      </div>
    );
  }

  return <Component className={baseClasses}>{children}</Component>;
}

/**
 * AnimatedSectionSubtitle - Reusable subtitle component
 * For taglines, descriptions, or section metadata
 */
export function AnimatedSectionSubtitle({
  children,
  className = '',
  animate = true,
}) {
  const baseClasses = `text-slate-600 text-base sm:text-lg font-medium ${className}`;

  if (animate) {
    return <p className={baseClasses}>{children}</p>;
  }

  return <p className={baseClasses}>{children}</p>;
}

/**
 * AnimatedSectionContent - Wrapper for section main content
 * Handles staggered animation of child elements
 */
export function AnimatedSectionContent({
  children,
  className = '',
  variant = 'default',
  gap = 'gap-8',
}) {
  const layoutClasses = {
    default: `space-y-8 ${gap}`,
    grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`,
    gridTwoCol: `grid grid-cols-1 lg:grid-cols-2 gap-12`,
  }[variant] || `space-y-8 ${gap}`;

  return <div className={`${layoutClasses} ${className}`}>{children}</div>;
}
