// @bun
// src/mouse.ts
import { ptr as ptr2 } from "bun:ffi";

// src/ffi-loader.ts
import { dlopen, FFIType, suffix } from "bun:ffi";
var user32 = dlopen(`user32.${suffix}`, {
  SendInput: {
    args: [FFIType.u32, FFIType.ptr, FFIType.i32],
    returns: FFIType.u32
  },
  MapVirtualKeyW: {
    args: [FFIType.u32, FFIType.u32],
    returns: FFIType.u32
  },
  GetCursorPos: {
    args: [FFIType.ptr],
    returns: FFIType.bool
  },
  GetSystemMetrics: {
    args: [FFIType.i32],
    returns: FFIType.i32
  },
  GetKeyState: {
    args: [FFIType.i32],
    returns: FFIType.i16
  }
});

// src/structures.ts
class MouseInput {
  buffer;
  view;
  constructor(dx = 0, dy = 0, mouseData = 0, dwFlags = 0, time = 0) {
    this.buffer = new ArrayBuffer(28);
    this.view = new DataView(this.buffer);
    this.view.setInt32(0, dx, true);
    this.view.setInt32(4, dy, true);
    this.view.setUint32(8, mouseData, true);
    this.view.setUint32(12, dwFlags, true);
    this.view.setUint32(16, time, true);
  }
}

class KeyBdInput {
  buffer;
  view;
  constructor(wVk = 0, wScan = 0, dwFlags = 0, time = 0) {
    this.buffer = new ArrayBuffer(24);
    this.view = new DataView(this.buffer);
    this.view.setUint16(0, wVk, true);
    this.view.setUint16(2, wScan, true);
    this.view.setUint32(4, dwFlags, true);
    this.view.setUint32(8, time, true);
  }
}

class Input {
  buffer;
  view;
  constructor(type, inputUnion) {
    this.buffer = new ArrayBuffer(40);
    this.view = new DataView(this.buffer);
    this.view.setUint32(0, type, true);
    const src = new Uint8Array(inputUnion.buffer);
    const dst = new Uint8Array(this.buffer);
    dst.set(src, 8);
  }
}

class FailSafeException extends Error {
  constructor(message) {
    super(message);
    this.name = "FailSafeException";
  }
}

// src/utils.ts
import { ptr } from "bun:ffi";
var config = {
  FAILSAFE: true,
  FAILSAFE_POINTS: [[0, 0]],
  PAUSE: 0.05
};
var FAILSAFE = config.FAILSAFE;
var FAILSAFE_POINTS = config.FAILSAFE_POINTS;
var PAUSE = config.PAUSE;
function failSafeCheck() {
  if (config.FAILSAFE) {
    const pos = position();
    for (const point of config.FAILSAFE_POINTS) {
      if (pos[0] === point[0] && pos[1] === point[1]) {
        throw new FailSafeException("DirectInput fail-safe triggered from mouse moving to a corner of the screen. " + "To disable this fail-safe, set config.FAILSAFE to false. DISABLING FAIL-SAFE IS NOT RECOMMENDED.");
      }
    }
  }
}
function handlePause(shouldPause) {
  if (shouldPause && config.PAUSE > 0) {
    Bun.sleepSync(config.PAUSE * 1000);
  }
}
function toWindowsCoordinates(x = 0, y = 0) {
  const [displayWidth, displayHeight] = size();
  const windowsX = Math.floor(x * 65536 / displayWidth) + 1;
  const windowsY = Math.floor(y * 65536 / displayHeight) + 1;
  return [windowsX, windowsY];
}
function position(x, y) {
  const pointBuffer = new ArrayBuffer(8);
  const pointView = new DataView(pointBuffer);
  user32.symbols.GetCursorPos(ptr(pointBuffer));
  const cursorX = pointView.getInt32(0, true);
  const cursorY = pointView.getInt32(4, true);
  return [x ?? cursorX, y ?? cursorY];
}
function size() {
  const width = user32.symbols.GetSystemMetrics(0);
  const height = user32.symbols.GetSystemMetrics(1);
  return [width, height];
}

// src/constants.ts
var LEFT = "left";
var MIDDLE = "middle";
var RIGHT = "right";
var PRIMARY = "primary";
var SECONDARY = "secondary";
var X1 = "x1";
var X2 = "x2";
var MOUSEEVENTF_MOVE = 1;
var MOUSEEVENTF_ABSOLUTE = 32768;
var MOUSEEVENTF_LEFTDOWN = 2;
var MOUSEEVENTF_LEFTUP = 4;
var MOUSEEVENTF_LEFTCLICK = MOUSEEVENTF_LEFTDOWN + MOUSEEVENTF_LEFTUP;
var MOUSEEVENTF_RIGHTDOWN = 8;
var MOUSEEVENTF_RIGHTUP = 16;
var MOUSEEVENTF_RIGHTCLICK = MOUSEEVENTF_RIGHTDOWN + MOUSEEVENTF_RIGHTUP;
var MOUSEEVENTF_MIDDLEDOWN = 32;
var MOUSEEVENTF_MIDDLEUP = 64;
var MOUSEEVENTF_MIDDLECLICK = MOUSEEVENTF_MIDDLEDOWN + MOUSEEVENTF_MIDDLEUP;
var MOUSEEVENTF_XDOWN = 128;
var MOUSEEVENTF_XUP = 256;
var XBUTTON1 = 1;
var XBUTTON2 = 2;
var KEYEVENTF_EXTENDEDKEY = 1;
var KEYEVENTF_KEYUP = 2;
var KEYEVENTF_SCANCODE = 8;
var MAPVK_VK_TO_VSC = 0;

// src/mouse.ts
function mouseDown(x, y, button = PRIMARY, _pause = true) {
  if (x !== undefined || y !== undefined) {
    moveTo(x, y);
  }
  let ev;
  let mouseData = 0;
  if (button === PRIMARY || button === LEFT) {
    ev = MOUSEEVENTF_LEFTDOWN;
  } else if (button === MIDDLE) {
    ev = MOUSEEVENTF_MIDDLEDOWN;
  } else if (button === SECONDARY || button === RIGHT) {
    ev = MOUSEEVENTF_RIGHTDOWN;
  } else if (button === X1) {
    ev = MOUSEEVENTF_XDOWN;
    mouseData = XBUTTON1;
  } else if (button === X2) {
    ev = MOUSEEVENTF_XDOWN;
    mouseData = XBUTTON2;
  } else {
    throw new Error(`button must be "left", "middle", "right", "x1", or "x2", not ${button}`);
  }
  const mi = new MouseInput(0, 0, mouseData, ev, 0);
  const input = new Input(0, mi);
  user32.symbols.SendInput(1, ptr2(input.buffer), 40);
  if (_pause)
    handlePause(_pause);
}
function mouseUp(x, y, button = PRIMARY, _pause = true) {
  if (x !== undefined || y !== undefined) {
    moveTo(x, y);
  }
  let ev;
  let mouseData = 0;
  if (button === PRIMARY || button === LEFT) {
    ev = MOUSEEVENTF_LEFTUP;
  } else if (button === MIDDLE) {
    ev = MOUSEEVENTF_MIDDLEUP;
  } else if (button === SECONDARY || button === RIGHT) {
    ev = MOUSEEVENTF_RIGHTUP;
  } else if (button === X1) {
    ev = MOUSEEVENTF_XUP;
    mouseData = XBUTTON1;
  } else if (button === X2) {
    ev = MOUSEEVENTF_XUP;
    mouseData = XBUTTON2;
  } else {
    throw new Error(`button must be "left", "middle", "right", "x1", or "x2", not ${button}`);
  }
  const mi = new MouseInput(0, 0, mouseData, ev, 0);
  const input = new Input(0, mi);
  user32.symbols.SendInput(1, ptr2(input.buffer), 40);
  if (_pause)
    handlePause(_pause);
}
function click(x, y, clicks = 1, interval = 0, button = PRIMARY, _pause = true) {
  if (x !== undefined || y !== undefined) {
    moveTo(x, y);
  }
  if (button === X1 || button === X2) {
    for (let i = 0;i < clicks; i++) {
      failSafeCheck();
      mouseDown(undefined, undefined, button, false);
      mouseUp(undefined, undefined, button, false);
      if (interval > 0) {
        Bun.sleepSync(interval * 1000);
      }
    }
  } else {
    let ev;
    if (button === PRIMARY || button === LEFT) {
      ev = MOUSEEVENTF_LEFTCLICK;
    } else if (button === MIDDLE) {
      ev = MOUSEEVENTF_MIDDLECLICK;
    } else if (button === SECONDARY || button === RIGHT) {
      ev = MOUSEEVENTF_RIGHTCLICK;
    } else {
      throw new Error(`button must be "left", "middle", "right", "x1", or "x2", not ${button}`);
    }
    for (let i = 0;i < clicks; i++) {
      failSafeCheck();
      const mi = new MouseInput(0, 0, 0, ev, 0);
      const input = new Input(0, mi);
      user32.symbols.SendInput(1, ptr2(input.buffer), 40);
      if (interval > 0) {
        Bun.sleepSync(interval * 1000);
      }
    }
  }
  if (_pause)
    handlePause(_pause);
}
function leftClick(x, y, interval = 0, _pause = true) {
  click(x, y, 1, interval, LEFT, _pause);
}
function rightClick(x, y, interval = 0, _pause = true) {
  click(x, y, 1, interval, RIGHT, _pause);
}
function middleClick(x, y, interval = 0, _pause = true) {
  click(x, y, 1, interval, MIDDLE, _pause);
}
function doubleClick(x, y, interval = 0, button = LEFT, _pause = true) {
  click(x, y, 2, interval, button, _pause);
}
function tripleClick(x, y, interval = 0, button = LEFT, _pause = true) {
  click(x, y, 3, interval, button, _pause);
}
function moveTo(x, y, _pause = true, relative = false) {
  failSafeCheck();
  if (!relative) {
    const [finalX, finalY] = position(x, y);
    const [winX, winY] = toWindowsCoordinates(finalX, finalY);
    const mi = new MouseInput(winX, winY, 0, MOUSEEVENTF_MOVE | MOUSEEVENTF_ABSOLUTE, 0);
    const input = new Input(0, mi);
    user32.symbols.SendInput(1, ptr2(input.buffer), 40);
  } else {
    const [currentX, currentY] = position();
    moveRel((x ?? currentX) - currentX, (y ?? currentY) - currentY, _pause, true);
  }
  if (_pause)
    handlePause(_pause);
}
function moveRel(xOffset = 0, yOffset = 0, _pause = true, relative = false) {
  failSafeCheck();
  if (!relative) {
    const [x, y] = position();
    moveTo(x + xOffset, y + yOffset, _pause);
  } else {
    const mi = new MouseInput(xOffset, yOffset, 0, MOUSEEVENTF_MOVE, 0);
    const input = new Input(0, mi);
    user32.symbols.SendInput(1, ptr2(input.buffer), 40);
    if (_pause)
      handlePause(_pause);
  }
}
var move = moveRel;
// src/keyboard.ts
import { ptr as ptr3 } from "bun:ffi";

// src/keyboard-mapping.ts
var KEYBOARD_MAPPING = {
  escape: 1,
  esc: 1,
  f1: 59,
  f2: 60,
  f3: 61,
  f4: 62,
  f5: 63,
  f6: 64,
  f7: 65,
  f8: 66,
  f9: 67,
  f10: 68,
  f11: 87,
  f12: 88,
  printscreen: 183,
  prntscrn: 183,
  prtsc: 183,
  prtscr: 183,
  scrolllock: 70,
  pause: 197,
  "`": 41,
  "1": 2,
  "2": 3,
  "3": 4,
  "4": 5,
  "5": 6,
  "6": 7,
  "7": 8,
  "8": 9,
  "9": 10,
  "0": 11,
  "-": 12,
  "=": 13,
  backspace: 14,
  insert: 210 + 1024,
  home: 199 + 1024,
  pageup: 201 + 1024,
  pagedown: 209 + 1024,
  numlock: 69,
  divide: 181 + 1024,
  multiply: 55,
  subtract: 74,
  add: 78,
  decimal: 83,
  tab: 15,
  q: 16,
  w: 17,
  e: 18,
  r: 19,
  t: 20,
  y: 21,
  u: 22,
  i: 23,
  o: 24,
  p: 25,
  "[": 26,
  "]": 27,
  "\\": 43,
  del: 211 + 1024,
  delete: 211 + 1024,
  end: 207 + 1024,
  capslock: 58,
  a: 30,
  s: 31,
  d: 32,
  f: 33,
  g: 34,
  h: 35,
  j: 36,
  k: 37,
  l: 38,
  ";": 39,
  "'": 40,
  enter: 28,
  return: 28,
  shift: 42,
  shiftleft: 42,
  z: 44,
  x: 45,
  c: 46,
  v: 47,
  b: 48,
  n: 49,
  m: 50,
  ",": 51,
  ".": 52,
  "/": 53,
  shiftright: 54,
  ctrl: 29,
  ctrlleft: 29,
  win: 219 + 1024,
  winleft: 219 + 1024,
  alt: 56,
  altleft: 56,
  " ": 57,
  space: 57,
  altright: 184 + 1024,
  winright: 220 + 1024,
  apps: 221 + 1024,
  ctrlright: 157 + 1024,
  up: user32.symbols.MapVirtualKeyW(38, MAPVK_VK_TO_VSC),
  left: user32.symbols.MapVirtualKeyW(37, MAPVK_VK_TO_VSC),
  down: user32.symbols.MapVirtualKeyW(40, MAPVK_VK_TO_VSC),
  right: user32.symbols.MapVirtualKeyW(39, MAPVK_VK_TO_VSC)
};

// src/keyboard.ts
function keyDown(key, _pause = true) {
  failSafeCheck();
  const normalizedKey = key.length > 1 ? key.toLowerCase() : key.toLowerCase();
  if (!(normalizedKey in KEYBOARD_MAPPING)) {
    return false;
  }
  let keybdFlags = KEYEVENTF_SCANCODE;
  let insertedEvents = 0;
  let expectedEvents = 1;
  if (["up", "left", "down", "right"].includes(normalizedKey)) {
    keybdFlags |= KEYEVENTF_EXTENDEDKEY;
    if (user32.symbols.GetKeyState(144) !== 0) {
      expectedEvents = 2;
      const ki2 = new KeyBdInput(0, 224, KEYEVENTF_SCANCODE, 0);
      const input2 = new Input(1, ki2);
      insertedEvents += user32.symbols.SendInput(1, ptr3(input2.buffer), 40);
    }
  }
  const hexKeyCode = KEYBOARD_MAPPING[normalizedKey];
  const ki = new KeyBdInput(0, hexKeyCode, keybdFlags, 0);
  const input = new Input(1, ki);
  insertedEvents += user32.symbols.SendInput(1, ptr3(input.buffer), 40);
  if (_pause)
    handlePause(_pause);
  return insertedEvents === expectedEvents;
}
function keyUp(key, _pause = true) {
  failSafeCheck();
  const normalizedKey = key.length > 1 ? key.toLowerCase() : key.toLowerCase();
  if (!(normalizedKey in KEYBOARD_MAPPING)) {
    return false;
  }
  let keybdFlags = KEYEVENTF_SCANCODE | KEYEVENTF_KEYUP;
  let insertedEvents = 0;
  let expectedEvents = 1;
  if (["up", "left", "down", "right"].includes(normalizedKey)) {
    keybdFlags |= KEYEVENTF_EXTENDEDKEY;
  }
  const hexKeyCode = KEYBOARD_MAPPING[normalizedKey];
  const ki = new KeyBdInput(0, hexKeyCode, keybdFlags, 0);
  const input = new Input(1, ki);
  insertedEvents += user32.symbols.SendInput(1, ptr3(input.buffer), 40);
  if (["up", "left", "down", "right"].includes(normalizedKey) && user32.symbols.GetKeyState(144) !== 0) {
    expectedEvents = 2;
    const ki2 = new KeyBdInput(0, 224, KEYEVENTF_SCANCODE | KEYEVENTF_KEYUP, 0);
    const input2 = new Input(1, ki2);
    insertedEvents += user32.symbols.SendInput(1, ptr3(input2.buffer), 40);
  }
  if (_pause)
    handlePause(_pause);
  return insertedEvents === expectedEvents;
}
function press(keys, presses = 1, interval = 0, _pause = true) {
  const keyArray = typeof keys === "string" ? [keys] : keys;
  const normalizedKeys = keyArray.map((k) => k.length > 1 ? k.toLowerCase() : k.toLowerCase());
  const expectedPresses = presses * normalizedKeys.length;
  let completedPresses = 0;
  for (let i = 0;i < presses; i++) {
    for (const k of normalizedKeys) {
      failSafeCheck();
      const downed = keyDown(k, false);
      const upped = keyUp(k, false);
      if (downed && upped) {
        completedPresses++;
      }
    }
    if (interval > 0) {
      Bun.sleepSync(interval * 1000);
    }
  }
  if (_pause)
    handlePause(_pause);
  return completedPresses === expectedPresses;
}
function typewrite(message, interval = 0, _pause = true) {
  for (const c of message) {
    const char = c.toLowerCase();
    press(char, 1, 0, false);
    if (interval > 0) {
      Bun.sleepSync(interval * 1000);
    }
    failSafeCheck();
  }
  if (_pause)
    handlePause(_pause);
}
var write = typewrite;
export {
  write,
  typewrite,
  tripleClick,
  toWindowsCoordinates,
  size,
  rightClick,
  press,
  position,
  moveTo,
  moveRel,
  move,
  mouseUp,
  mouseDown,
  middleClick,
  leftClick,
  keyUp,
  keyDown,
  handlePause,
  failSafeCheck,
  doubleClick,
  config,
  click,
  X2,
  X1,
  SECONDARY,
  RIGHT,
  PRIMARY,
  PAUSE,
  MIDDLE,
  LEFT,
  FailSafeException,
  FAILSAFE_POINTS,
  FAILSAFE
};
