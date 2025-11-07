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
- 🛡️ **Built-in Fail-safe** - Safety mechanism to prevent runaway automation scripts
- ⚡ **Blazing Fast** - Direct FFI calls to Windows API with zero overhead
- 🎯 **Type-safe** - Full TypeScript support with comprehensive type definitions
- 🪶 **Lightweight** - No dependencies, pure Bun implementation
- 🔧 **Easy to Use** - Simple, intuitive API inspired by PyAutoGUI

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
import { moveTo, click, typewrite, press } from 'winput'

// Move mouse to coordinates
moveTo(100, 100)

// Click at current position
click()

// Type some text
typewrite('Hello, World!')

// Press keyboard shortcuts
press(['ctrl', 'c']) // Copy
press(['ctrl', 'v']) // Paste
```

---

## 📖 API Reference

### 🖱️ Mouse Functions

#### Movement

##### `moveTo(x?, y?, pause?, relative?)`
Move mouse cursor to absolute screen coordinates.

```typescript
moveTo(500, 500)           // Move to (500, 500)
moveTo(500, 500, false)    // Move without pause
```

**Parameters:**
- `x?` (number): X coordinate
- `y?` (number): Y coordinate  
- `pause?` (boolean): Whether to pause after action (default: `true`)
- `relative?` (boolean): Use relative positioning (default: `false`)

---

##### `moveRel(xOffset?, yOffset?, pause?, relative?)`
Move mouse cursor relative to current position.

```typescript
moveRel(10, -5)    // Move 10px right, 5px up
moveRel(-20, 0)    // Move 20px left
```

**Alias:** `move()`

---

##### `position(x?, y?)`
Get or verify current mouse cursor position.

```typescript
const [x, y] = position()
console.log(`Mouse at: ${x}, ${y}`)
```

**Returns:** `[number, number]` - Current X and Y coordinates

---

#### Clicking

##### `click(x?, y?, clicks?, interval?, button?, pause?)`
Perform mouse click(s) at optional coordinates.

```typescript
click()                              // Single left click at current position
click(100, 100)                      // Left click at (100, 100)
click(100, 100, 2)                   // Double click at (100, 100)
click(100, 100, 3, 0.5)             // Triple click with 0.5s interval
click(100, 100, 1, 0, 'right')      // Right click
```

**Parameters:**
- `x?` (number): X coordinate
- `y?` (number): Y coordinate
- `clicks?` (number): Number of clicks (default: `1`)
- `interval?` (number): Seconds between clicks (default: `0.0`)
- `button?` (string): Mouse button - `'left'`, `'right'`, `'middle'`, `'x1'`, `'x2'` (default: `'left'`)
- `pause?` (boolean): Pause after action (default: `true`)

---

##### Click Helpers

```typescript
leftClick(x?, y?, interval?, pause?)      // Left mouse button
rightClick(x?, y?, interval?, pause?)     // Right mouse button  
middleClick(x?, y?, interval?, pause?)    // Middle mouse button
doubleClick(x?, y?, interval?, button?, pause?)   // Double click
tripleClick(x?, y?, interval?, button?, pause?)   // Triple click
```

**Examples:**
```typescript
leftClick(100, 200)                  // Left click at coordinates
rightClick()                         // Right click at current position
middleClick(500, 500)                // Middle click
doubleClick(300, 300)                // Double left click
tripleClick(400, 400, 0, 'right')    // Triple right click
```

---

##### `mouseDown(x?, y?, button?, pause?)`
Press and hold mouse button down.

```typescript
mouseDown()                    // Press left button
mouseDown(100, 100, 'right')  // Press right button at coordinates
```

---

##### `mouseUp(x?, y?, button?, pause?)`
Release mouse button.

```typescript
mouseUp()                      // Release left button
mouseUp(200, 200, 'right')    // Release right button at coordinates
```

**Drag Example:**
```typescript
moveTo(100, 100)
mouseDown()           // Start drag
moveTo(300, 300)      // Drag to new position
mouseUp()             // Release
```

---

### ⌨️ Keyboard Functions

##### `press(keys, presses?, interval?, pause?)`
Press and release key(s). Supports single keys or combinations.

```typescript
press('a')                     // Press 'a' key
press(['ctrl', 'c'])          // Press Ctrl+C
press('space', 3)             // Press space 3 times
press(['ctrl', 'shift', 's']) // Press Ctrl+Shift+S
press('enter', 2, 0.5)        // Press enter twice with 0.5s delay
```

**Parameters:**
- `keys` (string | string[]): Key(s) to press
- `presses?` (number): Number of times to press (default: `1`)
- `interval?` (number): Seconds between presses (default: `0.0`)
- `pause?` (boolean): Pause after action (default: `true`)

**Returns:** `boolean` - Whether all presses succeeded

---

##### `keyDown(key, pause?)`
Press and hold key down.

```typescript
keyDown('shift')
typewrite('hello')    // Types "HELLO"
keyUp('shift')
```

**Returns:** `boolean` - Whether key press succeeded

---

##### `keyUp(key, pause?)`
Release key.

```typescript
keyUp('shift')
```

**Returns:** `boolean` - Whether key release succeeded

---

##### `typewrite(message, interval?, pause?)`
Type a string of text character by character.

```typescript
typewrite('Hello, World!')
typewrite('Slow typing...', 0.1)    // 100ms between characters
typewrite('Fast!', 0.01)            // 10ms between characters
```

**Alias:** `write()`

**Parameters:**
- `message` (string): Text to type
- `interval?` (number): Seconds between characters (default: `0.0`)
- `pause?` (boolean): Pause after typing (default: `true`)

---

### 🔧 Utility Functions

##### `size()`
Get screen dimensions.

```typescript
const [width, height] = size()
console.log(`Screen resolution: ${width}x${height}`)
```

**Returns:** `[number, number]` - Screen width and height in pixels

---

### 🎯 Constants & Configuration

#### Mouse Buttons
```typescript
import { LEFT, RIGHT, MIDDLE, PRIMARY, SECONDARY, X1, X2 } from 'winput'

LEFT       // Left mouse button
RIGHT      // Right mouse button
MIDDLE     // Middle mouse button (scroll wheel)
PRIMARY    // Alias for LEFT
SECONDARY  // Alias for RIGHT
X1         // Extra mouse button 1
X2         // Extra mouse button 2
```

#### Configuration Object
```typescript
import { config } from 'winput'

config.FAILSAFE         // boolean - Enable/disable fail-safe (default: true)
config.FAILSAFE_POINTS  // [number, number][] - Trigger points (default: [[0, 0]])
config.PAUSE            // number - Default pause duration in seconds (default: 0.1)
```

**Example:**
```typescript
import { config } from 'winput'

// Disable fail-safe (not recommended)
config.FAILSAFE = false

// Set custom fail-safe points (all screen corners)
config.FAILSAFE_POINTS = [[0, 0], [1919, 0], [0, 1079], [1919, 1079]]

// Remove pause between actions for maximum speed
config.PAUSE = 0

// Set longer pause
config.PAUSE = 0.5  // 500ms
```

---

### 🛡️ Fail-safe

The fail-safe feature prevents runaway automation by monitoring mouse position. When the cursor moves to a fail-safe point (default: top-left corner `[0, 0]`), a `FailSafeException` is thrown.

```typescript
import { click, FailSafeException, config } from 'winput'

// Modify fail-safe behavior
config.FAILSAFE = true  // Enable (default)
config.FAILSAFE_POINTS = [[0, 0], [1919, 0], [0, 1079], [1919, 1079]]  // All corners

try {
  // Your automation code
  for (let i = 0; i < 1000; i++) {
    click(Math.random() * 1920, Math.random() * 1080)
  }
} catch (e) {
  if (e instanceof FailSafeException) {
    console.log('❌ Automation stopped by fail-safe!')
  }
}
```

**To disable fail-safe (not recommended):**
```typescript
import { config } from 'winput'
config.FAILSAFE = false
```

---

## 📚 Examples

### 🎨 Drawing Automation

```typescript
import { moveTo, mouseDown, mouseUp, moveRel } from 'winput'

// Draw a square
function drawSquare(x: number, y: number, size: number) {
  moveTo(x, y)
  mouseDown()
  moveRel(size, 0)   // Right
  moveRel(0, size)   // Down
  moveRel(-size, 0)  // Left
  moveRel(0, -size)  // Up
  mouseUp()
}

drawSquare(100, 100, 200)
```

### 📝 Text Editor Automation

```typescript
import { press, typewrite, keyDown, keyUp } from 'winput'

// Open Notepad and create a document
async function createNote() {
  // Open Run dialog
  press(['win', 'r'])
  await Bun.sleep(500)
  
  // Launch Notepad
  typewrite('notepad')
  press('enter')
  await Bun.sleep(1000)
  
  // Type content
  typewrite('Meeting Notes\n')
  typewrite('=============\n\n')
  
  // Type with Shift held (uppercase)
  keyDown('shift')
  typewrite('important')
  keyUp('shift')
  
  // Save file
  press(['ctrl', 's'])
}

createNote()
```

### 🎮 Game Automation

```typescript
import { click, press, moveTo, config } from 'winput'

// Fast-paced clicking game bot
async function autoClicker(x: number, y: number, duration: number) {
  config.PAUSE = 0  // Disable pause for maximum speed
  
  const startTime = Date.now()
  let clicks = 0
  
  moveTo(x, y)
  
  while (Date.now() - startTime < duration * 1000) {
    click()
    clicks++
  }
  
  console.log(`Performed ${clicks} clicks in ${duration} seconds`)
  console.log(`Average CPS: ${(clicks / duration).toFixed(2)}`)
}

autoClicker(960, 540, 10)  // Click center screen for 10 seconds
```

### 🔄 Form Filling Automation

```typescript
import { click, typewrite, press } from 'winput'

async function fillForm() {
  // Click first name field
  click(300, 200)
  typewrite('John')
  
  // Tab to last name
  press('tab')
  typewrite('Doe')
  
  // Tab to email
  press('tab')
  typewrite('john.doe@example.com')
  
  // Tab to phone
  press('tab')
  typewrite('555-1234')
  
  // Submit form
  press('tab')
  press('enter')
}

fillForm()
```

### 🖼️ Screenshot Helper

```typescript
import { press, position, size } from 'winput'

// Take screenshot and show cursor position
function screenshotWithInfo() {
  const [x, y] = position()
  const [width, height] = size()
  
  console.log(`Cursor: (${x}, ${y})`)
  console.log(`Screen: ${width}x${height}`)
  
  // Take screenshot (Win + Shift + S)
  press(['win', 'shift', 's'])
}

screenshotWithInfo()
```

### ⚡ Performance Testing

```typescript
import { click, moveTo, config } from 'winput'

// Benchmark mouse operations
function benchmarkMouse() {
  config.PAUSE = 0  // Disable pause for accurate measurement
  
  // Test clicks
  const clickStart = performance.now()
  for (let i = 0; i < 1000; i++) {
    click()
  }
  const clickTime = performance.now() - clickStart
  
  // Test moves
  const moveStart = performance.now()
  for (let i = 0; i < 1000; i++) {
    moveTo(i % 1920, i % 1080)
  }
  const moveTime = performance.now() - moveStart
  
  console.log(`1000 clicks: ${clickTime.toFixed(2)}ms (${(1000 / clickTime * 1000).toFixed(0)} clicks/sec)`)
  console.log(`1000 moves: ${moveTime.toFixed(2)}ms (${(1000 / moveTime * 1000).toFixed(0)} moves/sec)`)
}

benchmarkMouse()
```

### 🔁 Repetitive Task Automation

```typescript
import { click, press, moveTo, config } from 'winput'

// Automate repetitive clicking task
async function repeatTask(times: number) {
  config.PAUSE = 0.1  // Small pause between actions
  
  for (let i = 0; i < times; i++) {
    // Click button at specific location
    click(500, 300)
    
    // Wait for process
    await Bun.sleep(1000)
    
    // Confirm dialog
    press('enter')
    
    // Wait before next iteration
    await Bun.sleep(500)
    
    console.log(`Completed iteration ${i + 1}/${times}`)
  }
  
  console.log('Task completed!')
}

repeatTask(10)
```

---

## 🗺️ Keyboard Key Names

### Letter Keys
`a` - `z` (case-insensitive)

### Number Keys
`0` - `9`, `` ` ``, `-`, `=`

### Function Keys
`f1` - `f12`

### Navigation Keys
`up`, `down`, `left`, `right`, `home`, `end`, `pageup`, `pagedown`

### Editing Keys
`backspace`, `delete` / `del`, `insert`, `enter` / `return`, `tab`, `space`

### Modifier Keys
`shift`, `shiftleft`, `shiftright`, `ctrl`, `ctrlleft`, `ctrlright`, `alt`, `altleft`, `altright`, `win`, `winleft`, `winright`

### Lock Keys
`capslock`, `numlock`, `scrolllock`

### Special Keys
`escape` / `esc`, `printscreen` / `prtsc`, `pause`, `apps`

### Symbols
`[`, `]`, `\`, `;`, `'`, `,`, `.`, `/`

### Numpad Keys
`add`, `subtract`, `multiply`, `divide`, `decimal`

---

## 🏗️ Project Structure

```
winput/
├── src/
│   ├── index.ts              # Main entry point & exports
│   ├── mouse.ts              # Mouse control functions
│   ├── keyboard.ts           # Keyboard control functions
│   ├── utils.ts              # Utilities & helpers
│   ├── constants.ts          # Windows API constants
│   ├── structures.ts         # Input data structures
│   ├── ffi-loader.ts         # FFI bindings to User32.dll
│   └── keyboard-mapping.ts   # Scan code mappings
├── test/                     # Test suite
├── examples/                 # Usage examples
├── dist/                     # Compiled JavaScript output
└── package.json
```

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on:

- Development setup
- Code style guidelines
- Testing requirements
- Pull request process

### Quick Start for Contributors

```bash
# Clone the repository
git clone https://github.com/wuw-shz/winput.git
cd winput

# Install dependencies
bun install

# Run tests
bun test

# Build the project
bun run build
```

---

## 📄 License

MIT © [\@wuw-shz]

See [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

This library is intended for automation, testing, and accessibility purposes. Please use responsibly and in accordance with applicable laws and terms of service. Automation of certain applications or games may violate their terms of service.

---

## 🙏 Acknowledgments

- Inspired by [PyDirectInput](https://github.com/learncodebygaming/pydirectinput)
- Built with [Bun](https://bun.sh) FFI capabilities
- Uses Windows User32 API

---

## 📞 Support

- 🐛 **Issues:** [GitHub Issues](https://github.com/wuw-shz/winput/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/wuw-shz/winput/discussions)
- 📧 **Discord:** [han_dy.y](https://discord.com/users/968532080361373706)

---

## 🔗 Links

- 📦 [npm Package](https://www.npmjs.com/package/winput)
- 🐙 [GitHub Repository](https://github.com/wuw-shz/winput)
- 📚 [Documentation](https://github.com/wuw-shz/winput#readme)
- 🎯 [Bun Documentation](https://bun.sh/docs)

---

## 🌟 Star History

If you find this project useful, please consider giving it a star! ⭐

---

<p align="center">
  <a href="https://bun.sh">
    <img src="https://img.shields.io/badge/Powered%20by-Bun-000000?style=for-the-badge&logo=bun&logoColor=white" alt="Powered by Bun">
  </a>
</p>