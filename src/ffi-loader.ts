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
  GetSystemMetrics: {
    args: [FFIType.i32],
    returns: FFIType.i32,
  },
  GetKeyState: {
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
})
