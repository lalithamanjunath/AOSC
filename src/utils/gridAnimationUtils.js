/**
 * Grid Animation Utilities
 * Generates animated grid patterns responsive to scroll progress
 * Enhanced with SOSC-style roughness-based block animations
 */

/**
 * Seeded random number generator for consistent randomization
 */
export function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Generate grid blocks configuration
 * @param {number} gridWidth - Number of columns
 * @param {number} gridHeight - Number of rows
 * @param {number} blockSize - Size of each block in pixels
 * @returns {Array} Array of block objects with position and seed data
 */
export function generateGridBlocks(gridWidth, gridHeight, blockSize = 40) {
  const blocks = [];
  let blockIndex = 0;

  for (let row = -1; row <= gridHeight; row++) {
    for (let col = -1; col <= gridWidth; col++) {
      const x = col * blockSize;
      const y = row * blockSize;
      const distance = Math.sqrt(Math.pow(col - gridWidth / 2, 2) + Math.pow(row - gridHeight / 2, 2));

      blocks.push({
        id: blockIndex,
        x,
        y,
        col,
        row,
        size: blockSize,
        distance, // Distance from center for stagger effects
        seed: blockIndex * 73, // Unique seed for this block
        roughness: (Math.random() - 0.5) * 3, // Random offset for rough edges
      });

      blockIndex++;
    }
  }

  return blocks;
}

/**
 * Calculate block opacity based on scroll progress
 * Creates a wave-like reveal effect
 *
 * @param {number} progress - Scroll progress (0-1)
 * @param {Object} block - Block configuration object
 * @param {number} intensity - Animation intensity (default: 1)
 * @returns {number} Opacity value (0-1)
 */
export function calculateBlockOpacity(progress, block, intensity = 1) {
  const { distance, seed } = block;

  // Stagger the animation based on distance from center
  const staggerDelay = (distance * 0.02) * intensity;
  const adjustedProgress = Math.max(0, progress - staggerDelay);

  // Add randomness to the reveal for organic feel
  const randomVariation = seededRandom(seed) * 0.15;
  const finalProgress = adjustedProgress + randomVariation;

  // Smooth easing for opacity
  let opacity = 0;
  if (finalProgress < 0.3) {
    // Entrance phase (0-0.3)
    opacity = finalProgress / 0.3;
  } else if (finalProgress < 0.7) {
    // Peak phase (0.3-0.7)
    opacity = 1;
  } else if (finalProgress < 1) {
    // Exit phase (0.7-1.0)
    opacity = Math.max(0, 1 - (finalProgress - 0.7) / 0.3);
  }

  return Math.min(1, Math.max(0, opacity));
}

/**
 * Calculate block opacity with SOSC-style entrance/hold/exit phases
 * Creates a grid flash reveal effect like SOSC Landing.astro
 *
 * @param {number} progress - Scroll progress (0-1)
 * @param {Object} block - Block configuration object
 * @param {number} intensity - Animation intensity (default: 1)
 * @returns {number} Opacity value (0-1)
 */
export function calculateBlockOpaciitySOSCStyle(progress, block, intensity = 1) {
  const { seed, roughness } = block;

  let entranceProgress = 0;
  let exitProgress = 0;

  // Phase transitions based on progress
  if (progress < 0.35) {
    // Entrance phase (0-35%)
    entranceProgress = progress / 0.35;
  } else if (progress < 0.65) {
    // Hold phase (35-65%)
    entranceProgress = 1;
  } else {
    // Exit phase (65-100%)
    entranceProgress = 1;
    exitProgress = (progress - 0.65) / 0.35;
  }

  // Calculate block row with roughness
  const rows = 10; // Approximate rows for calculation
  const entranceBaseRow = rows - 1.5 - entranceProgress * (rows + 10);
  const entranceRow = block.row + roughness * (1 - entranceProgress);
  const distFromEntrance = entranceRow - entranceBaseRow;

  const exitBaseRow = rows + 2 - exitProgress * (rows + 15);
  const exitRow = block.row + roughness * (1 - exitProgress);
  const distFromExit = exitRow - exitBaseRow;

  let entranceAlpha = 0;

  // Entrance logic with fragmented edge
  if (distFromEntrance >= 0) {
    // Fully entered (solid)
    entranceAlpha = 1;
  } else if (distFromEntrance > -4) {
    // Fragmented top edge - random density based on seed
    const dist = Math.abs(distFromEntrance);
    const density = 0.9 - (dist - 1) * 0.25;
    if (seededRandom(seed) < density) {
      entranceAlpha = 0.8 - (dist - 1) * 0.2;
    }
  }

  // Exit logic with fade out
  if (distFromExit > 4) {
    entranceAlpha = 0;
  } else if (distFromExit > 0) {
    const dist = distFromExit;
    const density = 0.9 - dist * 0.2;

    if (seededRandom(seed) > density) {
      entranceAlpha = 0;
    } else {
      const fade = 1 - dist / 4;
      entranceAlpha = Math.min(entranceAlpha, fade);
    }
  }

  return Math.min(1, Math.max(0, entranceAlpha));
}

/**
 * Calculate block color/brightness based on animation
 * Creates depth perception with color shifts
 *
 * @param {number} opacity - Current block opacity
 * @param {Object} block - Block configuration object
 * @param {string} baseColor - Base color (rgb format, e.g. '15, 23, 42')
 * @returns {string} RGBA color string
 */
export function calculateBlockColor(opacity, block, baseColor = '15, 23, 42') {
  // Vary opacity based on distance (closer blocks more opaque)
  const distanceOpacity = opacity * (1 - (block.distance * 0.05));
  return `rgba(${baseColor}, ${distanceOpacity * 0.15})`;
}

/**
 * Get transform values for parallax effect
 *
 * @param {number} progress - Scroll progress (0-1)
 * @param {Object} block - Block configuration object
 * @param {number} intensity - Parallax intensity (default: 0.5)
 * @returns {Object} { translateY, scale } values
 */
export function calculateBlockTransform(progress, block, intensity = 0.5) {
  const { seed } = block;

  // Subtle vertical movement
  const translateY = Math.sin(progress * Math.PI + seed) * 4 * intensity;

  // Subtle scale based on progress
  const scaleVariation = 1 + Math.sin(progress * Math.PI + seed) * 0.05;

  return {
    translateY,
    scale: scaleVariation,
  };
}

/**
 * Generate responsive grid dimensions based on viewport
 *
 * @param {number} screenWidth - Current screen width
 * @param {number} screenHeight - Current screen height
 * @returns {Object} { gridWidth, gridHeight, blockSize }
 */
export function getResponsiveGridDimensions(screenWidth, screenHeight) {
  let gridWidth, gridHeight, blockSize;

  if (screenWidth < 640) {
    // Mobile
    gridWidth = Math.ceil(screenWidth / 32);
    gridHeight = Math.ceil(screenHeight / 32);
    blockSize = 32;
  } else if (screenWidth < 1024) {
    // Tablet
    gridWidth = Math.ceil(screenWidth / 40);
    gridHeight = Math.ceil(screenHeight / 40);
    blockSize = 40;
  } else {
    // Desktop
    gridWidth = Math.ceil(screenWidth / 56);
    gridHeight = Math.ceil(screenHeight / 56);
    blockSize = 56;
  }

  return { gridWidth, gridHeight, blockSize };
}

/**
 * Create CSS for animated grid
 * Returns style objects for each block
 *
 * @param {Array} blocks - Grid blocks array
 * @param {number} progress - Scroll progress
 * @param {boolean} useSOSCStyle - Use SOSC-style animation (default: false)
 * @returns {Map} Map of block IDs to style objects
 */
export function generateBlockStyles(blocks, progress, useSOSCStyle = false) {
  const styleMap = new Map();
  const opacityFn = useSOSCStyle ? calculateBlockOpaciitySOSCStyle : calculateBlockOpacity;

  blocks.forEach((block) => {
    const opacity = opacityFn(progress, block);
    const color = calculateBlockColor(opacity, block);
    const { translateY, scale } = calculateBlockTransform(progress, block);

    styleMap.set(block.id, {
      left: `${block.x}px`,
      top: `${block.y}px`,
      width: `${block.size}px`,
      height: `${block.size}px`,
      backgroundColor: color,
      transform: `translateY(${translateY}px) scale(${scale})`,
      willChange: 'opacity, transform, background-color',
      // SOSC uses 0.12s transition - keep as is for block animations
    });
  });

  return styleMap;
}

/**
 * Create grid background pattern CSS
 * For subtle grid visual in sections
 *
 * @param {number} gridSize - Grid cell size in pixels
 * @param {string} color - Grid color (rgba)
 * @returns {string} CSS background property
 */
export function createGridPattern(gridSize = 56, color = 'rgba(15, 23, 42, 0.06)') {
  return `
    linear-gradient(90deg, ${color} 1px, transparent 1px),
    linear-gradient(${color} 1px, transparent 1px)
  `.trim();
}

/**
 * Create grid background with size
 */
export function getGridBackgroundStyle(gridSize = 56, color = 'rgba(15, 23, 42, 0.06)') {
  return {
    backgroundImage: createGridPattern(gridSize, color),
    backgroundSize: `${gridSize}px ${gridSize}px`,
  };
}
