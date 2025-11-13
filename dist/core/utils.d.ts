/**
 * Throws FailSafeException if FAILSAFE is enabled and current cursor
 * equals any configured FAILSAFE_POINTS.
 */
export declare function failSafeCheck(): void;
/**
 * If shouldPause is truthy and PAUSE_DELAY > 0, sleep for PAUSE_DELAY milliseconds.
 * Note: PAUSE_DELAY is in milliseconds.
 */
export declare function handlePause(shouldPause: boolean): void;
/**
 * Convert client coordinates to Windows absolute coordinates used by SendInput:
 * 0..65535 range relative to display width/height.
 */
export declare function toWindowsCoordinates(x?: number, y?: number): [number, number];
export declare function position(x?: number, y?: number): [number, number];
export declare function size(): [number, number];
//# sourceMappingURL=utils.d.ts.map