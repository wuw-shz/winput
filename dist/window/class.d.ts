import * as actions from "./actions";
/**
 * Window management functions for controlling and querying windows.
 */
declare class Window {
    /**
     * Get information about the currently active (foreground) window.
     * @returns {WindowInfo | null} Window info including hwnd, title, rect, isFullscreen
     */
    getActiveWindow: typeof actions.getActiveWindow;
    /**
     * Get the title of a window by its handle.
     * @param hwnd - Window handle (optional, uses active window if not provided)
     * @returns {string} Window title
     */
    getWindowTitle: typeof actions.getWindowTitle;
    /**
     * Get the bounding rectangle of a window.
     * @param hwnd - Window handle
     * @returns {Rect | null} Window rectangle (left, top, right, bottom)
     */
    getWindowRect: typeof actions.getWindowRect;
    /**
     * Get the client area rectangle of a window.
     * @param hwnd - Window handle
     * @returns {Rect | null} Client rectangle (left, top, right, bottom)
     */
    getClientRect: typeof actions.getClientRect;
    /**
     * Get the size of a window.
     * @param hwnd - Window handle
     * @returns {Size | null} Window size (width, height)
     */
    getWindowSize: typeof actions.getWindowSize;
    /**
     * Get the client area size of a window.
     * @param hwnd - Window handle
     * @returns {Size | null} Client size (width, height)
     */
    getClientSize: typeof actions.getClientSize;
    /**
     * Check if a window is visible.
     * @param hwnd - Window handle
     * @returns {boolean} True if window is visible
     */
    isWindowVisible: typeof actions.isWindowVisible;
    /**
     * Check if a window is minimized.
     * @param hwnd - Window handle
     * @returns {boolean} True if window is minimized
     */
    isWindowMinimized: typeof actions.isWindowMinimized;
    /**
     * Check if a window is maximized.
     * @param hwnd - Window handle
     * @returns {boolean} True if window is maximized
     */
    isWindowMaximized: typeof actions.isWindowMaximized;
    /**
     * Check if a window handle is valid.
     * @param hwnd - Window handle
     * @returns {boolean} True if window exists
     */
    isWindow: typeof actions.isWindow;
    /**
     * Bring a window to the foreground.
     * @param hwnd - Window handle
     * @returns {boolean} True if successful
     */
    setForeground: typeof actions.setForeground;
    /**
     * Focus a window and wait for it to become the foreground window.
     * @param hwnd - Window handle
     * @param timeout - Maximum wait time in ms (default: 1000)
     * @returns {Promise<boolean>} True if window became foreground
     */
    focusWindow: typeof actions.focusWindow;
    /**
     * Find a window by its exact title.
     * @param title - Window title to search for
     * @returns {number | null} Window handle or null if not found
     */
    findWindow: typeof actions.findWindow;
    /**
     * Wait for a window with the specified title to appear.
     * @param title - Window title to wait for
     * @param timeout - Maximum wait time in ms (optional)
     * @returns {Promise<number | null>} Window handle or null on timeout
     */
    waitForWindow: typeof actions.waitForWindow;
    /**
     * Wait for a window to close.
     * @param hwnd - Window handle
     * @param timeout - Maximum wait time in ms (optional)
     * @returns {Promise<boolean>} True if window closed, false on timeout
     */
    waitForWindowClose: typeof actions.waitForWindowClose;
    /**
     * Get the process ID of a window.
     * @param hwnd - Window handle
     * @returns {number} Process ID
     */
    getWindowProcessId: typeof actions.getWindowProcessId;
    /**
     * Get the class name of a window.
     * @param hwnd - Window handle
     * @returns {string} Window class name
     */
    getClassName: typeof actions.getClassName;
    /**
     * Get extended information about a window.
     * @param hwnd - Window handle
     * @returns {ExtendedWindowInfo | null} Extended window info including processId, className, states
     */
    getExtendedWindowInfo: typeof actions.getExtendedWindowInfo;
    /**
     * Minimize a window.
     * @param hwnd - Window handle
     * @returns {boolean} True if successful
     */
    minimizeWindow: typeof actions.minimizeWindow;
    /**
     * Maximize a window.
     * @param hwnd - Window handle
     * @returns {boolean} True if successful
     */
    maximizeWindow: typeof actions.maximizeWindow;
    /**
     * Restore a window from minimized or maximized state.
     * @param hwnd - Window handle
     * @returns {boolean} True if successful
     */
    restoreWindow: typeof actions.restoreWindow;
    /**
     * Show a hidden window.
     * @param hwnd - Window handle
     * @returns {boolean} True if successful
     */
    showWindow: typeof actions.showWindow;
    /**
     * Hide a window.
     * @param hwnd - Window handle
     * @returns {boolean} True if successful
     */
    hideWindow: typeof actions.hideWindow;
    /**
     * Close a window by sending WM_CLOSE message.
     * @param hwnd - Window handle
     * @returns {boolean} True if message was sent
     */
    closeWindow: typeof actions.closeWindow;
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
    moveWindow: typeof actions.moveWindow;
    /**
     * Enumerate all visible windows.
     * @returns {ExtendedWindowInfo[]} Array of window info
     */
    enumWindows: typeof actions.enumWindows;
    /**
     * Enumerate child windows of a parent window.
     * @param parentHwnd - Parent window handle
     * @returns {number[]} Array of child window handles
     */
    enumChildWindows: typeof actions.enumChildWindows;
    /**
     * Flash the window to attract attention.
     * @param hwnd - Window handle
     * @param invert - Whether to invert the caption (default: true)
     * @returns {boolean} True if successful
     */
    flashWindow: typeof actions.flashWindow;
    /**
     * Set the opacity of a window (makes it layered).
     * @param hwnd - Window handle
     * @param opacity - Opacity from 0.0 (transparent) to 1.0 (opaque)
     * @returns {boolean} True if successful
     */
    setOpacity: typeof actions.setWindowOpacity;
    /**
     * Set the window to always be on top.
     * @param hwnd - Window handle
     * @param enable - True to enable topmost, false to disable
     * @returns {boolean} True if successful
     */
    setTopmost: typeof actions.setWindowTopmost;
    /**
     * Center the window on the primary screen.
     * @param hwnd - Window handle
     * @returns {boolean} True if successful
     */
    center: typeof actions.centerWindow;
    /**
     * Set the title of the window.
     * @param hwnd - Window handle
     * @param title - New title
     * @returns {boolean} True if successful
     */
    setTitle: typeof actions.setWindowTitle;
    /**
     * Enable or disable mouse and keyboard input to the specified window.
     * @param hwnd - Window handle
     * @param enabled - True to enable, false to disable
     * @returns {boolean} True if successful
     */
    setEnabled: typeof actions.setWindowEnabled;
    /**
     * Update the specified window by adding a rectangle to its update region.
     * @param hwnd - Window handle
     * @returns {boolean} True if successful
     */
    redraw: typeof actions.redrawWindow;
    /**
     * Send the window to the bottom of the Z-order.
     * @param hwnd - Window handle
     * @returns {boolean} True if successful
     */
    moveToBottom: typeof actions.moveWindowToBottom;
    /**
     * Bring the window to the top of the Z-order.
     * @param hwnd - Window handle
     * @returns {boolean} True if successful
     */
    moveToTop: typeof actions.moveWindowToTop;
    /**
     * Retrieve the full path of the executable that created the window.
     * @param hwnd - Window handle
     * @returns {string} Full path to the executable
     */
    getProcessPath: typeof actions.getWindowProcessPath;
    /**
     * Convert client coordinates to screen coordinates.
     * @param hwnd - Window handle
     * @param x - Client X
     * @param y - Client Y
     * @returns {{x: number, y: number} | null} Screen coordinates
     */
    clientToScreen: typeof actions.clientToScreen;
    /**
     * Convert screen coordinates to client coordinates.
     * @param hwnd - Window handle
     * @param x - Screen X
     * @param y - Screen Y
     * @returns {{x: number, y: number} | null} Client coordinates
     */
    screenToClient: typeof actions.screenToClient;
    /**
     * Activate (focus and restore) a window.
     * @param hwnd - Window handle
     * @returns {boolean} True if successful
     */
    activate: typeof actions.activateWindow;
    /**
     * Wait for a window to become active.
     * @param hwnd - Window handle
     * @param timeout - Timeout in ms
     * @returns {Promise<boolean>} True if activated
     */
    waitActive: typeof actions.waitActiveWindow;
    /**
     * Wait for a window to lose focus.
     * @param hwnd - Window handle
     * @param timeout - Timeout in ms
     * @returns {Promise<boolean>} True if deactivated
     */
    waitNotActive: typeof actions.waitNotActiveWindow;
    /**
     * Force kill a window's process.
     * @param hwnd - Window handle
     * @returns {boolean} True if successful
     */
    kill: typeof actions.killWindow;
    /**
     * Get window style flags.
     * @param hwnd - Window handle
     * @returns {number} Style flags
     */
    getStyle: typeof actions.getWindowStyle;
    /**
     * Set window style flags.
     * @param hwnd - Window handle
     * @param style - New style flags
     * @returns {number} Previous style
     */
    setStyle: typeof actions.setWindowStyle;
    /**
     * Get window extended style flags.
     * @param hwnd - Window handle
     * @returns {number} Extended style flags
     */
    getExStyle: typeof actions.getWindowExStyle;
    /**
     * Set window extended style flags.
     * @param hwnd - Window handle
     * @param style - New extended style flags
     * @returns {number} Previous extended style
     */
    setExStyle: typeof actions.setWindowExStyle;
    /**
     * Get window min/max state.
     * @param hwnd - Window handle
     * @returns {number} -1 (min), 0 (normal), 1 (max)
     */
    getMinMax: typeof actions.getWindowMinMax;
    /**
     * Get list of all visible window handles.
     * @returns {bigint[]} Array of handles
     */
    getList: typeof actions.getWindowList;
    /**
     * Get count of visible windows.
     * @returns {number} Count
     */
    getCount: typeof actions.getWindowCount;
    /**
     * Minimize all windows.
     */
    minimizeAll: typeof actions.minimizeAll;
    /**
     * Get process name of window owner.
     * @param hwnd - Window handle
     * @returns {string} Process name (e.g. "notepad.exe")
     */
    getProcessName: typeof actions.getWindowProcessName;
    /**
     * Get all text from window and children.
     * @param hwnd - Window handle
     * @returns {string} Combined text
     */
    getText: typeof actions.getWindowText;
    /**
     * Set the region of a window (change its shape).
     */
    readonly setRegion: {
        /**
         * Set a rectangular region.
         * @param hwnd - Window handle
         * @param x - X coordinate
         * @param y - Y coordinate
         * @param w - Width
         * @param h - Height
         * @param redraw - Redraw window (default: true)
         */
        rect: typeof actions.setWindowRegionRect;
        /**
         * Set an elliptical region.
         * @param hwnd - Window handle
         * @param x - X coordinate
         * @param y - Y coordinate
         * @param w - Width
         * @param h - Height
         * @param redraw - Redraw window (default: true)
         */
        ellipse: typeof actions.setWindowRegionEllipse;
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
        round: typeof actions.setWindowRegionRound;
        /**
         * Set a polygonal region.
         * @param hwnd - Window handle
         * @param points - Array of points {x, y}
         * @param fillMode - Fill mode (1=ALTERNATE, 2=WINDING) (default: 1)
         * @param redraw - Redraw window (default: true)
         */
        polygon: typeof actions.setWindowRegionPolygon;
        /**
         * Reset the window region (restore normal shape).
         * @param hwnd - Window handle
         * @param redraw - Redraw window (default: true)
         */
        reset: typeof actions.resetWindowRegion;
    };
}
export declare const window: Window;
export {};
//# sourceMappingURL=class.d.ts.map