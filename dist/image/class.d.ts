import * as actions from "./actions";
import { ImageData } from "../types/image";
/**
 * Chainable image processor for applying transformations and filters to images.
 *
 * This class provides a fluent API for image manipulation, allowing you to chain
 * multiple operations together. All transformation methods modify the image in-place
 * and return `this` for method chaining.
 */
export declare class Image {
    img: ImageData;
    /** Optional file path where the image was loaded from or will be saved to */
    path?: string;
    /** Image width in pixels */
    width: number;
    /** Image height in pixels */
    height: number;
    /** Raw pixel data in BGRA format (4 bytes per pixel) */
    buffer: Uint8Array;
    /**
     * Creates a new Image processor instance.
     *
     * @param img - The image data to wrap for processing
     */
    constructor(img: ImageData);
    /**
     * Synchronizes instance properties with the internal image data.
     * @private
     */
    private sync;
    /**
     * Creates a deep copy of the image.
     *
     * Useful when you need to preserve the original image while applying
     * different transformations to a copy.
     *
     * @returns {Image} A new Image instance with copied data
     * @example
     * ```typescript
     * const original = await image.load("photo.png");
     * const copy = original.clone();
     * copy.grayscale(); // original remains unchanged
     * ```
     */
    clone(): Image;
    /**
     * Converts image to grayscale using Rec. 709 luminance weights.
     *
     * Uses the formula: Y = 0.2126 * R + 0.7152 * G + 0.0722 * B
     * This provides perceptually accurate grayscale conversion that matches
     * how the human eye perceives brightness.
     *
     * @returns {Image} This instance for chaining
     * @example
     * ```typescript
     * img.grayscale().save("grayscale.png");
     * ```
     */
    grayscale(): Image;
    /**
     * Adjusts brightness of the image.
     *
     * Adds or subtracts a constant value from all RGB channels.
     * Positive values increase brightness, negative values decrease it.
     *
     * @param factor - Brightness adjustment factor in range [-1.0, 1.0]
     *                 (0 = no change, 1.0 = +255, -1.0 = -255)
     * @returns {Image} This instance for chaining
     * @example
     * ```typescript
     * img.brightness(0.2);  // Increase brightness by 20%
     * img.brightness(-0.1); // Decrease brightness by 10%
     * ```
     */
    brightness(factor: number): Image;
    /**
     * Adjusts contrast of the image.
     *
     * Scales pixel values around the midpoint (128). Values greater than 1
     * increase contrast, less than 1 decrease it. A value of 1 leaves the
     * image unchanged.
     *
     * @param factor - Contrast multiplier (0.0 = flat gray, 1.0 = no change, >1.0 = increased contrast)
     * @returns {Image} This instance for chaining
     * @example
     * ```typescript
     * img.contrast(1.5);  // Increase contrast by 50%
     * img.contrast(0.7);  // Decrease contrast by 30%
     * ```
     */
    contrast(factor: number): Image;
    /**
     * Applies Gaussian blur to smooth the image.
     *
     * Uses a Gaussian kernel for edge-preserving blur. Larger radius values
     * create stronger blur effects. Radius 1 uses 3x3 kernel, radius 2 uses 5x5.
     *
     * @param radius - Blur intensity (1 = subtle, 2 = moderate, default: 1)
     * @returns {Image} This instance for chaining
     * @example
     * ```typescript
     * img.blur(1);  // Light blur
     * img.blur(2);  // Stronger blur
     * ```
     */
    blur(radius?: number): Image;
    /**
     * Sharpens the image to enhance edges and details.
     *
     * Applies a sharpening convolution kernel that enhances high-frequency
     * details and edges. Useful for improving image clarity.
     *
     * @returns {Image} This instance for chaining
     * @example
     * ```typescript
     * img.blur(1).sharpen(); // Blur then sharpen for noise reduction
     * ```
     */
    sharpen(): Image;
    /**
     * Detects edges using the Sobel operator.
     *
     * Converts the image to grayscale and calculates gradients in both
     * horizontal and vertical directions. The output is a grayscale image
     * where bright pixels indicate strong edges.
     *
     * @returns {Image} This instance for chaining
     * @example
     * ```typescript
     * img.edges().threshold(128).save("edges.png");
     * ```
     */
    edges(): Image;
    /**
     * Applies morphological dilation.
     *
     * Expands bright regions in the image. Useful for closing small gaps,
     * connecting nearby objects, or increasing the size of features.
     *
     * @param pixels - Dilation kernel size (1 = 3x3, 2 = 5x5, etc., default: 1)
     * @returns {Image} This instance for chaining
     * @example
     * ```typescript
     * img.threshold(128).dilate(2); // Expand white regions
     * ```
     */
    dilate(pixels?: number): Image;
    /**
     * Applies morphological erosion.
     *
     * Shrinks bright regions in the image. Useful for removing noise,
     * separating connected objects, or decreasing the size of features.
     *
     * @param pixels - Erosion kernel size (1 = 3x3, 2 = 5x5, etc., default: 1)
     * @returns {Image} This instance for chaining
     * @example
     * ```typescript
     * img.threshold(128).erode(1); // Remove small noise
     * ```
     */
    erode(pixels?: number): Image;
    /**
     * Applies morphological opening (erosion followed by dilation).
     *
     * Removes small bright spots and noise while preserving the shape of
     * larger bright regions. Effective for noise removal.
     *
     * @param pixels - Kernel size for both operations (default: 1)
     * @returns {Image} This instance for chaining
     * @example
     * ```typescript
     * img.threshold(128).erode2dilate(1); // Clean up binary image
     * ```
     */
    erode2dilate(pixels?: number): Image;
    /**
     * Applies morphological closing (dilation followed by erosion).
     *
     * Fills small gaps and holes in bright regions while preserving their
     * overall shape. Useful for connecting nearby features.
     *
     * @param pixels - Kernel size for both operations (default: 1)
     * @returns {Image} This instance for chaining
     * @example
     * ```typescript
     * img.threshold(128).dilate2erode(1); // Close gaps in shapes
     * ```
     */
    dilate2erode(pixels?: number): Image;
    /**
     * Saves the processed image to a file.
     *
     * The file format is automatically determined by the file extension.
     * If no path is provided, uses the original image path or generates
     * a timestamp-based filename.
     *
     * @param path - Output file path (optional, uses original path if not specified)
     * @returns {Promise<boolean>} Promise that resolves to true if save succeeded, false otherwise
     * @example
     * ```typescript
     * await img.grayscale().save("output.png");
     * await img.save(); // Overwrites original file
     * ```
     *
     * Supported file formats:
     * - `.png` - Portable Network Graphics (lossless)
     * - `.jpg` / `.jpeg` - JPEG (lossy compression)
     * - `.bmp` - Bitmap (uncompressed)
     * - `.webp` - WebP (modern format)
     * - `.gif` - Graphics Interchange Format (limited colors)
     * - `.tiff` - Tagged Image File Format (high quality)
     * - `.ico` - Icon format
     * - `.heic` - High Efficiency Image Container
     * - `.heif` - High Efficiency Image Format
     * - `.avif` - AV1 Image File Format
     * - `.svg` - Scalable Vector Graphics
     * - `.raw` - Raw image data
     */
    save(path?: string): Promise<boolean>;
    /**
     * Converts the image to an array of RGBA pixel values.
     *
     * Each pixel is represented as [R, G, B, A] where values are in range 0-255.
     * Pixels are ordered left-to-right, top-to-bottom.
     *
     * @returns {[number, number, number, number][]} Array of [R, G, B, A] tuples
     * @example
     * ```typescript
     * const pixels = img.toPixels();
     * const [r, g, b, a] = pixels[0]; // First pixel
     * ```
     */
    toPixels(): [number, number, number, number][];
    /**
     * Inverts all colors in the image (creates a negative).
     *
     * Each RGB channel is inverted using the formula: new = 255 - old.
     * Alpha channel remains unchanged.
     *
     * @returns {Image} This instance for chaining
     * @example
     * ```typescript
     * img.invert(); // Create negative image
     * ```
     */
    invert(): Image;
    /**
     * Applies a sepia tone effect for a vintage/warm look.
     *
     * Transforms the image using a sepia tone matrix that shifts colors
     * toward warm brown tones commonly seen in old photographs.
     *
     * @returns {Image} This instance for chaining
     * @example
     * ```typescript
     * img.sepia().save("vintage.png");
     * ```
     */
    sepia(): Image;
    /**
     * Rotates the hue of all colors by the specified degrees.
     *
     * Converts RGB to HSV, rotates the hue component, then converts back.
     * Positive values shift colors clockwise, negative counter-clockwise.
     *
     * @param degrees - Hue rotation in degrees (-360 to 360)
     * @returns {Image} This instance for chaining
     * @example
     * ```typescript
     * img.hue(180);  // Shift to complementary colors
     * img.hue(-30);  // Subtle color shift
     * ```
     */
    hue(degrees: number): Image;
    /**
     * Adjusts the color saturation (color intensity).
     *
     * Converts RGB to HSV, scales the saturation component, then converts back.
     * Values less than 1 reduce saturation, greater than 1 increase it.
     *
     * @param factor - Saturation multiplier (0.0 = grayscale, 1.0 = original, >1.0 = vibrant)
     * @returns {Image} This instance for chaining
     * @example
     * ```typescript
     * img.saturate(1.5);  // Boost colors
     * img.saturate(0.5);  // Desaturate
     * img.saturate(0);    // Full grayscale
     * ```
     */
    saturate(factor: number): Image;
    /**
     * Rotates the image by the specified angle.
     *
     * The image dimensions are adjusted to fit the rotated content.
     * Areas outside the original image bounds are left transparent/black.
     *
     * @param degrees - Rotation angle in degrees (positive = clockwise)
     * @returns {Image} This instance for chaining
     * @example
     * ```typescript
     * img.rotate(90);   // Quarter turn clockwise
     * img.rotate(-45);  // Diagonal tilt
     * ```
     */
    rotate(degrees: number): Image;
    /**
     * Flips the image horizontally and/or vertically.
     *
     * @param horizontal - Mirror along vertical axis (default: false)
     * @param vertical - Mirror along horizontal axis (default: false)
     * @returns {Image} This instance for chaining
     * @example
     * ```typescript
     * img.flip(true, false);  // Flip horizontally
     * img.flip(false, true);  // Flip vertically
     * img.flip(true, true);   // Rotate 180°
     * ```
     */
    flip(horizontal?: boolean, vertical?: boolean): Image;
    /**
     * Crops the image to a rectangular region.
     *
     * Extracts a portion of the image starting at (x, y) with specified dimensions.
     * Coordinates are clamped to image bounds.
     *
     * @param x - Starting x coordinate (left edge)
     * @param y - Starting y coordinate (top edge)
     * @param w - Width of crop region in pixels
     * @param h - Height of crop region in pixels
     * @returns {Image} This instance for chaining
     * @example
     * ```typescript
     * img.crop(100, 100, 200, 150); // Extract 200x150 region
     * ```
     */
    crop(x: number, y: number, w: number, h: number): Image;
    /**
     * Resizes the image to new dimensions.
     *
     * Supports two algorithms: 'nearest' (fast, blocky) and 'bilinear' (smooth).
     * Bilinear interpolation provides better quality for most use cases.
     *
     * @param newWidth - Target width in pixels
     * @param newHeight - Target height in pixels
     * @param algorithm - Interpolation method: 'nearest' (fast) or 'bilinear' (quality, default)
     * @returns {Image} This instance for chaining
     * @example
     * ```typescript
     * img.resize(800, 600);              // Resize with bilinear
     * img.resize(400, 300, "nearest");   // Fast pixelated resize
     * ```
     */
    resize(newWidth: number, newHeight: number, algorithm?: "nearest" | "bilinear"): Image;
    /**
     * Applies binary threshold to create a black and white image.
     *
     * Converts to grayscale first, then pixels above the threshold become white (255),
     * pixels below become black (0).
     *
     * @param value - Threshold value in range 0-255 (default: 128)
     * @returns {Image} This instance for chaining
     * @example
     * ```typescript
     * img.threshold(128); // Standard binary threshold
     * img.threshold(200); // Higher threshold = more black
     * ```
     */
    threshold(value?: number): Image;
    /**
     * Applies adaptive threshold for images with varying lighting.
     *
     * Unlike fixed threshold, computes a local threshold for each pixel
     * based on its neighborhood. Better for unevenly lit images.
     *
     * @param blockSize - Size of pixel neighborhood for local threshold (default: 11)
     * @returns {Image} This instance for chaining
     * @example
     * ```typescript
     * img.adaptiveThreshold(11); // Good for document scanning
     * img.adaptiveThreshold(21); // Larger blocks for smoother results
     * ```
     */
    adaptiveThreshold(blockSize?: number): Image;
    /**
     * Applies median filter to reduce noise while preserving edges.
     *
     * Replaces each pixel with the median value in its neighborhood.
     * Very effective at removing salt-and-pepper noise.
     *
     * @param radius - Filter window radius (1 = 3x3, 2 = 5x5, default: 1)
     * @returns {Image} This instance for chaining
     * @example
     * ```typescript
     * img.medianFilter(1); // Light denoising
     * img.medianFilter(2); // Stronger denoising
     * ```
     */
    medianFilter(radius?: number): Image;
    /**
     * Applies bilateral filter for edge-preserving smoothing.
     *
     * Smooths flat regions while preserving sharp edges. Considers both
     * spatial distance and color similarity when filtering.
     *
     * @param spatialSigma - Spatial influence (higher = more blur, default: 3)
     * @param rangeSigma - Color similarity threshold (higher = more smoothing, default: 50)
     * @returns {Image} This instance for chaining
     * @example
     * ```typescript
     * img.bilateralFilter(3, 50);   // Skin smoothing
     * img.bilateralFilter(5, 100);  // Cartoon effect
     * ```
     */
    bilateralFilter(spatialSigma?: number, rangeSigma?: number): Image;
    /**
     * Calculates RGB color histograms of the image.
     *
     * Returns frequency distribution of color values (0-255) for each channel.
     * Useful for analyzing color distribution and image statistics.
     *
     * @returns {{ r: number[], g: number[], b: number[] }} Three 256-element arrays with pixel counts
     * @example
     * ```typescript
     * const hist = img.histogram();
     * console.log(hist.r[128]); // Count of pixels with red=128
     * ```
     */
    histogram(): {
        r: number[];
        g: number[];
        b: number[];
    };
    /**
     * Automatically adjusts levels to stretch the histogram.
     *
     * Finds the min/max values for each channel and scales them to use
     * the full 0-255 range. Improves image contrast automatically.
     *
     * @returns {Image} This instance for chaining
     * @example
     * ```typescript
     * img.autoLevel(); // Automatically enhance contrast
     * ```
     */
    autoLevel(): Image;
    /**
     * Overlays another image on top of this image with alpha blending.
     *
     * The overlay image can be positioned anywhere and blended with adjustable
     * opacity. Supports partial transparency from overlay image's alpha channel.
     *
     * @param overlayImg - Image buffer to overlay on top
     * @param x - X position of overlay's top-left corner (default: 0)
     * @param y - Y position of overlay's top-left corner (default: 0)
     * @param alpha - Overlay opacity from 0.0 (transparent) to 1.0 (opaque, default)
     * @returns {Image} This instance for chaining
     * @example
     * ```typescript
     * const logo = await image.load("logo.png");
     * img.overlay(logo.img, 10, 10, 0.8); // Watermark at 80% opacity
     * ```
     */
    overlay(overlayImg: ImageData, x?: number, y?: number, alpha?: number): Image;
    /**
     * Blends this image with another using various compositing modes.
     *
     * Blend modes:
     * - 'multiply': Darkens image, good for shadows
     * - 'screen': Lightens image, good for highlights
     * - 'overlay': Combines multiply and screen
     * - 'add': Brightens by adding values
     * - 'subtract': Darkens by subtracting values
     *
     * @param img2 - Image buffer to blend with (must be same size or larger)
     * @param mode - Blend mode (default: 'multiply')
     * @returns {Image} This instance for chaining
     * @example
     * ```typescript
     * const texture = await image.load("texture.png");
     * img.blend(texture.img, "multiply"); // Apply texture
     * ```
     */
    blend(img2: ImageData, mode?: "multiply" | "screen" | "overlay" | "add" | "subtract"): Image;
}
declare class ImageFile {
    /**
     * Loads an image from file using GDI+.
     *
     * Reads an image file from disk and returns a chainable Image processor instance.
     * Returns null if the file cannot be loaded or doesn't exist.
     *
     * @param path - Absolute or relative path to the image file
     * @returns {Promise<Image | null>} Image processor instance or null if loading failed
     * @example
     * ```typescript
     * // Load and process
     * const img = await image.load("C:\\photos\\image.png");
     * if (img) {
     *   img.grayscale().save("output.png");
     * }
     *
     * // Chain operations
     * const processed = await image.load("photo.jpg");
     * await processed?.blur(2).sharpen().save("enhanced.jpg");
     * ```
     *
     * Supported file formats:
     * - `.png` - Portable Network Graphics (lossless)
     * - `.jpg` / `.jpeg` - JPEG (lossy compression)
     * - `.bmp` - Bitmap (uncompressed)
     * - `.webp` - WebP (modern format)
     * - `.gif` - Graphics Interchange Format (limited colors)
     * - `.tiff` - Tagged Image File Format (high quality)
     * - `.ico` - Icon format
     * - `.heic` - High Efficiency Image Container
     * - `.heif` - High Efficiency Image Format
     * - `.avif` - AV1 Image File Format
     * - `.svg` - Scalable Vector Graphics
     * - `.raw` - Raw image data
     */
    load: typeof actions.loadImage;
    /**
     * Saves an image to a file using GDI+.
     *
     * The file format is automatically determined by the file extension.
     * If no path is provided, uses the image's original path or generates
     * a timestamp-based filename.
     *
     * @param img - The Image or ImageData to save
     * @param path - Output file path (optional). If omitted, uses img.path or generates a default name
     * @returns {Promise<boolean>} Promise that resolves to true if save succeeded, false otherwise
     *
     * @example
     * ```typescript
     * // Save with explicit path
     * const imgData: ImageData = { width: 100, height: 100, buffer: new Uint8Array(40000) };
     * await image.save(imgData, "output.png");
     *
     * // Save Image instance using its original path
     * const img = await image.load("photo.jpg");
     * img?.grayscale();
     * await image.save(img);
     *
     * // Auto-generate filename from timestamp
     * const capture = screen.captureScreen();
     * await image.save(capture); // Creates screen_<timestamp>.png
     * ```
     *
     * Supported file formats:
     * - `.png` - Portable Network Graphics (lossless)
     * - `.jpg` / `.jpeg` - JPEG (lossy compression)
     * - `.bmp` - Bitmap (uncompressed)
     * - `.webp` - WebP (modern format)
     * - `.gif` - Graphics Interchange Format (limited colors)
     * - `.tiff` - Tagged Image File Format (high quality)
     * - `.ico` - Icon format
     * - `.heic` - High Efficiency Image Container
     * - `.heif` - High Efficiency Image Format
     * - `.avif` - AV1 Image File Format
     * - `.svg` - Scalable Vector Graphics
     * - `.raw` - Raw image data
     */
    save: typeof actions.saveImage;
    /**
     * Creates a chainable Image processor from existing image data.
     *
     * Useful when you have ImageData from a screen capture or other source
     * and want to apply transformations using the fluent API.
     *
     * @param img - The Image instance or ImageData to wrap
     * @returns {Image} Chainable image processor
     * @example
     * ```typescript
     * // Process screen capture
     * const capture = screen.captureScreen();
     * const processed = image.process(capture);
     * processed.blur(1).contrast(1.2).save("result.png");
     *
     * // Wrap and transform ImageData
     * const imgData: ImageData = { width: 100, height: 100, buffer: new Uint8Array(40000) };
     * image.process(imgData).invert().save("inverted.png");
     * ```
     */
    process(img: Image | ImageData): Image;
}
/**
 * Image file operations and processing utilities.
 *
 * This singleton provides the main entry point for image manipulation functionality.
 * Use it to load images from disk, save processed images, and create chainable
 * Image processor instances from ImageData buffers.
 */
export declare const image: ImageFile;
export {};
//# sourceMappingURL=class.d.ts.map