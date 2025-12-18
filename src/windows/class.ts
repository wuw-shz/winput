import * as actions from "./actions";

export type {
  RGB,
  Rect,
  Size,
  Point,
  WindowInfo,
  ExtendedWindowInfo,
} from "./actions";

/**
 * Windows API wrapper for screen and window operations.
 * Provides methods for pixel color detection, window management, and utilities.
 *
 * @example
 * ```typescript
 * import { windows } from "winput";
 *
 * // Get screen size
 * const { width, height } = windows.screen.getScreenSize();
 *
 * // Get active window
 * const active = windows.window.getActiveWindow();
 * console.log(active?.title);
 *
 * // Check pixel color
 * const color = windows.screen.getPixel(100, 100);
 * ```
 */
class Windows {
  /**
   * Screen-related functions for pixel operations and screen information.
   */
  screen = {
    /**
     * Get the screen dimensions.
     * @returns {{ width: number, height: number }} Screen width and height in pixels
     */
    getScreenSize: actions.getScreenSize,

    /**
     * Get the RGB color of a pixel at the specified coordinates.
     * @param x - X coordinate
     * @param y - Y coordinate
     * @returns {RGB | null} RGB color object or null if failed
     */
    getPixel: actions.getPixel,

    /**
     * Get the hex color code of a pixel at the specified coordinates.
     * @param x - X coordinate
     * @param y - Y coordinate
     * @returns {string | null} Hex color string (e.g., "#FF0000") or null if failed
     */
    getPixelHex: actions.getPixelHex,

    /**
     * Check if a pixel matches a target color within tolerance.
     * @param x - X coordinate
     * @param y - Y coordinate
     * @param target - Target RGB color to match
     * @param tolerance - Color tolerance (0-255, default: 0)
     * @returns {boolean} True if pixel matches target color
     */
    checkPixel: actions.checkPixel,

    /**
     * Wait for a pixel to match a target color.
     * @param x - X coordinate
     * @param y - Y coordinate
     * @param target - Target RGB color to match
     * @param tolerance - Color tolerance (0-255, default: 0)
     * @param timeout - Maximum wait time in ms (optional, waits indefinitely if not set)
     * @returns {Promise<boolean>} Resolves true when matched, false on timeout
     */
    waitForPixel: actions.waitForPixel,

    /**
     * Get RGB colors for multiple pixel positions at once.
     * @param positions - Array of {x, y} coordinates
     * @returns {(RGB | null)[]} Array of RGB colors (null for failed reads)
     */
    getMultiplePixels: actions.getMultiplePixels,

    /**
     * Check if all pixels match their target colors.
     * @param checks - Array of pixel checks with x, y, target RGB, and optional tolerance
     * @returns {boolean} True if all pixels match their targets
     */
    checkMultiplePixels: actions.checkMultiplePixels,

    /**
     * Wait for any of the pixel conditions to match.
     * @param checks - Array of pixel checks with x, y, target RGB, and optional tolerance
     * @param timeout - Maximum wait time in ms (optional)
     * @returns {Promise<number>} Index of first matched condition, or -1 on timeout
     */
    waitForAnyPixel: actions.waitForAnyPixel,
  };

  /**
   * Window management functions for controlling and querying windows.
   */
  window = {
    /**
     * Get information about the currently active (foreground) window.
     * @returns {WindowInfo | null} Window info including hwnd, title, rect, isFullscreen
     */
    getActiveWindow: actions.getActiveWindow,

    /**
     * Get the title of a window by its handle.
     * @param hwnd - Window handle (optional, uses active window if not provided)
     * @returns {string} Window title
     */
    getWindowTitle: actions.getWindowTitle,

    /**
     * Get the bounding rectangle of a window.
     * @param hwnd - Window handle
     * @returns {Rect | null} Window rectangle (left, top, right, bottom)
     */
    getWindowRect: actions.getWindowRect,

    /**
     * Get the client area rectangle of a window.
     * @param hwnd - Window handle
     * @returns {Rect | null} Client rectangle (left, top, right, bottom)
     */
    getClientRect: actions.getClientRect,

    /**
     * Get the size of a window.
     * @param hwnd - Window handle
     * @returns {Size | null} Window size (width, height)
     */
    getWindowSize: actions.getWindowSize,

    /**
     * Get the client area size of a window.
     * @param hwnd - Window handle
     * @returns {Size | null} Client size (width, height)
     */
    getClientSize: actions.getClientSize,

    /**
     * Check if a window is visible.
     * @param hwnd - Window handle
     * @returns {boolean} True if window is visible
     */
    isWindowVisible: actions.isWindowVisible,

    /**
     * Check if a window is minimized.
     * @param hwnd - Window handle
     * @returns {boolean} True if window is minimized
     */
    isWindowMinimized: actions.isWindowMinimized,

    /**
     * Check if a window is maximized.
     * @param hwnd - Window handle
     * @returns {boolean} True if window is maximized
     */
    isWindowMaximized: actions.isWindowMaximized,

    /**
     * Check if a window handle is valid.
     * @param hwnd - Window handle
     * @returns {boolean} True if window exists
     */
    isWindow: actions.isWindow,

    /**
     * Bring a window to the foreground.
     * @param hwnd - Window handle
     * @returns {boolean} True if successful
     */
    setForeground: actions.setForeground,

    /**
     * Focus a window and wait for it to become the foreground window.
     * @param hwnd - Window handle
     * @param timeout - Maximum wait time in ms (default: 1000)
     * @returns {Promise<boolean>} True if window became foreground
     */
    focusWindow: actions.focusWindow,

    /**
     * Find a window by its exact title.
     * @param title - Window title to search for
     * @returns {number | null} Window handle or null if not found
     */
    findWindow: actions.findWindow,

    /**
     * Wait for a window with the specified title to appear.
     * @param title - Window title to wait for
     * @param timeout - Maximum wait time in ms (optional)
     * @returns {Promise<number | null>} Window handle or null on timeout
     */
    waitForWindow: actions.waitForWindow,

    /**
     * Wait for a window to close.
     * @param hwnd - Window handle
     * @param timeout - Maximum wait time in ms (optional)
     * @returns {Promise<boolean>} True if window closed, false on timeout
     */
    waitForWindowClose: actions.waitForWindowClose,

    /**
     * Get the process ID of a window.
     * @param hwnd - Window handle
     * @returns {number} Process ID
     */
    getWindowProcessId: actions.getWindowProcessId,

    /**
     * Get the class name of a window.
     * @param hwnd - Window handle
     * @returns {string} Window class name
     */
    getClassName: actions.getClassName,

    /**
     * Get extended information about a window.
     * @param hwnd - Window handle
     * @returns {ExtendedWindowInfo | null} Extended window info including processId, className, states
     */
    getExtendedWindowInfo: actions.getExtendedWindowInfo,

    /**
     * Minimize a window.
     * @param hwnd - Window handle
     * @returns {boolean} True if successful
     */
    minimizeWindow: actions.minimizeWindow,

    /**
     * Maximize a window.
     * @param hwnd - Window handle
     * @returns {boolean} True if successful
     */
    maximizeWindow: actions.maximizeWindow,

    /**
     * Restore a window from minimized or maximized state.
     * @param hwnd - Window handle
     * @returns {boolean} True if successful
     */
    restoreWindow: actions.restoreWindow,

    /**
     * Show a hidden window.
     * @param hwnd - Window handle
     * @returns {boolean} True if successful
     */
    showWindow: actions.showWindow,

    /**
     * Hide a window.
     * @param hwnd - Window handle
     * @returns {boolean} True if successful
     */
    hideWindow: actions.hideWindow,

    /**
     * Close a window by sending WM_CLOSE message.
     * @param hwnd - Window handle
     * @returns {boolean} True if message was sent
     */
    closeWindow: actions.closeWindow,

    /**
     * Move and/or resize a window.
     * @param hwnd - Window handle
     * @param x - New X position
     * @param y - New Y position
     * @param width - New width
     * @param height - New height
     * @param repaint - Whether to repaint after moving (default: true)
     * @returns {boolean} True if successful
     */
    moveWindow: actions.moveWindow,
  };

  /**
   * Utility functions for color conversion and async helpers.
   */
  utils = {
    /**
     * Convert RGB color to hex string.
     * @param rgb - RGB color object
     * @returns {string} Hex color string (e.g., "#FF0000")
     */
    rgbToHex: actions.rgbToHex,

    /**
     * Convert hex color string to RGB object.
     * @param hex - Hex color string (e.g., "#FF0000" or "FF0000")
     * @returns {RGB} RGB color object
     */
    hexToRgb: actions.hexToRgb,

    /**
     * Calculate Euclidean distance between two colors.
     * @param c1 - First RGB color
     * @param c2 - Second RGB color
     * @returns {number} Color distance (0-441.67)
     */
    colorDistance: actions.colorDistance,

    /**
     * Async sleep/delay helper.
     * @param ms - Milliseconds to sleep
     * @returns {Promise<void>} Resolves after specified delay
     */
    sleep: actions.sleep,
  };
}

export const windows = new Windows();

