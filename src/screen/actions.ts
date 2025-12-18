import { user32, gdi32 } from "../core/ffi-loader";
import { Jimp } from "jimp";
import { ptr, type Pointer } from "bun:ffi";
import type { RGB, Point } from "../types/windows";
import { hexToRgb, rgbToHex, isColorSimilar } from "../utils";

// ==================== Internal Helpers ====================

let cachedDC: Pointer | bigint | null = null;
let dcTime = 0;
function getDC(): Pointer | bigint | null {
  if (cachedDC && Date.now() - dcTime < 1000) return cachedDC;
  if (cachedDC) user32.symbols.ReleaseDC(null, cachedDC);
  cachedDC = user32.symbols.GetDC(null);
  dcTime = Date.now();
  return cachedDC;
}

// ==================== Screen Functions ====================

export function getScreenSize() {
  return {
    width: user32.symbols.GetSystemMetrics(0),
    height: user32.symbols.GetSystemMetrics(1),
  };
}

export function getPixel(x: number, y: number): RGB | null {
  const dc = getDC();
  if (!dc) return null;
  const c = gdi32.symbols.GetPixel(dc as any, x, y);
  return { r: c & 0xff, g: (c >> 8) & 0xff, b: (c >> 16) & 0xff };
}

export function getPixelHex(x: number, y: number): string | null {
  const rgb = getPixel(x, y);
  if (!rgb) return null;
  return rgbToHex(rgb);
}

export function checkPixel(
  x: number,
  y: number,
  target: RGB,
  tolerance = 0
): boolean {
  const p = getPixel(x, y);
  if (!p) return false;
  return isColorSimilar(p, target, tolerance);
}

export function waitForPixel(
  x: number,
  y: number,
  target: RGB,
  tolerance = 0,
  timeout?: number
): Promise<boolean> {
  return new Promise((resolve) => {
    let elapsed = 0;
    const id = setInterval(() => {
      if (checkPixel(x, y, target, tolerance)) {
        clearInterval(id);
        resolve(true);
        return;
      }
      if (timeout && (elapsed += 50) >= timeout) {
        clearInterval(id);
        resolve(false);
      }
    }, 50);
  });
}

export function getMultiplePixels(positions: Point[]): (RGB | null)[] {
  return positions.map((p) => getPixel(p.x, p.y));
}

export function checkMultiplePixels(
  checks: Array<{ x: number; y: number; target: RGB; tolerance?: number }>
): boolean {
  return checks.every((c) => checkPixel(c.x, c.y, c.target, c.tolerance ?? 0));
}

export function waitForAnyPixel(
  checks: Array<{ x: number; y: number; target: RGB; tolerance?: number }>,
  timeout?: number
): Promise<number> {
  return new Promise((resolve) => {
    let elapsed = 0;
    const id = setInterval(() => {
      for (let i = 0; i < checks.length; i++) {
        const c = checks[i];
        if (checkPixel(c.x, c.y, c.target, c.tolerance ?? 0)) {
          clearInterval(id);
          resolve(i);
          return;
        }
      }
      if (timeout && (elapsed += 50) >= timeout) {
        clearInterval(id);
        resolve(-1);
      }
    }, 50);
  });
}

export function pixelSearch(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: RGB | string | number,
  tolerance: number = 0
): Point | null {
  const left = Math.min(x1, x2);
  const top = Math.min(y1, y2);
  const right = Math.max(x1, x2);
  const bottom = Math.max(y1, y2);
  const width = right - left + 1;
  const height = bottom - top + 1;

  const buffer = captureScreen(left, top, width, height);
  if (!buffer) return null;

  let target: RGB;
  if (typeof color === "string") {
    target = hexToRgb(color);
  } else if (typeof color === "number") {
    target = {
      r: (color >> 16) & 0xff,
      g: (color >> 8) & 0xff,
      b: color & 0xff,
    };
  } else {
    target = color;
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const b = buffer[i];
      const g = buffer[i + 1];
      const r = buffer[i + 2];

      if (tolerance === 0) {
        if (r === target.r && g === target.g && b === target.b) {
          return { x: left + x, y: top + y };
        }
      } else {
        if (
          Math.abs(r - target.r) <= tolerance &&
          Math.abs(g - target.g) <= tolerance &&
          Math.abs(b - target.b) <= tolerance
        ) {
          return { x: left + x, y: top + y };
        }
      }
    }
  }

  return null;
}

async function loadImage(path: string): Promise<{ width: number; height: number; data: Uint8Array } | null> {
  try {
    const image = await Jimp.read(path);
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    const data = image.bitmap.data;

    const len = width * height * 4;
    const buffer = new Uint8Array(len);

    for (let i = 0; i < len; i += 4) {
      buffer[i] = data[i + 2];
      buffer[i + 1] = data[i + 1];
      buffer[i + 2] = data[i];
      buffer[i + 3] = data[i + 3];
    }

    return { width, height, data: buffer };
  } catch (e) {
    console.error(`Failed to load image: ${path}`, e);
    return null;
  }
}

export async function imageSearch(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  imagePath: string,
  tolerance: number = 0
): Promise<Point | null> {
  const needle = await loadImage(imagePath);
  if (!needle) return null;

  const left = Math.min(x1, x2);
  const top = Math.min(y1, y2);
  const right = Math.max(x1, x2);
  const bottom = Math.max(y1, y2);
  const width = right - left + 1;
  const height = bottom - top + 1;

  const haystack = captureScreen(left, top, width, height);
  if (!haystack) return null;

  const nW = needle.width;
  const nH = needle.height;
  const hW = width;
  const hH = height;

  if (nW > hW || nH > hH) return null;

  const check = (
    r1: number,
    g1: number,
    b1: number,
    r2: number,
    g2: number,
    b2: number
  ) => {
    if (tolerance === 0) {
      return r1 === r2 && g1 === g2 && b1 === b2;
    }
    return (
      Math.abs(r1 - r2) <= tolerance &&
      Math.abs(g1 - g2) <= tolerance &&
      Math.abs(b1 - b2) <= tolerance
    );
  };

  for (let y = 0; y <= hH - nH; y++) {
    for (let x = 0; x <= hW - nW; x++) {
      let hIdx = (y * hW + x) * 4;
      let nIdx = 0;

      if (
        !check(
          haystack[hIdx + 2],
          haystack[hIdx + 1],
          haystack[hIdx],
          needle.data[nIdx + 2],
          needle.data[nIdx + 1],
          needle.data[nIdx]
        )
      )
        continue;

      let match = true;
      for (let ny = 0; ny < nH; ny++) {
        for (let nx = 0; nx < nW; nx++) {
          if (ny === 0 && nx === 0) continue;

          hIdx = ((y + ny) * hW + (x + nx)) * 4;
          nIdx = (ny * nW + nx) * 4;

          if (
            !check(
              haystack[hIdx + 2],
              haystack[hIdx + 1],
              haystack[hIdx],
              needle.data[nIdx + 2],
              needle.data[nIdx + 1],
              needle.data[nIdx]
            )
          ) {
            match = false;
            break;
          }
        }
        if (!match) break;
      }

      if (match) {
        return { x: left + x, y: top + y };
      }
    }
  }

  return null;
}

export function captureScreen(
  x = 0,
  y = 0,
  width?: number,
  height?: number
): Uint8Array | null {
  const w = width || user32.symbols.GetSystemMetrics(0);
  const h = height || user32.symbols.GetSystemMetrics(1);

  const screenDC = user32.symbols.GetDC(null);
  if (!screenDC) return null;

  const memDC = gdi32.symbols.CreateCompatibleDC(screenDC);
  if (!memDC) {
    user32.symbols.ReleaseDC(null, screenDC);
    return null;
  }

  const bitmap = gdi32.symbols.CreateCompatibleBitmap(screenDC, w, h);
  if (!bitmap) {
    user32.symbols.ReleaseDC(null, screenDC);
    gdi32.symbols.DeleteDC(memDC);
    return null;
  }

  const oldBitmap = gdi32.symbols.SelectObject(memDC, bitmap);

  const success = gdi32.symbols.BitBlt(
    memDC,
    0,
    0,
    w,
    h,
    screenDC,
    x,
    y,
    0x00cc0020
  );

  let buffer: Uint8Array | null = null;

  if (success) {
    const size = w * h * 4;
    buffer = new Uint8Array(size);

    const bi = new Uint8Array(40);
    const view = new DataView(bi.buffer);
    view.setInt32(0, 40, true);
    view.setInt32(4, w, true);
    view.setInt32(8, -h, true);
    view.setInt16(12, 1, true);
    view.setInt16(14, 32, true);
    view.setInt32(16, 0, true);

    const result = gdi32.symbols.GetDIBits(
      memDC,
      bitmap,
      0,
      h,
      ptr(buffer),
      ptr(bi),
      0
    );

    if (result === 0) buffer = null;
  }

  if (oldBitmap) gdi32.symbols.SelectObject(memDC, oldBitmap);
  gdi32.symbols.DeleteObject(bitmap);
  gdi32.symbols.DeleteDC(memDC);
  user32.symbols.ReleaseDC(null, screenDC);

  return buffer;
}

export function getMonitors(): Array<{
  rect: { left: number; top: number; right: number; bottom: number };
  isPrimary: boolean;
}> {
  const width = user32.symbols.GetSystemMetrics(78);
  const height = user32.symbols.GetSystemMetrics(79);
  const left = user32.symbols.GetSystemMetrics(76);
  const top = user32.symbols.GetSystemMetrics(77);

  return [
    {
      rect: { left, top, right: left + width, bottom: top + height },
      isPrimary: true,
    },
  ];
}
