import { dlopen, FFIType, suffix } from 'bun:ffi'

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
    GetDC: { args: [FFIType.ptr], returns: FFIType.ptr },
  ReleaseDC: { args: [FFIType.ptr, FFIType.ptr], returns: FFIType.int },
  GetDesktopWindow: { args: [], returns: FFIType.ptr },
  GetForegroundWindow: { args: [], returns: FFIType.ptr },
  GetWindowTextW: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.int],
    returns: FFIType.int,
  },
  GetWindowRect: { args: [FFIType.ptr, FFIType.ptr], returns: FFIType.bool },
  GetSystemMetrics: { args: [FFIType.int], returns: FFIType.int },
  SetLayeredWindowAttributes: {
    args: [FFIType.ptr, FFIType.uint32_t, FFIType.int8_t, FFIType.uint32_t],
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
  GetWindowLongW: { args: [FFIType.ptr, FFIType.int], returns: FFIType.int },
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
  ShowWindow: { args: [FFIType.ptr, FFIType.int], returns: FFIType.bool },
  UpdateWindow: { args: [FFIType.ptr], returns: FFIType.bool },
  SetWindowPos: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.int,
      FFIType.int,
      FFIType.int,
      FFIType.int,
      FFIType.uint32_t,
    ],
    returns: FFIType.bool,
  },
  FindWindowA: { args: [FFIType.ptr, FFIType.ptr], returns: FFIType.ptr },
  FillRect: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.int,
  },
  IsWindow: {
    args: [FFIType.ptr],
    returns: FFIType.bool,
  },
  SetForegroundWindow: {
    args: [FFIType.ptr],
    returns: FFIType.bool,
  },
  IsWindowVisible: {
    args: [FFIType.ptr],
    returns: FFIType.bool,
  },
  GetWindowThreadProcessId: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.u32,
  },
  MoveWindow: {
    args: [FFIType.ptr, FFIType.int, FFIType.int, FFIType.int, FFIType.int, FFIType.bool],
    returns: FFIType.bool,
  },
  GetClientRect: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.bool,
  },
  PostMessageA: {
    args: [FFIType.ptr, FFIType.u32, FFIType.ptr, FFIType.ptr],
    returns: FFIType.bool,
  },
  GetClassNameA: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.int],
    returns: FFIType.int,
  },
  SendMessageA: {
    args: [FFIType.ptr, FFIType.u32, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  IsIconic: {
    args: [FFIType.ptr],
    returns: FFIType.bool,
  },
  IsZoomed: {
    args: [FFIType.ptr],
    returns: FFIType.bool,
  },
})


export const gdi32 = dlopen("gdi32.dll", {
  GetPixel: {
    args: [FFIType.ptr, FFIType.int, FFIType.int],
    returns: FFIType.uint32_t,
  },
  CreatePen: {
    args: [FFIType.int, FFIType.int, FFIType.uint32_t],
    returns: FFIType.ptr,
  },
  SelectObject: { args: [FFIType.ptr, FFIType.ptr], returns: FFIType.ptr },
  MoveToEx: {
    args: [FFIType.ptr, FFIType.int, FFIType.int, FFIType.ptr],
    returns: FFIType.bool,
  },
  LineTo: {
    args: [FFIType.ptr, FFIType.int, FFIType.int],
    returns: FFIType.bool,
  },
  DeleteObject: { args: [FFIType.ptr], returns: FFIType.bool },

  CreateCompatibleDC: { args: [FFIType.ptr], returns: FFIType.ptr },
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
  DeleteDC: { args: [FFIType.ptr], returns: FFIType.bool },
  CreateSolidBrush: { args: [FFIType.uint32_t], returns: FFIType.ptr },
  CreateCompatibleBitmap: {
    args: [FFIType.ptr, FFIType.int, FFIType.int],
    returns: FFIType.ptr,
  },
  BitBlt: {
    args: [
      FFIType.ptr,
      FFIType.int,
      FFIType.int,
      FFIType.int,
      FFIType.int,
      FFIType.ptr,
      FFIType.int,
      FFIType.int,
      FFIType.uint32_t,
    ],
    returns: FFIType.bool,
  },
});
