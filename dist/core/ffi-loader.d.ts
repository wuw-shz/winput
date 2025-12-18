import { FFIType } from 'bun:ffi';
export declare const user32: import("bun:ffi").Library<{
    SendInput: {
        args: (FFIType.int32_t | FFIType.uint32_t | FFIType.ptr)[];
        returns: FFIType.uint32_t;
    };
    MapVirtualKeyW: {
        args: FFIType.uint32_t[];
        returns: FFIType.uint32_t;
    };
    GetCursorPos: {
        args: FFIType.ptr[];
        returns: FFIType.bool;
    };
    GetKeyState: {
        args: FFIType.int32_t[];
        returns: FFIType.int16_t;
    };
    GetAsyncKeyState: {
        args: FFIType.int32_t[];
        returns: FFIType.int16_t;
    };
    SetWindowsHookExW: {
        args: (FFIType.int32_t | FFIType.uint32_t | FFIType.ptr)[];
        returns: FFIType.ptr;
    };
    UnhookWindowsHookEx: {
        args: FFIType.ptr[];
        returns: FFIType.bool;
    };
    CallNextHookEx: {
        args: (FFIType.int32_t | FFIType.ptr)[];
        returns: FFIType.ptr;
    };
    GetDC: {
        args: FFIType.ptr[];
        returns: FFIType.ptr;
    };
    ReleaseDC: {
        args: FFIType.ptr[];
        returns: FFIType.int32_t;
    };
    GetDesktopWindow: {
        args: any[];
        returns: FFIType.ptr;
    };
    GetForegroundWindow: {
        args: any[];
        returns: FFIType.ptr;
    };
    GetWindowTextW: {
        args: (FFIType.int32_t | FFIType.ptr)[];
        returns: FFIType.int32_t;
    };
    GetWindowRect: {
        args: FFIType.ptr[];
        returns: FFIType.bool;
    };
    GetSystemMetrics: {
        args: FFIType.int32_t[];
        returns: FFIType.int32_t;
    };
    SetLayeredWindowAttributes: {
        args: (FFIType.int8_t | FFIType.uint32_t | FFIType.ptr)[];
        returns: FFIType.bool;
    };
    UpdateLayeredWindow: {
        args: (FFIType.uint32_t | FFIType.ptr)[];
        returns: FFIType.bool;
    };
    GetWindowLongW: {
        args: (FFIType.int32_t | FFIType.ptr)[];
        returns: FFIType.int32_t;
    };
    CreateWindowExW: {
        args: (FFIType.int32_t | FFIType.uint32_t | FFIType.ptr)[];
        returns: FFIType.ptr;
    };
    ShowWindow: {
        args: (FFIType.int32_t | FFIType.ptr)[];
        returns: FFIType.bool;
    };
    UpdateWindow: {
        args: FFIType.ptr[];
        returns: FFIType.bool;
    };
    SetWindowPos: {
        args: (FFIType.int32_t | FFIType.uint32_t | FFIType.ptr)[];
        returns: FFIType.bool;
    };
    FindWindowA: {
        args: FFIType.ptr[];
        returns: FFIType.ptr;
    };
    FillRect: {
        args: FFIType.ptr[];
        returns: FFIType.int32_t;
    };
    IsWindow: {
        args: FFIType.ptr[];
        returns: FFIType.bool;
    };
    SetForegroundWindow: {
        args: FFIType.ptr[];
        returns: FFIType.bool;
    };
    IsWindowVisible: {
        args: FFIType.ptr[];
        returns: FFIType.bool;
    };
    GetWindowThreadProcessId: {
        args: FFIType.ptr[];
        returns: FFIType.uint32_t;
    };
    MoveWindow: {
        args: (FFIType.int32_t | FFIType.bool | FFIType.ptr)[];
        returns: FFIType.bool;
    };
    GetClientRect: {
        args: FFIType.ptr[];
        returns: FFIType.bool;
    };
    PostMessageA: {
        args: (FFIType.uint32_t | FFIType.ptr)[];
        returns: FFIType.bool;
    };
    GetClassNameA: {
        args: (FFIType.int32_t | FFIType.ptr)[];
        returns: FFIType.int32_t;
    };
    SendMessageA: {
        args: (FFIType.uint32_t | FFIType.ptr)[];
        returns: FFIType.ptr;
    };
    IsIconic: {
        args: FFIType.ptr[];
        returns: FFIType.bool;
    };
    IsZoomed: {
        args: FFIType.ptr[];
        returns: FFIType.bool;
    };
}>;
export declare const gdi32: import("bun:ffi").Library<{
    GetPixel: {
        args: (FFIType.int32_t | FFIType.ptr)[];
        returns: FFIType.uint32_t;
    };
    CreatePen: {
        args: (FFIType.int32_t | FFIType.uint32_t)[];
        returns: FFIType.ptr;
    };
    SelectObject: {
        args: FFIType.ptr[];
        returns: FFIType.ptr;
    };
    MoveToEx: {
        args: (FFIType.int32_t | FFIType.ptr)[];
        returns: FFIType.bool;
    };
    LineTo: {
        args: (FFIType.int32_t | FFIType.ptr)[];
        returns: FFIType.bool;
    };
    DeleteObject: {
        args: FFIType.ptr[];
        returns: FFIType.bool;
    };
    CreateCompatibleDC: {
        args: FFIType.ptr[];
        returns: FFIType.ptr;
    };
    CreateDIBSection: {
        args: (FFIType.uint32_t | FFIType.ptr)[];
        returns: FFIType.ptr;
    };
    DeleteDC: {
        args: FFIType.ptr[];
        returns: FFIType.bool;
    };
    CreateSolidBrush: {
        args: FFIType.uint32_t[];
        returns: FFIType.ptr;
    };
    CreateCompatibleBitmap: {
        args: (FFIType.int32_t | FFIType.ptr)[];
        returns: FFIType.ptr;
    };
    BitBlt: {
        args: (FFIType.int32_t | FFIType.uint32_t | FFIType.ptr)[];
        returns: FFIType.bool;
    };
}>;
//# sourceMappingURL=ffi-loader.d.ts.map