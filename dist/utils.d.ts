export declare const config: {
    FAILSAFE: boolean;
    FAILSAFE_POINTS: [number, number][];
    PAUSE: number;
};
export declare let FAILSAFE: boolean;
export declare let FAILSAFE_POINTS: [number, number][];
export declare let PAUSE: number;
export declare function failSafeCheck(): void;
export declare function handlePause(shouldPause: boolean): void;
export declare function toWindowsCoordinates(x?: number, y?: number): [number, number];
export declare function position(x?: number, y?: number): [number, number];
export declare function size(): [number, number];
//# sourceMappingURL=utils.d.ts.map