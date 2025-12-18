import * as actions from "./actions";
import { Listener } from "./listener";

/**
 * Keyboard input controller for simulating keystrokes and monitoring key states.
 * Provides methods for pressing, releasing, typing, and listening to keyboard events.
 *
 * @example
 * ```typescript
 * import { keyboard } from "winput";
 *
 * // Type a message
 * keyboard.write("Hello World!");
 *
 * // Press a hotkey combination
 * keyboard.hotkey(["ctrl", "c"]);
 *
 * // Check if a key is pressed
 * if (keyboard.isPressed("shift")) {
 *   console.log("Shift is held down");
 * }
 *
 * // Listen for key events
 * keyboard.listener.on("down", (e) => console.log(`Key pressed: ${e.name}`));
 * keyboard.listener.run();
 * ```
 */
class Keyboard {
  /**
   * Press and hold a key down.
   * @param key - Key to press (e.g., "a", "enter", "ctrl")
   * @param pause - Delay after pressing in seconds (default: config.PAUSE)
   * @returns {Keyboard} Returns keyboard instance for chaining
   */
  press = actions.press;

  /**
   * Release a held key.
   * @param key - Key to release
   * @param pause - Delay after releasing in seconds (default: config.PAUSE)
   * @returns {Keyboard} Returns keyboard instance for chaining
   */
  release = actions.release;

  /**
   * Press and immediately release a key (tap).
   * @param key - Key to tap
   * @param pause - Delay after each action in seconds (default: config.PAUSE)
   * @returns {Keyboard} Returns keyboard instance for chaining
   */
  tap = actions.tap;

  /**
   * Tap a key multiple times.
   * @param key - Key to tap
   * @param repeat - Number of times to tap (default: 1)
   * @param delay - Delay between taps in milliseconds (default: 0)
   * @param pause - Delay after each action in seconds (default: config.PAUSE)
   * @returns {Keyboard} Returns keyboard instance for chaining
   */
  repeatTap = actions.repeatTap;

  /**
   * Type a string of characters, handling uppercase and special characters.
   * @param message - Text to type
   * @param delay - Delay between characters in milliseconds (default: 0)
   * @param pause - Delay after each keystroke in seconds (default: config.PAUSE)
   * @returns {Keyboard} Returns keyboard instance for chaining
   */
  write = actions.write;

  /**
   * Check if a key is currently pressed.
   * @param key - Key to check
   * @returns {boolean} True if the key is currently held down
   */
  isPressed = actions.isPressed;

  /**
   * Execute a keyboard shortcut (press all keys, then release in reverse order).
   * @param keys - Array of keys to press together (e.g., ["ctrl", "shift", "s"])
   * @param pause - Delay after each action in seconds (default: config.PAUSE)
   * @returns {Keyboard} Returns keyboard instance for chaining
   * @example keyboard.hotkey(["ctrl", "alt", "delete"])
   */
  hotkey = actions.hotkey;

  /**
   * Hold a key for a specified duration.
   * @param key - Key to hold
   * @param duration - Duration to hold in milliseconds
   * @param pause - Delay after releasing in seconds (default: config.PAUSE)
   * @returns {Keyboard} Returns keyboard instance for chaining
   */
  hold = actions.hold;

  /**
   * Check if any of the specified keys are pressed.
   * @param keys - Array of keys to check
   * @returns {boolean} True if at least one key is pressed
   */
  isAnyPressed = actions.isAnyPressed;

  /**
   * Check if all of the specified keys are pressed.
   * @param keys - Array of keys to check
   * @returns {boolean} True if all keys are pressed
   */
  areAllPressed = actions.areAllPressed;

  /**
   * Wait for a key to be pressed.
   * @param key - Key to wait for
   * @param timeout - Maximum wait time in milliseconds (optional)
   * @returns {Promise<boolean>} Resolves true when pressed, false on timeout
   */
  waitForPress = actions.waitForPress;

  /**
   * Wait for a key to be released.
   * @param key - Key to wait for release
   * @param timeout - Maximum wait time in milliseconds (optional)
   * @returns {Promise<boolean>} Resolves true when released, false on timeout
   */
  waitForRelease = actions.waitForRelease;

  /**
   * Toggle a lock key (Caps Lock, Num Lock, Scroll Lock).
   * @param key - Lock key to toggle ("capslock", "numlock", "scrolllock")
   * @param pause - Delay after toggling in seconds (default: config.PAUSE)
   * @returns {Keyboard} Returns keyboard instance for chaining
   */
  toggleKey = actions.toggleKey;

  /**
   * Get the current state of a key.
   * @param key - Key to check
   * @returns {{ isPressed: boolean, isToggled: boolean }} Key state object
   */
  getKeyState = actions.getKeyState;

  /**
   * Release all commonly held modifier and letter keys.
   * Useful for cleanup after automation scripts.
   * @param pause - Delay after each release in seconds (default: config.PAUSE)
   * @returns {Keyboard} Returns keyboard instance for chaining
   */
  releaseAll = actions.releaseAll;

  /**
   * Keyboard event listener that monitors key presses and releases.
   *
   * @fires down - Key pressed. Event: `{ event, name, vk_code, isKeyDown }`
   * @fires up - Key released. Event: `{ event, name, vk_code, isKeyDown }`
   */ 
  listener = new Listener();
}

export const keyboard = new Keyboard();
