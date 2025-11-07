import { describe, test, expect, beforeEach, afterEach } from 'bun:test'
import {
  config,
  position,
  size,
  failSafeCheck,
  handlePause,
  toWindowsCoordinates,
  FailSafeException,
} from '../src/index'

describe('Utility Functions', () => {
  let originalFailsafe: boolean
  let originalFailsafePoints: [number, number][]
  let originalPause: number

  beforeEach(() => {
    originalFailsafe = config.FAILSAFE
    originalFailsafePoints = [...config.FAILSAFE_POINTS]
    originalPause = config.PAUSE

    config.FAILSAFE = false
  })

  afterEach(() => {
    config.FAILSAFE = originalFailsafe
    config.FAILSAFE_POINTS = originalFailsafePoints
    config.PAUSE = originalPause
  })

  describe('Configuration variables', () => {
    test('config.FAILSAFE is boolean', () => {
      expect(typeof config.FAILSAFE).toBe('boolean')
    })

    test('config.FAILSAFE_POINTS is array', () => {
      expect(Array.isArray(config.FAILSAFE_POINTS)).toBe(true)
    })

    test('config.FAILSAFE_POINTS contains coordinate pairs', () => {
      for (const point of config.FAILSAFE_POINTS) {
        expect(Array.isArray(point)).toBe(true)
        expect(point.length).toBe(2)
        expect(typeof point[0]).toBe('number')
        expect(typeof point[1]).toBe('number')
      }
    })

    test('config.PAUSE is number', () => {
      expect(typeof config.PAUSE).toBe('number')
    })

    test('config.PAUSE is non-negative', () => {
      expect(config.PAUSE).toBeGreaterThanOrEqual(0)
    })

    test('Can modify config.FAILSAFE', () => {
      config.FAILSAFE = false
      expect(config.FAILSAFE).toBe(false)
      config.FAILSAFE = true
      expect(config.FAILSAFE).toBe(true)
    })

    test('Can modify config.FAILSAFE_POINTS', () => {
      config.FAILSAFE_POINTS = [[100, 100]]
      expect(config.FAILSAFE_POINTS).toEqual([[100, 100]])
    })

    test('Can modify config.PAUSE', () => {
      config.PAUSE = 0.5
      expect(config.PAUSE).toBe(0.5)
    })
  })

  describe('position()', () => {
    test('returns current mouse position', () => {
      const [x, y] = position()
      expect(typeof x).toBe('number')
      expect(typeof y).toBe('number')
    })

    test('returns non-negative coordinates', () => {
      const [x, y] = position()
      expect(x).toBeGreaterThanOrEqual(0)
      expect(y).toBeGreaterThanOrEqual(0)
    })

    test('returns provided x coordinate', () => {
      const [x, y] = position(123, undefined)
      expect(x).toBe(123)
    })

    test('returns provided y coordinate', () => {
      const [x, y] = position(undefined, 456)
      expect(y).toBe(456)
    })

    test('returns both provided coordinates', () => {
      const [x, y] = position(789, 321)
      expect(x).toBe(789)
      expect(y).toBe(321)
    })

    test('handles zero coordinates', () => {
      const [x, y] = position(0, 0)
      expect(x).toBe(0)
      expect(y).toBe(0)
    })
  })

  describe('size()', () => {
    test('returns screen dimensions', () => {
      const [width, height] = size()
      expect(typeof width).toBe('number')
      expect(typeof height).toBe('number')
    })

    test('returns positive dimensions', () => {
      const [width, height] = size()
      expect(width).toBeGreaterThan(0)
      expect(height).toBeGreaterThan(0)
    })

    test('dimensions are realistic', () => {
      const [width, height] = size()

      expect(width).toBeGreaterThanOrEqual(640)
      expect(width).toBeLessThanOrEqual(7680)
      expect(height).toBeGreaterThanOrEqual(480)
      expect(height).toBeLessThanOrEqual(4320)
    })

    test('returns consistent values', () => {
      const [w1, h1] = size()
      const [w2, h2] = size()
      expect(w1).toBe(w2)
      expect(h1).toBe(h2)
    })
  })

  describe('failSafeCheck()', () => {
    test('does nothing when config.FAILSAFE is disabled', () => {
      config.FAILSAFE = false
      expect(() => failSafeCheck()).not.toThrow()
    })

    test('throws when cursor at failsafe point', () => {
      config.FAILSAFE = true
      config.FAILSAFE_POINTS = [[position()[0], position()[1]]]
      expect(() => failSafeCheck()).toThrow(FailSafeException)
    })

    test('does not throw when cursor not at failsafe point', () => {
      config.FAILSAFE = true
      config.FAILSAFE_POINTS = [[99999, 99999]]
      expect(() => failSafeCheck()).not.toThrow()
    })

    test('checks all failsafe points', () => {
      config.FAILSAFE = true
      const [x, y] = position()
      config.FAILSAFE_POINTS = [
        [99999, 99999],
        [x, y],
        [88888, 88888],
      ]
      expect(() => failSafeCheck()).toThrow(FailSafeException)
    })

    test('thrown exception has correct message', () => {
      config.FAILSAFE = true
      config.FAILSAFE_POINTS = [[position()[0], position()[1]]]
      try {
        failSafeCheck()
        expect(true).toBe(false)
      } catch (e) {
        expect(e).toBeInstanceOf(FailSafeException)
        expect((e as Error).message).toContain('fail-safe triggered')
      }
    })
  })

  describe('handlePause()', () => {
    test('pauses when shouldPause is true', () => {
      config.PAUSE = 0.01
      const start = Date.now()
      handlePause(true)
      const duration = Date.now() - start
      expect(duration).toBeGreaterThanOrEqual(10)
    })

    test('does not pause when shouldPause is false', () => {
      config.PAUSE = 1.0
      const start = Date.now()
      handlePause(false)
      const duration = Date.now() - start
      expect(duration).toBeLessThan(50)
    })

    test('respects config.PAUSE duration', () => {
      config.PAUSE = 0.05
      const start = Date.now()
      handlePause(true)
      const duration = Date.now() - start
      expect(duration).toBeGreaterThanOrEqual(50)
      expect(duration).toBeLessThan(150)
    })

    test('handles zero config.PAUSE', () => {
      config.PAUSE = 0
      expect(() => handlePause(true)).not.toThrow()
    })
  })

  describe('toWindowsCoordinates()', () => {
    test('converts screen coordinates to Windows coordinates', () => {
      const [winX, winY] = toWindowsCoordinates(0, 0)
      expect(typeof winX).toBe('number')
      expect(typeof winY).toBe('number')
    })

    test('converts to 65536 scale', () => {
      const [width, height] = size()
      const [winX, winY] = toWindowsCoordinates(width - 1, height - 1)

      expect(winX).toBeGreaterThan(60000)
      expect(winY).toBeGreaterThan(60000)
    })

    test('handles zero coordinates', () => {
      const [winX, winY] = toWindowsCoordinates(0, 0)
      expect(winX).toBeGreaterThan(0)
      expect(winY).toBeGreaterThan(0)
    })

    test('handles center coordinates', () => {
      const [width, height] = size()
      const [winX, winY] = toWindowsCoordinates(width / 2, height / 2)
      expect(winX).toBeGreaterThan(20000)
      expect(winX).toBeLessThan(45000)
      expect(winY).toBeGreaterThan(20000)
      expect(winY).toBeLessThan(45000)
    })

    test('handles default parameters', () => {
      const [winX, winY] = toWindowsCoordinates()
      expect(winX).toBeGreaterThan(0)
      expect(winY).toBeGreaterThan(0)
    })

    test('proportional scaling', () => {
      const [width, height] = size()
      const [win1X, win1Y] = toWindowsCoordinates(width / 4, height / 4)
      const [win2X, win2Y] = toWindowsCoordinates(width / 2, height / 2)

      expect(win2X).toBeGreaterThan(win1X)
      expect(win2Y).toBeGreaterThan(win1Y)
    })
  })

  describe('Edge cases', () => {
    test('handles moderately large config.PAUSE values', () => {
      config.PAUSE = 1.0
      const start = Date.now()
      handlePause(true)
      const duration = Date.now() - start
      expect(duration).toBeGreaterThanOrEqual(990)
      expect(duration).toBeLessThan(1500)
    })

    test('handles negative config.PAUSE gracefully', () => {
      config.PAUSE = -1
      expect(() => handlePause(true)).not.toThrow()
    })

    test('empty config.FAILSAFE_POINTS array', () => {
      config.FAILSAFE = true
      config.FAILSAFE_POINTS = []
      expect(() => failSafeCheck()).not.toThrow()
    })

    test('multiple identical failsafe points', () => {
      config.FAILSAFE = true
      const [x, y] = position()
      config.FAILSAFE_POINTS = [
        [x, y],
        [x, y],
        [x, y],
      ]
      expect(() => failSafeCheck()).toThrow(FailSafeException)
    })
  })
})
