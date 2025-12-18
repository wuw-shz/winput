import { user32, gdi32 } from "../core/ffi-loader";
import { ptr, type Pointer, CString } from "bun:ffi";

// ==================== Types ====================

export interface RGB { r: number; g: number; b: number }
export interface Rect { left: number; top: number; right: number; bottom: number }
export interface Size { width: number; height: number }
export interface Point { x: number; y: number }
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

// ==================== Constants ====================

const SW_MINIMIZE = 6;
const SW_MAXIMIZE = 3;
const SW_RESTORE = 9;
const SW_HIDE = 0;
const SW_SHOW = 5;
const WM_CLOSE = 0x0010;
const GWL_STYLE = -16;
const WS_MINIMIZE = 0x20000000;
const WS_MAXIMIZE = 0x01000000;

// ==================== Internal Helpers ====================

const textDecoder = new TextDecoder("utf-16le");

function numToPtr(n: number): Pointer {
  return ptr(new Uint8Array(new BigInt64Array([BigInt(n)]).buffer));
}

// DC caching for pixel operations
let cachedDC: Pointer | null = null;
let dcTime = 0;
function getDC(): Pointer | null {
  if (cachedDC && Date.now() - dcTime < 1000) return cachedDC;
  if (cachedDC) user32.symbols.ReleaseDC(null, cachedDC);
  cachedDC = user32.symbols.GetDC(null);
  dcTime = Date.now();
  return cachedDC;
}

// ==================== Screen Functions ====================

/** Get screen size */
export function getScreenSize() {
  return {
    width: user32.symbols.GetSystemMetrics(0),
    height: user32.symbols.GetSystemMetrics(1),
  };
}

/** Get pixel color as RGB */
export function getPixel(x: number, y: number): RGB | null {
  const dc = getDC();
  if (!dc) return null;
  const c = gdi32.symbols.GetPixel(dc, x, y);
  return { r: c & 0xff, g: (c >> 8) & 0xff, b: (c >> 16) & 0xff };
}

/** Get pixel color as hex (#RRGGBB) */
export function getPixelHex(x: number, y: number): string | null {
  const rgb = getPixel(x, y);
  if (!rgb) return null;
  const h = (n: number) => n.toString(16).padStart(2, "0");
  return `#${h(rgb.r)}${h(rgb.g)}${h(rgb.b)}`.toUpperCase();
}

/** Check if pixel matches target color */
export function checkPixel(x: number, y: number, target: RGB, tolerance = 0): boolean {
  const p = getPixel(x, y);
  if (!p) return false;
  return Math.abs(p.r - target.r) <= tolerance &&
         Math.abs(p.g - target.g) <= tolerance &&
         Math.abs(p.b - target.b) <= tolerance;
}

/** Wait for pixel to match color */
export function waitForPixel(x: number, y: number, target: RGB, tolerance = 0, timeout?: number): Promise<boolean> {
  return new Promise(resolve => {
    let elapsed = 0;
    const id = setInterval(() => {
      if (checkPixel(x, y, target, tolerance)) { clearInterval(id); resolve(true); return; }
      if (timeout && (elapsed += 50) >= timeout) { clearInterval(id); resolve(false); }
    }, 50);
  });
}

// ==================== Window Functions ====================

/** Get active window info */
export function getActiveWindow(): WindowInfo | null {
  const hwnd = user32.symbols.GetForegroundWindow();
  if (!hwnd) return null;

  const titleBuf = new Uint16Array(256);
  const len = user32.symbols.GetWindowTextW(hwnd, ptr(titleBuf), 256);
  const title = len > 0 ? textDecoder.decode(titleBuf.subarray(0, len)) : "";

  const rectBuf = new Int32Array(4);
  if (!user32.symbols.GetWindowRect(hwnd, ptr(rectBuf))) return null;
  
  const rect = { left: rectBuf[0], top: rectBuf[1], right: rectBuf[2], bottom: rectBuf[3] };
  const screen = getScreenSize();
  const isFullscreen = rect.left === 0 && rect.top === 0 &&
    (rect.right - rect.left) === screen.width &&
    (rect.bottom - rect.top) === screen.height &&
    !((user32.symbols.GetWindowLongW(hwnd, -16) & 0x00c40000) !== 0);

  return { hwnd: Number(hwnd), title, rect, isFullscreen };
}

/** Get window title by hwnd (or active window) */
export function getWindowTitle(hwnd?: number): string {
  const h = hwnd !== undefined ? numToPtr(hwnd) : user32.symbols.GetForegroundWindow();
  if (!h) return "";
  const buf = new Uint16Array(256);
  const len = user32.symbols.GetWindowTextW(h, ptr(buf), 256);
  return len > 0 ? textDecoder.decode(buf.subarray(0, len)) : "";
}

/** Get window rect by hwnd */
export function getWindowRect(hwnd: number): Rect | null {
  const buf = new Int32Array(4);
  if (!user32.symbols.GetWindowRect(numToPtr(hwnd), ptr(buf))) return null;
  return { left: buf[0], top: buf[1], right: buf[2], bottom: buf[3] };
}

/** Check if window is visible */
export function isWindowVisible(hwnd: number): boolean {
  return user32.symbols.IsWindowVisible(numToPtr(hwnd));
}

/** Bring window to foreground */
export function setForeground(hwnd: number): boolean {
  return user32.symbols.SetForegroundWindow(numToPtr(hwnd));
}

/** Find window by title */
export function findWindow(title: string): number | null {
  const bytes = new TextEncoder().encode(title + "\0");
  const result = user32.symbols.FindWindowA(null, ptr(bytes));
  return result ? Number(result) : null;
}

/** Wait for window to appear */
export function waitForWindow(title: string, timeout?: number): Promise<number | null> {
  return new Promise(resolve => {
    let elapsed = 0;
    const id = setInterval(() => {
      const hwnd = findWindow(title);
      if (hwnd) { clearInterval(id); resolve(hwnd); return; }
      if (timeout && (elapsed += 100) >= timeout) { clearInterval(id); resolve(null); }
    }, 100);
  });
}

// ==================== Utility Functions ====================

export function rgbToHex(rgb: RGB): string {
  const h = (n: number) => n.toString(16).padStart(2, "0");
  return `#${h(rgb.r)}${h(rgb.g)}${h(rgb.b)}`.toUpperCase();
}

export function hexToRgb(hex: string): RGB {
  const c = hex.replace("#", "");
  return {
    r: parseInt(c.substring(0, 2), 16),
    g: parseInt(c.substring(2, 4), 16),
    b: parseInt(c.substring(4, 6), 16),
  };
}

/** Calculate Euclidean distance between two colors */
export function colorDistance(c1: RGB, c2: RGB): number {
  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
    Math.pow(c1.g - c2.g, 2) +
    Math.pow(c1.b - c2.b, 2)
  );
}

/** Async sleep helper */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ==================== Additional Screen Functions ====================

/** Get multiple pixel colors at once */
export function getMultiplePixels(positions: Point[]): (RGB | null)[] {
  return positions.map(p => getPixel(p.x, p.y));
}

/** Check if all pixels match their target colors */
export function checkMultiplePixels(checks: Array<{ x: number; y: number; target: RGB; tolerance?: number }>): boolean {
  return checks.every(c => checkPixel(c.x, c.y, c.target, c.tolerance ?? 0));
}

/** Wait for any of the pixel conditions to match */
export function waitForAnyPixel(
  checks: Array<{ x: number; y: number; target: RGB; tolerance?: number }>,
  timeout?: number
): Promise<number> {
  return new Promise(resolve => {
    let elapsed = 0;
    const id = setInterval(() => {
      for (let i = 0; i < checks.length; i++) {
        const c = checks[i];
        if (checkPixel(c.x, c.y, c.target, c.tolerance ?? 0)) {
          clearInterval(id);
          resolve(i);
          return;
        }
      }
      if (timeout && (elapsed += 50) >= timeout) {
        clearInterval(id);
        resolve(-1);
      }
    }, 50);
  });
}

// ==================== Additional Window Functions ====================

/** Get window process ID */
export function getWindowProcessId(hwnd: number): number {
  const buf = new Uint32Array(1);
  user32.symbols.GetWindowThreadProcessId(numToPtr(hwnd), ptr(buf));
  return buf[0];
}

/** Get window class name */
const asciiDecoder = new TextDecoder("ascii");

export function getClassName(hwnd: number): string {
  const buf = new Uint8Array(256);
  const len = user32.symbols.GetClassNameA(numToPtr(hwnd), ptr(buf), 256);
  return len > 0 ? asciiDecoder.decode(buf.subarray(0, len)) : "";
}

/** Check if window is minimized */
export function isWindowMinimized(hwnd: number): boolean {
  return user32.symbols.IsIconic(numToPtr(hwnd));
}

/** Check if window is maximized */
export function isWindowMaximized(hwnd: number): boolean {
  return user32.symbols.IsZoomed(numToPtr(hwnd));
}

/** Minimize a window */
export function minimizeWindow(hwnd: number): boolean {
  return user32.symbols.ShowWindow(numToPtr(hwnd), SW_MINIMIZE);
}

/** Maximize a window */
export function maximizeWindow(hwnd: number): boolean {
  return user32.symbols.ShowWindow(numToPtr(hwnd), SW_MAXIMIZE);
}

/** Restore a window (from minimized/maximized) */
export function restoreWindow(hwnd: number): boolean {
  return user32.symbols.ShowWindow(numToPtr(hwnd), SW_RESTORE);
}

/** Show a window */
export function showWindow(hwnd: number): boolean {
  return user32.symbols.ShowWindow(numToPtr(hwnd), SW_SHOW);
}

/** Hide a window */
export function hideWindow(hwnd: number): boolean {
  return user32.symbols.ShowWindow(numToPtr(hwnd), SW_HIDE);
}

/** Close a window by posting WM_CLOSE */
export function closeWindow(hwnd: number): boolean {
  return user32.symbols.PostMessageA(numToPtr(hwnd), WM_CLOSE, null, null);
}

/** Move and/or resize a window */
export function moveWindow(hwnd: number, x: number, y: number, width: number, height: number, repaint = true): boolean {
  return user32.symbols.MoveWindow(numToPtr(hwnd), x, y, width, height, repaint);
}

/** Get window client area rect */
export function getClientRect(hwnd: number): Rect | null {
  const buf = new Int32Array(4);
  if (!user32.symbols.GetClientRect(numToPtr(hwnd), ptr(buf))) return null;
  return { left: buf[0], top: buf[1], right: buf[2], bottom: buf[3] };
}

/** Get window size (width and height) */
export function getWindowSize(hwnd: number): Size | null {
  const rect = getWindowRect(hwnd);
  if (!rect) return null;
  return { width: rect.right - rect.left, height: rect.bottom - rect.top };
}

/** Get window client size (width and height) */
export function getClientSize(hwnd: number): Size | null {
  const rect = getClientRect(hwnd);
  if (!rect) return null;
  return { width: rect.right - rect.left, height: rect.bottom - rect.top };
}

/** Check if window exists (is valid) */
export function isWindow(hwnd: number): boolean {
  return user32.symbols.IsWindow(numToPtr(hwnd));
}

/** Get extended window info */
export function getExtendedWindowInfo(hwnd: number): ExtendedWindowInfo | null {
  if (!isWindow(hwnd)) return null;
  
  const h = numToPtr(hwnd);
  
  // Title
  const titleBuf = new Uint16Array(256);
  const titleLen = user32.symbols.GetWindowTextW(h, ptr(titleBuf), 256);
  const title = titleLen > 0 ? textDecoder.decode(titleBuf.subarray(0, titleLen)) : "";
  
  // Rect
  const rectBuf = new Int32Array(4);
  if (!user32.symbols.GetWindowRect(h, ptr(rectBuf))) return null;
  const rect = { left: rectBuf[0], top: rectBuf[1], right: rectBuf[2], bottom: rectBuf[3] };
  
  // Fullscreen check
  const screen = getScreenSize();
  const isFullscreen = rect.left === 0 && rect.top === 0 &&
    (rect.right - rect.left) === screen.width &&
    (rect.bottom - rect.top) === screen.height &&
    !((user32.symbols.GetWindowLongW(h, GWL_STYLE) & 0x00c40000) !== 0);
  
  // Process ID
  const pidBuf = new Uint32Array(1);
  user32.symbols.GetWindowThreadProcessId(h, ptr(pidBuf));
  
  // Class name
  const classBuf = new Uint8Array(256);
  const classLen = user32.symbols.GetClassNameA(h, ptr(classBuf), 256);
  const className = classLen > 0 ? asciiDecoder.decode(classBuf.subarray(0, classLen)) : "";
  
  return {
    hwnd,
    title,
    rect,
    isFullscreen,
    processId: pidBuf[0],
    isVisible: user32.symbols.IsWindowVisible(h),
    isMinimized: user32.symbols.IsIconic(h),
    isMaximized: user32.symbols.IsZoomed(h),
    className,
  };
}

/** Wait for window to close */
export function waitForWindowClose(hwnd: number, timeout?: number): Promise<boolean> {
  return new Promise(resolve => {
    let elapsed = 0;
    const id = setInterval(() => {
      if (!isWindow(hwnd)) { clearInterval(id); resolve(true); return; }
      if (timeout && (elapsed += 100) >= timeout) { clearInterval(id); resolve(false); }
    }, 100);
  });
}

/** Focus window and wait for it to be in foreground */
export async function focusWindow(hwnd: number, timeout = 1000): Promise<boolean> {
  setForeground(hwnd);
  let elapsed = 0;
  while (elapsed < timeout) {
    const active = getActiveWindow();
    if (active && active.hwnd === hwnd) return true;
    await sleep(50);
    elapsed += 50;
  }
  return false;
}
