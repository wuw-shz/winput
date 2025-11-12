import { ptr } from 'bun:ffi'
import { user32 } from '../core/ffi-loader'
import { MouseInput, Input } from '../core/structures'
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
  MOUSEEVENTF_LEFTCLICK,
  MOUSEEVENTF_MIDDLEDOWN,
  MOUSEEVENTF_MIDDLEUP,
  MOUSEEVENTF_MIDDLECLICK,
  MOUSEEVENTF_RIGHTDOWN,
  MOUSEEVENTF_RIGHTUP,
  MOUSEEVENTF_RIGHTCLICK,
  MOUSEEVENTF_XDOWN,
  MOUSEEVENTF_XUP,
  XBUTTON1,
  XBUTTON2,
} from '../core/constants'
import { LEFT, MIDDLE, MouseButton, RIGHT, X1, X2 } from './buttons'
import { mouse } from './class'
import { config } from '../config'

export function down(button: MouseButton = LEFT, _pause = config.PAUSE) {
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
  const mi = new MouseInput(0, 0, mouseData, ev, 0)
  const input = new Input(0, mi)
  user32.symbols.SendInput(1, ptr(input.buffer), 40)
  if (_pause) handlePause(_pause)
  return mouse
}

export function up(button: MouseButton = LEFT, _pause = config.PAUSE) {
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
  const mi = new MouseInput(0, 0, mouseData, ev, 0)
  const input = new Input(0, mi)
  user32.symbols.SendInput(1, ptr(input.buffer), 40)
  if (_pause) handlePause(_pause)
  return mouse
}

export function click(
  button: Exclude<MouseButton, 'x1' | 'x2'> = LEFT,
  clicks = 1,
  interval = 0.0,
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
    for (let i = 0; i < clicks; i++) {
      failSafeCheck()
      user32.symbols.SendInput(
        1,
        ptr(new Input(0, new MouseInput(0, 0, 0, downEv, 0)).buffer),
        40
      )
      user32.symbols.SendInput(
        1,
        ptr(new Input(0, new MouseInput(0, 0, 0, upEv, 0)).buffer),
        40
      )
      if (interval > 0) Bun.sleepSync(interval * 1000)
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
  if (!relative) {
    const [finalX, finalY] = position(x, y)
    const [winX, winY] = toWindowsCoordinates(finalX, finalY)
    const mi = new MouseInput(
      winX,
      winY,
      0,
      MOUSEEVENTF_MOVE | MOUSEEVENTF_ABSOLUTE,
      0
    )
    const input = new Input(0, mi)
    user32.symbols.SendInput(1, ptr(input.buffer), 40)
  } else {
    const [currentX, currentY] = position()
    moveRel(
      (x ?? currentX) - currentX,
      (y ?? currentY) - currentY,
      _pause,
      true
    )
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
    moveTo(x + xOffset, y + yOffset, _pause)
  } else {
    const mi = new MouseInput(xOffset, yOffset, 0, MOUSEEVENTF_MOVE, 0)
    const input = new Input(0, mi)
    user32.symbols.SendInput(1, ptr(input.buffer), 40)
    if (_pause) handlePause(_pause)
  }
  return mouse
}

export const move = moveRel
