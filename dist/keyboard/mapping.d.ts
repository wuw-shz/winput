export interface KeyDef {
    scan: number;
    extended?: boolean;
    vk?: number;
}
export declare const VK_CODES: {
    readonly LBUTTON: 1;
    readonly RBUTTON: 2;
    readonly MBUTTON: 4;
    readonly XBUTTON1: 5;
    readonly XBUTTON2: 6;
    readonly BACK: 8;
    readonly TAB: 9;
    readonly RETURN: 13;
    readonly SHIFT: 16;
    readonly CONTROL: 17;
    readonly MENU: 18;
    readonly PAUSE: 19;
    readonly CAPITAL: 20;
    readonly ESCAPE: 27;
    readonly SPACE: 32;
    readonly PRIOR: 33;
    readonly NEXT: 34;
    readonly END: 35;
    readonly HOME: 36;
    readonly LEFT: 37;
    readonly UP: 38;
    readonly RIGHT: 39;
    readonly DOWN: 40;
    readonly INSERT: 45;
    readonly DELETE: 46;
    readonly KEY_0: 48;
    readonly KEY_1: 49;
    readonly KEY_2: 50;
    readonly KEY_3: 51;
    readonly KEY_4: 52;
    readonly KEY_5: 53;
    readonly KEY_6: 54;
    readonly KEY_7: 55;
    readonly KEY_8: 56;
    readonly KEY_9: 57;
    readonly KEY_A: 65;
    readonly KEY_B: 66;
    readonly KEY_C: 67;
    readonly KEY_D: 68;
    readonly KEY_E: 69;
    readonly KEY_F: 70;
    readonly KEY_G: 71;
    readonly KEY_H: 72;
    readonly KEY_I: 73;
    readonly KEY_J: 74;
    readonly KEY_K: 75;
    readonly KEY_L: 76;
    readonly KEY_M: 77;
    readonly KEY_N: 78;
    readonly KEY_O: 79;
    readonly KEY_P: 80;
    readonly KEY_Q: 81;
    readonly KEY_R: 82;
    readonly KEY_S: 83;
    readonly KEY_T: 84;
    readonly KEY_U: 85;
    readonly KEY_V: 86;
    readonly KEY_W: 87;
    readonly KEY_X: 88;
    readonly KEY_Y: 89;
    readonly KEY_Z: 90;
    readonly LWIN: 91;
    readonly RWIN: 92;
    readonly APPS: 93;
    readonly NUMPAD0: 96;
    readonly NUMPAD1: 97;
    readonly NUMPAD2: 98;
    readonly NUMPAD3: 99;
    readonly NUMPAD4: 100;
    readonly NUMPAD5: 101;
    readonly NUMPAD6: 102;
    readonly NUMPAD7: 103;
    readonly NUMPAD8: 104;
    readonly NUMPAD9: 105;
    readonly MULTIPLY: 106;
    readonly ADD: 107;
    readonly SEPARATOR: 108;
    readonly SUBTRACT: 109;
    readonly DECIMAL: 110;
    readonly DIVIDE: 111;
    readonly F1: 112;
    readonly F2: 113;
    readonly F3: 114;
    readonly F4: 115;
    readonly F5: 116;
    readonly F6: 117;
    readonly F7: 118;
    readonly F8: 119;
    readonly F9: 120;
    readonly F10: 121;
    readonly F11: 122;
    readonly F12: 123;
    readonly F13: 124;
    readonly F14: 125;
    readonly F15: 126;
    readonly F16: 127;
    readonly F17: 128;
    readonly F18: 129;
    readonly F19: 130;
    readonly F20: 131;
    readonly F21: 132;
    readonly F22: 133;
    readonly F23: 134;
    readonly F24: 135;
    readonly NUMLOCK: 144;
    readonly SCROLL: 145;
    readonly LSHIFT: 160;
    readonly RSHIFT: 161;
    readonly LCONTROL: 162;
    readonly RCONTROL: 163;
    readonly LMENU: 164;
    readonly RMENU: 165;
    readonly BROWSER_BACK: 166;
    readonly BROWSER_FORWARD: 167;
    readonly BROWSER_REFRESH: 168;
    readonly BROWSER_STOP: 169;
    readonly BROWSER_SEARCH: 170;
    readonly BROWSER_FAVORITES: 171;
    readonly BROWSER_HOME: 172;
    readonly VOLUME_MUTE: 173;
    readonly VOLUME_DOWN: 174;
    readonly VOLUME_UP: 175;
    readonly MEDIA_NEXT_TRACK: 176;
    readonly MEDIA_PREV_TRACK: 177;
    readonly MEDIA_STOP: 178;
    readonly MEDIA_PLAY_PAUSE: 179;
    readonly LAUNCH_MAIL: 180;
    readonly LAUNCH_MEDIA_SELECT: 181;
    readonly LAUNCH_APP1: 182;
    readonly LAUNCH_APP2: 183;
    readonly OEM_1: 186;
    readonly OEM_PLUS: 187;
    readonly OEM_COMMA: 188;
    readonly OEM_MINUS: 189;
    readonly OEM_PERIOD: 190;
    readonly OEM_2: 191;
    readonly OEM_3: 192;
    readonly OEM_4: 219;
    readonly OEM_5: 220;
    readonly OEM_6: 221;
    readonly OEM_7: 222;
    readonly SNAPSHOT: 44;
    readonly SLEEP: 95;
};
export declare const KEYBOARD_MAPPING: {
    readonly a: {
        readonly scan: 30;
        readonly vk: 65;
    };
    readonly b: {
        readonly scan: 48;
        readonly vk: 66;
    };
    readonly c: {
        readonly scan: 46;
        readonly vk: 67;
    };
    readonly d: {
        readonly scan: 32;
        readonly vk: 68;
    };
    readonly e: {
        readonly scan: 18;
        readonly vk: 69;
    };
    readonly f: {
        readonly scan: 33;
        readonly vk: 70;
    };
    readonly g: {
        readonly scan: 34;
        readonly vk: 71;
    };
    readonly h: {
        readonly scan: 35;
        readonly vk: 72;
    };
    readonly i: {
        readonly scan: 23;
        readonly vk: 73;
    };
    readonly j: {
        readonly scan: 36;
        readonly vk: 74;
    };
    readonly k: {
        readonly scan: 37;
        readonly vk: 75;
    };
    readonly l: {
        readonly scan: 38;
        readonly vk: 76;
    };
    readonly m: {
        readonly scan: 50;
        readonly vk: 77;
    };
    readonly n: {
        readonly scan: 49;
        readonly vk: 78;
    };
    readonly o: {
        readonly scan: 24;
        readonly vk: 79;
    };
    readonly p: {
        readonly scan: 25;
        readonly vk: 80;
    };
    readonly q: {
        readonly scan: 16;
        readonly vk: 81;
    };
    readonly r: {
        readonly scan: 19;
        readonly vk: 82;
    };
    readonly s: {
        readonly scan: 31;
        readonly vk: 83;
    };
    readonly t: {
        readonly scan: 20;
        readonly vk: 84;
    };
    readonly u: {
        readonly scan: 22;
        readonly vk: 85;
    };
    readonly v: {
        readonly scan: 47;
        readonly vk: 86;
    };
    readonly w: {
        readonly scan: 17;
        readonly vk: 87;
    };
    readonly x: {
        readonly scan: 45;
        readonly vk: 88;
    };
    readonly y: {
        readonly scan: 21;
        readonly vk: 89;
    };
    readonly z: {
        readonly scan: 44;
        readonly vk: 90;
    };
    readonly "0": {
        readonly scan: 11;
        readonly vk: 48;
    };
    readonly "1": {
        readonly scan: 2;
        readonly vk: 49;
    };
    readonly "2": {
        readonly scan: 3;
        readonly vk: 50;
    };
    readonly "3": {
        readonly scan: 4;
        readonly vk: 51;
    };
    readonly "4": {
        readonly scan: 5;
        readonly vk: 52;
    };
    readonly "5": {
        readonly scan: 6;
        readonly vk: 53;
    };
    readonly "6": {
        readonly scan: 7;
        readonly vk: 54;
    };
    readonly "7": {
        readonly scan: 8;
        readonly vk: 55;
    };
    readonly "8": {
        readonly scan: 9;
        readonly vk: 56;
    };
    readonly "9": {
        readonly scan: 10;
        readonly vk: 57;
    };
    readonly f1: {
        readonly scan: 59;
        readonly vk: 112;
    };
    readonly f2: {
        readonly scan: 60;
        readonly vk: 113;
    };
    readonly f3: {
        readonly scan: 61;
        readonly vk: 114;
    };
    readonly f4: {
        readonly scan: 62;
        readonly vk: 115;
    };
    readonly f5: {
        readonly scan: 63;
        readonly vk: 116;
    };
    readonly f6: {
        readonly scan: 64;
        readonly vk: 117;
    };
    readonly f7: {
        readonly scan: 65;
        readonly vk: 118;
    };
    readonly f8: {
        readonly scan: 66;
        readonly vk: 119;
    };
    readonly f9: {
        readonly scan: 67;
        readonly vk: 120;
    };
    readonly f10: {
        readonly scan: 68;
        readonly vk: 121;
    };
    readonly f11: {
        readonly scan: 87;
        readonly vk: 122;
    };
    readonly f12: {
        readonly scan: 88;
        readonly vk: 123;
    };
    readonly f13: {
        readonly scan: 100;
        readonly vk: 124;
    };
    readonly f14: {
        readonly scan: 101;
        readonly vk: 125;
    };
    readonly f15: {
        readonly scan: 102;
        readonly vk: 126;
    };
    readonly f16: {
        readonly scan: 103;
        readonly vk: 127;
    };
    readonly f17: {
        readonly scan: 104;
        readonly vk: 128;
    };
    readonly f18: {
        readonly scan: 105;
        readonly vk: 129;
    };
    readonly f19: {
        readonly scan: 106;
        readonly vk: 130;
    };
    readonly f20: {
        readonly scan: 107;
        readonly vk: 131;
    };
    readonly f21: {
        readonly scan: 108;
        readonly vk: 132;
    };
    readonly f22: {
        readonly scan: 109;
        readonly vk: 133;
    };
    readonly f23: {
        readonly scan: 110;
        readonly vk: 134;
    };
    readonly f24: {
        readonly scan: 118;
        readonly vk: 135;
    };
    readonly "-": {
        readonly scan: 12;
        readonly vk: 189;
    };
    readonly minus: {
        readonly scan: 12;
        readonly vk: 189;
    };
    readonly "=": {
        readonly scan: 13;
        readonly vk: 187;
    };
    readonly equal: {
        readonly scan: 13;
        readonly vk: 187;
    };
    readonly equals: {
        readonly scan: 13;
        readonly vk: 187;
    };
    readonly "[": {
        readonly scan: 26;
        readonly vk: 219;
    };
    readonly bracketleft: {
        readonly scan: 26;
        readonly vk: 219;
    };
    readonly "]": {
        readonly scan: 27;
        readonly vk: 221;
    };
    readonly bracketright: {
        readonly scan: 27;
        readonly vk: 221;
    };
    readonly "\\": {
        readonly scan: 43;
        readonly vk: 220;
    };
    readonly backslash: {
        readonly scan: 43;
        readonly vk: 220;
    };
    readonly ";": {
        readonly scan: 39;
        readonly vk: 186;
    };
    readonly semicolon: {
        readonly scan: 39;
        readonly vk: 186;
    };
    readonly "'": {
        readonly scan: 40;
        readonly vk: 222;
    };
    readonly quote: {
        readonly scan: 40;
        readonly vk: 222;
    };
    readonly apostrophe: {
        readonly scan: 40;
        readonly vk: 222;
    };
    readonly "`": {
        readonly scan: 41;
        readonly vk: 192;
    };
    readonly grave: {
        readonly scan: 41;
        readonly vk: 192;
    };
    readonly backtick: {
        readonly scan: 41;
        readonly vk: 192;
    };
    readonly ",": {
        readonly scan: 51;
        readonly vk: 188;
    };
    readonly comma: {
        readonly scan: 51;
        readonly vk: 188;
    };
    readonly ".": {
        readonly scan: 52;
        readonly vk: 190;
    };
    readonly period: {
        readonly scan: 52;
        readonly vk: 190;
    };
    readonly dot: {
        readonly scan: 52;
        readonly vk: 190;
    };
    readonly "/": {
        readonly scan: 53;
        readonly vk: 191;
    };
    readonly slash: {
        readonly scan: 53;
        readonly vk: 191;
    };
    readonly forwardslash: {
        readonly scan: 53;
        readonly vk: 191;
    };
    readonly space: {
        readonly scan: 57;
        readonly vk: 32;
    };
    readonly enter: {
        readonly scan: 28;
        readonly vk: 13;
    };
    readonly return: {
        readonly scan: 28;
        readonly vk: 13;
    };
    readonly tab: {
        readonly scan: 15;
        readonly vk: 9;
    };
    readonly backspace: {
        readonly scan: 14;
        readonly vk: 8;
    };
    readonly escape: {
        readonly scan: 1;
        readonly vk: 27;
    };
    readonly esc: {
        readonly scan: 1;
        readonly vk: 27;
    };
    readonly shift: {
        readonly scan: 42;
        readonly vk: 16;
    };
    readonly shiftleft: {
        readonly scan: 42;
        readonly vk: 160;
    };
    readonly shiftright: {
        readonly scan: 54;
        readonly vk: 161;
    };
    readonly ctrl: {
        readonly scan: 29;
        readonly vk: 17;
    };
    readonly control: {
        readonly scan: 29;
        readonly vk: 17;
    };
    readonly ctrlleft: {
        readonly scan: 29;
        readonly vk: 162;
    };
    readonly controlleft: {
        readonly scan: 29;
        readonly vk: 162;
    };
    readonly ctrlright: {
        readonly scan: 29;
        readonly extended: true;
        readonly vk: 163;
    };
    readonly controlright: {
        readonly scan: 29;
        readonly extended: true;
        readonly vk: 163;
    };
    readonly rctrl: {
        readonly scan: 29;
        readonly extended: true;
        readonly vk: 163;
    };
    readonly alt: {
        readonly scan: 56;
        readonly vk: 18;
    };
    readonly altleft: {
        readonly scan: 56;
        readonly vk: 164;
    };
    readonly altright: {
        readonly scan: 56;
        readonly extended: true;
        readonly vk: 165;
    };
    readonly ralt: {
        readonly scan: 56;
        readonly extended: true;
        readonly vk: 165;
    };
    readonly altgr: {
        readonly scan: 56;
        readonly extended: true;
        readonly vk: 165;
    };
    readonly win: {
        readonly scan: 91;
        readonly extended: true;
        readonly vk: 91;
    };
    readonly winleft: {
        readonly scan: 91;
        readonly extended: true;
        readonly vk: 91;
    };
    readonly windows: {
        readonly scan: 91;
        readonly extended: true;
        readonly vk: 91;
    };
    readonly winright: {
        readonly scan: 92;
        readonly extended: true;
        readonly vk: 92;
    };
    readonly windowsright: {
        readonly scan: 92;
        readonly extended: true;
        readonly vk: 92;
    };
    readonly apps: {
        readonly scan: 93;
        readonly extended: true;
        readonly vk: 93;
    };
    readonly menu: {
        readonly scan: 93;
        readonly extended: true;
        readonly vk: 93;
    };
    readonly contextmenu: {
        readonly scan: 93;
        readonly extended: true;
        readonly vk: 93;
    };
    readonly capslock: {
        readonly scan: 58;
        readonly vk: 20;
    };
    readonly numlock: {
        readonly scan: 69;
        readonly vk: 144;
    };
    readonly scrolllock: {
        readonly scan: 70;
        readonly vk: 145;
    };
    readonly up: {
        readonly scan: 72;
        readonly extended: true;
        readonly vk: 38;
    };
    readonly down: {
        readonly scan: 80;
        readonly extended: true;
        readonly vk: 40;
    };
    readonly left: {
        readonly scan: 75;
        readonly extended: true;
        readonly vk: 37;
    };
    readonly right: {
        readonly scan: 77;
        readonly extended: true;
        readonly vk: 39;
    };
    readonly home: {
        readonly scan: 71;
        readonly extended: true;
        readonly vk: 36;
    };
    readonly end: {
        readonly scan: 79;
        readonly extended: true;
        readonly vk: 35;
    };
    readonly pageup: {
        readonly scan: 73;
        readonly extended: true;
        readonly vk: 33;
    };
    readonly pagedown: {
        readonly scan: 81;
        readonly extended: true;
        readonly vk: 34;
    };
    readonly insert: {
        readonly scan: 82;
        readonly extended: true;
        readonly vk: 45;
    };
    readonly delete: {
        readonly scan: 83;
        readonly extended: true;
        readonly vk: 46;
    };
    readonly del: {
        readonly scan: 83;
        readonly extended: true;
        readonly vk: 46;
    };
    readonly numpad0: {
        readonly scan: 82;
        readonly vk: 96;
    };
    readonly numpad1: {
        readonly scan: 79;
        readonly vk: 97;
    };
    readonly numpad2: {
        readonly scan: 80;
        readonly vk: 98;
    };
    readonly numpad3: {
        readonly scan: 81;
        readonly vk: 99;
    };
    readonly numpad4: {
        readonly scan: 75;
        readonly vk: 100;
    };
    readonly numpad5: {
        readonly scan: 76;
        readonly vk: 101;
    };
    readonly numpad6: {
        readonly scan: 77;
        readonly vk: 102;
    };
    readonly numpad7: {
        readonly scan: 71;
        readonly vk: 103;
    };
    readonly numpad8: {
        readonly scan: 72;
        readonly vk: 104;
    };
    readonly numpad9: {
        readonly scan: 73;
        readonly vk: 105;
    };
    readonly numpaddecimal: {
        readonly scan: 83;
        readonly vk: 110;
    };
    readonly numpadperiod: {
        readonly scan: 83;
        readonly vk: 110;
    };
    readonly numpaddivide: {
        readonly scan: 53;
        readonly extended: true;
        readonly vk: 111;
    };
    readonly numpadmultiply: {
        readonly scan: 55;
        readonly vk: 106;
    };
    readonly numpadsubtract: {
        readonly scan: 74;
        readonly vk: 109;
    };
    readonly numpadadd: {
        readonly scan: 78;
        readonly vk: 107;
    };
    readonly numpadenter: {
        readonly scan: 28;
        readonly extended: true;
        readonly vk: 13;
    };
    readonly num0: {
        readonly scan: 82;
        readonly vk: 96;
    };
    readonly num1: {
        readonly scan: 79;
        readonly vk: 97;
    };
    readonly num2: {
        readonly scan: 80;
        readonly vk: 98;
    };
    readonly num3: {
        readonly scan: 81;
        readonly vk: 99;
    };
    readonly num4: {
        readonly scan: 75;
        readonly vk: 100;
    };
    readonly num5: {
        readonly scan: 76;
        readonly vk: 101;
    };
    readonly num6: {
        readonly scan: 77;
        readonly vk: 102;
    };
    readonly num7: {
        readonly scan: 71;
        readonly vk: 103;
    };
    readonly num8: {
        readonly scan: 72;
        readonly vk: 104;
    };
    readonly num9: {
        readonly scan: 73;
        readonly vk: 105;
    };
    readonly volumeup: {
        readonly scan: 0;
        readonly vk: 175;
    };
    readonly volumedown: {
        readonly scan: 0;
        readonly vk: 174;
    };
    readonly volumemute: {
        readonly scan: 0;
        readonly vk: 173;
    };
    readonly mute: {
        readonly scan: 0;
        readonly vk: 173;
    };
    readonly playpause: {
        readonly scan: 0;
        readonly vk: 179;
    };
    readonly stop: {
        readonly scan: 0;
        readonly vk: 178;
    };
    readonly nexttrack: {
        readonly scan: 0;
        readonly vk: 176;
    };
    readonly previoustrack: {
        readonly scan: 0;
        readonly vk: 177;
    };
    readonly medianext: {
        readonly scan: 0;
        readonly vk: 176;
    };
    readonly mediaprevious: {
        readonly scan: 0;
        readonly vk: 177;
    };
    readonly mediaplaypause: {
        readonly scan: 0;
        readonly vk: 179;
    };
    readonly mediastop: {
        readonly scan: 0;
        readonly vk: 178;
    };
    readonly browserhome: {
        readonly scan: 0;
        readonly vk: 172;
    };
    readonly browserback: {
        readonly scan: 0;
        readonly vk: 166;
    };
    readonly browserforward: {
        readonly scan: 0;
        readonly vk: 167;
    };
    readonly browserrefresh: {
        readonly scan: 0;
        readonly vk: 168;
    };
    readonly browserstop: {
        readonly scan: 0;
        readonly vk: 169;
    };
    readonly browsersearch: {
        readonly scan: 0;
        readonly vk: 170;
    };
    readonly browserfavorites: {
        readonly scan: 0;
        readonly vk: 171;
    };
    readonly mail: {
        readonly scan: 0;
        readonly vk: 180;
    };
    readonly calculator: {
        readonly scan: 0;
        readonly vk: 183;
    };
    readonly mycomputer: {
        readonly scan: 0;
        readonly vk: 182;
    };
    readonly computer: {
        readonly scan: 0;
        readonly vk: 182;
    };
    readonly printscreen: {
        readonly scan: 55;
        readonly extended: true;
        readonly vk: 44;
    };
    readonly prtsc: {
        readonly scan: 55;
        readonly extended: true;
        readonly vk: 44;
    };
    readonly pause: {
        readonly scan: 69;
        readonly vk: 19;
    };
    readonly break: {
        readonly scan: 70;
        readonly vk: 19;
    };
    readonly sleep: {
        readonly scan: 0;
        readonly vk: 95;
    };
    readonly intl1: {
        readonly scan: 115;
    };
    readonly intl2: {
        readonly scan: 112;
    };
    readonly intl3: {
        readonly scan: 125;
    };
    readonly intl4: {
        readonly scan: 121;
    };
    readonly intl5: {
        readonly scan: 123;
    };
    readonly intl6: {
        readonly scan: 92;
    };
    readonly lang1: {
        readonly scan: 114;
    };
    readonly lang2: {
        readonly scan: 113;
    };
};
export type KeyName = keyof typeof KEYBOARD_MAPPING;
export declare const SHIFT_KEYS: Map<string, string>;
export declare const VK_TO_KEYNAME: Record<number, KeyName>;
export declare const SCAN_TO_KEYNAME: Record<number, KeyName>;
export declare const EXTENDED_SCAN_TO_KEYNAME: Record<number, KeyName>;
//# sourceMappingURL=mapping.d.ts.map