export interface RGB {
    r: number;
    g: number;
    b: number;
}
export interface Rect {
    left: number;
    top: number;
    right: number;
    bottom: number;
}
export interface Size {
    width: number;
    height: number;
}
export interface Point {
    x: number;
    y: number;
}
export interface WindowInfo {
    hwnd: number;
    title: string;
    rect: Rect;
    isFullscreen: boolean;
}
export interface ExtendedWindowInfo extends WindowInfo {
    processId: number;
    isVisible: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    className: string;
}
/** Get screen size */
export declare function getScreenSize(): {
    width: number;
    height: number;
};
/** Get pixel color as RGB */
export declare function getPixel(x: number, y: number): RGB | null;
/** Get pixel color as hex (#RRGGBB) */
export declare function getPixelHex(x: number, y: number): string | null;
/** Check if pixel matches target color */
export declare function checkPixel(x: number, y: number, target: RGB, tolerance?: number): boolean;
/** Wait for pixel to match color */
export declare function waitForPixel(x: number, y: number, target: RGB, tolerance?: number, timeout?: number): Promise<boolean>;
/** Get active window info */
export declare function getActiveWindow(): WindowInfo | null;
/** Get window title by hwnd (or active window) */
export declare function getWindowTitle(hwnd?: number): string;
/** Get window rect by hwnd */
export declare function getWindowRect(hwnd: number): Rect | null;
/** Check if window is visible */
export declare function isWindowVisible(hwnd: number): boolean;
/** Bring window to foreground */
export declare function setForeground(hwnd: number): boolean;
/** Find window by title */
export declare function findWindow(title: string): number | null;
/** Wait for window to appear */
export declare function waitForWindow(title: string, timeout?: number): Promise<number | null>;
export declare function rgbToHex(rgb: RGB): string;
export declare function hexToRgb(hex: string): RGB;
/** Calculate Euclidean distance between two colors */
export declare function colorDistance(c1: RGB, c2: RGB): number;
/** Async sleep helper */
export declare function sleep(ms: number): Promise<void>;
/** Get multiple pixel colors at once */
export declare function getMultiplePixels(positions: Point[]): (RGB | null)[];
/** Check if all pixels match their target colors */
export declare function checkMultiplePixels(checks: Array<{
    x: number;
    y: number;
    target: RGB;
    tolerance?: number;
}>): boolean;
/** Wait for any of the pixel conditions to match */
export declare function waitForAnyPixel(checks: Array<{
    x: number;
    y: number;
    target: RGB;
    tolerance?: number;
}>, timeout?: number): Promise<number>;
/** Get window process ID */
export declare function getWindowProcessId(hwnd: number): number;
export declare function getClassName(hwnd: number): string;
/** Check if window is minimized */
export declare function isWindowMinimized(hwnd: number): boolean;
/** Check if window is maximized */
export declare function isWindowMaximized(hwnd: number): boolean;
/** Minimize a window */
export declare function minimizeWindow(hwnd: number): boolean;
/** Maximize a window */
export declare function maximizeWindow(hwnd: number): boolean;
/** Restore a window (from minimized/maximized) */
export declare function restoreWindow(hwnd: number): boolean;
/** Show a window */
export declare function showWindow(hwnd: number): boolean;
/** Hide a window */
export declare function hideWindow(hwnd: number): boolean;
/** Close a window by posting WM_CLOSE */
export declare function closeWindow(hwnd: number): boolean;
/** Move and/or resize a window */
export declare function moveWindow(hwnd: number, x: number, y: number, width: number, height: number, repaint?: boolean): boolean;
/** Get window client area rect */
export declare function getClientRect(hwnd: number): Rect | null;
/** Get window size (width and height) */
export declare function getWindowSize(hwnd: number): Size | null;
/** Get window client size (width and height) */
export declare function getClientSize(hwnd: number): Size | null;
/** Check if window exists (is valid) */
export declare function isWindow(hwnd: number): boolean;
/** Get extended window info */
export declare function getExtendedWindowInfo(hwnd: number): ExtendedWindowInfo | null;
/** Wait for window to close */
export declare function waitForWindowClose(hwnd: number, timeout?: number): Promise<boolean>;
/** Focus window and wait for it to be in foreground */
export declare function focusWindow(hwnd: number, timeout?: number): Promise<boolean>;
//# sourceMappingURL=actions.d.ts.map