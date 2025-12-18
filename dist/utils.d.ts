import type { RGB, Point, Rect } from "./types/windows";
/**
 * Convert RGB color to hex string.
 * @param rgb - RGB color object
 * @returns {string} Hex color string (e.g., "#FF0000")
 */
export declare function rgbToHex(rgb: RGB): string;
/**
 * Convert hex color string to RGB object.
 * @param hex - Hex color string (e.g., "#FF0000" or "FF0000")
 * @returns {RGB} RGB color object
 */
export declare function hexToRgb(hex: string): RGB;
/**
 * Calculate Euclidean distance between two colors.
 * @param c1 - First RGB color
 * @param c2 - Second RGB color
 * @returns {number} Color distance (0-441.67)
 */
export declare function colorDistance(c1: RGB, c2: RGB): number;
/**
 * Check if two colors are similar within a tolerance.
 * @param c1 - First RGB color
 * @param c2 - Second RGB color
 * @param tolerance - Euclidean distance tolerance
 * @returns {boolean} True if similar
 */
export declare function isColorSimilar(c1: RGB, c2: RGB, tolerance: number): boolean;
/**
 * Check if a point is within a rectangle.
 * @param p - Point {x, y}
 * @param r - Rectangle {left, top, right, bottom}
 * @returns {boolean} True if point is inside
 */
export declare function pointInRect(p: Point, r: Rect): boolean;
export declare const utils: {
    rgbToHex: typeof rgbToHex;
    hexToRgb: typeof hexToRgb;
    colorDistance: typeof colorDistance;
    isColorSimilar: typeof isColorSimilar;
    pointInRect: typeof pointInRect;
};
//# sourceMappingURL=utils.d.ts.map