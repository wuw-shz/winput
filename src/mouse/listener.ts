import { user32 } from '../core/ffi-loader'
import { ptr } from 'bun:ffi'
import { MouseEvents, MouseEventMove, MouseEventButton } from '../types/mouse'

export class Listener {
  private listeners = new Map<keyof MouseEvents, Set<(ev: any) => void>>()
  isRunning = false

  on<K extends keyof MouseEvents>(
    event: K,
    callback: (eventData: MouseEvents[K]) => void
  ) {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set())
    this.listeners.get(event)!.add(callback as (ev: any) => void)
  }

  off<K extends keyof MouseEvents>(
    event: K,
    callback: (eventData: MouseEvents[K]) => void
  ) {
    this.listeners.get(event)?.delete(callback as (ev: any) => void)
  }

  once<K extends keyof MouseEvents>(
    event: K,
    callback: (eventData: MouseEvents[K]) => void
  ) {
    const wrapper = (ev: MouseEvents[K]) => {
      callback(ev)
      this.off(event, wrapper)
    }
    this.on(event, wrapper)
  }

  listen(callback: (eventData: MouseEvents[keyof MouseEvents]) => void) {
    this.on('move', callback)
    this.on('down', callback)
    this.on('up', callback)
  }

  private _emit<K extends keyof MouseEvents>(event: K, data: MouseEvents[K]) {
    this.listeners.get(event)?.forEach((cb) => {
      try {
        ;(cb as (ev: MouseEvents[K]) => void)(data)
      } catch (err) {
        console.error(`Mouse event error [${event}]:`, err)
      }
    })
  }

  async startListener(interval = 8) {
    if (this.isRunning) return
    this.isRunning = true
    console.log('Mouse listener started.')

    const pointBuffer = new ArrayBuffer(8)
    const pv = new DataView(pointBuffer)
    const last = { x: 0, y: 0 }
    const buttons = {
      left: false,
      right: false,
      middle: false,
      x1: false,
      x2: false,
    }

    while (this.isRunning) {
      user32.symbols.GetCursorPos(ptr(pointBuffer))
      const x = pv.getInt32(0, true)
      const y = pv.getInt32(4, true)

      if (x !== last.x || y !== last.y) {
        const ev: MouseEventMove = {
          event: 'move',
          x,
          y,
          lastX: last.x,
          lastY: last.y,
          deltaX: x - last.x,
          deltaY: y - last.y,
        }
        this._emit('move', ev)
        last.x = x
        last.y = y
      }

      const states = {
        left: user32.symbols.GetAsyncKeyState(0x01),
        right: user32.symbols.GetAsyncKeyState(0x02),
        middle: user32.symbols.GetAsyncKeyState(0x04),
        x1: user32.symbols.GetAsyncKeyState(0x05),
        x2: user32.symbols.GetAsyncKeyState(0x06),
      }

      const downs = Object.fromEntries(
        Object.entries(states).map(([k, v]) => [k, (v & 0x8000) !== 0])
      ) as Record<keyof typeof buttons, boolean>

      for (const b of Object.keys(buttons) as (keyof typeof buttons)[]) {
        if (downs[b] !== buttons[b]) {
          buttons[b] = downs[b]
          const ev: MouseEventButton = {
            event: downs[b] ? 'down' : 'up',
            button: b,
            x: last.x,
            y: last.y,
          }
          this._emit(downs[b] ? 'down' : 'up', ev)
        }
      }

      await Bun.sleep(interval)
    }

    console.log('Mouse listener stopped.')
  }

  stopListener() {
    this.isRunning = false
  }
}
