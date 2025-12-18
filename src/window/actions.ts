import { user32, kernel32 } from "../core/ffi-loader";
import { ptr, JSCallback } from "bun:ffi";
import type {
  WindowInfo,
  ExtendedWindowInfo,
  Rect,
  Size,
} from "../types/windows";
import { getScreenSize } from "../screen/actions";

// ==================== Constants ====================

const SW_MINIMIZE = 6;
const HWND_BOTTOM = 1;
const HWND_TOP = 0;
const RDW_INVALIDATE = 0x0001;
const RDW_ERASE = 0x0004;
const RDW_UPDATENOW = 0x0100;
const PROCESS_QUERY_LIMITED_INFORMATION = 0x1000;
const SW_MAXIMIZE = 3;
const SW_RESTORE = 9;
const SW_HIDE = 0;
const SW_SHOW = 5;
const WM_CLOSE = 0x0010;
const GWL_STYLE = -16;
const GWL_EXSTYLE = -20;
const WS_EX_LAYERED = 0x80000;
const WS_EX_TOPMOST = 0x8;
const LWA_ALPHA = 0x2;
const HWND_TOPMOST = -1;
const HWND_NOTOPMOST = -2;
const SWP_NOMOVE = 0x0002;
const SWP_NOSIZE = 0x0001;
const FLASHW_ALL = 0x00000003;
const FLASHW_TIMERNOFG = 0x0000000c;

// ==================== Internal Helpers ====================

const textDecoder = new TextDecoder("utf-16le");
const asciiDecoder = new TextDecoder("ascii");

// ==================== Window Functions ====================

export function getActiveWindow(): WindowInfo | null {
  const hwnd = user32.symbols.GetForegroundWindow();
  if (!hwnd) return null;

  const titleBuf = new Uint16Array(256);
  const len = user32.symbols.GetWindowTextW(hwnd, ptr(titleBuf), 256);
  const title = len > 0 ? textDecoder.decode(titleBuf.subarray(0, len)) : "";

  const rectBuf = new Int32Array(4);
  if (!user32.symbols.GetWindowRect(hwnd, ptr(rectBuf))) return null;

  const rect = {
    left: rectBuf[0],
    top: rectBuf[1],
    right: rectBuf[2],
    bottom: rectBuf[3],
  };
  const screen = getScreenSize();
  const isFullscreen =
    rect.left === 0 &&
    rect.top === 0 &&
    rect.right - rect.left === screen.width &&
    rect.bottom - rect.top === screen.height &&
    !((user32.symbols.GetWindowLongW(hwnd, -16) & 0x00c40000) !== 0);

  return { hwnd, title, rect, isFullscreen };
}

export function getWindowTitle(hwnd?: number | bigint): string {
  const h =
    hwnd !== undefined ? BigInt(hwnd) : user32.symbols.GetForegroundWindow();
  if (!h) return "";
  const buf = new Uint16Array(256);
  const len = user32.symbols.GetWindowTextW(h, ptr(buf), 256);
  return len > 0 ? textDecoder.decode(buf.subarray(0, len)) : "";
}

export function getWindowRect(hwnd: number | bigint): Rect | null {
  const buf = new Int32Array(4);
  if (!user32.symbols.GetWindowRect(BigInt(hwnd), ptr(buf))) return null;
  return { left: buf[0], top: buf[1], right: buf[2], bottom: buf[3] };
}

export function isWindowVisible(hwnd: number | bigint): boolean {
  return user32.symbols.IsWindowVisible(BigInt(hwnd));
}

export function setForeground(hwnd: number | bigint): boolean {
  return user32.symbols.SetForegroundWindow(BigInt(hwnd));
}

export function findWindow(title: string): bigint | null {
  const bytes = new TextEncoder().encode(title + "\0");
  const result = user32.symbols.FindWindowA(null, ptr(bytes));
  return result ? result : null;
}

export function waitForWindow(
  title: string,
  timeout?: number
): Promise<bigint | null> {
  return new Promise((resolve) => {
    let elapsed = 0;
    const id = setInterval(() => {
      const hwnd = findWindow(title);
      if (hwnd) {
        clearInterval(id);
        resolve(hwnd);
        return;
      }
      if (timeout && (elapsed += 100) >= timeout) {
        clearInterval(id);
        resolve(null);
      }
    }, 100);
  });
}

export function getWindowProcessId(hwnd: number | bigint): number {
  const buf = new Uint32Array(1);
  user32.symbols.GetWindowThreadProcessId(BigInt(hwnd), ptr(buf));
  return buf[0];
}

export function getClassName(hwnd: number | bigint): string {
  const buf = new Uint8Array(256);
  const len = user32.symbols.GetClassNameA(BigInt(hwnd), ptr(buf), 256);
  return len > 0 ? asciiDecoder.decode(buf.subarray(0, len)) : "";
}

export function isWindowMinimized(hwnd: number | bigint): boolean {
  return user32.symbols.IsIconic(BigInt(hwnd));
}

export function isWindowMaximized(hwnd: number | bigint): boolean {
  return user32.symbols.IsZoomed(BigInt(hwnd));
}

export function minimizeWindow(hwnd: number | bigint): boolean {
  return user32.symbols.ShowWindow(BigInt(hwnd), SW_MINIMIZE);
}

export function maximizeWindow(hwnd: number | bigint): boolean {
  return user32.symbols.ShowWindow(BigInt(hwnd), SW_MAXIMIZE);
}

export function restoreWindow(hwnd: number | bigint): boolean {
  return user32.symbols.ShowWindow(BigInt(hwnd), SW_RESTORE);
}

export function showWindow(hwnd: number | bigint): boolean {
  return user32.symbols.ShowWindow(BigInt(hwnd), SW_SHOW);
}

export function hideWindow(hwnd: number | bigint): boolean {
  return user32.symbols.ShowWindow(BigInt(hwnd), SW_HIDE);
}

export function closeWindow(hwnd: number | bigint): boolean {
  return user32.symbols.PostMessageA(BigInt(hwnd), WM_CLOSE, null, null);
}

export function moveWindow(
  hwnd: number | bigint,
  x: number,
  y: number,
  width: number,
  height: number,
  repaint = true
): boolean {
  return user32.symbols.MoveWindow(BigInt(hwnd), x, y, width, height, repaint);
}

export function centerWindow(hwnd: number | bigint): boolean {
  const rect = getWindowRect(hwnd);
  if (!rect) return false;

  const width = rect.right - rect.left;
  const height = rect.bottom - rect.top;
  const screen = getScreenSize();

  const x = Math.floor((screen.width - width) / 2);
  const y = Math.floor((screen.height - height) / 2);

  return moveWindow(hwnd, x, y, width, height, true);
}

export function getClientRect(hwnd: number | bigint): Rect | null {
  const buf = new Int32Array(4);
  if (!user32.symbols.GetClientRect(BigInt(hwnd), ptr(buf))) return null;
  return { left: buf[0], top: buf[1], right: buf[2], bottom: buf[3] };
}

export function getWindowSize(hwnd: number | bigint): Size | null {
  const rect = getWindowRect(hwnd);
  if (!rect) return null;
  return { width: rect.right - rect.left, height: rect.bottom - rect.top };
}

export function getClientSize(hwnd: number | bigint): Size | null {
  const rect = getClientRect(hwnd);
  if (!rect) return null;
  return { width: rect.right - rect.left, height: rect.bottom - rect.top };
}

export function isWindow(hwnd: number | bigint): boolean {
  return user32.symbols.IsWindow(BigInt(hwnd));
}

export function getExtendedWindowInfo(
  hwnd: number | bigint
): ExtendedWindowInfo | null {
  if (!isWindow(hwnd)) return null;

  const h = BigInt(hwnd);

  const titleBuf = new Uint16Array(256);
  const titleLen = user32.symbols.GetWindowTextW(h, ptr(titleBuf), 256);
  const title =
    titleLen > 0 ? textDecoder.decode(titleBuf.subarray(0, titleLen)) : "";

  const rectBuf = new Int32Array(4);
  if (!user32.symbols.GetWindowRect(h, ptr(rectBuf))) return null;
  const rect = {
    left: rectBuf[0],
    top: rectBuf[1],
    right: rectBuf[2],
    bottom: rectBuf[3],
  };

  const screen = getScreenSize();
  const isFullscreen =
    rect.left === 0 &&
    rect.top === 0 &&
    rect.right - rect.left === screen.width &&
    rect.bottom - rect.top === screen.height &&
    !((user32.symbols.GetWindowLongW(h, GWL_STYLE) & 0x00c40000) !== 0);

  const pidBuf = new Uint32Array(1);
  user32.symbols.GetWindowThreadProcessId(h, ptr(pidBuf));

  const classBuf = new Uint8Array(256);
  const classLen = user32.symbols.GetClassNameA(h, ptr(classBuf), 256);
  const className =
    classLen > 0 ? asciiDecoder.decode(classBuf.subarray(0, classLen)) : "";

  return {
    hwnd: h,
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

export function waitForWindowClose(
  hwnd: number | bigint,
  timeout?: number
): Promise<boolean> {
  return new Promise((resolve) => {
    let elapsed = 0;
    const id = setInterval(() => {
      if (!isWindow(hwnd)) {
        clearInterval(id);
        resolve(true);
        return;
      }
      if (timeout && (elapsed += 100) >= timeout) {
        clearInterval(id);
        resolve(false);
      }
    }, 100);
  });
}

export async function focusWindow(
  hwnd: number | bigint,
  timeout = 1000
): Promise<boolean> {
  setForeground(hwnd);
  let elapsed = 0;
  while (elapsed < timeout) {
    const active = getActiveWindow();
    if (active && active.hwnd === BigInt(hwnd)) return true;
    await Bun.sleep(50);
    elapsed += 50;
  }
  return false;
}

export function enumWindows(): ExtendedWindowInfo[] {
  const windows: ExtendedWindowInfo[] = [];
  const callback = new JSCallback(
    (hwnd: bigint, _lParam: bigint) => {
      const info = getExtendedWindowInfo(hwnd);
      if (info && info.isVisible && info.title) {
        windows.push(info);
      }
      return true;
    },
    {
      args: ["u64", "i64"],
      returns: "bool",
    }
  );

  user32.symbols.EnumWindows(callback.ptr, 0);
  callback.close();
  return windows;
}

export function enumChildWindows(parentHwnd: number | bigint): bigint[] {
  const children: bigint[] = [];
  const callback = new JSCallback(
    (hwnd: bigint, _lParam: bigint) => {
      children.push(hwnd);
      return true;
    },
    {
      args: ["u64", "i64"],
      returns: "bool",
    }
  );

  user32.symbols.EnumChildWindows(BigInt(parentHwnd), callback.ptr, 0);
  callback.close();
  return children;
}

export function flashWindow(hwnd: number | bigint, invert = true): boolean {
  return user32.symbols.FlashWindow(BigInt(hwnd), invert);
}

export function setWindowOpacity(
  hwnd: number | bigint,
  opacity: number
): boolean {
  const h = BigInt(hwnd);
  const exStyle = user32.symbols.GetWindowLongW(h, GWL_EXSTYLE);
  user32.symbols.SetWindowLongW(h, GWL_EXSTYLE, exStyle | WS_EX_LAYERED);

  const alpha = Math.max(0, Math.min(255, Math.floor(opacity * 255)));
  return user32.symbols.SetLayeredWindowAttributes(h, 0, alpha, LWA_ALPHA);
}

export function setWindowTopmost(
  hwnd: number | bigint,
  enable: boolean
): boolean {
  return user32.symbols.SetWindowPos(
    BigInt(hwnd),
    BigInt(enable ? HWND_TOPMOST : HWND_NOTOPMOST),
    0,
    0,
    0,
    0,
    SWP_NOMOVE | SWP_NOSIZE
  );
}

export function setWindowTitle(hwnd: number | bigint, title: string): boolean {
  const buf = new Uint16Array(title.length + 1);
  const encoded = new TextEncoder().encodeInto(
    title,
    new Uint8Array(buf.buffer)
  );
  const buffer = Buffer.from(title + "\0", "utf16le");
  return user32.symbols.SetWindowTextW(BigInt(hwnd), ptr(buffer));
}

export function setWindowEnabled(
  hwnd: number | bigint,
  enabled: boolean
): boolean {
  return user32.symbols.EnableWindow(BigInt(hwnd), enabled);
}

export function redrawWindow(hwnd: number | bigint): boolean {
  return user32.symbols.RedrawWindow(
    BigInt(hwnd),
    null,
    0n,
    RDW_INVALIDATE | RDW_ERASE | RDW_UPDATENOW
  );
}

export function moveWindowToBottom(hwnd: number | bigint): boolean {
  return user32.symbols.SetWindowPos(
    BigInt(hwnd),
    BigInt(HWND_BOTTOM),
    0,
    0,
    0,
    0,
    SWP_NOMOVE | SWP_NOSIZE
  );
}

export function moveWindowToTop(hwnd: number | bigint): boolean {
  return user32.symbols.SetWindowPos(
    BigInt(hwnd),
    BigInt(HWND_TOP),
    0,
    0,
    0,
    0,
    SWP_NOMOVE | SWP_NOSIZE
  );
}

export function getWindowProcessPath(hwnd: number | bigint): string {
  const pid = getWindowProcessId(hwnd);
  if (!pid) return "";

  const hProcess = kernel32.symbols.OpenProcess(
    PROCESS_QUERY_LIMITED_INFORMATION,
    false,
    pid
  );

  if (!hProcess) return "";

  try {
    const buf = new Uint16Array(1024);
    const sizeBuf = new Uint32Array([1024]);
    const success = kernel32.symbols.QueryFullProcessImageNameW(
      hProcess,
      0,
      ptr(buf),
      ptr(sizeBuf)
    );

    if (success) {
      return textDecoder.decode(buf.subarray(0, sizeBuf[0]));
    }
    return "";
  } finally {
    kernel32.symbols.CloseHandle(hProcess);
  }
}

export function clientToScreen(
  hwnd: number | bigint,
  x: number,
  y: number
): { x: number; y: number } | null {
  const point = new Int32Array([x, y]);
  if (user32.symbols.ClientToScreen(BigInt(hwnd), ptr(point))) {
    return { x: point[0], y: point[1] };
  }
  return null;
}

export function screenToClient(
  hwnd: number | bigint,
  x: number,
  y: number
): { x: number; y: number } | null {
  const point = new Int32Array([x, y]);
  if (user32.symbols.ScreenToClient(BigInt(hwnd), ptr(point))) {
    return { x: point[0], y: point[1] };
  }
  return null;
}
