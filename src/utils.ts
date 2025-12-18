import type { RGB, Point, Rect } from "./types/windows";

/**
 * Convert RGB color to hex string.
 * @param rgb - RGB color object
 * @returns {string} Hex color string (e.g., "#FF0000")
 */
export function rgbToHex(rgb: RGB): string {
  const h = (n: number) => n.toString(16).padStart(2, "0");
  return `#${h(rgb.r)}${h(rgb.g)}${h(rgb.b)}`.toUpperCase();
}

/**
 * Convert hex color string to RGB object.
 * @param hex - Hex color string (e.g., "#FF0000" or "FF0000")
 * @returns {RGB} RGB color object
 */
export function hexToRgb(hex: string): RGB {
  const c = hex.replace("#", "");
  return {
    r: parseInt(c.substring(0, 2), 16),
    g: parseInt(c.substring(2, 4), 16),
    b: parseInt(c.substring(4, 6), 16),
  };
}

/**
 * Calculate Euclidean distance between two colors.
 * @param c1 - First RGB color
 * @param c2 - Second RGB color
 * @returns {number} Color distance (0-441.67)
 */
export function colorDistance(c1: RGB, c2: RGB): number {
  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
      Math.pow(c1.g - c2.g, 2) +
      Math.pow(c1.b - c2.b, 2)
  );
}

/**
 * Check if two colors are similar within a tolerance.
 * @param c1 - First RGB color
 * @param c2 - Second RGB color
 * @param tolerance - Euclidean distance tolerance
 * @returns {boolean} True if similar
 */
export function isColorSimilar(c1: RGB, c2: RGB, tolerance: number): boolean {
  return colorDistance(c1, c2) <= tolerance;
}

/**
 * Check if a point is within a rectangle.
 * @param p - Point {x, y}
 * @param r - Rectangle {left, top, right, bottom}
 * @returns {boolean} True if point is inside
 */
export function pointInRect(p: Point, r: Rect): boolean {
  return p.x >= r.left && p.x <= r.right && p.y >= r.top && p.y <= r.bottom;
}

export const utils = {
  rgbToHex,
  hexToRgb,
  colorDistance,
  isColorSimilar,
  pointInRect,
};
