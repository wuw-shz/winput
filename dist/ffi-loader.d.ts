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
    GetSystemMetrics: {
        args: FFIType.int32_t[];
        returns: FFIType.int32_t;
    };
    GetKeyState: {
        args: FFIType.int32_t[];
        returns: FFIType.int16_t;
    };
}>;
//# sourceMappingURL=ffi-loader.d.ts.map