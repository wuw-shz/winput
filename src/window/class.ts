import * as actions from "./actions";

/**
 * Window management functions for controlling and querying windows.
 */
class Window {
  /**
   * Get information about the currently active (foreground) window.
   * @returns {WindowInfo | null} Window info including hwnd, title, rect, isFullscreen
   */
  getActiveWindow = actions.getActiveWindow;

  /**
   * Get the title of a window by its handle.
   * @param hwnd - Window handle (optional, uses active window if not provided)
   * @returns {string} Window title
   */
  getWindowTitle = actions.getWindowTitle;

  /**
   * Get the bounding rectangle of a window.
   * @param hwnd - Window handle
   * @returns {Rect | null} Window rectangle (left, top, right, bottom)
   */
  getWindowRect = actions.getWindowRect;

  /**
   * Get the client area rectangle of a window.
   * @param hwnd - Window handle
   * @returns {Rect | null} Client rectangle (left, top, right, bottom)
   */
  getClientRect = actions.getClientRect;

  /**
   * Get the size of a window.
   * @param hwnd - Window handle
   * @returns {Size | null} Window size (width, height)
   */
  getWindowSize = actions.getWindowSize;

  /**
   * Get the client area size of a window.
   * @param hwnd - Window handle
   * @returns {Size | null} Client size (width, height)
   */
  getClientSize = actions.getClientSize;

  /**
   * Check if a window is visible.
   * @param hwnd - Window handle
   * @returns {boolean} True if window is visible
   */
  isWindowVisible = actions.isWindowVisible;

  /**
   * Check if a window is minimized.
   * @param hwnd - Window handle
   * @returns {boolean} True if window is minimized
   */
  isWindowMinimized = actions.isWindowMinimized;

  /**
   * Check if a window is maximized.
   * @param hwnd - Window handle
   * @returns {boolean} True if window is maximized
   */
  isWindowMaximized = actions.isWindowMaximized;

  /**
   * Check if a window handle is valid.
   * @param hwnd - Window handle
   * @returns {boolean} True if window exists
   */
  isWindow = actions.isWindow;

  /**
   * Bring a window to the foreground.
   * @param hwnd - Window handle
   * @returns {boolean} True if successful
   */
  setForeground = actions.setForeground;

  /**
   * Focus a window and wait for it to become the foreground window.
   * @param hwnd - Window handle
   * @param timeout - Maximum wait time in ms (default: 1000)
   * @returns {Promise<boolean>} True if window became foreground
   */
  focusWindow = actions.focusWindow;

  /**
   * Find a window by its exact title.
   * @param title - Window title to search for
   * @returns {number | null} Window handle or null if not found
   */
  findWindow = actions.findWindow;

  /**
   * Wait for a window with the specified title to appear.
   * @param title - Window title to wait for
   * @param timeout - Maximum wait time in ms (optional)
   * @returns {Promise<number | null>} Window handle or null on timeout
   */
  waitForWindow = actions.waitForWindow;

  /**
   * Wait for a window to close.
   * @param hwnd - Window handle
   * @param timeout - Maximum wait time in ms (optional)
   * @returns {Promise<boolean>} True if window closed, false on timeout
   */
  waitForWindowClose = actions.waitForWindowClose;

  /**
   * Get the process ID of a window.
   * @param hwnd - Window handle
   * @returns {number} Process ID
   */
  getWindowProcessId = actions.getWindowProcessId;

  /**
   * Get the class name of a window.
   * @param hwnd - Window handle
   * @returns {string} Window class name
   */
  getClassName = actions.getClassName;

  /**
   * Get extended information about a window.
   * @param hwnd - Window handle
   * @returns {ExtendedWindowInfo | null} Extended window info including processId, className, states
   */
  getExtendedWindowInfo = actions.getExtendedWindowInfo;

  /**
   * Minimize a window.
   * @param hwnd - Window handle
   * @returns {boolean} True if successful
   */
  minimizeWindow = actions.minimizeWindow;

  /**
   * Maximize a window.
   * @param hwnd - Window handle
   * @returns {boolean} True if successful
   */
  maximizeWindow = actions.maximizeWindow;

  /**
   * Restore a window from minimized or maximized state.
   * @param hwnd - Window handle
   * @returns {boolean} True if successful
   */
  restoreWindow = actions.restoreWindow;

  /**
   * Show a hidden window.
   * @param hwnd - Window handle
   * @returns {boolean} True if successful
   */
  showWindow = actions.showWindow;

  /**
   * Hide a window.
   * @param hwnd - Window handle
   * @returns {boolean} True if successful
   */
  hideWindow = actions.hideWindow;

  /**
   * Close a window by sending WM_CLOSE message.
   * @param hwnd - Window handle
   * @returns {boolean} True if message was sent
   */
  closeWindow = actions.closeWindow;

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
  moveWindow = actions.moveWindow;

  /**
   * Enumerate all visible windows.
   * @returns {ExtendedWindowInfo[]} Array of window info
   */
  enumWindows = actions.enumWindows;

  /**
   * Enumerate child windows of a parent window.
   * @param parentHwnd - Parent window handle
   * @returns {number[]} Array of child window handles
   */
  enumChildWindows = actions.enumChildWindows;

  /**
   * Flash the window to attract attention.
   * @param hwnd - Window handle
   * @param invert - Whether to invert the caption (default: true)
   * @returns {boolean} True if successful
   */
  flashWindow = actions.flashWindow;

  /**
   * Set the opacity of a window (makes it layered).
   * @param hwnd - Window handle
   * @param opacity - Opacity from 0.0 (transparent) to 1.0 (opaque)
   * @returns {boolean} True if successful
   */
  setOpacity = actions.setWindowOpacity;

  /**
   * Set the window to always be on top.
   * @param hwnd - Window handle
   * @param enable - True to enable topmost, false to disable
   * @returns {boolean} True if successful
   */
  setTopmost = actions.setWindowTopmost;

  /**
   * Center the window on the primary screen.
   * @param hwnd - Window handle
   * @returns {boolean} True if successful
   */
  center = actions.centerWindow;

  /**
   * Set the title of the window.
   * @param hwnd - Window handle
   * @param title - New title
   * @returns {boolean} True if successful
   */
  setTitle = actions.setWindowTitle;

  /**
   * Enable or disable mouse and keyboard input to the specified window.
   * @param hwnd - Window handle
   * @param enabled - True to enable, false to disable
   * @returns {boolean} True if successful
   */
  setEnabled = actions.setWindowEnabled;

  /**
   * Update the specified window by adding a rectangle to its update region.
   * @param hwnd - Window handle
   * @returns {boolean} True if successful
   */
  redraw = actions.redrawWindow;

  /**
   * Send the window to the bottom of the Z-order.
   * @param hwnd - Window handle
   * @returns {boolean} True if successful
   */
  moveToBottom = actions.moveWindowToBottom;

  /**
   * Bring the window to the top of the Z-order.
   * @param hwnd - Window handle
   * @returns {boolean} True if successful
   */
  moveToTop = actions.moveWindowToTop;

  /**
   * Retrieve the full path of the executable that created the window.
   * @param hwnd - Window handle
   * @returns {string} Full path to the executable
   */
  getProcessPath = actions.getWindowProcessPath;

  /**
   * Convert client coordinates to screen coordinates.
   * @param hwnd - Window handle
   * @param x - Client X
   * @param y - Client Y
   * @returns {{x: number, y: number} | null} Screen coordinates
   */
  clientToScreen = actions.clientToScreen;

  /**
   * Convert screen coordinates to client coordinates.
   * @param hwnd - Window handle
   * @param x - Screen X
   * @param y - Screen Y
   * @returns {{x: number, y: number} | null} Client coordinates
   */
  screenToClient = actions.screenToClient;

  /**
   * Activate (focus and restore) a window.
   * @param hwnd - Window handle
   * @returns {boolean} True if successful
   */
  activate = actions.activateWindow;

  /**
   * Wait for a window to become active.
   * @param hwnd - Window handle
   * @param timeout - Timeout in ms
   * @returns {Promise<boolean>} True if activated
   */
  waitActive = actions.waitActiveWindow;

  /**
   * Wait for a window to lose focus.
   * @param hwnd - Window handle
   * @param timeout - Timeout in ms
   * @returns {Promise<boolean>} True if deactivated
   */
  waitNotActive = actions.waitNotActiveWindow;

  /**
   * Force kill a window's process.
   * @param hwnd - Window handle
   * @returns {boolean} True if successful
   */
  kill = actions.killWindow;

  /**
   * Get window style flags.
   * @param hwnd - Window handle
   * @returns {number} Style flags
   */
  getStyle = actions.getWindowStyle;

  /**
   * Set window style flags.
   * @param hwnd - Window handle
   * @param style - New style flags
   * @returns {number} Previous style
   */
  setStyle = actions.setWindowStyle;

  /**
   * Get window extended style flags.
   * @param hwnd - Window handle
   * @returns {number} Extended style flags
   */
  getExStyle = actions.getWindowExStyle;

  /**
   * Set window extended style flags.
   * @param hwnd - Window handle
   * @param style - New extended style flags
   * @returns {number} Previous extended style
   */
  setExStyle = actions.setWindowExStyle;

  /**
   * Get window min/max state.
   * @param hwnd - Window handle
   * @returns {number} -1 (min), 0 (normal), 1 (max)
   */
  getMinMax = actions.getWindowMinMax;

  /**
   * Get list of all visible window handles.
   * @returns {bigint[]} Array of handles
   */
  getList = actions.getWindowList;

  /**
   * Get count of visible windows.
   * @returns {number} Count
   */
  getCount = actions.getWindowCount;

  /**
   * Minimize all windows.
   */
  minimizeAll = actions.minimizeAll;

  /**
   * Get process name of window owner.
   * @param hwnd - Window handle
   * @returns {string} Process name (e.g. "notepad.exe")
   */
  getProcessName = actions.getWindowProcessName;

  /**
   * Get all text from window and children.
   * @param hwnd - Window handle
   * @returns {string} Combined text
   */
  getText = actions.getWindowText;

  /**
   * Set the region of a window (change its shape).
   */
  readonly setRegion = {
    /**
     * Set a rectangular region.
     * @param hwnd - Window handle
     * @param x - X coordinate
     * @param y - Y coordinate
     * @param w - Width
     * @param h - Height
     * @param redraw - Redraw window (default: true)
     */
    rect: actions.setWindowRegionRect,
    /**
     * Set an elliptical region.
     * @param hwnd - Window handle
     * @param x - X coordinate
     * @param y - Y coordinate
     * @param w - Width
     * @param h - Height
     * @param redraw - Redraw window (default: true)
     */
    ellipse: actions.setWindowRegionEllipse,
    /**
     * Set a rounded rectangular region.
     * @param hwnd - Window handle
     * @param x - X coordinate
     * @param y - Y coordinate
     * @param w - Width
     * @param h - Height
     * @param rw - Width of ellipse used for rounded corners
     * @param rh - Height of ellipse used for rounded corners
     * @param redraw - Redraw window (default: true)
     */
    round: actions.setWindowRegionRound,
    /**
     * Set a polygonal region.
     * @param hwnd - Window handle
     * @param points - Array of points {x, y}
     * @param fillMode - Fill mode (1=ALTERNATE, 2=WINDING) (default: 1)
     * @param redraw - Redraw window (default: true)
     */
    polygon: actions.setWindowRegionPolygon,
    /**
     * Reset the window region (restore normal shape).
     * @param hwnd - Window handle
     * @param redraw - Redraw window (default: true)
     */
    reset: actions.resetWindowRegion,
  };
}


export const window = new Window();
