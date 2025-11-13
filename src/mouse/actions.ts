import { user32 } from '../core/ffi-loader'
import { buildMouseInputBuffer, buildInputBuffer } from '../core/structures'
import {
   failSafeCheck,
   handlePause,
   toWindowsCoordinates,
   position,
} from '../core/utils'
import {
   MOUSEEVENTF_MOVE,
   MOUSEEVENTF_ABSOLUTE,
   MOUSEEVENTF_LEFTDOWN,
   MOUSEEVENTF_LEFTUP,
   MOUSEEVENTF_MIDDLEDOWN,
   MOUSEEVENTF_MIDDLEUP,
   MOUSEEVENTF_RIGHTDOWN,
   MOUSEEVENTF_RIGHTUP,
   MOUSEEVENTF_XDOWN,
   MOUSEEVENTF_XUP,
   XBUTTON1,
   XBUTTON2,
} from '../core/constants'
import { LEFT, MIDDLE, MouseButton, RIGHT, X1, X2 } from './buttons'
import { mouse } from './class'
import { config } from '../config'

const MOUSEEVENTF_WHEEL = 0x0800
const MOUSEEVENTF_HWHEEL = 0x1000
const WHEEL_DELTA = 120

function sendMouseInput(
   dx: number,
   dy: number,
   mouseData: number,
   flags: number,
   time = 0
) {
   const miBuf = buildMouseInputBuffer(dx, dy, mouseData, flags, time, 0n)
   const inputBuf = buildInputBuffer(0, miBuf)
   user32.symbols.SendInput(1, inputBuf, 40)
}

export function press(button: MouseButton = LEFT, _pause = config.PAUSE) {
   let ev: number
   let mouseData = 0
   if (button === LEFT) ev = MOUSEEVENTF_LEFTDOWN
   else if (button === MIDDLE) ev = MOUSEEVENTF_MIDDLEDOWN
   else if (button === RIGHT) ev = MOUSEEVENTF_RIGHTDOWN
   else if (button === X1) {
      ev = MOUSEEVENTF_XDOWN
      mouseData = XBUTTON1
   } else if (button === X2) {
      ev = MOUSEEVENTF_XDOWN
      mouseData = XBUTTON2
   } else
      throw new Error(
         `button must be "left", "middle", "right", "x1", or "x2", not ${button}`
      )
   sendMouseInput(0, 0, mouseData, ev, 0)
   if (_pause) handlePause(_pause)
   return mouse
}

export function release(button: MouseButton = LEFT, _pause = config.PAUSE) {
   let ev: number
   let mouseData = 0
   if (button === LEFT) ev = MOUSEEVENTF_LEFTUP
   else if (button === MIDDLE) ev = MOUSEEVENTF_MIDDLEUP
   else if (button === RIGHT) ev = MOUSEEVENTF_RIGHTUP
   else if (button === X1) {
      ev = MOUSEEVENTF_XUP
      mouseData = XBUTTON1
   } else if (button === X2) {
      ev = MOUSEEVENTF_XUP
      mouseData = XBUTTON2
   } else
      throw new Error(
         `button must be "left", "middle", "right", "x1", or "x2", not ${button}`
      )
   sendMouseInput(0, 0, mouseData, ev, 0)
   if (_pause) handlePause(_pause)
   return mouse
}

export function click(
   button: Exclude<MouseButton, 'x1' | 'x2'> = LEFT,
   repeat = 1,
   delay = 0.0,
   _pause = config.PAUSE
) {
   if ([LEFT, MIDDLE, RIGHT].includes(button)) {
      let downEv = 0,
         upEv = 0
      if (button === LEFT) {
         downEv = MOUSEEVENTF_LEFTDOWN
         upEv = MOUSEEVENTF_LEFTUP
      } else if (button === MIDDLE) {
         downEv = MOUSEEVENTF_MIDDLEDOWN
         upEv = MOUSEEVENTF_MIDDLEUP
      } else {
         downEv = MOUSEEVENTF_RIGHTDOWN
         upEv = MOUSEEVENTF_RIGHTUP
      }
      for (let i = 0; i < repeat; i++) {
         failSafeCheck()
         sendMouseInput(0, 0, 0, downEv, 0)
         sendMouseInput(0, 0, 0, upEv, 0)
         if (delay > 0) Bun.sleepSync(Math.round(delay * 1000))
      }
   }
   if (_pause) handlePause(_pause)
   return mouse
}

export function moveTo(
   x?: number,
   y?: number,
   relative = false,
   _pause = config.PAUSE
) {
   failSafeCheck()
   if (x !== undefined && !Number.isFinite(x)) {
      throw new Error(`Invalid x coordinate: ${x}`)
   }
   if (y !== undefined && !Number.isFinite(y)) {
      throw new Error(`Invalid y coordinate: ${y}`)
   }
   if (!relative) {
      const [finalX, finalY] = position(x, y)
      const [winX, winY] = toWindowsCoordinates(finalX, finalY)
      sendMouseInput(winX, winY, 0, MOUSEEVENTF_MOVE | MOUSEEVENTF_ABSOLUTE, 0)
   } else {
      const offsetX = x ?? 0
      const offsetY = y ?? 0
      moveRel(offsetX, offsetY, true, _pause)
   }
   if (_pause) handlePause(_pause)
   return mouse
}

export function moveRel(
   xOffset = 0,
   yOffset = 0,
   relative = false,
   _pause = config.PAUSE
) {
   failSafeCheck()
   if (!relative) {
      const [x, y] = position()
      moveTo(x + xOffset, y + yOffset, false, _pause)
   } else {
      sendMouseInput(xOffset, yOffset, 0, MOUSEEVENTF_MOVE, 0)
      if (_pause) handlePause(_pause)
   }
   return mouse
}
export const move = moveRel

export function isPressed(button: MouseButton): boolean {
   let vkCode: number
   if (button === LEFT) vkCode = 0x01
   else if (button === RIGHT) vkCode = 0x02
   else if (button === MIDDLE) vkCode = 0x04
   else if (button === X1) vkCode = 0x05
   else if (button === X2) vkCode = 0x06
   else throw new Error(`Invalid button: ${button}`)
   const state = user32.symbols.GetAsyncKeyState(vkCode)
   return (state & 0x8000) !== 0
}

export function dragTo(
   x: number,
   y: number,
   button: Exclude<MouseButton, 'x1' | 'x2'> = LEFT,
   duration = 0.5,
   _pause = config.PAUSE
) {
   failSafeCheck()
   const [startX, startY] = position()
   press(button, false)
   if (duration <= 0) {
      moveTo(x, y, false, false)
   } else {
      const steps = Math.max(10, Math.floor(duration * 100))
      const stepDelay = duration / steps
      for (let i = 1; i <= steps; i++) {
         const progress = i / steps
         const currentX = Math.round(startX + (x - startX) * progress)
         const currentY = Math.round(startY + (y - startY) * progress)
         moveTo(currentX, currentY, false, false)
         Bun.sleepSync(Math.round(stepDelay * 1000))
      }
   }
   release(button, false)
   if (_pause) handlePause(_pause)
   return mouse
}

export function dragRel(
   xOffset: number,
   yOffset: number,
   button: Exclude<MouseButton, 'x1' | 'x2'> = LEFT,
   duration = 0.5,
   _pause = config.PAUSE
) {
   const [currentX, currentY] = position()
   return dragTo(
      currentX + xOffset,
      currentY + yOffset,
      button,
      duration,
      _pause
   )
}

export function scroll(
   clicks: number,
   direction: 'vertical' | 'horizontal' = 'vertical',
   _pause = config.PAUSE
) {
   failSafeCheck()
   const scrollAmount = clicks * WHEEL_DELTA
   const flags =
      direction === 'vertical' ? MOUSEEVENTF_WHEEL : MOUSEEVENTF_HWHEEL
   sendMouseInput(0, 0, scrollAmount, flags, 0)
   if (_pause) handlePause(_pause)
   return mouse
}

const easingFunctions = {
   linear: (t: number) => t,
   easeInQuad: (t: number) => t * t,
   easeOutQuad: (t: number) => t * (2 - t),
   easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
   easeInCubic: (t: number) => t * t * t,
   easeOutCubic: (t: number) => --t * t * t + 1,
   easeInOutCubic: (t: number) =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
}
export type EasingFunction = keyof typeof easingFunctions

export async function smoothMoveTo(
   x: number,
   y: number,
   duration = 0.5, // seconds
   easing: EasingFunction = 'easeOutQuad',
   _pause = config.PAUSE
) {
   failSafeCheck()
   const [startX, startY] = position()
   const easeFn = easingFunctions[easing]
   if (duration <= 0) {
      moveTo(x, y, false, _pause)
      return mouse
   }
   const steps = Math.max(10, Math.floor(duration * 100))
   const stepDelay = duration / steps
   for (let i = 1; i <= steps; i++) {
      const t = i / steps
      const progress = easeFn(t)
      const currentX = Math.round(startX + (x - startX) * progress)
      const currentY = Math.round(startY + (y - startY) * progress)
      moveTo(currentX, currentY, false, false)
      Bun.sleepSync(Math.round(stepDelay * 1000))
   }
   if (_pause) handlePause(_pause)
   return mouse
}

export function hold(
   button: MouseButton,
   duration: number, // seconds
   _pause = config.PAUSE
) {
   failSafeCheck()
   press(button, false)
   Bun.sleepSync(Math.round(duration * 1000))
   release(button, false)
   if (_pause) handlePause(_pause)
   return mouse
}

export function clickAt(
   x: number,
   y: number,
   button: Exclude<MouseButton, 'x1' | 'x2'> = LEFT,
   _pause = config.PAUSE
) {
   failSafeCheck()
   moveTo(x, y, false, true)
   click(button, 1, 0, false)
   if (_pause) handlePause(_pause)
   return mouse
}

export function isAtPosition(x: number, y: number, tolerance = 0): boolean {
   const [currentX, currentY] = position()
   const dx = Math.abs(currentX - x)
   const dy = Math.abs(currentY - y)
   return dx <= tolerance && dy <= tolerance
}

export function waitForPosition(
   x: number,
   y: number,
   timeout?: number, // milliseconds
   tolerance = 0
): Promise<boolean> {
   return new Promise((resolve) => {
      const checkInterval = 8 // milliseconds
      let elapsed = 0
      const intervalId = setInterval(() => {
         if (isAtPosition(x, y, tolerance)) {
            clearInterval(intervalId)
            resolve(true)
            return
         }
         if (timeout !== undefined) {
            elapsed += checkInterval
            if (elapsed >= timeout) {
               clearInterval(intervalId)
               resolve(false)
            }
         }
      }, checkInterval)
   })
}

export async function waitForPress(
   button: MouseButton,
   timeout?: number // milliseconds
): Promise<boolean> {
   return new Promise((resolve) => {
      const checkInterval = 8
      let elapsed = 0
      const intervalId = setInterval(() => {
         if (isPressed(button)) {
            clearInterval(intervalId)
            resolve(true)
            return
         }
         if (timeout !== undefined) {
            elapsed += checkInterval
            if (elapsed >= timeout) {
               clearInterval(intervalId)
               resolve(false)
            }
         }
      }, checkInterval)
   })
}

export async function waitForRelease(
   button: MouseButton,
   timeout?: number // milliseconds
): Promise<boolean> {
   return new Promise((resolve) => {
      const checkInterval = 8
      let elapsed = 0
      const intervalId = setInterval(() => {
         if (!isPressed(button)) {
            clearInterval(intervalId)
            resolve(true)
            return
         }
         if (timeout !== undefined) {
            elapsed += checkInterval
            if (elapsed >= timeout) {
               clearInterval(intervalId)
               resolve(false)
            }
         }
      }, checkInterval)
   })
}
