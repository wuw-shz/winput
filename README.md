
# 🎮 winput

> **Windows input automation library for Bun** - Control mouse and keyboard programmatically using Windows API through FFI.

[![npm version](https://img.shields.io/npm/v/winput.svg)](https://www.npmjs.com/package/winput)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=flat&logo=bun&logoColor=white)](https://bun.sh)
[![Windows](https://img.shields.io/badge/Windows-0078D6?style=flat&logo=windows&logoColor=white)](https://www.microsoft.com/windows)

---

## ✨ Features

- 🖱️ **Complete Mouse Control** - Move, click, drag, and scroll with pixel-perfect precision
- ⌨️ **Full Keyboard Control** - Type text, press keys, and execute complex key combinations
- 🖥️ **Windows & Screen Control** - Window management, pixel color detection, and screen analysis
- 🛡️ **Built-in Fail-safe** - Safety mechanism to prevent runaway automation scripts
- ⚡ **Blazing Fast** - Direct FFI calls to Windows API with zero overhead
- 🎯 **Type-safe** - Full TypeScript support with comprehensive type definitions
- 🪶 **Lightweight** - No dependencies, pure Bun implementation

---

## 📦 Installation

```bash
bun add winput
```

Or install directly from GitHub:

```bash
bun add github:wuw-shz/winput
```

### Requirements

- **OS:** Windows (uses Windows User32 API)
- **Runtime:** Bun >= 1.0.0

---

## 🚀 Quick Start

```typescript
import { mouse, keyboard } from 'winput'

// Move mouse to coordinates
mouse.moveTo(100, 100)

// Click at current position
mouse.click()

// Type some text
keyboard.typewrite('Hello, World!')

// Press keyboard shortcuts
keyboard.press(['ctrl', 'c']) // Copy
keyboard.press(['ctrl', 'v']) // Paste
```

---

## 📖 API Reference

### 🖱️ Mouse (`mouse`)

#### Movement

##### `mouse.moveTo(x?, y?, relative?, pause?)`
Move mouse cursor to absolute screen coordinates.

```typescript
mouse.moveTo(500, 500)           // Move to (500, 500)
mouse.moveTo(500, 500, false)    // Move without relative (default)
```

##### `mouse.moveRel(xOffset?, yOffset?, relative?, pause?)`
Move mouse cursor relative to current position.

```typescript
mouse.moveRel(10, -5)    // Move 10px right, 5px up
```

##### `mouse.smoothMoveTo(x, y, duration?, easing?, pause?)`
Move the mouse cursor smoothly with easing animation.

```typescript
await mouse.smoothMoveTo(800, 600, 0.5, "easeOutQuad")
```

##### `mouse.position`
Get current mouse cursor position.

```typescript
const { x, y } = mouse.position
console.log(`Mouse at: ${x}, ${y}`)
```

#### Clicking

##### `mouse.click(button?, repeat?, delay?, pause?)`
Perform mouse click(s).

```typescript
mouse.click()                        // Left click
mouse.click('right')                 // Right click
mouse.click('left', 2)               // Double left click
```

##### `mouse.clickAt(x, y, button?, pause?)`
Move to coordinates and click.

```typescript
mouse.clickAt(100, 100)              // Click at (100, 100)
```

##### `mouse.mouseDown(button?, pause?)` Note: Exposed as `mouse.press`
Press and hold mouse button down.

```typescript
mouse.press('left')
```

##### `mouse.mouseUp(button?, pause?)` Note: Exposed as `mouse.release`
Release mouse button.

```typescript
mouse.release('left')
```

#### Dragging & Scrolling

##### `mouse.dragTo(x, y, button?, duration?, pause?)`
Drag to absolute coordinates.

```typescript
mouse.dragTo(300, 300)
```

##### `mouse.scroll(clicks, direction?, pause?)`
Scroll the mouse wheel.

```typescript
mouse.scroll(5)         // Scroll up 5 clicks
mouse.scroll(-5)        // Scroll down 5 clicks
mouse.scroll(10, "horizontal") // Horizontal scroll
```

---

### ⌨️ Keyboard (`keyboard`)

##### `keyboard.press(keys, times?, interval?, pause?)`
Press and release key(s).

```typescript
keyboard.press('a')
keyboard.press(['ctrl', 's'])   // Ctrl+S
keyboard.press('space', 5)      // Press space 5 times
```

##### `keyboard.typewrite(text, interval?, pause?)`
Type a string of text.

```typescript
keyboard.typewrite('Hello World')
keyboard.typewrite('Slowly', 0.1) // 100ms delay per char
```

##### `keyboard.down(key, pause?)`
Press and hold key down.

```typescript
keyboard.down('shift')
```

##### `keyboard.up(key, pause?)`
Release key.

```typescript
keyboard.up('shift')
```

---

### 🖥️ Windows & Screen (`windows`)

#### Screen Operations (`windows.screen`)

##### `windows.screen.getScreenSize()`
Get screen dimensions.

```typescript
const { width, height } = windows.screen.getScreenSize()
```

##### `windows.screen.getPixel(x, y)`
Get RGB color of a pixel.

```typescript
const color = windows.screen.getPixel(100, 100) // { r: 255, g: 255, b: 255 }
```

##### `windows.screen.waitForPixel(x, y, targetRGB, tolerance?, timeout?)`
Wait for a pixel to match a color.

```typescript
await windows.screen.waitForPixel(100, 100, { r: 255, g: 0, b: 0 })
```

#### Window Management (`windows.window`)

##### `windows.window.getActiveWindow()`
Get information about the currently active window.

```typescript
const win = windows.window.getActiveWindow()
console.log(win.title)
```

##### `windows.window.findWindow(title)`
Find a window by exact title.

```typescript
const hwnd = windows.window.findWindow("Calculator")
```

##### `windows.window.waitForWindow(title, timeout?)`
Wait for a window to appear.

```typescript
const hwnd = await windows.window.waitForWindow("Notepad")
```

##### `windows.window.setForeground(hwnd)`
Bring a window to the front.

```typescript
windows.window.setForeground(hwnd)
```

---

### 🛡️ Fail-safe

The fail-safe feature prevents runaway automation by monitoring mouse position. When the cursor moves to a fail-safe point (default: top-left corner `[0, 0]`), a `FailSafeException` is thrown.

```typescript
import { config, FailSafeException } from 'winput'

// Modify fail-safe behavior
config.FAILSAFE = true  // Enable (default)
config.FAILSAFE_POINTS = [[0, 0]]  // Trigger corners

try {
  // Automation loop
} catch (e) {
  if (e instanceof FailSafeException) {
    console.log('❌ Automation stopped by fail-safe!')
  }
}
```

---

## 📚 Examples

### 🎨 Drawing Automation

```typescript
import { mouse } from 'winput'

function drawSquare(x: number, y: number, size: number) {
  mouse.moveTo(x, y)
  mouse.press()       // Start drag
  mouse.moveRel(size, 0)
  mouse.moveRel(0, size)
  mouse.moveRel(-size, 0)
  mouse.moveRel(0, -size)
  mouse.release()     // End drag
}
```

### 📝 Text Editor Automation

```typescript
import { keyboard, windows } from 'winput'

async function createNote() {
  keyboard.press(['win', 'r'])
  await Bun.sleep(500)
  
  keyboard.typewrite('notepad')
  keyboard.press('enter')
  
  // Wait for Notepad window
  await windows.window.waitForWindow("Untitled - Notepad")
  
  keyboard.typewrite('Meeting Notes\n')
  keyboard.press(['ctrl', 's'])
}
```

---

## 🏗️ Project Structure

```
winput/
├── src/
│   ├── index.ts              # Exports
│   ├── mouse/                # Mouse module
│   ├── keyboard/             # Keyboard module
│   ├── windows/              # Windows module (Screen & Window)
│   ├── core/                 # Core functionality
│   └── config.ts             # Configuration
```

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md).

### Quick Start

```bash
git clone https://github.com/wuw-shz/winput.git
cd winput
bun install
bun test
```

---

## 📄 License

MIT © [\@wuw-shz]

---

## ⚠️ Disclaimer

This library is intended for automation, testing, and availability purposes. Please use responsibly.

---

<p align="center">
  <a href="https://bun.sh">
    <img src="https://img.shields.io/badge/Powered%20by-Bun-000000?style=for-the-badge&logo=bun&logoColor=white" alt="Powered by Bun">
  </a>
</p>