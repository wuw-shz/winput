import { user32 } from '../core/ffi-loader'
import { KeyboardEvents, KeyEvent } from '../types/keyboard'
import { KEYBOARD_MAPPING } from './mapping'

const SCANCODE_TO_NAME: Record<number, string> = {}
for (const [name, code] of Object.entries(KEYBOARD_MAPPING)) {
  SCANCODE_TO_NAME[code & 0xfff] = name
}

const MOUSE_VK_CODES = new Set([0x01, 0x02, 0x04, 0x05, 0x06])

export class Listener {
  private listeners = new Map<keyof KeyboardEvents, Set<(ev: any) => void>>()
  isRunning = false

  on<K extends keyof KeyboardEvents>(
    event: K,
    callback: (eventData: KeyboardEvents[K]) => void
  ) {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set())
    this.listeners.get(event)!.add(callback as (ev: any) => void)
  }

  off<K extends keyof KeyboardEvents>(
    event: K,
    callback: (eventData: KeyboardEvents[K]) => void
  ) {
    this.listeners.get(event)?.delete(callback as (ev: any) => void)
  }

  once<K extends keyof KeyboardEvents>(
    event: K,
    callback: (eventData: KeyboardEvents[K]) => void
  ) {
    const wrapper = (ev: KeyboardEvents[K]) => {
      callback(ev)
      this.off(event, wrapper)
    }
    this.on(event, wrapper)
  }

  listen(callback: (eventData: KeyEvent) => void) {
    this.on('keydown', callback)
    this.on('keyup', callback)
  }

  private _emit<K extends keyof KeyboardEvents>(
    event: K,
    data: KeyboardEvents[K]
  ) {
    this.listeners.get(event)?.forEach((cb) => {
      try {
        ;(cb as (ev: KeyboardEvents[K]) => void)(data)
      } catch (err) {
        console.error(`Keyboard event error [${event}]:`, err)
      }
    })
  }

  async start(interval = 8) {
    if (this.isRunning) return
    this.isRunning = true
    console.log('Keyboard listener started.')

    const prev: boolean[] = new Array(256).fill(false)
    const vkList = Array.from({ length: 256 }, (_, i) => i)

    while (this.isRunning) {
      for (const vk of vkList) {
        if (MOUSE_VK_CODES.has(vk)) continue

        const state = user32.symbols.GetAsyncKeyState(vk)
        const isDown = (state & 0x8000) !== 0
        const wasPressedSinceLast = (state & 0x0001) !== 0

        let name: string | undefined
        const scanCode = user32.symbols.MapVirtualKeyW(vk, 0)
        name = SCANCODE_TO_NAME[scanCode]
        if (!name) {
          if (vk >= 0x30 && vk <= 0x5a) {
            name = String.fromCharCode(vk).toLowerCase()
          } else if (vk === 13) name = 'enter'
          else if (vk === 16) name = 'shift'
          else if (vk === 17) name = 'ctrl'
          else if (vk === 18) name = 'alt'
          else if (vk === 9) name = 'tab'
          else if (vk === 20) name = 'capslock'
          else if (vk === 27) name = 'escape'
          else if (vk === 32) name = 'space'
          else if (vk >= 112 && vk <= 123) name = `f${vk - 111}`
          else name = `vk_${vk.toString(16).padStart(2, '0')}`
        }

        if (isDown !== prev[vk]) {
          prev[vk] = isDown
          const ev: KeyEvent = {
            event: isDown ? 'down' : 'up',
            name,
            vk_code: vk,
            isKeyDown: isDown,
          }
          this._emit(isDown ? 'keydown' : 'keyup', ev)
        } else if (!isDown && wasPressedSinceLast && !prev[vk]) {
          const ev: KeyEvent = {
            event: 'down',
            name,
            vk_code: vk,
            isKeyDown: true,
          }
          this._emit('keydown', ev)
          this._emit('keyup', {
            ...ev,
            event: 'up',
            isKeyDown: false,
          })
        }
      }

      await Bun.sleep(interval)
    }

    console.log('Keyboard listener stopped.')
  }

  stop() {
    this.isRunning = false
  }
}
