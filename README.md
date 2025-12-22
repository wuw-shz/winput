
# winput 🚀

[![github](https://img.shields.io/github/v/release/wuw-shz/winput)](https://github.com/wuw-shz/winput/releases)
[![npm version](https://img.shields.io/npm/v/winput.svg)](https://www.npmjs.com/package/winput)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=flat&logo=bun&logoColor=white)](https://bun.sh)
[![Windows](https://img.shields.io/badge/Windows-0078D6?style=flat&logo=windows&logoColor=white)](https://www.microsoft.com/windows)

> **winput** is a powerful Windows automation library for TypeScript and JavaScript / Bun, providing low-level access to keyboard, mouse, window, and screen controls via the Windows API.


## Table of Contents

- [Features](#features-)
- [Requirements](#requirements-)
- [Installation](#installation-)
- [Quick Start](#quick-start-)
- [API Reference](#api-reference-)
  - [Keyboard](#keyboard-keyboard-%EF%B8%8F)
  - [Mouse](#mouse-mouse-%EF%B8%8F)
  - [Window](#window-window-%EF%B8%8F)
  - [Screen](#screen-screen-%EF%B8%8F)
  - [Image](#image-image-%EF%B8%8F)
  - [Utils](#utils-utils-%EF%B8%8F)
- [Contributing](#contributing-)
- [License](#license-)
- [Disclaimer](#disclaimer-)

## Features ✨

- ⌨️ **Keyboard Control**: Simulate keystrokes, combinations (hotkeys), type text, and monitor key states.
- 🖱️ **Mouse Control**: Move cursor, click, drag, scroll, and smooth movements.
- 🎣 **Input Hooks**: Global low-level keyboard and mouse hooks to listen for events even when your app is in the background.
- 🪟 **Window Management**: Find, activate, move, resize, hide/show, and manipulate windows.
- 🖥️ **Screen Analysis**: Capture screen, read pixel colors, search for pixels, and find images on the screen.
- 🖼️ **Image Processing**: Load, save, and process images (blur, sharpen, edges, etc.).
- ⚡ **Performance**: Built with native Windows API calls for minimal latency.



## Requirements 📋

- **Operating System**: Windows 64-bit
- **Runtime**: [Bun](https://bun.sh) (Recommended) or Node.js (Experimental/Limited support)

## Installation 📦

### Bun (Recommended)
```bash
bun add winput
```

### npm
```bash
npm install winput
```

## Quick Start ⚡

### Basic Input Simulation

```typescript
import { keyboard, mouse, window, image } from "winput";

// Keyboard
keyboard.write("Hello World!");
keyboard.hotkey(["ctrl", "s"]); // Save

// Mouse
mouse.moveTo(500, 500); // Move to coordinates
mouse.click("left");    // Left click
mouse.scroll(10);       // Scroll up

// Window
const notepad = window.findWindow("Notepad");
if (notepad) {
  window.activate(notepad);
}

// Image Processing
const img = await image.load("screenshot.png");
if (img) {
  img.grayscale().blur(2).save("processed.png");
}
```

### Event Listeners (Hooks)

```typescript
import { keyboard, mouse } from "winput";

// Listen for key presses
keyboard.listener.on.down((e) => {
  console.log(`Key pressed: ${e.key} (${e.vk_code})`);
  if (e.key === "escape") process.exit(0);
});

// Listen for mouse clicks
mouse.listener.on.down((e) => {
  console.log(`Mouse button ${e.button} at ${e.x}, ${e.y}`);
});

// Start listening
keyboard.listener.start();
mouse.listener.start();
```

### Advanced Examples

```typescript
import { screen, image, window } from "winput";

// Screen capture with image processing
const captured = screen.capture(0, 0, 800, 600);
if (captured) {
  const processed = image.process(captured);
  processed.grayscale().edges().save("edges.png");
}

// Multi-monitor information
const monitors = screen.getMonitors();
monitors.forEach((monitor, i) => {
  const width = monitor.rect.right - monitor.rect.left;
  const height = monitor.rect.bottom - monitor.rect.top;
  console.log(`Monitor ${i + 1}: ${monitor.deviceName}`);
  console.log(`  Resolution: ${width}x${height}`);
  console.log(`  Primary: ${monitor.isPrimary}`);
});

// Window manipulation with transparency
const notepad = window.findWindow("Notepad");
if (notepad) {
  window.setOpacity(notepad, 0.8);
  window.setTopmost(notepad, true);
  window.center(notepad);
}
```

## API Reference 📚

### Keyboard (`keyboard`) ⌨️

| Method | Description |
| :--- | :--- |
| `press(key)` | Press and hold a key. |
| `release(key)` | Release a key. |
| `tap(key)` | Press and release a key (keystroke). |
| `repeatTap(key, count, delay?)` | Tap a key multiple times. |
| `write(text, delay?)` | Type a string of text. |
| `hotkey(keys)` | Press a combination of keys (e.g., `["ctrl", "c"]`). |
| `hold(key, duration)` | Hold a key for a specific duration. |
| `isPressed(key)` | Check if a key is currently physically pressed. |
| `isAnyPressed(keys)` | Check if any of the specified keys are pressed. |
| `areAllPressed(keys)` | Check if all of the specified keys are pressed. |
| `waitForPress(key, timeout?)` | Wait for a specific key press. |
| `waitForRelease(key, timeout?)` | Wait for a specific key release. |
| `toggleKey(key)` | Toggle lock keys (Caps Lock, Num Lock, Scroll Lock). |
| `getKeyState(key)` | Get the current state of a key (pressed/toggled). |
| `releaseAll()` | Release all held keys (cleanup). |
| `listener` | Access the event listener (see Hooks). |

#### Keyboard Exports

| Export | Description |
| :--- | :--- |
| `VK_CODES` | Windows Virtual Key Code constants (e.g., `VK_CODES.KEY_A`, `VK_CODES.CONTROL`). |
| `KEYBOARD_MAPPING` | Full key definitions with scan codes and VK codes. |
| `KeyName` | TypeScript type for valid key names (e.g., `"a"`, `"ctrl"`, `"enter"`). |

```typescript
import { keyboard, VK_CODES, KEYBOARD_MAPPING, KeyName } from "winput";

// Use VK_CODES for raw virtual key codes
console.log(VK_CODES.KEY_A); // 65
console.log(VK_CODES.CONTROL); // 17

// Use KeyName for type-safe key parameters
const myKey: KeyName = "ctrl";
keyboard.press(myKey);

// Access key definitions
console.log(KEYBOARD_MAPPING["enter"]); // { scan: 0x1c, vk: 13 }
```

### Mouse (`mouse`) 🖱️

| Method | Description |
| :--- | :--- |
| `moveTo(x, y)` | Move cursor to absolute coordinates. |
| `moveRel(dx, dy)` | Move cursor relative to current position. |
| `smoothMoveTo(x, y, duration?, easing?)` | Human-like smooth cursor movement. |
| `click(button?)` | Click a mouse button ("left", "right", "middle"). |
| `clickAt(x, y, button?)` | Move to position and click. |
| `press(button)` | Press and hold a mouse button. |
| `release(button)` | Release a mouse button. |
| `hold(button, duration)` | Hold a mouse button for a specific duration. |
| `dragTo(x, y, button?)` | Drag and drop to a location (absolute). |
| `dragRel(dx, dy, button?)` | Drag and drop to a location (relative). |
| `scroll(amount, direction?)` | Scroll wheel (vertical or horizontal). |
| `get position` | Get current cursor `x, y` coordinates. |
| `isPressed(button)` | Check if a mouse button is pressed. |
| `isAtPosition(x, y, tolerance?)` | Check if mouse is at specific coordinates. |
| `waitForPosition(x, y, timeout?)` | Wait for mouse to reach a position. |
| `waitForPress(button, timeout?)` | Wait for a mouse button press. |
| `waitForRelease(button, timeout?)` | Wait for a mouse button release. |
| `listener` | Access the event listener (see Hooks). |

### Window (`window`) 🪟

| Method | Description |
| :--- | :--- |
| `getActiveWindow()` | Get handle and info of the currently focused window. |
| `findWindow(title)` | Find a window handle by exact title. |
| `waitForWindow(title, timeout?)` | Wait for a window to appear. |
| `waitForWindowClose(hwnd, timeout?)` | Wait for a window to close. |
| `getWindowTitle(hwnd)` | Get the title of a window. |
| `getWindowRect(hwnd)` | Get window position and size (rect). |
| `getClientRect(hwnd)` | Get window client area rect. |
| `getWindowSize(hwnd)` | Get window width and height. |
| `getClientSize(hwnd)` | Get window client area width and height. |
| `getExtendedWindowInfo(hwnd)` | Get extended info (processId, class, etc.). |
| `getProcessPath(hwnd)` | Get executable path of window owner. |
| `getWindowProcessId(hwnd)` | Get the Process ID (PID) of the window. |
| `getClassName(hwnd)` | Get the window class name. |
| `isWindow(hwnd)` | Check if a window handle is valid. |
| `isWindowVisible(hwnd)` | Check if a window is visible. |
| `isWindowMinimized(hwnd)` | Check if a window is minimized. |
| `isWindowMaximized(hwnd)` | Check if a window is maximized. |
| `focusWindow(hwnd)` | Bring a window to foreground and focus it. |
| `setForeground(hwnd)` | Set the window to the foreground. |
| `moveWindow(hwnd, x, y, width, height)` | Move and resize a window. |
| `minimizeWindow(hwnd)` | Minimize a window. |
| `maximizeWindow(hwnd)` | Maximize a window. |
| `restoreWindow(hwnd)` | Restore a minimized/maximized window. |
| `showWindow(hwnd)` | Show a hidden window. |
| `hideWindow(hwnd)` | Hide a window. |
| `closeWindow(hwnd)` | Close a window. |
| `flashWindow(hwnd)` | Flash the window caption/tray. |
| `setOpacity(hwnd, opacity)` | Set window transparency (0.0 - 1.0). |
| `setTopmost(hwnd, enable)` | Set "Always on Top" status. |
| `setEnabled(hwnd, enabled)` | Enable/Disable input to the window. |
| `setTitle(hwnd, title)` | Change the window title. |
| `center(hwnd)` | Center the window on the screen. |
| `moveToTop(hwnd)` | Bring window to top of Z-order. |
| `moveToBottom(hwnd)` | Send window to bottom of Z-order. |
| `redraw(hwnd)` | Request window repaint. |
| `clientToScreen(hwnd, x, y)` | Convert client coords to screen coords. |
| `screenToClient(hwnd, x, y)` | Convert screen coords to client coords. |
| `enumWindows()` | List all visible windows. |
| `enumChildWindows(parent)` | List all child controls of a window. |
| `activate(hwnd)` | Activate (focus and restore) a window. |
| `waitActive(hwnd, timeout?)` | Wait for a window to become active. |
| `waitNotActive(hwnd, timeout?)` | Wait for a window to lose focus. |
| `kill(hwnd)` | Force kill a window's process. |
| `getStyle(hwnd)` | Get window style flags. |
| `setStyle(hwnd, style)` | Set window style flags. |
| `getExStyle(hwnd)` | Get window extended style flags. |
| `setExStyle(hwnd, style)` | Set window extended style flags. |
| `getMinMax(hwnd)` | Get window state (-1=min, 0=normal, 1=max). |
| `getList()` | Get list of all visible window handles. |
| `getCount()` | Get count of visible windows. |
| `minimizeAll()` | Minimize all visible windows. |
| `getProcessName(hwnd)` | Get process name (e.g., "notepad.exe"). |
| `getText(hwnd)` | Get all text from window and children. |
| `setRegion.rect(hwnd, x, y, w, h, redraw?)` | Set rectangular region for window. |
| `setRegion.ellipse(hwnd, x, y, w, h, redraw?)` | Set elliptical region for window. |
| `setRegion.round(hwnd, x, y, w, h, rw, rh, redraw?)` | Set rounded rectangular region. |
| `setRegion.polygon(hwnd, points, fillMode?, redraw?)` | Set polygonal region. |
| `setRegion.reset(hwnd, redraw?)` | Reset window region to normal. |

### Screen (`screen`) 🖥️

| Method | Description |
| :--- | :--- |
| `getScreenSize()` | Get primary monitor resolution. |
| `getMonitors()` | Get detailed info about all connected monitors. |
| `capture(x?, y?, w?, h?)` | Capture screen region as `ImageData` (defaults to full screen). |
| `getPixel(x, y)` | Get RGB color of a specific pixel. |
| `getPixelHex(x, y)` | Get Hex color of a specific pixel. |
| `getMultiplePixels(positions)` | Get RGB colors for multiple positions. |
| `checkPixel(x, y, color, tolerance?)` | Check if pixel matches color. |
| `checkMultiplePixels(checks)` | Check if multiple pixels match targets. |
| `waitForPixel(x, y, color, ...)` | Wait until a pixel becomes a color. |
| `waitForAnyPixel(checks, ...)` | Wait for any pixel condition to match. |
| `pixelSearch(x1, y1, x2, y2, color, tolerance?)` | Find coordinates of a color in a region. |
| `imageSearch(x1, y1, x2, y2, image, tolerance?)` | Find an image on the screen. |

### Image (`image`) 🖼️

| Method | Description |
| :--- | :--- |
| `load(path)` | Load an image from file (returns `Promise<Image \| null>`). |
| `save(img, path?)` | Save an image to file (returns `Promise<boolean>`). |
| `process(data)` | Create an Image processor from `ImageData`. |

#### Image (Chainable)

All methods return `this` for method chaining.

| Method | Description |
| :--- | :--- |
| `clone()` | Create a deep copy of the image. |
| `grayscale()` | Convert to grayscale. |
| `brightness(factor)` | Adjust brightness (-1.0 to 1.0). |
| `contrast(factor)` | Adjust contrast (0.0 to Infinity). |
| `blur(radius?)` | Apply Gaussian blur. |
| `sharpen()` | Sharpen the image. |
| `edges()` | Detect edges (Sobel). |
| `dilate(pixels?)` | Morphological dilation. |
| `erode(pixels?)` | Morphological erosion. |
| `erode2dilate(pixels?)` | Morphological opening (remove noise). |
| `dilate2erode(pixels?)` | Morphological closing (fill holes). |
| `invert()` | Invert all colors (create negative). |
| `sepia()` | Apply sepia tone effect. |
| `hue(degrees)` | Rotate hue by specified degrees. |
| `saturate(factor)` | Adjust color saturation. |
| `rotate(degrees)` | Rotate image by angle. |
| `flip(horizontal?, vertical?)` | Flip image horizontally and/or vertically. |
| `crop(x, y, w, h)` | Crop to rectangular region. |
| `resize(w, h, algorithm?)` | Resize image with interpolation. |
| `threshold(value?)` | Apply binary threshold (default: 128). |
| `adaptiveThreshold(blockSize?)` | Apply adaptive threshold. |
| `medianFilter(radius?)` | Median filter for noise reduction. |
| `bilateralFilter(spatialSigma?, rangeSigma?)` | Edge-preserving smoothing. |
| `histogram()` | Calculate RGB color histograms. |
| `autoLevel()` | Auto-adjust levels to stretch histogram. |
| `overlay(img, x?, y?, alpha?)` | Overlay another image with alpha blending. |
| `blend(img, mode?)` | Blend with another image using blend mode. |
| `save(path?)` | Save the processed image. |
| `toPixels()` | Convert to array of `[r, g, b, a]` pixels. |

### Utils (`utils`) 🛠️

| Method | Description |
| :--- | :--- |
| `rgbToHex(rgb)` | Convert RGB object to Hex string. |
| `hexToRgb(hex)` | Convert Hex string to RGB object. |
| `rgbToHsv(r, g, b)` | Convert RGB to HSV color space. |
| `hsvToRgb(h, s, v)` | Convert HSV to RGB color space. |
| `colorDistance(c1, c2)` | Calculate Euclidean distance between two colors. |
| `isColorSimilar(c1, c2, tolerance)` | Check if two colors are similar. |
| `pointInRect(point, rect)` | Check if a point is inside a rectangle. |

## Contributing 🤝

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/NewFeature`).
3. Commit your changes (`git commit -m 'Add some NewFeature'`).
4. Push to the branch (`git push origin feature/NewFeature`).
5. Open a Pull Request.

## License 📄

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

## Disclaimer ⚠️

This library is intended for automation, testing, and availability purposes. Please use responsibly.
