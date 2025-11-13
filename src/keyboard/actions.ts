import { user32 } from '../core/ffi-loader'
import { buildKeyboardInputBuffer, buildInputBuffer } from '../core/structures'
import { failSafeCheck, handlePause } from '../core/utils'
import { KEYBOARD_MAPPING, SHIFT_KEYS } from './mapping'
import {
  KEYEVENTF_SCANCODE,
  KEYEVENTF_KEYUP,
  KEYEVENTF_EXTENDEDKEY,
} from '../core/constants'
import { keyboard } from './class'
import { config } from '../config'

function sendKeyboardInput(
   scan: number,
   extended: boolean,
   flags: number,
   time = 0
) {
   const fullFlags = flags | (extended ? KEYEVENTF_EXTENDEDKEY : 0)
   const kiBuf = buildKeyboardInputBuffer(0, scan, fullFlags, time, 0n)
   const inputBuf = buildInputBuffer(1, kiBuf)
   user32.symbols.SendInput(1, inputBuf, 40)
}

export function press(
   key: keyof typeof KEYBOARD_MAPPING,
   _pause = config.PAUSE
) {
   const { scan, extended } = KEYBOARD_MAPPING[key]
   const flags = KEYEVENTF_SCANCODE
   sendKeyboardInput(scan, !!extended, flags)
   if (_pause) handlePause(_pause)
   return keyboard
}

export function release(
   key: keyof typeof KEYBOARD_MAPPING,
   _pause = config.PAUSE
) {
   const { scan, extended } = KEYBOARD_MAPPING[key]
   const flags = KEYEVENTF_SCANCODE | KEYEVENTF_KEYUP
   sendKeyboardInput(scan, !!extended, flags)
   if (_pause) handlePause(_pause)
   return keyboard
}

export function tap(key: keyof typeof KEYBOARD_MAPPING, _pause = config.PAUSE) {
  press(key)
  release(key)
  if (_pause) handlePause(_pause)
  return keyboard
}

export function repeatTap(
  key: keyof typeof KEYBOARD_MAPPING,
  repeat = 1,
  delay = 0.0, // milliseconds
  _pause = config.PAUSE
) {
  for (let i = 0; i < repeat; i++) {
    press(key)
    release(key)
    if (delay > 0) Bun.sleepSync(delay)
  }
  if (_pause) handlePause(_pause)
  return keyboard
}

export function write(message: string, delay = 0.0, _pause = config.PAUSE) {
  for (const c of message) {
    if (c >= 'A' && c <= 'Z') {
      const base = c.toLowerCase() as keyof typeof KEYBOARD_MAPPING
      press('shift')
      tap(base)
      release('shift')
    } else if (SHIFT_KEYS.has(c)) {
      const base = SHIFT_KEYS.get(c)! as keyof typeof KEYBOARD_MAPPING
      press('shift')
      tap(base)
      release('shift')
    } else {
      tap(c as keyof typeof KEYBOARD_MAPPING)
    }
    if (delay > 0) Bun.sleepSync(Math.round(delay * 1000))
  }
  if (_pause) handlePause(_pause)
  return keyboard
}

export function isPressed(key: keyof typeof KEYBOARD_MAPPING): boolean {
  const {scan} = KEYBOARD_MAPPING[key]
  let vkCode: number
  if (scan > 1024) {
     const actualScanCode = scan - 1024
     vkCode = user32.symbols.MapVirtualKeyW(actualScanCode, 1)
  } else {
     vkCode = user32.symbols.MapVirtualKeyW(scan, 1)
  }
  const state = user32.symbols.GetAsyncKeyState(vkCode)
  return (state & 0x8000) !== 0
}

export function isAnyPressed(keys: (keyof typeof KEYBOARD_MAPPING)[]): boolean {
  return keys.some((key) => isPressed(key))
}

export function areAllPressed(
  keys: (keyof typeof KEYBOARD_MAPPING)[]
): boolean {
  return keys.every((key) => isPressed(key))
}

export function hotkey(
  keys: (keyof typeof KEYBOARD_MAPPING)[],
  _pause = config.PAUSE
) {
  for (const key of keys) {
    press(key)
  }
  for (let i = keys.length - 1; i >= 0; i--) {
    release(keys[i])
  }
  if (_pause) handlePause(_pause)
  return keyboard
}

export function hold(
  key: keyof typeof KEYBOARD_MAPPING,
  duration: number, // milliseconds
  _pause = config.PAUSE
) {
  press(key, false)
  Bun.sleepSync(duration)
  release(key, false)
  if (_pause) handlePause(_pause)
  return keyboard
}

export function waitForPress(
  key: keyof typeof KEYBOARD_MAPPING,
  timeout?: number // milliseconds
): Promise<boolean> {
  return new Promise((resolve) => {
    const checkInterval = 8
    let elapsed = 0
    const intervalId = setInterval(() => {
      if (isPressed(key)) {
        clearInterval(intervalId)
        resolve(true)
        return
      }
      if (timeout) {
        elapsed += checkInterval
        if (elapsed >= timeout) {
          clearInterval(intervalId)
          resolve(false)
        }
      }
    }, checkInterval)
  })
}

export function waitForRelease(
   key: keyof typeof KEYBOARD_MAPPING,
   timeout?: number // milliseconds
): Promise<boolean> {
   return new Promise((resolve) => {
      const checkInterval = 8
      let elapsed = 0
      const intervalId = setInterval(() => {
         if (!isPressed(key)) {
            clearInterval(intervalId)
            resolve(true)
            return
         }
         if (timeout) {
            elapsed += checkInterval
            if (elapsed >= timeout) {
               clearInterval(intervalId)
               resolve(false)
            }
         }
      }, checkInterval)
   })
}

export function toggleKey(
  key: 'capslock' | 'numlock' | 'scrolllock',
  _pause = config.PAUSE
) {
  tap(key, false)
  if (_pause) handlePause(_pause)
  return keyboard
}

export function getKeyState(key: keyof typeof KEYBOARD_MAPPING): {
  isPressed: boolean
  isToggled: boolean
} {
  const {scan} = KEYBOARD_MAPPING[key]
  let vkCode: number
  if (scan > 1024) {
     const actualScanCode = scan - 1024
     vkCode = user32.symbols.MapVirtualKeyW(actualScanCode, 1)
  } else {
     vkCode = user32.symbols.MapVirtualKeyW(scan, 1)
  }
  const asyncState = user32.symbols.GetAsyncKeyState(vkCode)
  const keyState = user32.symbols.GetKeyState(vkCode)
  return {
    isPressed: (asyncState & 0x8000) !== 0,
    isToggled: (keyState & 0x0001) !== 0,
  }
}

export function releaseAll(_pause = config.PAUSE) {
  const keysToRelease: (keyof typeof KEYBOARD_MAPPING)[] = [
    'shift',
    'shiftleft',
    'shiftright',
    'ctrl',
    'ctrlleft',
    'ctrlright',
    'alt',
    'altleft',
    'altright',
    'win',
    'winleft',
    'winright',
  ]
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split(
    ''
  ) as (keyof typeof KEYBOARD_MAPPING)[]
  keysToRelease.push(...letters)
  for (const key of keysToRelease) {
    if (isPressed(key)) {
      release(key, false)
    }
  }
  if (_pause) handlePause(_pause)
  return keyboard
}
