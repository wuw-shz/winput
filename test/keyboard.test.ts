import { describe, test, expect, beforeAll } from 'bun:test'
import { keyDown, keyUp, press, typewrite, write, config } from '../src/index'

describe('Keyboard Functions', () => {
  beforeAll(() => {
    config.FAILSAFE = false
  })

  describe('keyDown()', () => {
    test('presses valid key', () => {
      const result = keyDown('a', false)
      expect(result).toBe(true)
      keyUp('a', false)
    })

    test('handles modifier keys', () => {
      expect(keyDown('shift', false)).toBe(true)
      keyUp('shift', false)
      expect(keyDown('ctrl', false)).toBe(true)
      keyUp('ctrl', false)
      expect(keyDown('alt', false)).toBe(true)
      keyUp('alt', false)
    })

    test('handles function keys', () => {
      expect(keyDown('f1', false)).toBe(true)
      keyUp('f1', false)
      expect(keyDown('f12', false)).toBe(true)
      keyUp('f12', false)
    })

    test('handles arrow keys', () => {
      expect(keyDown('up', false)).toBe(true)
      keyUp('up', false)
      expect(keyDown('down', false)).toBe(true)
      keyUp('down', false)
      expect(keyDown('left', false)).toBe(true)
      keyUp('left', false)
      expect(keyDown('right', false)).toBe(true)
      keyUp('right', false)
    })

    test('handles special keys', () => {
      expect(keyDown('enter', false)).toBe(true)
      keyUp('enter', false)
      expect(keyDown('space', false)).toBe(true)
      keyUp('space', false)
      expect(keyDown('escape', false)).toBe(true)
      keyUp('escape', false)
      expect(keyDown('tab', false)).toBe(true)
      keyUp('tab', false)
    })

    test('returns false for invalid key', () => {
      const result = keyDown('invalidkey123', false)
      expect(result).toBe(false)
    })

    test('normalizes key case', () => {
      expect(keyDown('A', false)).toBe(true)
      keyUp('A', false)
      expect(keyDown('SHIFT', false)).toBe(true)
      keyUp('SHIFT', false)
    })

    test('handles single character keys', () => {
      expect(keyDown('a', false)).toBe(true)
      keyUp('a', false)
      expect(keyDown('Z', false)).toBe(true)
      keyUp('Z', false)
    })
  })

  describe('keyUp()', () => {
    test('releases valid key', () => {
      keyDown('a', false)
      const result = keyUp('a', false)
      expect(result).toBe(true)
    })

    test('returns false for invalid key', () => {
      const result = keyUp('invalidkey123', false)
      expect(result).toBe(false)
    })

    test('works with modifier keys', () => {
      keyDown('ctrl', false)
      expect(keyUp('ctrl', false)).toBe(true)
    })

    test('normalizes key case', () => {
      keyDown('B', false)
      expect(keyUp('b', false)).toBe(true)
    })
  })

  describe('press()', () => {
    test('presses single key', () => {
      const result = press('a', 1, 0, false)
      expect(result).toBe(true)
    })

    test('presses multiple keys simultaneously', () => {
      const result = press(['ctrl', 'c'], 1, 0, false)
      expect(result).toBe(true)
    })

    test('presses key multiple times', () => {
      const result = press('space', 3, 0, false)
      expect(result).toBe(true)
    })

    test('handles key combinations', () => {
      expect(press(['ctrl', 'shift', 's'], 1, 0, false)).toBe(true)
      expect(press(['alt', 'tab'], 1, 0, false)).toBe(true)
      expect(press(['ctrl', 'alt', 'delete'], 1, 0, false)).toBe(true)
    })

    test('respects interval parameter', async () => {
      const start = Date.now()
      press('a', 3, 0.05, false)
      const duration = Date.now() - start
      expect(duration).toBeGreaterThanOrEqual(100)
    })

    test('handles string input', () => {
      const result = press('enter', 1, 0, false)
      expect(result).toBe(true)
    })

    test('handles array input', () => {
      const result = press(['a', 'b', 'c'], 1, 0, false)
      expect(result).toBe(true)
    })

    test('handles empty array', () => {
      const result = press([], 1, 0, false)
      expect(result).toBe(true)
    })

    test('handles zero presses', () => {
      const result = press('a', 0, 0, false)
      expect(result).toBe(true)
    })

    test('normalizes key case in arrays', () => {
      expect(press(['CTRL', 'V'], 1, 0, false)).toBe(true)
    })
  })

  describe('typewrite()', () => {
    test('types simple text', () => {
      expect(() => typewrite('hello', 0, false)).not.toThrow()
    })

    test('types text with numbers', () => {
      expect(() => typewrite('test123', 0, false)).not.toThrow()
    })

    test('types text with special characters', () => {
      expect(() => typewrite('hello world!', 0, false)).not.toThrow()
    })

    test('types empty string', () => {
      expect(() => typewrite('', 0, false)).not.toThrow()
    })

    test('respects interval parameter', async () => {
      const start = Date.now()
      typewrite('ab', 0.05, false)
      const duration = Date.now() - start
      expect(duration).toBeGreaterThanOrEqual(50)
    })

    test('handles single character', () => {
      expect(() => typewrite('x', 0, false)).not.toThrow()
    })

    test('handles long text', () => {
      const longText = 'a'.repeat(100)
      expect(() => typewrite(longText, 0, false)).not.toThrow()
    })
  })

  describe('write()', () => {
    test('is alias for typewrite', () => {
      expect(write).toBe(typewrite)
    })

    test('works identically to typewrite', () => {
      expect(() => write('test', 0, false)).not.toThrow()
    })
  })

  describe('Key combinations', () => {
    test('common shortcuts work', () => {
      expect(press(['ctrl', 'c'], 1, 0, false)).toBe(true)
      expect(press(['ctrl', 'v'], 1, 0, false)).toBe(true)
      expect(press(['ctrl', 'x'], 1, 0, false)).toBe(true)
      expect(press(['ctrl', 'z'], 1, 0, false)).toBe(true)
      expect(press(['ctrl', 'y'], 1, 0, false)).toBe(true)
      expect(press(['ctrl', 'a'], 1, 0, false)).toBe(true)
      expect(press(['ctrl', 's'], 1, 0, false)).toBe(true)
    })

    test('window management shortcuts', () => {
      expect(press(['win', 'r'], 1, 0, false)).toBe(true)
      expect(press(['alt', 'f4'], 1, 0, false)).toBe(true)
      expect(press(['win', 'd'], 1, 0, false)).toBe(true)
    })
  })

  describe('Edge cases', () => {
    test('rapid key presses', () => {
      expect(() => {
        for (let i = 0; i < 50; i++) {
          press('a', 1, 0, false)
        }
      }).not.toThrow()
    })

    test('alternating keyDown and keyUp', () => {
      expect(() => {
        for (let i = 0; i < 10; i++) {
          keyDown('shift', false)
          keyUp('shift', false)
        }
      }).not.toThrow()
    })

    test('holding multiple keys', () => {
      expect(() => {
        keyDown('ctrl', false)
        keyDown('shift', false)
        press('a', 1, 0, false)
        keyUp('shift', false)
        keyUp('ctrl', false)
      }).not.toThrow()
    })

    test('mixed case in press array', () => {
      expect(press(['Ctrl', 'SHIFT', 'a'], 1, 0, false)).toBe(true)
    })
  })

  describe('Special key names', () => {
    test('enter aliases', () => {
      expect(press('enter', 1, 0, false)).toBe(true)
      expect(press('return', 1, 0, false)).toBe(true)
    })

    test('escape aliases', () => {
      expect(press('escape', 1, 0, false)).toBe(true)
      expect(press('esc', 1, 0, false)).toBe(true)
    })

    test('delete aliases', () => {
      expect(press('delete', 1, 0, false)).toBe(true)
      expect(press('del', 1, 0, false)).toBe(true)
    })

    test('modifier variants', () => {
      expect(press('shift', 1, 0, false)).toBe(true)
      expect(press('shiftleft', 1, 0, false)).toBe(true)
      expect(press('shiftright', 1, 0, false)).toBe(true)
    })
  })
})
