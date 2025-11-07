import { describe, test, expect, beforeAll } from 'bun:test'
import {
  moveTo,
  moveRel,
  move,
  click,
  leftClick,
  rightClick,
  middleClick,
  doubleClick,
  tripleClick,
  mouseDown,
  mouseUp,
  position,
  LEFT,
  RIGHT,
  MIDDLE,
  X1,
  X2,
  config,
} from '../src/index'

describe('Mouse Functions', () => {
  beforeAll(() => {
    config.FAILSAFE = false
  })

  describe('Mouse position', () => {
    test('position() returns valid coordinates', () => {
      const [x, y] = position()
      expect(typeof x).toBe('number')
      expect(typeof y).toBe('number')
      expect(x).toBeGreaterThanOrEqual(0)
      expect(y).toBeGreaterThanOrEqual(0)
    })

    test('position() with parameters returns those values', () => {
      expect(position(500, 600)).toEqual([500, 600])
      expect(position(0, 0)).toEqual([0, 0])
    })
  })

  describe('moveTo()', () => {
    test('moves to absolute coordinates', () => {
      moveTo(150, 150, false)
      const [x, y] = position()
      expect(x).toBe(150)
      expect(y).toBe(150)
    })

    test('moves to different coordinates', () => {
      moveTo(300, 450, false)
      const [x, y] = position()
      expect(x).toBe(300)
      expect(y).toBe(450)
    })

    test('handles undefined x coordinate', () => {
      moveTo(200, 200, false)
      moveTo(undefined, 250, false)
      const [x, y] = position()
      expect(x).toBe(200)
      expect(y).toBe(250)
    })

    test('handles undefined y coordinate', () => {
      moveTo(200, 200, false)
      moveTo(250, undefined, false)
      const [x, y] = position()
      expect(x).toBe(250)
      expect(y).toBe(200)
    })
  })

  describe('moveRel()', () => {
    test('moves relative to current position', () => {
      moveTo(100, 100, false)
      moveRel(50, 50, false)
      const [x, y] = position()
      expect(x).toBe(150)
      expect(y).toBe(150)
    })

    test('moves with negative offsets', () => {
      moveTo(200, 200, false)
      moveRel(-50, -50, false)
      const [x, y] = position()
      expect(x).toBe(150)
      expect(y).toBe(150)
    })

    test('move() is alias for moveRel()', () => {
      expect(move).toBe(moveRel)
    })

    test('handles zero offset', () => {
      moveTo(300, 300, false)
      const [startX, startY] = position()
      moveRel(0, 0, false)
      const [endX, endY] = position()
      expect(endX).toBe(startX)
      expect(endY).toBe(startY)
    })
  })

  describe('click()', () => {
    test('performs single click', () => {
      moveTo(500, 500, false)
      expect(() => click(undefined, undefined, 1, 0, LEFT, false)).not.toThrow()
    })

    test('performs multiple clicks', () => {
      expect(() => click(500, 500, 3, 0, LEFT, false)).not.toThrow()
    })

    test('clicks at specified coordinates', () => {
      click(600, 600, 1, 0, LEFT, false)
      const [x, y] = position()
      expect(x).toBe(600)
      expect(y).toBe(600)
    })

    test('supports different mouse buttons', () => {
      expect(() => click(500, 500, 1, 0, LEFT, false)).not.toThrow()
      expect(() => click(500, 500, 1, 0, RIGHT, false)).not.toThrow()
      expect(() => click(500, 500, 1, 0, MIDDLE, false)).not.toThrow()
    })

    test('supports X buttons', () => {
      expect(() => click(500, 500, 1, 0, X1, false)).not.toThrow()
      expect(() => click(500, 500, 1, 0, X2, false)).not.toThrow()
    })

    test('throws error for invalid button', () => {
      expect(() => click(500, 500, 1, 0, 'invalid' as any, false)).toThrow(
        'button must be "left", "middle", "right", "x1", or "x2"'
      )
    })

    test('respects click interval', async () => {
      const start = Date.now()
      click(500, 500, 2, 0.1, LEFT, false)
      const duration = Date.now() - start
      expect(duration).toBeGreaterThanOrEqual(100)
    })
  })

  describe('Click helper functions', () => {
    test('leftClick() performs left click', () => {
      expect(() => leftClick(400, 400, 0, false)).not.toThrow()
      const [x, y] = position()
      expect(x).toBe(400)
      expect(y).toBe(400)
    })

    test('rightClick() performs right click', () => {
      expect(() => rightClick(450, 450, 0, false)).not.toThrow()
      const [x, y] = position()
      expect(x).toBe(450)
      expect(y).toBe(450)
    })

    test('middleClick() performs middle click', () => {
      expect(() => middleClick(475, 475, 0, false)).not.toThrow()
      const [x, y] = position()
      expect(x).toBe(475)
      expect(y).toBe(475)
    })

    test('doubleClick() performs double click', () => {
      expect(() => doubleClick(500, 500, 0, LEFT, false)).not.toThrow()
    })

    test('tripleClick() performs triple click', () => {
      expect(() => tripleClick(525, 525, 0, LEFT, false)).not.toThrow()
    })
  })

  describe('mouseDown() and mouseUp()', () => {
    test('mouseDown() holds button', () => {
      moveTo(400, 400, false)
      expect(() => mouseDown(undefined, undefined, LEFT, false)).not.toThrow()
      mouseUp(undefined, undefined, LEFT, false)
    })

    test('mouseUp() releases button', () => {
      moveTo(400, 400, false)
      mouseDown(undefined, undefined, LEFT, false)
      expect(() => mouseUp(undefined, undefined, LEFT, false)).not.toThrow()
    })

    test('supports different mouse buttons', () => {
      expect(() => {
        mouseDown(400, 400, RIGHT, false)
        mouseUp(undefined, undefined, RIGHT, false)
      }).not.toThrow()
    })

    test('can perform drag operation', () => {
      expect(() => {
        moveTo(300, 300, false)
        mouseDown(undefined, undefined, LEFT, false)
        moveTo(400, 400, false)
        mouseUp(undefined, undefined, LEFT, false)
      }).not.toThrow()
    })

    test('throws error for invalid button', () => {
      expect(() => mouseDown(100, 100, 'invalid' as any, false)).toThrow()
      expect(() => mouseUp(100, 100, 'invalid' as any, false)).toThrow()
    })
  })

  describe('Edge cases', () => {
    test('handles boundary coordinates', () => {
      expect(() => moveTo(0, 0, false)).not.toThrow()
      expect(() => moveTo(1920, 1080, false)).not.toThrow()
    })

    test('handles rapid sequential moves', () => {
      expect(() => {
        for (let i = 0; i < 50; i++) {
          moveTo(100 + i, 100, false)
        }
      }).not.toThrow()
    })

    test('handles rapid sequential clicks', () => {
      moveTo(500, 500, false)
      expect(() => {
        for (let i = 0; i < 20; i++) {
          click(undefined, undefined, 1, 0, LEFT, false)
        }
      }).not.toThrow()
    })

    test('click with zero clicks does nothing', () => {
      expect(() => click(500, 500, 0, 0, LEFT, false)).not.toThrow()
    })
  })
})
