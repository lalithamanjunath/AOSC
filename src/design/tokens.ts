/**
 * Design Tokens System
 *
 * Extracted from sosc-website-v2 and adapted for os-backup.
 * Single source of truth for colors, animations, spacing, and typography.
 *
 * Colors are in OKLCH format for perceptually uniform color spaces.
 * Use CSS custom properties for runtime theme switching capability.
 */

// ============================================================================
// COLOR TOKENS (OKLCH Format)
// ============================================================================

export const colorTokens = {
  // Primary color - vibrant green
  primary: {
    base: 'oklch(78.419% 0.23837 145.933)', // #3ce56e
    foreground: 'oklch(1 0 0)', // White text on primary
    light: 'oklch(92% 0.12 145.933)', // Lighter green for backgrounds
    dark: 'oklch(54% 0.18 145.933)', // Darker green for hover
  },

  // Secondary color - light gray
  secondary: {
    base: 'oklch(0.95 0.01 140)',
    foreground: 'oklch(0.2 0 0)',
    light: 'oklch(0.98 0.001 140)',
  },

  // Muted colors - for disabled/secondary content
  muted: {
    base: 'oklch(0.96 0.005 140)',
    foreground: 'oklch(0.4 0.01 140)',
  },

  // Accent color - same as secondary for sosc
  accent: {
    base: 'oklch(0.96 0.005 140)',
    foreground: 'oklch(0.2 0 0)',
  },

  // Status colors
  destructive: 'oklch(0.6 0.2 30)', // Red for errors
  success: 'oklch(78.419% 0.23837 145.933)', // Green (same as primary)
  warning: 'oklch(0.75 0.15 80)', // Orange
  info: 'oklch(0.65 0.2 220)', // Blue

  // Neutral colors
  background: 'oklch(1 0 0)', // White
  foreground: 'oklch(32.109% 0.00004 271.152)', // Near-black (#0f172a)
  card: 'oklch(1 0 0)', // White
  cardForeground: 'oklch(0.2 0 0)',
  popover: 'oklch(1 0 0)',
  popoverForeground: 'oklch(0.2 0 0)',
  border: 'oklch(0.9 0 0)', // Light gray border
  input: 'oklch(0.93 0 0)',
  ring: 'oklch(0.7 0.02 140)',

  // Sidebar (if used)
  sidebar: 'oklch(0.98 0.001 140)',
  sidebarForeground: 'oklch(0.2 0 0)',

  // Chart colors
  chart: {
    1: '#3ce56e',
    2: '#0066ff',
    3: '#ff6b6b',
    4: '#ffd700',
    5: '#00d4ff',
  },

  // Dark mode overrides
  dark: {
    background: 'oklch(0.15 0 0)', // Dark gray
    foreground: 'oklch(1 0 0)', // White
    card: 'oklch(0.2 0 0)', // Dark card
    cardForeground: 'oklch(1 0 0)', // White text
    secondary: 'oklch(0.25 0.01 140)',
    secondaryForeground: 'oklch(1 0 0)',
    muted: 'oklch(0.25 0.01 140)',
    mutedForeground: 'oklch(0.75 0.02 140)',
    accent: 'oklch(0.25 0.01 140)',
    accentForeground: 'oklch(1 0 0)',
    border: 'oklch(0.25 0 0)',
    input: 'oklch(0.25 0 0)',
    ring: 'oklch(0.65 0.02 140)',
  },
};

// ============================================================================
// ANIMATION TOKENS
// ============================================================================

export const animationTokens = {
  // Easing curves - extracted from sosc-website-v2
  easing: {
    // Premium elastic easing - used for major interactions (menu, buttons)
    elastic: 'cubic-bezier(0.77, 0, 0.175, 1)',

    // Variant elastic - used for mobile/secondary animations
    elasticVariant: 'cubic-bezier(0.83, 0, 0.17, 1)',

    // Bounce easing - used for playful interactions
    bounce: 'cubic-bezier(0.215, 0.61, 0.355, 1)',

    // Standard easing - default for smooth animations
    standard: 'ease-out',

    // Linear - used for scroll-linked animations
    linear: 'linear',

    // In easing - used for entrance animations
    easeIn: 'ease-in',

    // In-out easing - smooth acceleration/deceleration
    easeInOut: 'ease-in-out',
  },

  // Duration tiers - extracted from sosc usage patterns
  duration: {
    // Ultra-fast: 120ms - micro-interactions, tiny feedbacks
    ultraFast: '0.12s',

    // Fast: 300ms - hover effects, quick state changes, tag colors
    fast: '0.3s',

    // Medium: 500ms - standard hover effects, image scales, filters
    medium: '0.5s',

    // Slow: 600ms - major transitions, menu items, opacity changes
    slow: '0.6s',

    // Slower: 700ms - grayscale filter, large scale transforms
    slower: '0.7s',

    // Slowest: 800ms - premium menu opens, major page transitions
    slowest: '0.8s',
  },

  // Stagger delays - for sequential animations
  stagger: {
    // Tight stagger - for many items
    tight: '0.04s',

    // Normal stagger - default for most lists
    normal: '0.08s',

    // Loose stagger - for few items, emphasis-focused
    loose: '0.12s',

    // Manual stagger values (used in menus, etc)
    section: {
      top: '0.1s',
      middle: '0.2s',
      bottom: '0.6s',
    },

    // Per-index stagger with CSS calc
    // Usage: transition-delay: calc(var(--index) * 0.05s)
    perItem: '0.05s',
  },

  // Transition presets
  transitions: {
    // Fast color change
    colorFast: 'transition-colors duration-300 ease-out',

    // Standard transform
    transform: 'transition-transform duration-500 cubic-bezier(0.25, 0.46, 0.45, 0.94)',

    // Opacity change
    opacity: 'transition-opacity duration-300 ease-out',

    // All properties (use sparingly)
    all: 'transition-all duration-500 ease-out',

    // Shadow depth
    shadow: 'transition-shadow duration-300 ease-out',

    // Border changes
    border: 'transition-border-color duration-300 ease-out',

    // Filter effects (grayscale, etc)
    filter: 'transition-filter duration-700 cubic-bezier(0.25, 0.46, 0.45, 0.94)',

    // Scale with easing
    scale: 'transition-transform duration-500 cubic-bezier(0.25, 0.46, 0.45, 0.94)',

    // Custom: elastic menu menu opening
    elasticMenu: 'transition-all 0.8s cubic-bezier(0.77, 0, 0.175, 1)',

    // Custom: elastic menu item reveal
    elasticItem: 'transition-all 0.6s cubic-bezier(0.77, 0, 0.175, 1)',
  },
};

// ============================================================================
// SPACING TOKENS
// ============================================================================

export const spacingTokens = {
  // Semantic spacing scale (Tailwind-based: 4px per unit)
  scale: {
    0: '0px',
    0.5: '2px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
    28: '112px',
    32: '128px',
    36: '144px',
    40: '160px',
    44: '176px',
    48: '192px',
  },

  // Section padding - responsive
  section: {
    // Compact sections
    compact: {
      mobile: 'py-12 px-4 sm:px-6',    // 48px / 16px-24px
      tablet: 'py-16 px-6',            // 64px / 24px
      desktop: 'py-20 px-8',           // 80px / 32px
    },

    // Standard sections
    standard: {
      mobile: 'py-16 px-4 sm:px-6',    // 64px / 16px-24px
      tablet: 'py-20 px-6 lg:px-8',    // 80px / 24px-32px
      desktop: 'py-24 px-8 xl:px-16',  // 96px / 32px-64px
    },

    // Prominent sections
    prominent: {
      mobile: 'py-20 px-4 sm:px-6',    // 80px / 16px-24px
      tablet: 'py-28 px-6 lg:px-8',    // 112px / 24px-32px
      desktop: 'py-32 px-8 xl:px-16',  // 128px / 32px-64px
    },
  },

  // Component gaps
  gap: {
    tight: 'gap-2',     // 8px - related items
    compact: 'gap-3',   // 12px - compact grouping
    normal: 'gap-4',    // 16px - standard
    relaxed: 'gap-6',   // 24px - breathing room
    loose: 'gap-8',     // 32px - prominent spacing
    spacious: 'gap-12', // 48px - major sections
  },

  // Container widths
  container: {
    sm: 'max-w-2xl',    // 42rem (672px)
    md: 'max-w-4xl',    // 56rem (896px)
    lg: 'max-w-6xl',    // 64rem (1024px)
    xl: 'max-w-7xl',    // 80rem (1280px)
  },
};

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

export const typographyTokens = {
  // Font families
  fonts: {
    sans: 'var(--font-sans, "Inter", system-ui, sans-serif)',
    display: 'var(--font-display, "Righteous", serif)',
    mono: '"Fira Code", "Courier New", monospace',
  },

  // Font weights
  weight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Line heights for readability
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
    loose: '2',
  },

  // Font sizes (using clamp for fluid typography)
  size: {
    xs: 'clamp(0.75rem, 1.2vw, 0.875rem)',
    sm: 'clamp(0.875rem, 1.3vw, 1rem)',
    base: 'clamp(1rem, 1.5vw, 1.125rem)',
    lg: 'clamp(1.125rem, 1.8vw, 1.25rem)',
    xl: 'clamp(1.25rem, 2vw, 1.5rem)',
    '2xl': 'clamp(1.5rem, 2.5vw, 2rem)',
    '3xl': 'clamp(2rem, 3vw, 2.5rem)',
    '4xl': 'clamp(2.5rem, 4vw, 3rem)',
    '5xl': 'clamp(3rem, 5.46vw, 3.75rem)', // Hero-sized
    '6xl': 'clamp(3.75rem, 6vw, 4.5rem)',
  },
};

// ============================================================================
// SHADOW & ELEVATION TOKENS
// ============================================================================

export const shadowTokens = {
  // Elevation levels - for depth and hierarchy
  elevation: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  },

  // Card shadows
  card: {
    rest: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    hover: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    active: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
  },

  // Glow effects (using primary color)
  glow: {
    soft: 'box-shadow: 0 0 30px rgba(60, 229, 110, 0.15)',
    medium: 'box-shadow: 0 0 50px rgba(60, 229, 110, 0.25)',
    strong: 'box-shadow: 0 0 80px rgba(60, 229, 110, 0.35)',
  },
};

// ============================================================================
// BORDER & RADIUS TOKENS
// ============================================================================

export const borderTokens = {
  // Border radius scale
  radius: {
    none: '0px',
    sm: 'calc(0.625rem - 4px)', // ~2px
    md: 'calc(0.625rem - 2px)', // ~4px
    lg: '0.625rem',              // ~6px (base)
    xl: 'calc(0.625rem + 4px)',  // ~10px
    '2xl': '1rem',               // ~16px
    full: '9999px',              // Pill-shaped
  },

  // Border widths
  width: {
    0: '0px',
    1: '1px',
    2: '2px',
    4: '4px',
    8: '8px',
  },

  // Border colors (references color tokens)
  color: {
    light: 'var(--color-border)', // oklch(0.9 0 0)
    normal: 'oklch(0.85 0 0)',
    dark: 'oklch(0.7 0 0)',
    primary: 'var(--color-primary)',
  },
};

// ============================================================================
// STATE TOKENS
// ============================================================================

export const stateTokens = {
  // Focus ring state
  focus: {
    ring: '2px',
    offset: '2px',
    color: 'var(--color-primary)',
  },

  // Disabled state
  disabled: {
    opacity: '0.5',
    cursor: 'not-allowed',
  },

  // Hover state opacity
  hover: {
    opacity: '0.8',
  },

  // Active/pressed state
  active: {
    opacity: '0.9',
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get CSS custom property name from token path
 * @example getCSSVar('color.primary.base') => 'var(--color-primary-base)'
 */
export function getCSSVar(path: string): string {
  const key = path.replace(/\./g, '-').toLowerCase();
  return `var(--${key})`;
}

/**
 * Format duration for transition
 * @example formatDuration('medium') => '0.5s'
 */
export function formatDuration(key: keyof typeof animationTokens.duration): string {
  return animationTokens.duration[key];
}

/**
 * Format easing for transition
 * @example formatEasing('elastic') => 'cubic-bezier(0.77, 0, 0.175, 1)'
 */
export function formatEasing(key: keyof typeof animationTokens.easing): string {
  return animationTokens.easing[key];
}

/**
 * Create transition shorthand
 * @example createTransition('transform', 'medium', 'elastic')
 *          => 'transition-transform 0.5s cubic-bezier(0.77, 0, 0.175, 1)'
 */
export function createTransition(
  property: string,
  duration: keyof typeof animationTokens.duration,
  easing: keyof typeof animationTokens.easing = 'standard'
): string {
  return `transition-${property} ${formatDuration(duration)} ${formatEasing(easing)}`;
}

/**
 * Create stagger delay for nth child
 * @example createStaggerDelay(2) => 'calc(2 * 0.08s)' or '0.16s'
 */
export function createStaggerDelay(index: number, delayValue = '0.08s'): string {
  return `calc(${index} * ${delayValue})`;
}

/**
 * Get responsive spacing classes
 * @example getResponsivePadding('standard')
 *         => 'py-16 px-4 sm:px-6 md:py-20 md:px-6 lg:py-24 lg:px-8 xl:px-16'
 */
export function getResponsivePadding(
  size: keyof typeof spacingTokens.section
): string {
  const sections = spacingTokens.section[size];
  return `${sections.mobile} md:${sections.tablet} lg:${sections.desktop}`;
}

/**
 * Framer Motion compatible easing object
 */
export const framerEasing = {
  elastic: [0.77, 0, 0.175, 1],
  elasticVariant: [0.83, 0, 0.17, 1],
  bounce: [0.215, 0.61, 0.355, 1],
  smooth: [0.25, 0.46, 0.45, 0.94],
} as const;

export default {
  colorTokens,
  animationTokens,
  spacingTokens,
  typographyTokens,
  shadowTokens,
  borderTokens,
  stateTokens,
};
