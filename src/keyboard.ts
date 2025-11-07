import { ptr } from 'bun:ffi'
import { user32 } from './ffi-loader'
import { KeyBdInput, Input } from './structures'
import { failSafeCheck, handlePause } from './utils'
import { KEYBOARD_MAPPING } from './keyboard-mapping'
import {
  KEYEVENTF_SCANCODE,
  KEYEVENTF_KEYUP,
  KEYEVENTF_EXTENDEDKEY,
} from './constants'

export function keyDown(key: string, _pause = true): boolean {
  failSafeCheck()

  const normalizedKey = key.length > 1 ? key.toLowerCase() : key.toLowerCase()

  if (!(normalizedKey in KEYBOARD_MAPPING)) {
    return false
  }

  let keybdFlags = KEYEVENTF_SCANCODE
  let insertedEvents = 0
  let expectedEvents = 1

  if (['up', 'left', 'down', 'right'].includes(normalizedKey)) {
    keybdFlags |= KEYEVENTF_EXTENDEDKEY

    if (user32.symbols.GetKeyState(0x90) !== 0) {
      expectedEvents = 2
      const ki = new KeyBdInput(0, 0xe0, KEYEVENTF_SCANCODE, 0)
      const input = new Input(1, ki)
      insertedEvents += user32.symbols.SendInput(1, ptr(input.buffer), 40)
    }
  }

  const hexKeyCode = KEYBOARD_MAPPING[normalizedKey]
  const ki = new KeyBdInput(0, hexKeyCode, keybdFlags, 0)
  const input = new Input(1, ki)
  insertedEvents += user32.symbols.SendInput(1, ptr(input.buffer), 40)

  if (_pause) handlePause(_pause)
  return insertedEvents === expectedEvents
}

export function keyUp(key: string, _pause = true): boolean {
  failSafeCheck()

  const normalizedKey = key.length > 1 ? key.toLowerCase() : key.toLowerCase()

  if (!(normalizedKey in KEYBOARD_MAPPING)) {
    return false
  }

  let keybdFlags = KEYEVENTF_SCANCODE | KEYEVENTF_KEYUP
  let insertedEvents = 0
  let expectedEvents = 1

  if (['up', 'left', 'down', 'right'].includes(normalizedKey)) {
    keybdFlags |= KEYEVENTF_EXTENDEDKEY
  }

  const hexKeyCode = KEYBOARD_MAPPING[normalizedKey]
  const ki = new KeyBdInput(0, hexKeyCode, keybdFlags, 0)
  const input = new Input(1, ki)
  insertedEvents += user32.symbols.SendInput(1, ptr(input.buffer), 40)

  if (
    ['up', 'left', 'down', 'right'].includes(normalizedKey) &&
    user32.symbols.GetKeyState(0x90) !== 0
  ) {
    expectedEvents = 2
    const ki2 = new KeyBdInput(0, 0xe0, KEYEVENTF_SCANCODE | KEYEVENTF_KEYUP, 0)
    const input2 = new Input(1, ki2)
    insertedEvents += user32.symbols.SendInput(1, ptr(input2.buffer), 40)
  }

  if (_pause) handlePause(_pause)
  return insertedEvents === expectedEvents
}

export function press(
  keys: string | string[],
  presses = 1,
  interval = 0.0,
  _pause = true
): boolean {
  const keyArray = typeof keys === 'string' ? [keys] : keys
  const normalizedKeys = keyArray.map((k) =>
    k.length > 1 ? k.toLowerCase() : k.toLowerCase()
  )

  const expectedPresses = presses * normalizedKeys.length
  let completedPresses = 0

  for (let i = 0; i < presses; i++) {
    for (const k of normalizedKeys) {
      failSafeCheck()
      const downed = keyDown(k, false)
      const upped = keyUp(k, false)
      if (downed && upped) {
        completedPresses++
      }
    }
    if (interval > 0) {
      Bun.sleepSync(interval * 1000)
    }
  }

  if (_pause) handlePause(_pause)
  return completedPresses === expectedPresses
}

export function typewrite(
  message: string,
  interval = 0.0,
  _pause = true
): void {
  for (const c of message) {
    const char = c.toLowerCase()
    press(char, 1, 0, false)
    if (interval > 0) {
      Bun.sleepSync(interval * 1000)
    }
    failSafeCheck()
  }

  if (_pause) handlePause(_pause)
}

export const write = typewrite
