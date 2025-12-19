export interface ImageBuffer {
  path: string;
  width: number;
  height: number;
  data: Uint8Array; // 32bpp BGRA
}
