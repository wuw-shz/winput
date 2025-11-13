export declare const is64Bit: boolean;
export declare class FailSafeException extends Error {
    constructor(message: string);
}
export declare function buildMouseInputBuffer(dx?: number, dy?: number, mouseData?: number, dwFlags?: number, time?: number, dwExtraInfo?: bigint): Buffer;
export declare function buildKeyboardInputBuffer(wVk?: number, wScan?: number, dwFlags?: number, time?: number, dwExtraInfo?: bigint): Buffer;
export declare function buildInputBuffer(type: number, inputUnionBuf: Buffer): Buffer;
//# sourceMappingURL=structures.d.ts.map