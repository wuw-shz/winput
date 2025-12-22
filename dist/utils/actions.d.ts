import type { RGB, Point, Rect } from "../types/windows";
export declare function rgbToHex(rgb: RGB): string;
export declare function hexToRgb(hex: string): RGB;
export declare function colorDistance(c1: RGB, c2: RGB): number;
export declare function isColorSimilar(c1: RGB, c2: RGB, tolerance: number): boolean;
export declare function pointInRect(p: Point, r: Rect): boolean;
export declare function rgbToHsv(r: number, g: number, b: number): [number, number, number];
export declare function hsvToRgb(h: number, s: number, v: number): [number, number, number];
//# sourceMappingURL=actions.d.ts.map