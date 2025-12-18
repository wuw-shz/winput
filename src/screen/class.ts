import * as actions from "./actions";
import * as utils from "../utils";

/**
 * Screen-related functions for pixel operations and screen information.
 */
class Screen {
  /**
   * Get the screen dimensions.
   * @returns {{ width: number, height: number }} Screen width and height in pixels
   */
  getScreenSize = actions.getScreenSize;

  /**
   * Get information about all monitors.
   * @returns {Array<{ rect: Rect, isPrimary: boolean }>} Array of monitor info
   */
  getMonitors = actions.getMonitors;

  /**
   * Capture the screen content.
   * @param x - X coordinate (default: 0)
   * @param y - Y coordinate (default: 0)
   * @param width - Width to capture (default: screen width)
   * @param height - Height to capture (default: screen height)
   * @returns {Uint8Array | null} Raw RGBA buffer or null if failed
   */
  capture = actions.captureScreen;

  /**
   * Get the RGB color of a pixel at the specified coordinates.
   * @param x - X coordinate
   * @param y - Y coordinate
   * @returns {RGB | null} RGB color object or null if failed
   */
  getPixel = actions.getPixel;

  /**
   * Get the hex color code of a pixel at the specified coordinates.
   * @param x - X coordinate
   * @param y - Y coordinate
   * @returns {string | null} Hex color string (e.g., "#FF0000") or null if failed
   */
  getPixelHex = actions.getPixelHex;

  /**
   * Check if a pixel matches a target color within tolerance.
   * @param x - X coordinate
   * @param y - Y coordinate
   * @param target - Target RGB color to match
   * @param tolerance - Color tolerance (0-255, default: 0)
   * @returns {boolean} True if pixel matches target color
   */
  checkPixel = actions.checkPixel;

  /**
   * Wait for a pixel to match a target color.
   * @param x - X coordinate
   * @param y - Y coordinate
   * @param target - Target RGB color to match
   * @param tolerance - Color tolerance (0-255, default: 0)
   * @param timeout - Maximum wait time in ms (optional, waits indefinitely if not set)
   * @returns {Promise<boolean>} Resolves true when matched, false on timeout
   */
  waitForPixel = actions.waitForPixel;

  /**
   * Get RGB colors for multiple pixel positions at once.
   * @param positions - Array of {x, y} coordinates
   * @returns {(RGB | null)[]} Array of RGB colors (null for failed reads)
   */
  getMultiplePixels = actions.getMultiplePixels;

  /**
   * Check if all pixels match their target colors.
   * @param checks - Array of pixel checks with x, y, target RGB, and optional tolerance
   * @returns {boolean} True if all pixels match their targets
   */
  checkMultiplePixels = actions.checkMultiplePixels;

  /**
   * Wait for any of the pixel conditions to match.
   * @param checks - Array of pixel checks with x, y, target RGB, and optional tolerance
   * @param timeout - Maximum wait time in ms (optional)
   * @returns {Promise<number>} Index of first matched condition, or -1 on timeout
   */
  waitForAnyPixel = actions.waitForAnyPixel;

  /**
   * Search for a pixel of a specific color in the defined region.
   * @param x1 - X coordinate of one corner
   * @param y1 - Y coordinate of one corner
   * @param x2 - X coordinate of the opposite corner
   * @param y2 - Y coordinate of the opposite corner
   * @param color - Target RGB color, hex string, or number (0xRRGGBB)
   * @param tolerance - Color tolerance (0-255, default: 0)
   * @returns {Point | null} Coordinates of the first match or null if not found
   */
  pixelSearch = actions.pixelSearch;

  /**
   * Search for an image pattern on the screen.
   * Supports various image formats (PNG, JPEG, BMP, etc.).
   * @param x1 - X coordinate of one corner
   * @param y1 - Y coordinate of one corner
   * @param x2 - X coordinate of the opposite corner
   * @param y2 - Y coordinate of the opposite corner
   * @param path - Path to the image file
   * @param tolerance - Color tolerance (0-255, default: 0)
   * @returns {Promise<Point | null>} Coordinates of the top-left corner of the match
   */
  imageSearch = actions.imageSearch;
}

export const screen = new Screen();
