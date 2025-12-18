import { dlopen, FFIType, suffix } from "bun:ffi";

export const user32 = dlopen(`user32.${suffix}`, {
  SendInput: {
    args: [FFIType.u32, FFIType.ptr, FFIType.i32],
    returns: FFIType.u32,
  },
  MapVirtualKeyW: {
    args: [FFIType.u32, FFIType.u32],
    returns: FFIType.u32,
  },
  GetCursorPos: {
    args: [FFIType.ptr],
    returns: FFIType.bool,
  },
  GetKeyState: {
    args: [FFIType.i32],
    returns: FFIType.i16,
  },
  GetAsyncKeyState: {
    args: [FFIType.i32],
    returns: FFIType.i16,
  },
  SetWindowsHookExW: {
    args: [FFIType.i32, FFIType.ptr, FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  UnhookWindowsHookEx: {
    args: [FFIType.ptr],
    returns: FFIType.bool,
  },
  CallNextHookEx: {
    args: [FFIType.ptr, FFIType.i32, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  GetDC: { args: [FFIType.ptr], returns: FFIType.u64 },
  ReleaseDC: { args: [FFIType.u64, FFIType.u64], returns: FFIType.int },
  GetDesktopWindow: { args: [], returns: FFIType.ptr },
  GetForegroundWindow: { args: [], returns: FFIType.u64 },
  GetWindowTextW: {
    args: [FFIType.u64, FFIType.ptr, FFIType.int],
    returns: FFIType.int,
  },
  GetWindowRect: { args: [FFIType.u64, FFIType.ptr], returns: FFIType.bool },
  GetSystemMetrics: { args: [FFIType.int], returns: FFIType.int },
  SetLayeredWindowAttributes: {
    args: [FFIType.u64, FFIType.uint32_t, FFIType.int8_t, FFIType.uint32_t],
    returns: FFIType.bool,
  },
  UpdateLayeredWindow: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.uint32_t,
      FFIType.ptr,
      FFIType.uint32_t,
    ],
    returns: FFIType.bool,
  },
  GetWindowLongW: { args: [FFIType.u64, FFIType.int], returns: FFIType.int },
  SetWindowLongW: {
    args: [FFIType.u64, FFIType.int, FFIType.int],
    returns: FFIType.int,
  },
  CreateWindowExW: {
    args: [
      FFIType.uint32_t,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.uint32_t,
      FFIType.int,
      FFIType.int,
      FFIType.int,
      FFIType.int,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.ptr,
  },
  ShowWindow: { args: [FFIType.u64, FFIType.int], returns: FFIType.bool },
  UpdateWindow: { args: [FFIType.u64], returns: FFIType.bool },
  SetWindowPos: {
    args: [
      FFIType.u64,
      FFIType.u64,
      FFIType.int,
      FFIType.int,
      FFIType.int,
      FFIType.int,
      FFIType.uint32_t,
    ],
    returns: FFIType.bool,
  },
  FindWindowA: { args: [FFIType.ptr, FFIType.ptr], returns: FFIType.u64 },
  FillRect: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.int,
  },
  IsWindow: {
    args: [FFIType.u64],
    returns: FFIType.bool,
  },
  SetForegroundWindow: {
    args: [FFIType.u64],
    returns: FFIType.bool,
  },
  IsWindowVisible: {
    args: [FFIType.u64],
    returns: FFIType.bool,
  },
  GetWindowThreadProcessId: {
    args: [FFIType.u64, FFIType.ptr],
    returns: FFIType.u32,
  },
  MoveWindow: {
    args: [
      FFIType.u64,
      FFIType.int,
      FFIType.int,
      FFIType.int,
      FFIType.int,
      FFIType.bool,
    ],
    returns: FFIType.bool,
  },
  GetClientRect: {
    args: [FFIType.u64, FFIType.ptr],
    returns: FFIType.bool,
  },
  PostMessageA: {
    args: [FFIType.u64, FFIType.u32, FFIType.u64, FFIType.u64],
    returns: FFIType.bool,
  },
  GetClassNameA: {
    args: [FFIType.u64, FFIType.ptr, FFIType.int],
    returns: FFIType.int,
  },
  SetWindowTextW: {
    args: [FFIType.u64, FFIType.ptr],
    returns: FFIType.bool,
  },
  EnableWindow: {
    args: [FFIType.u64, FFIType.bool],
    returns: FFIType.bool,
  },
  RedrawWindow: {
    args: [FFIType.u64, FFIType.ptr, FFIType.u64, FFIType.u32],
    returns: FFIType.bool,
  },
  ClientToScreen: {
    args: [FFIType.u64, FFIType.ptr],
    returns: FFIType.bool,
  },
  ScreenToClient: {
    args: [FFIType.u64, FFIType.ptr],
    returns: FFIType.bool,
  },
  SendMessageA: {
    args: [FFIType.u64, FFIType.u32, FFIType.u64, FFIType.u64],
    returns: FFIType.ptr,
  },
  IsIconic: {
    args: [FFIType.u64],
    returns: FFIType.bool,
  },
  IsZoomed: {
    args: [FFIType.u64],
    returns: FFIType.bool,
  },
  EnumWindows: {
    args: [FFIType.function, FFIType.i64],
    returns: FFIType.bool,
  },
  EnumChildWindows: {
    args: [FFIType.u64, FFIType.function, FFIType.i64],
    returns: FFIType.bool,
  },
  FlashWindow: {
    args: [FFIType.u64, FFIType.bool],
    returns: FFIType.bool,
  },
  PrintWindow: {
    args: [FFIType.u64, FFIType.u64, FFIType.u32],
    returns: FFIType.bool,
  },
  GetWindowDC: {
    args: [FFIType.u64],
    returns: FFIType.u64,
  },
  LoadImageW: {
    args: [
      FFIType.u64,
      FFIType.ptr,
      FFIType.uint32_t,
      FFIType.int,
      FFIType.int,
      FFIType.uint32_t,
    ],
    returns: FFIType.u64,
  },
});

export const gdi32 = dlopen("gdi32.dll", {
  GetPixel: {
    args: [FFIType.u64, FFIType.int, FFIType.int],
    returns: FFIType.uint32_t,
  },
  CreatePen: {
    args: [FFIType.int, FFIType.int, FFIType.uint32_t],
    returns: FFIType.u64,
  },
  SelectObject: { args: [FFIType.u64, FFIType.u64], returns: FFIType.u64 },
  MoveToEx: {
    args: [FFIType.u64, FFIType.int, FFIType.int, FFIType.ptr],
    returns: FFIType.bool,
  },
  LineTo: {
    args: [FFIType.u64, FFIType.int, FFIType.int],
    returns: FFIType.bool,
  },
  DeleteObject: { args: [FFIType.u64], returns: FFIType.bool },

  CreateCompatibleDC: { args: [FFIType.u64], returns: FFIType.u64 },
  CreateDIBSection: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.uint32_t,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.uint32_t,
    ],
    returns: FFIType.ptr,
  },
  DeleteDC: { args: [FFIType.u64], returns: FFIType.bool },
  CreateSolidBrush: { args: [FFIType.uint32_t], returns: FFIType.u64 },
  CreateCompatibleBitmap: {
    args: [FFIType.u64, FFIType.int, FFIType.int],
    returns: FFIType.u64,
  },
  BitBlt: {
    args: [
      FFIType.u64,
      FFIType.int,
      FFIType.int,
      FFIType.int,
      FFIType.int,
      FFIType.u64,
      FFIType.int,
      FFIType.int,
      FFIType.uint32_t,
    ],
    returns: FFIType.bool,
  },
  GetDIBits: {
    args: [
      FFIType.u64,
      FFIType.u64,
      FFIType.u32,
      FFIType.u32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.u32,
    ],
    returns: FFIType.int,
  },
  GetObjectA: {
    args: [FFIType.ptr, FFIType.int, FFIType.ptr],
    returns: FFIType.int,
  },
});

export const kernel32 = dlopen(`kernel32.${suffix}`, {
  GetLastError: {
    args: [],
    returns: FFIType.u32,
  },
  OpenProcess: {
    args: [FFIType.u32, FFIType.bool, FFIType.u32],
    returns: FFIType.u64,
  },
  CloseHandle: {
    args: [FFIType.u64],
    returns: FFIType.bool,
  },
  QueryFullProcessImageNameW: {
    args: [FFIType.u64, FFIType.u32, FFIType.ptr, FFIType.ptr],
    returns: FFIType.bool,
  },
});
