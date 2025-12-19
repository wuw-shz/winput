import { ImageBuffer } from "../types/image";
export declare function clone(img: ImageBuffer): ImageBuffer;
export declare function grayscale(img: ImageBuffer): ImageBuffer;
export declare function brightness(img: ImageBuffer, factor: number): ImageBuffer;
export declare function contrast(img: ImageBuffer, factor: number): ImageBuffer;
export declare function convolve(img: ImageBuffer, kernel: number[], kernelWidth: number): ImageBuffer;
export declare function gaussianBlur(img: ImageBuffer, radius?: number): ImageBuffer;
export declare function sharpen(img: ImageBuffer): ImageBuffer;
export declare function sobel(img: ImageBuffer): ImageBuffer;
export declare function dilate(img: ImageBuffer, pixels?: number): ImageBuffer;
export declare function erode(img: ImageBuffer, pixels?: number): ImageBuffer;
export declare function open(img: ImageBuffer, pixels?: number): ImageBuffer;
export declare function close(img: ImageBuffer, pixels?: number): ImageBuffer;
export declare function toPixels(img: ImageBuffer): [number, number, number, number][];
//# sourceMappingURL=processing.d.ts.map