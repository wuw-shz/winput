/**
 * Represents raw image data with dimensions and pixel buffer.
 *
 * This interface is used throughout the image processing module to represent
 * image data in a consistent format. The buffer contains BGRA pixel data
 * (Blue, Green, Red, Alpha) in row-major order.
 *
 * @property path - Optional file path where the image was loaded from or will be saved to
 * @property width - Image width in pixels
 * @property height - Image height in pixels
 * @property buffer - Raw pixel data in BGRA format (4 bytes per pixel)
 *
 * @example
 * ```typescript
 * const imageData: ImageData = {
 *   path: "photo.png",
 *   width: 1920,
 *   height: 1080,
 *   buffer: new Uint8Array(1920 * 1080 * 4)
 * };
 * ```
 */
export interface ImageData {
    path?: string;
    width: number;
    height: number;
    buffer: Uint8Array;
}
/**
 * Supported image file formats for loading and saving.
 *
 * This enum defines all image formats that can be used with the
 * `image.load()` and `image.save()` functions via GDI+.
 *
 * Supported formats:
 * - `png` - Portable Network Graphics (lossless compression)
 * - `jpg` / `jpeg` - JPEG (lossy compression, good for photos)
 * - `bmp` - Bitmap (uncompressed, large file sizes)
 * - `webp` - WebP (modern format with good compression)
 * - `gif` - Graphics Interchange Format (limited to 256 colors)
 * - `tiff` - Tagged Image File Format (high quality, flexible)
 * - `ico` - Icon format (for application icons)
 * - `heic` - High Efficiency Image Container (modern Apple format)
 * - `heif` - High Efficiency Image Format
 * - `avif` - AV1 Image File Format (next-gen compression)
 * - `svg` - Scalable Vector Graphics
 * - `raw` - Raw image data
 */
export declare enum ImageFormat {
    png = 0,
    jpg = 1,
    jpeg = 2,
    bmp = 3,
    webp = 4,
    gif = 5,
    tiff = 6,
    ico = 7,
    heic = 8,
    heif = 9,
    avif = 10,
    svg = 11,
    raw = 12
}
//# sourceMappingURL=image.d.ts.map