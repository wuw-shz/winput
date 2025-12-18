import { position } from '../core'
import * as actions from './actions'
import { Listener } from './listener'

/**
 * Mouse input controller for simulating mouse actions and monitoring mouse state.
 * Provides methods for clicking, moving, dragging, scrolling, and listening to mouse events.
 *
 * @example
 * ```typescript
 * import { mouse } from "winput";
 *
 * // Get current mouse position
 * const { x, y } = mouse.position;
 *
 * // Click at current position
 * mouse.click();
 *
 * // Move and click
 * mouse.moveTo(500, 300).click();
 *
 * // Smooth movement with easing
 * await mouse.smoothMoveTo(800, 600, 0.5, "easeOutQuad");
 *
 * // Listen for mouse events
 * mouse.listener.on("down", (e) => console.log(`Button pressed: ${e.button}`));
 * mouse.listener.run();
 * ```
 */
class Mouse {
   /**
    * Get the current mouse cursor position.
    * @returns {{ x: number, y: number }} Current cursor coordinates
    */
   get position() {
      const pos = position()
      return { x: pos[0], y: pos[1] }
   }

   /**
    * Press and hold a mouse button down.
    * @param button - Button to press ("left", "right", "middle", "x1", "x2") (default: "left")
    * @param pause - Delay after pressing in seconds (default: config.PAUSE)
    * @returns {Mouse} Returns mouse instance for chaining
    */
   press = actions.press

   /**
    * Release a held mouse button.
    * @param button - Button to release ("left", "right", "middle", "x1", "x2") (default: "left")
    * @param pause - Delay after releasing in seconds (default: config.PAUSE)
    * @returns {Mouse} Returns mouse instance for chaining
    */
   release = actions.release

   /**
    * Click a mouse button (press and release).
    * @param button - Button to click ("left", "right", "middle") (default: "left")
    * @param repeat - Number of clicks (default: 1, use 2 for double-click)
    * @param delay - Delay between clicks in seconds (default: 0)
    * @param pause - Delay after clicking in seconds (default: config.PAUSE)
    * @returns {Mouse} Returns mouse instance for chaining
    */
   click = actions.click

   /**
    * Move the mouse cursor to absolute screen coordinates.
    * @param x - X coordinate (optional, keeps current if not provided)
    * @param y - Y coordinate (optional, keeps current if not provided)
    * @param relative - If true, treats coordinates as relative offset (default: false)
    * @param pause - Delay after moving in seconds (default: config.PAUSE)
    * @returns {Mouse} Returns mouse instance for chaining
    */
   moveTo = actions.moveTo

   /**
    * Move the mouse cursor relative to its current position.
    * @param xOffset - Horizontal offset in pixels (default: 0)
    * @param yOffset - Vertical offset in pixels (default: 0)
    * @param relative - If true, uses raw relative movement (default: false)
    * @param pause - Delay after moving in seconds (default: config.PAUSE)
    * @returns {Mouse} Returns mouse instance for chaining
    */
   moveRel = actions.moveRel

   /**
    * Check if a mouse button is currently pressed.
    * @param button - Button to check ("left", "right", "middle", "x1", "x2")
    * @returns {boolean} True if the button is held down
    */
   isPressed = actions.isPressed

   /**
    * Drag to absolute coordinates (press, move, release).
    * @param x - Target X coordinate
    * @param y - Target Y coordinate
    * @param button - Button to drag with ("left", "right", "middle") (default: "left")
    * @param duration - Duration of drag animation in seconds (default: 0.5)
    * @param pause - Delay after dragging in seconds (default: config.PAUSE)
    * @returns {Mouse} Returns mouse instance for chaining
    */
   dragTo = actions.dragTo

   /**
    * Drag relative to current position (press, move by offset, release).
    * @param xOffset - Horizontal drag offset in pixels
    * @param yOffset - Vertical drag offset in pixels
    * @param button - Button to drag with ("left", "right", "middle") (default: "left")
    * @param duration - Duration of drag animation in seconds (default: 0.5)
    * @param pause - Delay after dragging in seconds (default: config.PAUSE)
    * @returns {Mouse} Returns mouse instance for chaining
    */
   dragRel = actions.dragRel

   /**
    * Scroll the mouse wheel.
    * @param clicks - Number of scroll clicks (positive = up/right, negative = down/left)
    * @param direction - Scroll direction ("vertical" or "horizontal") (default: "vertical")
    * @param pause - Delay after scrolling in seconds (default: config.PAUSE)
    * @returns {Mouse} Returns mouse instance for chaining
    */
   scroll = actions.scroll

   /**
    * Move the mouse cursor smoothly with easing animation.
    * @param x - Target X coordinate
    * @param y - Target Y coordinate
    * @param duration - Duration of animation in seconds (default: 0.5)
    * @param easing - Easing function ("linear", "easeInQuad", "easeOutQuad", "easeInOutQuad", etc.)
    * @param pause - Delay after moving in seconds (default: config.PAUSE)
    * @returns {Promise<Mouse>} Returns mouse instance for chaining
    */
   smoothMoveTo = actions.smoothMoveTo

   /**
    * Hold a mouse button for a specified duration.
    * @param button - Button to hold ("left", "right", "middle", "x1", "x2")
    * @param duration - Duration to hold in seconds
    * @param pause - Delay after releasing in seconds (default: config.PAUSE)
    * @returns {Mouse} Returns mouse instance for chaining
    */
   hold = actions.hold

   /**
    * Move to coordinates and click in one operation.
    * @param x - X coordinate to click at
    * @param y - Y coordinate to click at
    * @param button - Button to click ("left", "right", "middle") (default: "left")
    * @param pause - Delay after clicking in seconds (default: config.PAUSE)
    * @returns {Mouse} Returns mouse instance for chaining
    */
   clickAt = actions.clickAt

   /**
    * Check if the mouse is at a specific position.
    * @param x - X coordinate to check
    * @param y - Y coordinate to check
    * @param tolerance - Pixel tolerance for position matching (default: 0)
    * @returns {boolean} True if mouse is at or near the position
    */
   isAtPosition = actions.isAtPosition

   /**
    * Wait for the mouse to reach a specific position.
    * @param x - X coordinate to wait for
    * @param y - Y coordinate to wait for
    * @param timeout - Maximum wait time in milliseconds (optional)
    * @param tolerance - Pixel tolerance for position matching (default: 0)
    * @returns {Promise<boolean>} Resolves true when position reached, false on timeout
    */
   waitForPosition = actions.waitForPosition

   /**
    * Wait for a mouse button to be pressed.
    * @param button - Button to wait for ("left", "right", "middle", "x1", "x2")
    * @param timeout - Maximum wait time in milliseconds (optional)
    * @returns {Promise<boolean>} Resolves true when pressed, false on timeout
    */
   waitForPress = actions.waitForPress

   /**
    * Wait for a mouse button to be released.
    * @param button - Button to wait for release
    * @param timeout - Maximum wait time in milliseconds (optional)
    * @returns {Promise<boolean>} Resolves true when released, false on timeout
    */
   waitForRelease = actions.waitForRelease

   /**
    * Mouse event listener that monitors cursor movement and button states.
    * 
    * @fires move - Cursor moved. Event: `{ event, x, y, lastX, lastY, deltaX, deltaY }`
    * @fires down - Button pressed. Event: `{ event, button, x, y }`
    * @fires up - Button released. Event: `{ event, button, x, y }`
    */
   listener = new Listener()
}

export const mouse = new Mouse()

