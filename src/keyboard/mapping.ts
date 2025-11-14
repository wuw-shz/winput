export interface KeyDef {
   scan: number
   extended?: boolean
}

export const KEYBOARD_MAPPING: Record<string, KeyDef> = {
   // Letters (a-z)
   a: { scan: 0x1e },
   b: { scan: 0x30 },
   c: { scan: 0x2e },
   d: { scan: 0x20 },
   e: { scan: 0x12 },
   f: { scan: 0x21 },
   g: { scan: 0x22 },
   h: { scan: 0x23 },
   i: { scan: 0x17 },
   j: { scan: 0x24 },
   k: { scan: 0x25 },
   l: { scan: 0x26 },
   m: { scan: 0x32 },
   n: { scan: 0x31 },
   o: { scan: 0x18 },
   p: { scan: 0x19 },
   q: { scan: 0x10 },
   r: { scan: 0x13 },
   s: { scan: 0x1f },
   t: { scan: 0x14 },
   u: { scan: 0x16 },
   v: { scan: 0x2f },
   w: { scan: 0x11 },
   x: { scan: 0x2d },
   y: { scan: 0x15 },
   z: { scan: 0x2c },

   // Numbers (0-9) - main keyboard
   '0': { scan: 0x0b },
   '1': { scan: 0x02 },
   '2': { scan: 0x03 },
   '3': { scan: 0x04 },
   '4': { scan: 0x05 },
   '5': { scan: 0x06 },
   '6': { scan: 0x07 },
   '7': { scan: 0x08 },
   '8': { scan: 0x09 },
   '9': { scan: 0x0a },

   // Function keys (F1-F24)
   f1: { scan: 0x3b },
   f2: { scan: 0x3c },
   f3: { scan: 0x3d },
   f4: { scan: 0x3e },
   f5: { scan: 0x3f },
   f6: { scan: 0x40 },
   f7: { scan: 0x41 },
   f8: { scan: 0x42 },
   f9: { scan: 0x43 },
   f10: { scan: 0x44 },
   f11: { scan: 0x57 },
   f12: { scan: 0x58 },
   f13: { scan: 0x64 },
   f14: { scan: 0x65 },
   f15: { scan: 0x66 },
   f16: { scan: 0x67 },
   f17: { scan: 0x68 },
   f18: { scan: 0x69 },
   f19: { scan: 0x6a },
   f20: { scan: 0x6b },
   f21: { scan: 0x6c },
   f22: { scan: 0x6d },
   f23: { scan: 0x6e },
   f24: { scan: 0x76 },

   // Special characters and symbols
   '-': { scan: 0x0c },
   minus: { scan: 0x0c },
   '=': { scan: 0x0d },
   equal: { scan: 0x0d },
   equals: { scan: 0x0d },
   '[': { scan: 0x1a },
   bracketleft: { scan: 0x1a },
   ']': { scan: 0x1b },
   bracketright: { scan: 0x1b },
   '\\': { scan: 0x2b },
   backslash: { scan: 0x2b },
   ';': { scan: 0x27 },
   semicolon: { scan: 0x27 },
   "'": { scan: 0x28 },
   quote: { scan: 0x28 },
   apostrophe: { scan: 0x28 },
   '`': { scan: 0x29 },
   grave: { scan: 0x29 },
   backtick: { scan: 0x29 },
   ',': { scan: 0x33 },
   comma: { scan: 0x33 },
   '.': { scan: 0x34 },
   period: { scan: 0x34 },
   dot: { scan: 0x34 },
   '/': { scan: 0x35 },
   slash: { scan: 0x35 },
   forwardslash: { scan: 0x35 },

   // Whitespace and control keys
   space: { scan: 0x39 },
   enter: { scan: 0x1c },
   return: { scan: 0x1c },
   tab: { scan: 0x0f },
   backspace: { scan: 0x0e },
   escape: { scan: 0x01 },
   esc: { scan: 0x01 },

   // Modifier keys
   shift: { scan: 0x2a },
   shiftleft: { scan: 0x2a },
   shiftright: { scan: 0x36 },
   ctrl: { scan: 0x1d },
   control: { scan: 0x1d },
   ctrlleft: { scan: 0x1d },
   controlleft: { scan: 0x1d },
   ctrlright: { scan: 0x1d, extended: true },
   controlright: { scan: 0x1d, extended: true },
   rctrl: { scan: 0x1d, extended: true },
   alt: { scan: 0x38 },
   altleft: { scan: 0x38 },
   altright: { scan: 0x38, extended: true },
   ralt: { scan: 0x38, extended: true },
   altgr: { scan: 0x38, extended: true },
   win: { scan: 0x5b, extended: true },
   winleft: { scan: 0x5b, extended: true },
   windows: { scan: 0x5b, extended: true },
   winright: { scan: 0x5c, extended: true },
   windowsright: { scan: 0x5c, extended: true },
   apps: { scan: 0x5d, extended: true },
   menu: { scan: 0x5d, extended: true },
   contextmenu: { scan: 0x5d, extended: true },

   // Lock keys
   capslock: { scan: 0x3a },
   numlock: { scan: 0x45 },
   scrolllock: { scan: 0x46 },

   // Navigation keys
   up: { scan: 0x48, extended: true },
   down: { scan: 0x50, extended: true },
   left: { scan: 0x4b, extended: true },
   right: { scan: 0x4d, extended: true },
   home: { scan: 0x47, extended: true },
   end: { scan: 0x4f, extended: true },
   pageup: { scan: 0x49, extended: true },
   pagedown: { scan: 0x51, extended: true },
   insert: { scan: 0x52, extended: true },
   delete: { scan: 0x53, extended: true },
   del: { scan: 0x53, extended: true },

   // Numpad keys
   numpad0: { scan: 0x52 },
   numpad1: { scan: 0x4f },
   numpad2: { scan: 0x50 },
   numpad3: { scan: 0x51 },
   numpad4: { scan: 0x4b },
   numpad5: { scan: 0x4c },
   numpad6: { scan: 0x4d },
   numpad7: { scan: 0x47 },
   numpad8: { scan: 0x48 },
   numpad9: { scan: 0x49 },
   numpaddecimal: { scan: 0x53 },
   numpadperiod: { scan: 0x53 },
   numpaddivide: { scan: 0x35, extended: true },
   numpadmultiply: { scan: 0x37 },
   numpadsubtract: { scan: 0x4a },
   numpadadd: { scan: 0x4e },
   numpadenter: { scan: 0x1c, extended: true },

   // Media keys
   volumeup: { scan: 0x30, extended: true },
   volumedown: { scan: 0x2e, extended: true },
   volumemute: { scan: 0x20, extended: true },
   mute: { scan: 0x20, extended: true },
   playpause: { scan: 0x22, extended: true },
   stop: { scan: 0x24, extended: true },
   nexttrack: { scan: 0x19, extended: true },
   previoustrack: { scan: 0x10, extended: true },
   medianext: { scan: 0x19, extended: true },
   mediaprevious: { scan: 0x10, extended: true },
   mediaplaypause: { scan: 0x22, extended: true },
   mediastop: { scan: 0x24, extended: true },

   // Browser keys
   browserhome: { scan: 0x32, extended: true },
   browserback: { scan: 0x6a, extended: true },
   browserforward: { scan: 0x69, extended: true },
   browserrefresh: { scan: 0x67, extended: true },
   browserstop: { scan: 0x68, extended: true },
   browsersearch: { scan: 0x65, extended: true },
   browserfavorites: { scan: 0x66, extended: true },

   // Application launch keys
   mail: { scan: 0x6c, extended: true },
   calculator: { scan: 0x21, extended: true },
   mycomputer: { scan: 0x6b, extended: true },
   computer: { scan: 0x6b, extended: true },

   // System keys
   printscreen: { scan: 0x37, extended: true },
   prtsc: { scan: 0x37, extended: true },
   pause: { scan: 0x45, extended: true },
   break: { scan: 0x46 },

   // International keys
   intl1: { scan: 0x73 }, // ¥ key on Japanese keyboards
   intl2: { scan: 0x70 }, // Katakana/Hiragana key
   intl3: { scan: 0x7d }, // ¥ key on Japanese keyboards (alternative)
   intl4: { scan: 0x79 }, // Henkan (Convert) key
   intl5: { scan: 0x7b }, // Muhenkan (No-convert) key
   intl6: { scan: 0x5c }, // Katakana/Hiragana/Romaji key
   lang1: { scan: 0x72 }, // Hangul/English toggle (Korean)
   lang2: { scan: 0x71 }, // Hanja conversion (Korean)

   // Power keys (laptop)
   power: { scan: 0x5e, extended: true },
   sleep: { scan: 0x5f, extended: true },
   wake: { scan: 0x63, extended: true },

   // Additional special keys
   help: { scan: 0x3b, extended: true },
   undo: { scan: 0x08, extended: true },
   redo: { scan: 0x07, extended: true },
   cut: { scan: 0x2d, extended: true },
   copy: { scan: 0x2e, extended: true },
   paste: { scan: 0x2f, extended: true },
   find: { scan: 0x21, extended: true },
   select: { scan: 0x29, extended: true },
   clear: { scan: 0x4c },

   // Numpad with explicit names
   num0: { scan: 0x52 },
   num1: { scan: 0x4f },
   num2: { scan: 0x50 },
   num3: { scan: 0x51 },
   num4: { scan: 0x4b },
   num5: { scan: 0x4c },
   num6: { scan: 0x4d },
   num7: { scan: 0x47 },
   num8: { scan: 0x48 },
   num9: { scan: 0x49 },
}

// Extended shift key mapping for special characters
export const SHIFT_KEYS = new Map<string, string>([
   // Numbers with shift
   ['!', '1'],
   ['@', '2'],
   ['#', '3'],
   ['$', '4'],
   ['%', '5'],
   ['^', '6'],
   ['&', '7'],
   ['*', '8'],
   ['(', '9'],
   [')', '0'],

   // Symbols with shift
   ['_', '-'],
   ['+', '='],
   ['{', '['],
   ['}', ']'],
   ['|', '\\'],
   [':', ';'],
   ['"', "'"],
   ['<', ','],
   ['>', '.'],
   ['?', '/'],
   ['~', '`'],
])
