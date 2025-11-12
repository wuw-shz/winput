import { ptr } from 'bun:ffi'
import { user32 } from '../core/ffi-loader'
import { KeyBdInput, Input } from '../core/structures'
import { failSafeCheck, handlePause } from '../core/utils'
import { KEYBOARD_MAPPING, SHIFT_KEYS } from './mapping'
import {
  KEYEVENTF_SCANCODE,
  KEYEVENTF_KEYUP,
  KEYEVENTF_EXTENDEDKEY,
} from '../core/constants'
import { keyboard } from './class'
import { config } from '../config'

export function down(
  key: keyof typeof KEYBOARD_MAPPING,
  _pause = config.PAUSE
) {
  failSafeCheck()
  let keybdFlags = KEYEVENTF_SCANCODE
  if (['up', 'left', 'down', 'right'].includes(key))
    keybdFlags |= KEYEVENTF_EXTENDEDKEY
  const hexKeyCode = KEYBOARD_MAPPING[key]
  const ki = new KeyBdInput(0, hexKeyCode, keybdFlags, 0)
  const input = new Input(1, ki)
  user32.symbols.SendInput(1, ptr(input.buffer), 40)
  if (_pause) handlePause(_pause)
  return keyboard
}

export function up(key: keyof typeof KEYBOARD_MAPPING, _pause = config.PAUSE) {
  failSafeCheck()
  let keybdFlags = KEYEVENTF_SCANCODE | KEYEVENTF_KEYUP
  if (['up', 'left', 'down', 'right'].includes(key))
    keybdFlags |= KEYEVENTF_EXTENDEDKEY
  const hexKeyCode = KEYBOARD_MAPPING[key]
  const ki = new KeyBdInput(0, hexKeyCode, keybdFlags, 0)
  const input = new Input(1, ki)
  user32.symbols.SendInput(1, ptr(input.buffer), 40)
  if (_pause) handlePause(_pause)
  return keyboard
}

export function tap(key: keyof typeof KEYBOARD_MAPPING, _pause = config.PAUSE) {
  failSafeCheck()
  down(key, false)
  up(key, false)
  if (_pause) handlePause(_pause)
  return keyboard
}

export function repeatTap(
  key: keyof typeof KEYBOARD_MAPPING,
  repeat = 1,
  delay = 0.0,
  _pause = config.PAUSE
) {
  for (let i = 0; i < repeat; i++) {
    failSafeCheck()
    down(key, false)
    up(key, false)
    if (delay > 0) Bun.sleepSync(delay)
  }
  if (_pause) handlePause(_pause)
  return keyboard
}

export function write(message: string, delay = 0.0, _pause = config.PAUSE) {
  for (const c of message) {
    failSafeCheck()
    if (c !== c.toLowerCase()) {
      const base = c.toLowerCase() as keyof typeof KEYBOARD_MAPPING
      down('shift')
      tap(base)
      up('shift')
    } else if (SHIFT_KEYS.has(c)) {
      const base = SHIFT_KEYS.get(c)! as keyof typeof KEYBOARD_MAPPING
      down('shift')
      tap(base)
      up('shift')
    } else {
      tap(c as keyof typeof KEYBOARD_MAPPING)
    }
    if (delay > 0) Bun.sleepSync(delay)
  }
  if (_pause) handlePause(_pause)
  return keyboard
}
