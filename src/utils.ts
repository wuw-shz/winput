import { ptr } from 'bun:ffi'
import { user32 } from './ffi-loader'
import { FailSafeException } from './structures'

export const config = {
  FAILSAFE: true,
  FAILSAFE_POINTS: [[0, 0]] as [number, number][],
  PAUSE: 0.05,
}

export let FAILSAFE = config.FAILSAFE
export let FAILSAFE_POINTS = config.FAILSAFE_POINTS
export let PAUSE = config.PAUSE

export function failSafeCheck(): void {
  if (config.FAILSAFE) {
    const pos = position()
    for (const point of config.FAILSAFE_POINTS) {
      if (pos[0] === point[0] && pos[1] === point[1]) {
        throw new FailSafeException(
          'DirectInput fail-safe triggered from mouse moving to a corner of the screen. ' +
            'To disable this fail-safe, set config.FAILSAFE to false. DISABLING FAIL-SAFE IS NOT RECOMMENDED.'
        )
      }
    }
  }
}

export function handlePause(shouldPause: boolean): void {
  if (shouldPause && config.PAUSE > 0) {
    Bun.sleepSync(config.PAUSE * 1000)
  }
}

export function toWindowsCoordinates(x = 0, y = 0): [number, number] {
  const [displayWidth, displayHeight] = size()
  const windowsX = Math.floor((x * 65536) / displayWidth) + 1
  const windowsY = Math.floor((y * 65536) / displayHeight) + 1
  return [windowsX, windowsY]
}

export function position(x?: number, y?: number): [number, number] {
  const pointBuffer = new ArrayBuffer(8)
  const pointView = new DataView(pointBuffer)

  user32.symbols.GetCursorPos(ptr(pointBuffer))

  const cursorX = pointView.getInt32(0, true)
  const cursorY = pointView.getInt32(4, true)

  return [x ?? cursorX, y ?? cursorY]
}

export function size(): [number, number] {
  const width = user32.symbols.GetSystemMetrics(0)
  const height = user32.symbols.GetSystemMetrics(1)
  return [width, height]
}