export class MouseInput {
  buffer: ArrayBuffer
  view: DataView
  constructor(
    dx = 0,
    dy = 0,
    mouseData = 0,
    dwFlags = 0,
    time = 0,
    dwExtraInfo = 0n
  ) {
    this.buffer = new ArrayBuffer(32)
    this.view = new DataView(this.buffer)
    this.view.setInt32(0, dx, true)
    this.view.setInt32(4, dy, true)
    this.view.setUint32(8, mouseData, true)
    this.view.setUint32(12, dwFlags, true)
    this.view.setUint32(16, time, true)
    this.view.setBigUint64(20, BigInt(dwExtraInfo), true)
  }
}

export class KeyBdInput {
  buffer: ArrayBuffer
  view: DataView
  constructor(wVk = 0, wScan = 0, dwFlags = 0, time = 0, dwExtraInfo = 0n) {
    this.buffer = new ArrayBuffer(32)
    this.view = new DataView(this.buffer)
    this.view.setUint16(0, wVk, true)
    this.view.setUint16(2, wScan, true)
    this.view.setUint32(4, dwFlags, true)
    this.view.setUint32(8, time, true)
    this.view.setBigUint64(12, BigInt(dwExtraInfo), true)
  }
}

export class Input {
  buffer: ArrayBuffer
  view: DataView
  constructor(type: number, inputUnion: MouseInput | KeyBdInput) {
    this.buffer = new ArrayBuffer(40)
    this.view = new DataView(this.buffer)
    this.view.setUint32(0, type, true)
    const src = new Uint8Array(inputUnion.buffer)
    const dst = new Uint8Array(this.buffer)
    dst.set(src, 8)
  }
}

export class FailSafeException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'FailSafeException'
  }
}
