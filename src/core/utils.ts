import { ptr } from 'bun:ffi'
import { user32 } from './ffi-loader'
import { FailSafeException } from './structures'
import { config } from '../config'

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
  if (shouldPause && config.PAUSE_DELAY > 0) {
    Bun.sleepSync(config.PAUSE_DELAY)
  }
}

export function toWindowsCoordinates(x = 0, y = 0): [number, number] {
  const [displayWidth, displayHeight] = size()
  const windowsX = Math.round((x * 65535) / (displayWidth - 1))
  const windowsY = Math.round((y * 65535) / (displayHeight - 1))
  const wx = Math.max(0, Math.min(65535, windowsX))
  const wy = Math.max(0, Math.min(65535, windowsY))
  return [wx, wy]
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
