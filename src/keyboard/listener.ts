import { user32 } from '../core/ffi-loader'
import { KeyboardEvents, KeyEvent } from '../types/keyboard'
import { KEYBOARD_MAPPING } from './mapping'
import { ListenerBase } from '../core/listener'

const SCANCODE_TO_NAME: Record<number, string> = {}
for (const [name, keydef] of Object.entries(KEYBOARD_MAPPING)) {
   SCANCODE_TO_NAME[keydef.scan & 0xfff] = name
}
const MOUSE_VK_CODES = new Set([0x01, 0x02, 0x04, 0x05, 0x06])
const VK_TO_NAME: Record<number, keyof typeof KEYBOARD_MAPPING> = {
   // Function keys
   112: 'f1',
   113: 'f2',
   114: 'f3',
   115: 'f4',
   116: 'f5',
   117: 'f6',
   118: 'f7',
   119: 'f8',
   120: 'f9',
   121: 'f10',
   122: 'f11',
   123: 'f12',
   // Common keys
   13: 'enter',
   16: 'shift',
   17: 'ctrl',
   18: 'alt',
   9: 'tab',
   20: 'capslock',
   27: 'escape',
   32: 'space',
}

export class Listener extends ListenerBase<KeyboardEvents> {
   async run(interval = 8) {
      console.log('Keyboard listener started.')
      const prev: boolean[] = new Array(256).fill(false)
      const vkList = Array.from({ length: 256 }, (_, i) => i)

      while (this.isRunning) {
         for (const vk of vkList) {
            if (MOUSE_VK_CODES.has(vk)) continue

            const state = user32.symbols.GetAsyncKeyState(vk)
            const isDown = (state & 0x8000) !== 0
            const wasPressedSinceLast = (state & 0x0001) !== 0

            let name = VK_TO_NAME[vk] as keyof typeof KEYBOARD_MAPPING

            if (!name) {
               const scanCode = user32.symbols.MapVirtualKeyW(vk, 0)
               name = SCANCODE_TO_NAME[
                  scanCode
               ] as keyof typeof KEYBOARD_MAPPING
            }
            if (!name) {
               if (vk >= 0x30 && vk <= 0x39) {
                  name = String.fromCharCode(
                     vk
                  ) as keyof typeof KEYBOARD_MAPPING
               } else if (vk >= 0x41 && vk <= 0x5a) {
                  name = String.fromCharCode(
                     vk
                  ).toLowerCase() as keyof typeof KEYBOARD_MAPPING
               } else continue
            }

            if (isDown !== prev[vk]) {
               prev[vk] = isDown
               const ev: KeyEvent = {
                  event: isDown ? 'down' : 'up',
                  name,
                  vk_code: vk,
                  isKeyDown: isDown,
               }
               this._emit(isDown ? 'down' : 'up', ev)
            } else if (!isDown && wasPressedSinceLast && !prev[vk]) {
               const downEvent: KeyEvent = {
                  event: 'down',
                  name,
                  vk_code: vk,
                  isKeyDown: true,
               }
               const upEvent: KeyEvent = {
                  event: 'up',
                  name,
                  vk_code: vk,
                  isKeyDown: false,
               }
               this._emit('down', downEvent)
               this._emit('up', upEvent)
            }
         }
         await Bun.sleep(interval)
      }
      console.log('Keyboard listener stopped.')
   }
}
