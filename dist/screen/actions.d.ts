import type { RGB, Point } from "../types";
import { Image } from "../image/class";
import { Pixel } from "./pixel";
export declare function getScreenSize(): {
    width: number;
    height: number;
};
export declare function getPixel(x: number, y: number): Pixel | null;
export declare function checkPixel(x: number, y: number, target: RGB, tolerance?: number): boolean;
export declare function waitForPixel(x: number, y: number, target: RGB, tolerance?: number, timeout?: number, interval?: number): Promise<boolean>;
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
}>, timeout?: number, interval?: number): Promise<number>;
export declare function pixelSearch(x1: number, y1: number, x2: number, y2: number, color: RGB | string | number, tolerance?: number): Point | null;
export declare function imageSearch(x1: number, y1: number, x2: number, y2: number, image: string | Image, tolerance?: number): Promise<Point | null>;
export declare function capture(x?: number, y?: number, width?: number, height?: number): Image | null;
export declare function getMonitors(): Array<{
    handle: bigint;
    rect: {
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
    workArea: {
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
    isPrimary: boolean;
    deviceName: string;
}>;
//# sourceMappingURL=actions.d.ts.map