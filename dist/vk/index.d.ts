import { key2code } from './key2code';
import { name2code } from './name2code';
import { vk_infos } from './vk_infos';
export type key2codeT = typeof key2code;
export type name2codeT = typeof name2code;
export type vk_codesT = typeof vk_infos;
export declare const vk: {
    keys: ("0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "escape" | "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8" | "f9" | "f10" | "f11" | "f12" | "pause" | "backspace" | "insert" | "home" | "delete" | "end" | "tab" | "q" | "w" | "e" | "r" | "t" | "y" | "u" | "i" | "o" | "p" | "a" | "s" | "d" | "f" | "g" | "h" | "j" | "k" | "l" | "enter" | "shift" | "z" | "x" | "c" | "v" | "b" | "n" | "m" | "ctrl" | "alt" | "space" | "left" | "right" | "middle" | "x1" | "x2" | "cancel" | "clear" | "caps_lock" | "page_up" | "page_down" | "left_arrow" | "up_arrow" | "right_arrow" | "down_arrow" | "select" | "print" | "print_screen" | "help" | "left_windows" | "right_windows" | "applications" | "sleep" | "numpad_0" | "numpad_1" | "numpad_2" | "numpad_3" | "numpad_4" | "numpad_5" | "numpad_6" | "numpad_7" | "numpad_8" | "numpad_9" | "numpad_multiply" | "numpad_add" | "separator" | "numpad_subtract" | "numpad_decimal" | "numpad_divide" | "f13" | "f14" | "f15" | "f16" | "f17" | "f18" | "f19" | "f20" | "f21" | "f22" | "f23" | "f24" | "num_lock" | "scroll_lock" | "left_shift" | "right_shift" | "left_ctrl" | "right_ctrl" | "left_alt" | "right_alt" | "semicolon" | "plus" | "comma" | "minus" | "period" | "slash" | "backtick" | "left_bracket" | "backslash" | "right_bracket" | "quote" | "oem_8" | "oem_ax" | "oem_102" | "ico_help" | "ico_00" | "process_key" | "ico_clear" | "packet" | "oem_reset" | "oem_jump" | "oem_pa1" | "oem_pa2" | "oem_pa3" | "oem_wsctrl" | "oem_cusel" | "oem_attn" | "oem_finish" | "oem_copy" | "oem_auto" | "oem_enlw" | "oem_backtab" | "attn" | "crsel" | "exsel" | "ereof" | "play" | "zoom" | "noname" | "pa1" | "oem_clear")[];
    names: ("VK_LBUTTON" | "VK_RBUTTON" | "VK_CANCEL" | "VK_MBUTTON" | "VK_XBUTTON1" | "VK_XBUTTON2" | "VK_BACK" | "VK_TAB" | "VK_CLEAR" | "VK_RETURN" | "VK_SHIFT" | "VK_CONTROL" | "VK_MENU" | "VK_PAUSE" | "VK_CAPITAL" | "VK_ESCAPE" | "VK_SPACE" | "VK_PRIOR" | "VK_NEXT" | "VK_END" | "VK_HOME" | "VK_LEFT" | "VK_UP" | "VK_RIGHT" | "VK_DOWN" | "VK_SELECT" | "VK_PRINT" | "VK_SNAPSHOT" | "VK_INSERT" | "VK_DELETE" | "VK_HELP" | "VK_0" | "VK_1" | "VK_2" | "VK_3" | "VK_4" | "VK_5" | "VK_6" | "VK_7" | "VK_8" | "VK_9" | "VK_A" | "VK_B" | "VK_C" | "VK_D" | "VK_E" | "VK_F" | "VK_G" | "VK_H" | "VK_I" | "VK_J" | "VK_K" | "VK_L" | "VK_M" | "VK_N" | "VK_O" | "VK_P" | "VK_Q" | "VK_R" | "VK_S" | "VK_T" | "VK_U" | "VK_V" | "VK_W" | "VK_X" | "VK_Y" | "VK_Z" | "VK_LWIN" | "VK_RWIN" | "VK_APPS" | "VK_SLEEP" | "VK_NUMPAD0" | "VK_NUMPAD1" | "VK_NUMPAD2" | "VK_NUMPAD3" | "VK_NUMPAD4" | "VK_NUMPAD5" | "VK_NUMPAD6" | "VK_NUMPAD7" | "VK_NUMPAD8" | "VK_NUMPAD9" | "VK_MULTIPLY" | "VK_ADD" | "VK_SEPARATOR" | "VK_SUBTRACT" | "VK_DECIMAL" | "VK_DIVIDE" | "VK_F1" | "VK_F2" | "VK_F3" | "VK_F4" | "VK_F5" | "VK_F6" | "VK_F7" | "VK_F8" | "VK_F9" | "VK_F10" | "VK_F11" | "VK_F12" | "VK_F13" | "VK_F14" | "VK_F15" | "VK_F16" | "VK_F17" | "VK_F18" | "VK_F19" | "VK_F20" | "VK_F21" | "VK_F22" | "VK_F23" | "VK_F24" | "VK_NUMLOCK" | "VK_SCROLL" | "VK_LSHIFT" | "VK_RSHIFT" | "VK_LCONTROL" | "VK_RCONTROL" | "VK_LMENU" | "VK_RMENU" | "VK_OEM_1" | "VK_OEM_PLUS" | "VK_OEM_COMMA" | "VK_OEM_MINUS" | "VK_OEM_PERIOD" | "VK_OEM_2" | "VK_OEM_3" | "VK_OEM_4" | "VK_OEM_5" | "VK_OEM_6" | "VK_OEM_7" | "VK_OEM_8" | "VK_OEM_AX" | "VK_OEM_102" | "VK_ICO_HELP" | "VK_ICO_00" | "VK_PROCESSKEY" | "VK_ICO_CLEAR" | "VK_PACKET" | "VK_OEM_RESET" | "VK_OEM_JUMP" | "VK_OEM_PA1" | "VK_OEM_PA2" | "VK_OEM_PA3" | "VK_OEM_WSCTRL" | "VK_OEM_CUSEL" | "VK_OEM_ATTN" | "VK_OEM_COPY" | "VK_OEM_AUTO" | "VK_OEM_ENLW" | "VK_OEM_BACKTAB" | "VK_ATTN" | "VK_CRSEL" | "VK_EXSEL" | "VK_EREOF" | "VK_PLAY" | "VK_ZOOM" | "VK_NONAME" | "VK_PA1" | "VK_OEM_CLEAR" | "VK_OEM_FINALLY")[];
    codes: (2 | 32 | 4 | 8 | 12 | 16 | 20 | 40 | 1 | 128 | 3 | 65 | 66 | 67 | 68 | 87 | 88 | 70 | 41 | 5 | 6 | 9 | 13 | 69 | 55 | 74 | 78 | 83 | 82 | 79 | 80 | 81 | 75 | 76 | 77 | 71 | 72 | 73 | 17 | 18 | 19 | 27 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 42 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 219 | 56 | 57 | 220 | 221 | 90 | 112 | 123 | 111 | 84 | 85 | 86 | 89 | 91 | 92 | 93 | 95 | 96 | 97 | 98 | 99 | 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 124 | 125 | 126 | 127 | 129 | 130 | 131 | 132 | 133 | 134 | 135 | 144 | 145 | 160 | 161 | 162 | 163 | 164 | 165 | 186 | 187 | 188 | 189 | 190 | 191 | 192 | 222 | 223 | 225 | 226 | 227 | 228 | 229 | 230 | 231 | 233 | 234 | 235 | 236 | 237 | 238 | 239 | 240 | 241 | 242 | 243 | 244 | 245 | 246 | 247 | 248 | 249 | 250 | 251 | 252 | 253 | 254)[];
    infos: {
        readonly 1: {
            readonly name: "VK_LBUTTON";
            readonly key: "left";
            readonly description: "Left mouse button";
        };
        readonly 2: {
            readonly name: "VK_RBUTTON";
            readonly key: "right";
            readonly description: "Right mouse button";
        };
        readonly 3: {
            readonly name: "VK_CANCEL";
            readonly key: "cancel";
            readonly description: "Control-break processing";
        };
        readonly 4: {
            readonly name: "VK_MBUTTON";
            readonly key: "middle";
            readonly description: "Middle mouse button";
        };
        readonly 5: {
            readonly name: "VK_XBUTTON1";
            readonly key: "x1";
            readonly description: "X1 mouse button";
        };
        readonly 6: {
            readonly name: "VK_XBUTTON2";
            readonly key: "x2";
            readonly description: "X2 mouse button";
        };
        readonly 8: {
            readonly name: "VK_BACK";
            readonly key: "backspace";
            readonly description: "Backspace key";
        };
        readonly 9: {
            readonly name: "VK_TAB";
            readonly key: "tab";
            readonly description: "Tab key";
        };
        readonly 12: {
            readonly name: "VK_CLEAR";
            readonly key: "clear";
            readonly description: "Clear key";
        };
        readonly 13: {
            readonly name: "VK_RETURN";
            readonly key: "enter";
            readonly description: "Enter key";
        };
        readonly 16: {
            readonly name: "VK_SHIFT";
            readonly key: "shift";
            readonly description: "Shift key";
        };
        readonly 17: {
            readonly name: "VK_CONTROL";
            readonly key: "ctrl";
            readonly description: "Ctrl key";
        };
        readonly 18: {
            readonly name: "VK_MENU";
            readonly key: "alt";
            readonly description: "Alt key";
        };
        readonly 19: {
            readonly name: "VK_PAUSE";
            readonly key: "pause";
            readonly description: "Pause key";
        };
        readonly 20: {
            readonly name: "VK_CAPITAL";
            readonly key: "caps_lock";
            readonly description: "Caps Lock key";
        };
        readonly 27: {
            readonly name: "VK_ESCAPE";
            readonly key: "escape";
            readonly description: "Escape key";
        };
        readonly 32: {
            readonly name: "VK_SPACE";
            readonly key: "space";
            readonly description: "Spacebar";
        };
        readonly 33: {
            readonly name: "VK_PRIOR";
            readonly key: "page_up";
            readonly description: "Page Up key";
        };
        readonly 34: {
            readonly name: "VK_NEXT";
            readonly key: "page_down";
            readonly description: "Page Down key";
        };
        readonly 35: {
            readonly name: "VK_END";
            readonly key: "end";
            readonly description: "End key";
        };
        readonly 36: {
            readonly name: "VK_HOME";
            readonly key: "home";
            readonly description: "Home key";
        };
        readonly 37: {
            readonly name: "VK_LEFT";
            readonly key: "left_arrow";
            readonly description: "Left arrow key";
        };
        readonly 38: {
            readonly name: "VK_UP";
            readonly key: "up_arrow";
            readonly description: "Up arrow key";
        };
        readonly 39: {
            readonly name: "VK_RIGHT";
            readonly key: "right_arrow";
            readonly description: "Right arrow key";
        };
        readonly 40: {
            readonly name: "VK_DOWN";
            readonly key: "down_arrow";
            readonly description: "Down arrow key";
        };
        readonly 41: {
            readonly name: "VK_SELECT";
            readonly key: "select";
            readonly description: "Select key";
        };
        readonly 42: {
            readonly name: "VK_PRINT";
            readonly key: "print";
            readonly description: "Print key";
        };
        readonly 44: {
            readonly name: "VK_SNAPSHOT";
            readonly key: "print_screen";
            readonly description: "Print Screen key";
        };
        readonly 45: {
            readonly name: "VK_INSERT";
            readonly key: "insert";
            readonly description: "Insert key";
        };
        readonly 46: {
            readonly name: "VK_DELETE";
            readonly key: "delete";
            readonly description: "Delete key";
        };
        readonly 47: {
            readonly name: "VK_HELP";
            readonly key: "help";
            readonly description: "Help key";
        };
        readonly 48: {
            readonly name: "VK_0";
            readonly key: "0";
            readonly description: "0 key";
        };
        readonly 49: {
            readonly name: "VK_1";
            readonly key: "1";
            readonly description: "1 key";
        };
        readonly 50: {
            readonly name: "VK_2";
            readonly key: "2";
            readonly description: "2 key";
        };
        readonly 51: {
            readonly name: "VK_3";
            readonly key: "3";
            readonly description: "3 key";
        };
        readonly 52: {
            readonly name: "VK_4";
            readonly key: "4";
            readonly description: "4 key";
        };
        readonly 53: {
            readonly name: "VK_5";
            readonly key: "5";
            readonly description: "5 key";
        };
        readonly 54: {
            readonly name: "VK_6";
            readonly key: "6";
            readonly description: "6 key";
        };
        readonly 55: {
            readonly name: "VK_7";
            readonly key: "7";
            readonly description: "7 key";
        };
        readonly 56: {
            readonly name: "VK_8";
            readonly key: "8";
            readonly description: "8 key";
        };
        readonly 57: {
            readonly name: "VK_9";
            readonly key: "9";
            readonly description: "9 key";
        };
        readonly 65: {
            readonly name: "VK_A";
            readonly key: "a";
            readonly description: "A key";
        };
        readonly 66: {
            readonly name: "VK_B";
            readonly key: "b";
            readonly description: "B key";
        };
        readonly 67: {
            readonly name: "VK_C";
            readonly key: "c";
            readonly description: "C key";
        };
        readonly 68: {
            readonly name: "VK_D";
            readonly key: "d";
            readonly description: "D key";
        };
        readonly 69: {
            readonly name: "VK_E";
            readonly key: "e";
            readonly description: "E key";
        };
        readonly 70: {
            readonly name: "VK_F";
            readonly key: "f";
            readonly description: "F key";
        };
        readonly 71: {
            readonly name: "VK_G";
            readonly key: "g";
            readonly description: "G key";
        };
        readonly 72: {
            readonly name: "VK_H";
            readonly key: "h";
            readonly description: "H key";
        };
        readonly 73: {
            readonly name: "VK_I";
            readonly key: "i";
            readonly description: "I key";
        };
        readonly 74: {
            readonly name: "VK_J";
            readonly key: "j";
            readonly description: "J key";
        };
        readonly 75: {
            readonly name: "VK_K";
            readonly key: "k";
            readonly description: "K key";
        };
        readonly 76: {
            readonly name: "VK_L";
            readonly key: "l";
            readonly description: "L key";
        };
        readonly 77: {
            readonly name: "VK_M";
            readonly key: "m";
            readonly description: "M key";
        };
        readonly 78: {
            readonly name: "VK_N";
            readonly key: "n";
            readonly description: "N key";
        };
        readonly 79: {
            readonly name: "VK_O";
            readonly key: "o";
            readonly description: "O key";
        };
        readonly 80: {
            readonly name: "VK_P";
            readonly key: "p";
            readonly description: "P key";
        };
        readonly 81: {
            readonly name: "VK_Q";
            readonly key: "q";
            readonly description: "Q key";
        };
        readonly 82: {
            readonly name: "VK_R";
            readonly key: "r";
            readonly description: "R key";
        };
        readonly 83: {
            readonly name: "VK_S";
            readonly key: "s";
            readonly description: "S key";
        };
        readonly 84: {
            readonly name: "VK_T";
            readonly key: "t";
            readonly description: "T key";
        };
        readonly 85: {
            readonly name: "VK_U";
            readonly key: "u";
            readonly description: "U key";
        };
        readonly 86: {
            readonly name: "VK_V";
            readonly key: "v";
            readonly description: "V key";
        };
        readonly 87: {
            readonly name: "VK_W";
            readonly key: "w";
            readonly description: "W key";
        };
        readonly 88: {
            readonly name: "VK_X";
            readonly key: "x";
            readonly description: "X key";
        };
        readonly 89: {
            readonly name: "VK_Y";
            readonly key: "y";
            readonly description: "Y key";
        };
        readonly 90: {
            readonly name: "VK_Z";
            readonly key: "z";
            readonly description: "Z key";
        };
        readonly 91: {
            readonly name: "VK_LWIN";
            readonly key: "left_windows";
            readonly description: "Left Windows key";
        };
        readonly 92: {
            readonly name: "VK_RWIN";
            readonly key: "right_windows";
            readonly description: "Right Windows key";
        };
        readonly 93: {
            readonly name: "VK_APPS";
            readonly key: "applications";
            readonly description: "Applications key";
        };
        readonly 95: {
            readonly name: "VK_SLEEP";
            readonly key: "sleep";
            readonly description: "Computer Sleep key";
        };
        readonly 96: {
            readonly name: "VK_NUMPAD0";
            readonly key: "numpad_0";
            readonly description: "Numeric keypad 0 key";
        };
        readonly 97: {
            readonly name: "VK_NUMPAD1";
            readonly key: "numpad_1";
            readonly description: "Numeric keypad 1 key";
        };
        readonly 98: {
            readonly name: "VK_NUMPAD2";
            readonly key: "numpad_2";
            readonly description: "Numeric keypad 2 key";
        };
        readonly 99: {
            readonly name: "VK_NUMPAD3";
            readonly key: "numpad_3";
            readonly description: "Numeric keypad 3 key";
        };
        readonly 100: {
            readonly name: "VK_NUMPAD4";
            readonly key: "numpad_4";
            readonly description: "Numeric keypad 4 key";
        };
        readonly 101: {
            readonly name: "VK_NUMPAD5";
            readonly key: "numpad_5";
            readonly description: "Numeric keypad 5 key";
        };
        readonly 102: {
            readonly name: "VK_NUMPAD6";
            readonly key: "numpad_6";
            readonly description: "Numeric keypad 6 key";
        };
        readonly 103: {
            readonly name: "VK_NUMPAD7";
            readonly key: "numpad_7";
            readonly description: "Numeric keypad 7 key";
        };
        readonly 104: {
            readonly name: "VK_NUMPAD8";
            readonly key: "numpad_8";
            readonly description: "Numeric keypad 8 key";
        };
        readonly 105: {
            readonly name: "VK_NUMPAD9";
            readonly key: "numpad_9";
            readonly description: "Numeric keypad 9 key";
        };
        readonly 106: {
            readonly name: "VK_MULTIPLY";
            readonly key: "numpad_multiply";
            readonly description: "Multiply key (*)";
        };
        readonly 107: {
            readonly name: "VK_ADD";
            readonly key: "numpad_add";
            readonly description: "Add key (+)";
        };
        readonly 108: {
            readonly name: "VK_SEPARATOR";
            readonly key: "separator";
            readonly description: "Separator key";
        };
        readonly 109: {
            readonly name: "VK_SUBTRACT";
            readonly key: "numpad_subtract";
            readonly description: "Subtract key (-)";
        };
        readonly 110: {
            readonly name: "VK_DECIMAL";
            readonly key: "numpad_decimal";
            readonly description: "Decimal key (.)";
        };
        readonly 111: {
            readonly name: "VK_DIVIDE";
            readonly key: "numpad_divide";
            readonly description: "Divide key (/)";
        };
        readonly 112: {
            readonly name: "VK_F1";
            readonly key: "f1";
            readonly description: "F1 key";
        };
        readonly 113: {
            readonly name: "VK_F2";
            readonly key: "f2";
            readonly description: "F2 key";
        };
        readonly 114: {
            readonly name: "VK_F3";
            readonly key: "f3";
            readonly description: "F3 key";
        };
        readonly 115: {
            readonly name: "VK_F4";
            readonly key: "f4";
            readonly description: "F4 key";
        };
        readonly 116: {
            readonly name: "VK_F5";
            readonly key: "f5";
            readonly description: "F5 key";
        };
        readonly 117: {
            readonly name: "VK_F6";
            readonly key: "f6";
            readonly description: "F6 key";
        };
        readonly 118: {
            readonly name: "VK_F7";
            readonly key: "f7";
            readonly description: "F7 key";
        };
        readonly 119: {
            readonly name: "VK_F8";
            readonly key: "f8";
            readonly description: "F8 key";
        };
        readonly 120: {
            readonly name: "VK_F9";
            readonly key: "f9";
            readonly description: "F9 key";
        };
        readonly 121: {
            readonly name: "VK_F10";
            readonly key: "f10";
            readonly description: "F10 key";
        };
        readonly 122: {
            readonly name: "VK_F11";
            readonly key: "f11";
            readonly description: "F11 key";
        };
        readonly 123: {
            readonly name: "VK_F12";
            readonly key: "f12";
            readonly description: "F12 key";
        };
        readonly 124: {
            readonly name: "VK_F13";
            readonly key: "f13";
            readonly description: "F13 key";
        };
        readonly 125: {
            readonly name: "VK_F14";
            readonly key: "f14";
            readonly description: "F14 key";
        };
        readonly 126: {
            readonly name: "VK_F15";
            readonly key: "f15";
            readonly description: "F15 key";
        };
        readonly 127: {
            readonly name: "VK_F16";
            readonly key: "f16";
            readonly description: "F16 key";
        };
        readonly 128: {
            readonly name: "VK_F17";
            readonly key: "f17";
            readonly description: "F17 key";
        };
        readonly 129: {
            readonly name: "VK_F18";
            readonly key: "f18";
            readonly description: "F18 key";
        };
        readonly 130: {
            readonly name: "VK_F19";
            readonly key: "f19";
            readonly description: "F19 key";
        };
        readonly 131: {
            readonly name: "VK_F20";
            readonly key: "f20";
            readonly description: "F20 key";
        };
        readonly 132: {
            readonly name: "VK_F21";
            readonly key: "f21";
            readonly description: "F21 key";
        };
        readonly 133: {
            readonly name: "VK_F22";
            readonly key: "f22";
            readonly description: "F22 key";
        };
        readonly 134: {
            readonly name: "VK_F23";
            readonly key: "f23";
            readonly description: "F23 key";
        };
        readonly 135: {
            readonly name: "VK_F24";
            readonly key: "f24";
            readonly description: "F24 key";
        };
        readonly 144: {
            readonly name: "VK_NUMLOCK";
            readonly key: "num_lock";
            readonly description: "Num Lock key";
        };
        readonly 145: {
            readonly name: "VK_SCROLL";
            readonly key: "scroll_lock";
            readonly description: "Scroll Lock key";
        };
        readonly 160: {
            readonly name: "VK_LSHIFT";
            readonly key: "left_shift";
            readonly description: "Left Shift key";
        };
        readonly 161: {
            readonly name: "VK_RSHIFT";
            readonly key: "right_shift";
            readonly description: "Right Shift key";
        };
        readonly 162: {
            readonly name: "VK_LCONTROL";
            readonly key: "left_ctrl";
            readonly description: "Left Control key";
        };
        readonly 163: {
            readonly name: "VK_RCONTROL";
            readonly key: "right_ctrl";
            readonly description: "Right Control key";
        };
        readonly 164: {
            readonly name: "VK_LMENU";
            readonly key: "left_alt";
            readonly description: "Left Alt key";
        };
        readonly 165: {
            readonly name: "VK_RMENU";
            readonly key: "right_alt";
            readonly description: "Right Alt key";
        };
        readonly 186: {
            readonly name: "VK_OEM_1";
            readonly key: "semicolon";
            readonly description: "Semicolon key (;:) for US";
        };
        readonly 187: {
            readonly name: "VK_OEM_PLUS";
            readonly key: "plus";
            readonly description: "Plus key (+)";
        };
        readonly 188: {
            readonly name: "VK_OEM_COMMA";
            readonly key: "comma";
            readonly description: "Comma key (,)";
        };
        readonly 189: {
            readonly name: "VK_OEM_MINUS";
            readonly key: "minus";
            readonly description: "Minus key (-)";
        };
        readonly 190: {
            readonly name: "VK_OEM_PERIOD";
            readonly key: "period";
            readonly description: "Period key (.)";
        };
        readonly 191: {
            readonly name: "VK_OEM_2";
            readonly key: "slash";
            readonly description: "Slash key (/?)";
        };
        readonly 192: {
            readonly name: "VK_OEM_3";
            readonly key: "backtick";
            readonly description: "Backtick key (`~)";
        };
        readonly 219: {
            readonly name: "VK_OEM_4";
            readonly key: "left_bracket";
            readonly description: "Left bracket key ([{)";
        };
        readonly 220: {
            readonly name: "VK_OEM_5";
            readonly key: "backslash";
            readonly description: "Backslash key (\\|)";
        };
        readonly 221: {
            readonly name: "VK_OEM_6";
            readonly key: "right_bracket";
            readonly description: "Right bracket key (]})";
        };
        readonly 222: {
            readonly name: "VK_OEM_7";
            readonly key: "quote";
            readonly description: "Quote key ('\")";
        };
        readonly 223: {
            readonly name: "VK_OEM_8";
            readonly key: "oem_8";
            readonly description: "OEM specific key";
        };
        readonly 225: {
            readonly name: "VK_OEM_AX";
            readonly key: "oem_ax";
            readonly description: "Japanese AX key";
        };
        readonly 226: {
            readonly name: "VK_OEM_102";
            readonly key: "oem_102";
            readonly description: "RT 102-key keyboard key";
        };
        readonly 227: {
            readonly name: "VK_ICO_HELP";
            readonly key: "ico_help";
            readonly description: "ICO Help key";
        };
        readonly 228: {
            readonly name: "VK_ICO_00";
            readonly key: "ico_00";
            readonly description: "ICO 00 key";
        };
        readonly 229: {
            readonly name: "VK_PROCESSKEY";
            readonly key: "process_key";
            readonly description: "Process key";
        };
        readonly 230: {
            readonly name: "VK_ICO_CLEAR";
            readonly key: "ico_clear";
            readonly description: "ICO Clear key";
        };
        readonly 231: {
            readonly name: "VK_PACKET";
            readonly key: "packet";
            readonly description: "Unicode character packet";
        };
        readonly 233: {
            readonly name: "VK_OEM_RESET";
            readonly key: "oem_reset";
            readonly description: "OEM Reset key";
        };
        readonly 234: {
            readonly name: "VK_OEM_JUMP";
            readonly key: "oem_jump";
            readonly description: "OEM Jump key";
        };
        readonly 235: {
            readonly name: "VK_OEM_PA1";
            readonly key: "oem_pa1";
            readonly description: "OEM PA1 key";
        };
        readonly 236: {
            readonly name: "VK_OEM_PA2";
            readonly key: "oem_pa2";
            readonly description: "OEM PA2 key";
        };
        readonly 237: {
            readonly name: "VK_OEM_PA3";
            readonly key: "oem_pa3";
            readonly description: "OEM PA3 key";
        };
        readonly 238: {
            readonly name: "VK_OEM_WSCTRL";
            readonly key: "oem_wsctrl";
            readonly description: "OEM WSCTRL key";
        };
        readonly 239: {
            readonly name: "VK_OEM_CUSEL";
            readonly key: "oem_cusel";
            readonly description: "OEM CUSEL key";
        };
        readonly 240: {
            readonly name: "VK_OEM_ATTN";
            readonly key: "oem_attn";
            readonly description: "OEM ATTN key";
        };
        readonly 241: {
            readonly name: "VK_OEM_FINISH";
            readonly key: "oem_finish";
            readonly description: "OEM Finish key";
        };
        readonly 242: {
            readonly name: "VK_OEM_COPY";
            readonly key: "oem_copy";
            readonly description: "OEM Copy key";
        };
        readonly 243: {
            readonly name: "VK_OEM_AUTO";
            readonly key: "oem_auto";
            readonly description: "OEM Auto key";
        };
        readonly 244: {
            readonly name: "VK_OEM_ENLW";
            readonly key: "oem_enlw";
            readonly description: "OEM ENLW key";
        };
        readonly 245: {
            readonly name: "VK_OEM_BACKTAB";
            readonly key: "oem_backtab";
            readonly description: "OEM Backtab key";
        };
        readonly 246: {
            readonly name: "VK_ATTN";
            readonly key: "attn";
            readonly description: "Attn key";
        };
        readonly 247: {
            readonly name: "VK_CRSEL";
            readonly key: "crsel";
            readonly description: "CrSel key";
        };
        readonly 248: {
            readonly name: "VK_EXSEL";
            readonly key: "exsel";
            readonly description: "ExSel key";
        };
        readonly 249: {
            readonly name: "VK_EREOF";
            readonly key: "ereof";
            readonly description: "Erase EOF key";
        };
        readonly 250: {
            readonly name: "VK_PLAY";
            readonly key: "play";
            readonly description: "Play key";
        };
        readonly 251: {
            readonly name: "VK_ZOOM";
            readonly key: "zoom";
            readonly description: "Zoom key";
        };
        readonly 252: {
            readonly name: "VK_NONAME";
            readonly key: "noname";
            readonly description: "Reserved";
        };
        readonly 253: {
            readonly name: "VK_PA1";
            readonly key: "pa1";
            readonly description: "PA1 key";
        };
        readonly 254: {
            readonly name: "VK_OEM_CLEAR";
            readonly key: "oem_clear";
            readonly description: "OEM Clear key";
        };
    };
    key2code: {
        readonly left: 1;
        readonly right: 2;
        readonly cancel: 3;
        readonly middle: 4;
        readonly x1: 5;
        readonly x2: 6;
        readonly backspace: 8;
        readonly tab: 9;
        readonly clear: 12;
        readonly enter: 13;
        readonly shift: 16;
        readonly ctrl: 17;
        readonly alt: 18;
        readonly pause: 19;
        readonly caps_lock: 20;
        readonly escape: 27;
        readonly space: 57;
        readonly page_up: 33;
        readonly page_down: 34;
        readonly end: 35;
        readonly home: 36;
        readonly left_arrow: 37;
        readonly up_arrow: 38;
        readonly right_arrow: 39;
        readonly down_arrow: 40;
        readonly select: 41;
        readonly print: 42;
        readonly print_screen: 44;
        readonly insert: 45;
        readonly delete: 46;
        readonly help: 47;
        readonly '0': 48;
        readonly '1': 49;
        readonly '2': 50;
        readonly '3': 51;
        readonly '4': 52;
        readonly '5': 53;
        readonly '6': 54;
        readonly '7': 55;
        readonly '8': 56;
        readonly '9': 57;
        readonly a: 65;
        readonly b: 66;
        readonly c: 67;
        readonly d: 68;
        readonly e: 69;
        readonly f: 70;
        readonly g: 71;
        readonly h: 72;
        readonly i: 73;
        readonly j: 74;
        readonly k: 75;
        readonly l: 76;
        readonly m: 77;
        readonly n: 78;
        readonly o: 79;
        readonly p: 80;
        readonly q: 81;
        readonly r: 82;
        readonly s: 83;
        readonly t: 84;
        readonly u: 85;
        readonly v: 86;
        readonly w: 87;
        readonly x: 88;
        readonly y: 89;
        readonly z: 90;
        readonly left_windows: 91;
        readonly right_windows: 92;
        readonly applications: 93;
        readonly sleep: 95;
        readonly numpad_0: 96;
        readonly numpad_1: 97;
        readonly numpad_2: 98;
        readonly numpad_3: 99;
        readonly numpad_4: 100;
        readonly numpad_5: 101;
        readonly numpad_6: 102;
        readonly numpad_7: 103;
        readonly numpad_8: 104;
        readonly numpad_9: 105;
        readonly numpad_multiply: 106;
        readonly numpad_add: 107;
        readonly separator: 108;
        readonly numpad_subtract: 109;
        readonly numpad_decimal: 110;
        readonly numpad_divide: 111;
        readonly f1: 112;
        readonly f2: 113;
        readonly f3: 114;
        readonly f4: 115;
        readonly f5: 116;
        readonly f6: 117;
        readonly f7: 118;
        readonly f8: 119;
        readonly f9: 120;
        readonly f10: 121;
        readonly f11: 122;
        readonly f12: 123;
        readonly f13: 124;
        readonly f14: 125;
        readonly f15: 126;
        readonly f16: 127;
        readonly f17: 128;
        readonly f18: 129;
        readonly f19: 130;
        readonly f20: 131;
        readonly f21: 132;
        readonly f22: 133;
        readonly f23: 134;
        readonly f24: 135;
        readonly num_lock: 144;
        readonly scroll_lock: 145;
        readonly left_shift: 160;
        readonly right_shift: 161;
        readonly left_ctrl: 162;
        readonly right_ctrl: 163;
        readonly left_alt: 164;
        readonly right_alt: 165;
        readonly semicolon: 186;
        readonly plus: 187;
        readonly comma: 188;
        readonly minus: 189;
        readonly period: 190;
        readonly slash: 191;
        readonly backtick: 192;
        readonly left_bracket: 219;
        readonly backslash: 220;
        readonly right_bracket: 221;
        readonly quote: 222;
        readonly oem_8: 223;
        readonly oem_ax: 225;
        readonly oem_102: 226;
        readonly ico_help: 227;
        readonly ico_00: 228;
        readonly process_key: 229;
        readonly ico_clear: 230;
        readonly packet: 231;
        readonly oem_reset: 233;
        readonly oem_jump: 234;
        readonly oem_pa1: 235;
        readonly oem_pa2: 236;
        readonly oem_pa3: 237;
        readonly oem_wsctrl: 238;
        readonly oem_cusel: 239;
        readonly oem_attn: 240;
        readonly oem_finish: 241;
        readonly oem_copy: 242;
        readonly oem_auto: 243;
        readonly oem_enlw: 244;
        readonly oem_backtab: 245;
        readonly attn: 246;
        readonly crsel: 247;
        readonly exsel: 248;
        readonly ereof: 249;
        readonly play: 250;
        readonly zoom: 251;
        readonly noname: 252;
        readonly pa1: 253;
        readonly oem_clear: 254;
    };
    name2code: {
        readonly VK_LBUTTON: 1;
        readonly VK_RBUTTON: 2;
        readonly VK_CANCEL: 3;
        readonly VK_MBUTTON: 4;
        readonly VK_XBUTTON1: 5;
        readonly VK_XBUTTON2: 6;
        readonly VK_BACK: 8;
        readonly VK_TAB: 9;
        readonly VK_CLEAR: 12;
        readonly VK_RETURN: 13;
        readonly VK_SHIFT: 16;
        readonly VK_CONTROL: 17;
        readonly VK_MENU: 18;
        readonly VK_PAUSE: 19;
        readonly VK_CAPITAL: 20;
        readonly VK_ESCAPE: 27;
        readonly VK_SPACE: 32;
        readonly VK_PRIOR: 33;
        readonly VK_NEXT: 34;
        readonly VK_END: 35;
        readonly VK_HOME: 36;
        readonly VK_LEFT: 37;
        readonly VK_UP: 38;
        readonly VK_RIGHT: 39;
        readonly VK_DOWN: 40;
        readonly VK_SELECT: 41;
        readonly VK_PRINT: 42;
        readonly VK_SNAPSHOT: 44;
        readonly VK_INSERT: 45;
        readonly VK_DELETE: 46;
        readonly VK_HELP: 47;
        readonly VK_0: 48;
        readonly VK_1: 49;
        readonly VK_2: 50;
        readonly VK_3: 51;
        readonly VK_4: 52;
        readonly VK_5: 53;
        readonly VK_6: 54;
        readonly VK_7: 55;
        readonly VK_8: 56;
        readonly VK_9: 57;
        readonly VK_A: 65;
        readonly VK_B: 66;
        readonly VK_C: 67;
        readonly VK_D: 68;
        readonly VK_E: 69;
        readonly VK_F: 70;
        readonly VK_G: 71;
        readonly VK_H: 72;
        readonly VK_I: 73;
        readonly VK_J: 74;
        readonly VK_K: 75;
        readonly VK_L: 76;
        readonly VK_M: 77;
        readonly VK_N: 78;
        readonly VK_O: 79;
        readonly VK_P: 80;
        readonly VK_Q: 81;
        readonly VK_R: 82;
        readonly VK_S: 83;
        readonly VK_T: 84;
        readonly VK_U: 85;
        readonly VK_V: 86;
        readonly VK_W: 87;
        readonly VK_X: 88;
        readonly VK_Y: 89;
        readonly VK_Z: 90;
        readonly VK_LWIN: 91;
        readonly VK_RWIN: 92;
        readonly VK_APPS: 93;
        readonly VK_SLEEP: 95;
        readonly VK_NUMPAD0: 96;
        readonly VK_NUMPAD1: 97;
        readonly VK_NUMPAD2: 98;
        readonly VK_NUMPAD3: 99;
        readonly VK_NUMPAD4: 100;
        readonly VK_NUMPAD5: 101;
        readonly VK_NUMPAD6: 102;
        readonly VK_NUMPAD7: 103;
        readonly VK_NUMPAD8: 104;
        readonly VK_NUMPAD9: 105;
        readonly VK_MULTIPLY: 106;
        readonly VK_ADD: 107;
        readonly VK_SEPARATOR: 108;
        readonly VK_SUBTRACT: 109;
        readonly VK_DECIMAL: 110;
        readonly VK_DIVIDE: 111;
        readonly VK_F1: 112;
        readonly VK_F2: 113;
        readonly VK_F3: 114;
        readonly VK_F4: 115;
        readonly VK_F5: 116;
        readonly VK_F6: 117;
        readonly VK_F7: 118;
        readonly VK_F8: 119;
        readonly VK_F9: 120;
        readonly VK_F10: 121;
        readonly VK_F11: 122;
        readonly VK_F12: 123;
        readonly VK_F13: 124;
        readonly VK_F14: 125;
        readonly VK_F15: 126;
        readonly VK_F16: 127;
        readonly VK_F17: 128;
        readonly VK_F18: 129;
        readonly VK_F19: 130;
        readonly VK_F20: 131;
        readonly VK_F21: 132;
        readonly VK_F22: 133;
        readonly VK_F23: 134;
        readonly VK_F24: 135;
        readonly VK_NUMLOCK: 144;
        readonly VK_SCROLL: 145;
        readonly VK_LSHIFT: 160;
        readonly VK_RSHIFT: 161;
        readonly VK_LCONTROL: 162;
        readonly VK_RCONTROL: 163;
        readonly VK_LMENU: 164;
        readonly VK_RMENU: 165;
        readonly VK_OEM_1: 186;
        readonly VK_OEM_PLUS: 187;
        readonly VK_OEM_COMMA: 188;
        readonly VK_OEM_MINUS: 189;
        readonly VK_OEM_PERIOD: 190;
        readonly VK_OEM_2: 191;
        readonly VK_OEM_3: 192;
        readonly VK_OEM_4: 219;
        readonly VK_OEM_5: 220;
        readonly VK_OEM_6: 221;
        readonly VK_OEM_7: 222;
        readonly VK_OEM_8: 223;
        readonly VK_OEM_AX: 225;
        readonly VK_OEM_102: 226;
        readonly VK_ICO_HELP: 227;
        readonly VK_ICO_00: 228;
        readonly VK_PROCESSKEY: 229;
        readonly VK_ICO_CLEAR: 230;
        readonly VK_PACKET: 231;
        readonly VK_OEM_RESET: 233;
        readonly VK_OEM_JUMP: 234;
        readonly VK_OEM_PA1: 235;
        readonly VK_OEM_PA2: 236;
        readonly VK_OEM_PA3: 237;
        readonly VK_OEM_WSCTRL: 238;
        readonly VK_OEM_CUSEL: 239;
        readonly VK_OEM_ATTN: 240;
        readonly VK_OEM_FINALLY: 241;
        readonly VK_OEM_COPY: 242;
        readonly VK_OEM_AUTO: 243;
        readonly VK_OEM_ENLW: 244;
        readonly VK_OEM_BACKTAB: 245;
        readonly VK_ATTN: 246;
        readonly VK_CRSEL: 247;
        readonly VK_EXSEL: 248;
        readonly VK_EREOF: 249;
        readonly VK_PLAY: 250;
        readonly VK_ZOOM: 251;
        readonly VK_NONAME: 252;
        readonly VK_PA1: 253;
        readonly VK_OEM_CLEAR: 254;
    };
};
//# sourceMappingURL=index.d.ts.map