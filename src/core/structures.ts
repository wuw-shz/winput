export const is64Bit = process.arch === 'x64' || process.arch === 'arm64'

export class FailSafeException extends Error {
   constructor(message: string) {
      super(message)
      this.name = 'FailSafeException'
   }
}

const ULONG_PTR_SIZE = is64Bit ? 8 : 4

export function buildMouseInputBuffer(
   dx = 0,
   dy = 0,
   mouseData = 0,
   dwFlags = 0,
   time = 0,
   dwExtraInfo = 0n
): Buffer {
   const size = 20 + ULONG_PTR_SIZE
   const buf = Buffer.alloc(size)
   buf.writeInt32LE(dx, 0)
   buf.writeInt32LE(dy, 4)
   buf.writeUInt32LE(mouseData >>> 0, 8)
   buf.writeUInt32LE(dwFlags >>> 0, 12)
   buf.writeUInt32LE(time >>> 0, 16)
   if (is64Bit) buf.writeBigUInt64LE(BigInt(dwExtraInfo), 20)
   else buf.writeUInt32LE(Number(dwExtraInfo) >>> 0, 20)
   return buf
}

export function buildKeyboardInputBuffer(
   wVk = 0,
   wScan = 0,
   dwFlags = 0,
   time = 0,
   dwExtraInfo = 0n
): Buffer {
   const baseSize = 12 + ULONG_PTR_SIZE
   const buf = Buffer.alloc(baseSize)
   buf.writeUInt16LE(wVk & 0xffff, 0)
   buf.writeUInt16LE(wScan & 0xffff, 2)
   buf.writeUInt32LE(dwFlags >>> 0, 4)
   buf.writeUInt32LE(time >>> 0, 8)
   if (is64Bit) buf.writeBigUInt64LE(BigInt(dwExtraInfo), 12)
   else buf.writeUInt32LE(Number(dwExtraInfo) >>> 0, 12)
   return is64Bit ? Buffer.concat([buf, Buffer.alloc(32 - buf.length)]) : buf
}

export function buildInputBuffer(type: number, inputUnionBuf: Buffer): Buffer {
   const base = is64Bit ? 40 : 36
   const buf = Buffer.alloc(base)
   buf.writeUInt32LE(type >>> 0, 0)
   inputUnionBuf.copy(buf, 8, 0, Math.min(32, inputUnionBuf.length))
   return buf
}
