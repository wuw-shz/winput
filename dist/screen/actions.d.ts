import type { RGB, Point } from "../types/windows";
export declare function getScreenSize(): {
    width: number;
    height: number;
};
export declare function getPixel(x: number, y: number): RGB | null;
export declare function getPixelHex(x: number, y: number): string | null;
export declare function checkPixel(x: number, y: number, target: RGB, tolerance?: number): boolean;
export declare function waitForPixel(x: number, y: number, target: RGB, tolerance?: number, timeout?: number): Promise<boolean>;
export declare function getMultiplePixels(positions: Point[]): (RGB | null)[];
export declare function checkMultiplePixels(checks: Array<{
    x: number;
    y: number;
    target: RGB;
    tolerance?: number;
}>): boolean;
export declare function waitForAnyPixel(checks: Array<{
    x: number;
    y: number;
    target: RGB;
    tolerance?: number;
}>, timeout?: number): Promise<number>;
export declare function pixelSearch(x1: number, y1: number, x2: number, y2: number, color: RGB | string | number, tolerance?: number): Point | null;
export declare function imageSearch(x1: number, y1: number, x2: number, y2: number, imagePath: string, tolerance?: number): Promise<Point | null>;
export declare function captureScreen(x?: number, y?: number, width?: number, height?: number): Uint8Array | null;
export declare function getMonitors(): Array<{
    rect: {
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
    isPrimary: boolean;
}>;
//# sourceMappingURL=actions.d.ts.map