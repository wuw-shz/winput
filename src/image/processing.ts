import { ImageBuffer } from "../types/image";

export function clone(img: ImageBuffer): ImageBuffer {
  return {
    path: img.path,
    width: img.width,
    height: img.height,
    data: new Uint8Array(img.data),
  };
}

export function grayscale(img: ImageBuffer): ImageBuffer {
  const { path, width, height, data } = img;
  const output = new Uint8Array(data.length);

  for (let i = 0; i < data.length; i += 4) {
    const b = data[i];
    const g = data[i + 1];
    const r = data[i + 2];
    const a = data[i + 3];

    const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const v = Math.min(255, Math.max(0, gray));

    output[i] = v;
    output[i + 1] = v;
    output[i + 2] = v;
    output[i + 3] = a;
  }

  return { path, width, height, data: output };
}

export function brightness(img: ImageBuffer, factor: number): ImageBuffer {
  const { path, width, height, data } = img;
  const output = new Uint8Array(data.length);
  const adjustment = factor * 255;

  for (let i = 0; i < data.length; i += 4) {
    for (let c = 0; c < 3; c++) {
      output[i + c] = Math.min(255, Math.max(0, data[i + c] + adjustment));
    }
    output[i + 3] = data[i + 3];
  }
  return { path, width, height, data: output };
}

export function contrast(img: ImageBuffer, factor: number): ImageBuffer {
  const { path, width, height, data } = img;
  const output = new Uint8Array(data.length);

  for (let i = 0; i < data.length; i += 4) {
    for (let c = 0; c < 3; c++) {
      const v = data[i + c];
      const newVal = factor * (v - 128) + 128;
      output[i + c] = Math.min(255, Math.max(0, newVal));
    }
    output[i + 3] = data[i + 3];
  }
  return { path, width, height, data: output };
}

export function convolve(
  img: ImageBuffer,
  kernel: number[],
  kernelWidth: number
): ImageBuffer {
  const { path, width, height, data } = img;
  const output = new Uint8Array(data.length);
  const half = Math.floor(kernelWidth / 2);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0,
        g = 0,
        b = 0;

      for (let ky = 0; ky < kernelWidth; ky++) {
        for (let kx = 0; kx < kernelWidth; kx++) {
          const px = Math.min(width - 1, Math.max(0, x + kx - half));
          const py = Math.min(height - 1, Math.max(0, y + ky - half));
          const idx = (py * width + px) * 4;
          const kVal = kernel[ky * kernelWidth + kx];

          b += data[idx] * kVal;
          g += data[idx + 1] * kVal;
          r += data[idx + 2] * kVal;
        }
      }

      const idx = (y * width + x) * 4;
      output[idx] = Math.min(255, Math.max(0, b));
      output[idx + 1] = Math.min(255, Math.max(0, g));
      output[idx + 2] = Math.min(255, Math.max(0, r));
      output[idx + 3] = data[idx + 3];
    }
  }

  return { path, width, height, data: output };
}

export function gaussianBlur(img: ImageBuffer, radius: number = 1): ImageBuffer {
  if (radius === 1) {
    const kernel = [
        1/16, 2/16, 1/16,
        2/16, 4/16, 2/16,
        1/16, 2/16, 1/16
    ];
    return convolve(img, kernel, 3);
  }
  const kernel = [
      1, 4, 7, 4, 1,
      4, 16, 26, 16, 4,
      7, 26, 41, 26, 7,
      4, 16, 26, 16, 4,
      1, 4, 7, 4, 1
  ].map(x => x / 273);
  return convolve(img, kernel, 5);
}

export function sharpen(img: ImageBuffer): ImageBuffer {
    const kernel = [
        0, -1, 0,
        -1, 5, -1,
        0, -1, 0
    ];
    return convolve(img, kernel, 3);
}

export function sobel(img: ImageBuffer): ImageBuffer {
    const gray = grayscale(img);
    const { path, width, height, data } = gray;
    const output = new Uint8Array(data.length);

    const kx = [
        -1, 0, 1,
        -2, 0, 2,
        -1, 0, 1
    ];
    const ky = [
        -1, -2, -1,
         0,  0,  0,
         1,  2,  1
    ];

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            let pixelX = 0;
            let pixelY = 0;

            for(let j = -1; j <= 1; j++) {
                for(let i = -1; i <= 1; i++) {
                    const idx = ((y + j) * width + (x + i)) * 4;
                    const val = data[idx + 1]; 
                    pixelX += val * kx[(j + 1) * 3 + (i + 1)];
                    pixelY += val * ky[(j + 1) * 3 + (i + 1)];
                }
            }
            
            const mag = Math.sqrt(pixelX * pixelX + pixelY * pixelY);
            const val = Math.min(255, Math.max(0, mag));
            
            const idx = (y * width + x) * 4;
            output[idx] = val;
            output[idx + 1] = val;
            output[idx + 2] = val;
            output[idx + 3] = 255;
        }
    }
    
    return { path, width, height, data: output };
}

export function dilate(img: ImageBuffer, pixels: number = 1): ImageBuffer {
    const { path, width, height, data } = img;
    const output = new Uint8Array(data.length);
    for(let i=3; i<data.length; i+=4) output[i] = data[i];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let maxR = 0, maxG = 0, maxB = 0;
            
            for(let dy = -pixels; dy <= pixels; dy++) {
                for(let dx = -pixels; dx <= pixels; dx++) {
                    const ny = y + dy;
                    const nx = x + dx;
                    if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
                        const idx = (ny * width + nx) * 4;
                        maxB = Math.max(maxB, data[idx]);
                        maxG = Math.max(maxG, data[idx+1]);
                        maxR = Math.max(maxR, data[idx+2]);
                    }
                }
            }
            const idx = (y * width + x) * 4;
            output[idx] = maxB;
            output[idx + 1] = maxG;
            output[idx + 2] = maxR;
        }
    }
    return { path, width, height, data: output };
}

export function erode(img: ImageBuffer, pixels: number = 1): ImageBuffer {
    const { path, width, height, data } = img;
    const output = new Uint8Array(data.length);
    for(let i=3; i<data.length; i+=4) output[i] = data[i];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let minR = 255, minG = 255, minB = 255;
            
            for(let dy = -pixels; dy <= pixels; dy++) {
                for(let dx = -pixels; dx <= pixels; dx++) {
                    const ny = y + dy;
                    const nx = x + dx;
                    if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
                        const idx = (ny * width + nx) * 4;
                        minB = Math.min(minB, data[idx]);
                        minG = Math.min(minG, data[idx+1]);
                        minR = Math.min(minR, data[idx+2]);
                    }
                }
            }
            const idx = (y * width + x) * 4;
            output[idx] = minB;
            output[idx + 1] = minG;
            output[idx + 2] = minR;
        }
    }
    return { path, width, height, data: output };
}

export function open(img: ImageBuffer, pixels: number = 1): ImageBuffer {
    return dilate(erode(img, pixels), pixels);
}

export function close(img: ImageBuffer, pixels: number = 1): ImageBuffer {
    return erode(dilate(img, pixels), pixels);
}

export function toPixels(img: ImageBuffer): [number, number, number, number][] {
    const { data } = img;
    const pixels: [number, number, number, number][] = [];
    for (let i = 0; i < data.length; i += 4) {
        pixels.push([data[i + 2], data[i + 1], data[i], data[i + 3]]);
    }
    return pixels;
}
