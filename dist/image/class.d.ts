import * as actions from "./actions";
import { ImageBuffer } from "../types/image";
/**
 * Chainable image processor.
 */
export declare class ImageProcessor {
    private img;
    width: number;
    height: number;
    data: Uint8Array<ArrayBufferLike>;
    path: string;
    constructor(img: ImageBuffer);
    /**
     * Creates a deep copy of the image.
     *
     * @returns {ImageProcessor} Chainable processor
     */
    clone(): ImageProcessor;
    /**
     * Converts image to grayscale.
     * Uses Rec. 709 luminance weights: 0.2126 R + 0.7152 G + 0.0722 B
     *
     * @returns {ImageProcessor} Chainable processor
     */
    grayscale(): ImageProcessor;
    /**
     * Adjusts brightness of the image.
     * Factor should be in the range [-1.0, 1.0].
     *
     * @param factor - Brightness factor
     * @returns {ImageProcessor} Chainable processor
     */
    brightness(factor: number): ImageProcessor;
    /**
     * Adjusts contrast of the image.
     * Factor should be in the range [0.0, Infinity].
     *
     * @param factor - Contrast factor
     * @returns {ImageProcessor} Chainable processor
     */
    contrast(factor: number): ImageProcessor;
    /**
     * Apply Gaussian blur to the image.
     * Radius should be in the range [1, Infinity].
     *
     * @param radius - Blur radius (default: 1)
     * @returns {ImageProcessor} Chainable processor
     */
    blur(radius?: number): ImageProcessor;
    /**
     * Sharpen the image.
     *
     * @returns {ImageProcessor} Chainable processor
     */
    sharpen(): ImageProcessor;
    /**
     * Detect edges using Sobel operator.
     *
     * @returns {ImageProcessor} Chainable processor
     */
    edges(): ImageProcessor;
    /**
     * Morphological Dilation.
     *
     * @param pixels - Number of pixels to dilate (default: 1)
     * @returns {ImageProcessor} Chainable processor
     */
    dilate(pixels?: number): ImageProcessor;
    /**
     * Morphological Erosion.
     *
     * @param pixels - Number of pixels to erode (default: 1)
     * @returns {ImageProcessor} Chainable processor
     */
    erode(pixels?: number): ImageProcessor;
    /**
     * Morphological Opening (Erode -> Dilate).
     *
     * @param pixels - Number of pixels to erode (default: 1)
     * @returns {ImageProcessor} Chainable processor
     */
    open(pixels?: number): ImageProcessor;
    /**
     * Morphological Closing (Dilate -> Erode).
     *
     * @param pixels - Number of pixels to erode (default: 1)
     * @returns {ImageProcessor} Chainable processor
     */
    close(pixels?: number): ImageProcessor;
    /**
     * Save the processed image to file.
     * The format is determined by the file extension.
     * Supported formats: png, jpg, jpeg, bmp, webp, gif, tiff, ico, heic, heif, avif, svg, raw
     *
     * @param path - Path to save the image
     * @returns {Promise<boolean>} True if saved successfully
     */
    save(path?: string): Promise<boolean>;
    /**
     * Convert the image to an array of pixels [[r, g, b, a], ...].
     *
     * @returns {[number, number, number, number][]} Array of pixels
     */
    toPixels(): [number, number, number, number][];
}
/**
 * Image processing functions.
 */
declare class Image {
    /**
     * Load an image from file using GDI+.
     * @param path - Path to the image file (BMP, PNG, JPG, etc.)
     * @returns {Promise<ImageProcessor | null>} Image data or null if failed
     */
    load: typeof actions.loadImage;
    /**
     * Save the processed image to file.
     *
     * @param path - Path to save the image
     * @param format - Image format (default: "png")
     * @returns {Promise<boolean>} True if saved successfully
     */
    save: typeof actions.saveImage;
    /**
     * Wrapper to start processing an image.
     * @param img - The image buffer to process
     * @returns {ImageProcessor} Chainable processor
     */
    process(img: ImageBuffer): ImageProcessor;
}
export declare const image: Image;
export {};
//# sourceMappingURL=class.d.ts.map