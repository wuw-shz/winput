import { ptr } from 'bun:ffi'
import { user32 } from './ffi-loader'
import { MouseInput, Input } from './structures'
import {
  failSafeCheck,
  handlePause,
  toWindowsCoordinates,
  position,
} from './utils'
import {
  LEFT,
  MIDDLE,
  RIGHT,
  PRIMARY,
  SECONDARY,
  X1,
  X2,
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
} from './constants'

export { LEFT, MIDDLE, RIGHT, PRIMARY, SECONDARY, X1, X2 }

export function mouseDown(
  x?: number,
  y?: number,
  button: string = PRIMARY,
  _pause = true
): void {
  if (x !== undefined || y !== undefined) {
    moveTo(x, y)
  }

  let ev: number
  let mouseData = 0

  if (button === PRIMARY || button === LEFT) {
    ev = MOUSEEVENTF_LEFTDOWN
  } else if (button === MIDDLE) {
    ev = MOUSEEVENTF_MIDDLEDOWN
  } else if (button === SECONDARY || button === RIGHT) {
    ev = MOUSEEVENTF_RIGHTDOWN
  } else if (button === X1) {
    ev = MOUSEEVENTF_XDOWN
    mouseData = XBUTTON1
  } else if (button === X2) {
    ev = MOUSEEVENTF_XDOWN
    mouseData = XBUTTON2
  } else {
    throw new Error(
      `button must be "left", "middle", "right", "x1", or "x2", not ${button}`
    )
  }

  const mi = new MouseInput(0, 0, mouseData, ev, 0)
  const input = new Input(0, mi)

  user32.symbols.SendInput(1, ptr(input.buffer), 40)

  if (_pause) handlePause(_pause)
}

export function mouseUp(
  x?: number,
  y?: number,
  button: string = PRIMARY,
  _pause = true
): void {
  if (x !== undefined || y !== undefined) {
    moveTo(x, y)
  }

  let ev: number
  let mouseData = 0

  if (button === PRIMARY || button === LEFT) {
    ev = MOUSEEVENTF_LEFTUP
  } else if (button === MIDDLE) {
    ev = MOUSEEVENTF_MIDDLEUP
  } else if (button === SECONDARY || button === RIGHT) {
    ev = MOUSEEVENTF_RIGHTUP
  } else if (button === X1) {
    ev = MOUSEEVENTF_XUP
    mouseData = XBUTTON1
  } else if (button === X2) {
    ev = MOUSEEVENTF_XUP
    mouseData = XBUTTON2
  } else {
    throw new Error(
      `button must be "left", "middle", "right", "x1", or "x2", not ${button}`
    )
  }

  const mi = new MouseInput(0, 0, mouseData, ev, 0)
  const input = new Input(0, mi)

  user32.symbols.SendInput(1, ptr(input.buffer), 40)

  if (_pause) handlePause(_pause)
}

export function click(
  x?: number,
  y?: number,
  clicks = 1,
  interval = 0.0,
  button: string = PRIMARY,
  _pause = true
): void {
  if (x !== undefined || y !== undefined) {
    moveTo(x, y)
  }

  if (button === X1 || button === X2) {
    for (let i = 0; i < clicks; i++) {
      failSafeCheck()
      mouseDown(undefined, undefined, button, false)
      mouseUp(undefined, undefined, button, false)
      if (interval > 0) {
        Bun.sleepSync(interval * 1000)
      }
    }
  } else {
    let ev: number
    if (button === PRIMARY || button === LEFT) {
      ev = MOUSEEVENTF_LEFTCLICK
    } else if (button === MIDDLE) {
      ev = MOUSEEVENTF_MIDDLECLICK
    } else if (button === SECONDARY || button === RIGHT) {
      ev = MOUSEEVENTF_RIGHTCLICK
    } else {
      throw new Error(
        `button must be "left", "middle", "right", "x1", or "x2", not ${button}`
      )
    }

    for (let i = 0; i < clicks; i++) {
      failSafeCheck()

      const mi = new MouseInput(0, 0, 0, ev, 0)
      const input = new Input(0, mi)

      user32.symbols.SendInput(1, ptr(input.buffer), 40)

      if (interval > 0) {
        Bun.sleepSync(interval * 1000)
      }
    }
  }

  if (_pause) handlePause(_pause)
}

export function leftClick(
  x?: number,
  y?: number,
  interval = 0.0,
  _pause = true
): void {
  click(x, y, 1, interval, LEFT, _pause)
}

export function rightClick(
  x?: number,
  y?: number,
  interval = 0.0,
  _pause = true
): void {
  click(x, y, 1, interval, RIGHT, _pause)
}

export function middleClick(
  x?: number,
  y?: number,
  interval = 0.0,
  _pause = true
): void {
  click(x, y, 1, interval, MIDDLE, _pause)
}

export function doubleClick(
  x?: number,
  y?: number,
  interval = 0.0,
  button = LEFT,
  _pause = true
): void {
  click(x, y, 2, interval, button, _pause)
}

export function tripleClick(
  x?: number,
  y?: number,
  interval = 0.0,
  button = LEFT,
  _pause = true
): void {
  click(x, y, 3, interval, button, _pause)
}

export function moveTo(
  x?: number,
  y?: number,
  _pause = true,
  relative = false
): void {
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
}

export function moveRel(
  xOffset = 0,
  yOffset = 0,
  _pause = true,
  relative = false
): void {
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
}

export const move = moveRel
