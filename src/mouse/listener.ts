import { user32 } from '../core/ffi-loader'
import { MouseEvents, MouseEventMove, MouseEventButton } from '../types/mouse'
import { ptr } from 'bun:ffi'
import { ListenerBase } from '../core/listener'

export class Listener extends ListenerBase<MouseEvents> {
   async run(interval = 8) {
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
}
