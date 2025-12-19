import * as actions from "./actions";
import * as processing from "./processing";
import { ImageBuffer } from "../types/image";

/**
 * Chainable image processor.
 */
export class ImageProcessor {
  width: number;
  height: number;
  data: Uint8Array<ArrayBufferLike>;
  path: string;
  constructor(private img: ImageBuffer) {
    this.path = img.path;
    this.width = img.width;
    this.height = img.height;
    this.data = img.data;
  }

  /**
   * Creates a deep copy of the image.
   *
   * @returns {ImageProcessor} Chainable processor
   */
  clone(): ImageProcessor {
    return new ImageProcessor(processing.clone(this.img));
  }

  /**
   * Converts image to grayscale.
   * Uses Rec. 709 luminance weights: 0.2126 R + 0.7152 G + 0.0722 B
   *
   * @returns {ImageProcessor} Chainable processor
   */
  grayscale(): ImageProcessor {
    this.img = processing.grayscale(this.img);
    return this;
  }

  /**
   * Adjusts brightness of the image.
   * Factor should be in the range [-1.0, 1.0].
   *
   * @param factor - Brightness factor
   * @returns {ImageProcessor} Chainable processor
   */
  brightness(factor: number): ImageProcessor {
    this.img = processing.brightness(this.img, factor);
    return this;
  }

  /**
   * Adjusts contrast of the image.
   * Factor should be in the range [0.0, Infinity].
   *
   * @param factor - Contrast factor
   * @returns {ImageProcessor} Chainable processor
   */
  contrast(factor: number): ImageProcessor {
    this.img = processing.contrast(this.img, factor);
    return this;
  }

  /**
   * Apply Gaussian blur to the image.
   * Radius should be in the range [1, Infinity].
   *
   * @param radius - Blur radius (default: 1)
   * @returns {ImageProcessor} Chainable processor
   */
  blur(radius: number = 1): ImageProcessor {
    this.img = processing.gaussianBlur(this.img, radius);
    return this;
  }

  /**
   * Sharpen the image.
   *
   * @returns {ImageProcessor} Chainable processor
   */
  sharpen(): ImageProcessor {
    this.img = processing.sharpen(this.img);
    return this;
  }

  /**
   * Detect edges using Sobel operator.
   *
   * @returns {ImageProcessor} Chainable processor
   */
  edges(): ImageProcessor {
    this.img = processing.sobel(this.img);
    return this;
  }

  /**
   * Morphological Dilation.
   *
   * @param pixels - Number of pixels to dilate (default: 1)
   * @returns {ImageProcessor} Chainable processor
   */
  dilate(pixels: number = 1): ImageProcessor {
    this.img = processing.dilate(this.img, pixels);
    return this;
  }

  /**
   * Morphological Erosion.
   *
   * @param pixels - Number of pixels to erode (default: 1)
   * @returns {ImageProcessor} Chainable processor
   */
  erode(pixels: number = 1): ImageProcessor {
    this.img = processing.erode(this.img, pixels);
    return this;
  }

  /**
   * Morphological Opening (Erode -> Dilate).
   *
   * @param pixels - Number of pixels to erode (default: 1)
   * @returns {ImageProcessor} Chainable processor
   */
  open(pixels: number = 1): ImageProcessor {
    this.img = processing.open(this.img, pixels);
    return this;
  }

  /**
   * Morphological Closing (Dilate -> Erode).
   *
   * @param pixels - Number of pixels to erode (default: 1)
   * @returns {ImageProcessor} Chainable processor
   */
  close(pixels: number = 1): ImageProcessor {
    this.img = processing.close(this.img, pixels);
    return this;
  }

  /**
   * Save the processed image to file.
   * The format is determined by the file extension.
   * Supported formats: png, jpg, jpeg, bmp, webp, gif, tiff, ico, heic, heif, avif, svg, raw
   *
   * @param path - Path to save the image
   * @returns {Promise<boolean>} True if saved successfully
   */
  async save(path?: string): Promise<boolean> {
    return actions.saveImage(this.img, path);
  }

  /**
   * Convert the image to an array of pixels [[r, g, b, a], ...].
   *
   * @returns {[number, number, number, number][]} Array of pixels
   */
  toPixels(): [number, number, number, number][] {
    return processing.toPixels(this.img);
  }
}

/**
 * Image processing functions.
 */
class Image {
  /**
   * Load an image from file using GDI+.
   * @param path - Path to the image file (BMP, PNG, JPG, etc.)
   * @returns {Promise<ImageProcessor | null>} Image data or null if failed
   */
  load = actions.loadImage;

  /**
   * Save the processed image to file.
   *
   * @param path - Path to save the image
   * @param format - Image format (default: "png")
   * @returns {Promise<boolean>} True if saved successfully
   */
  save = actions.saveImage;

  /**
   * Wrapper to start processing an image.
   * @param img - The image buffer to process
   * @returns {ImageProcessor} Chainable processor
   */
  process(img: ImageBuffer): ImageProcessor {
    return new ImageProcessor(img);
  }
}

export const image = new Image();
