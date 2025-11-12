export declare class MouseInput {
    buffer: ArrayBuffer;
    view: DataView;
    constructor(dx?: number, dy?: number, mouseData?: number, dwFlags?: number, time?: number, dwExtraInfo?: bigint);
}
export declare class KeyBdInput {
    buffer: ArrayBuffer;
    view: DataView;
    constructor(wVk?: number, wScan?: number, dwFlags?: number, time?: number, dwExtraInfo?: bigint);
}
export declare class Input {
    buffer: ArrayBuffer;
    view: DataView;
    constructor(type: number, inputUnion: MouseInput | KeyBdInput);
}
export declare class FailSafeException extends Error {
    constructor(message: string);
}
//# sourceMappingURL=structures.d.ts.map