import { KEYBOARD_MAPPING } from './mapping';
import * as keyboard from './index';
export declare function down(key: keyof typeof KEYBOARD_MAPPING, _pause?: boolean): typeof keyboard;
export declare function up(key: keyof typeof KEYBOARD_MAPPING, _pause?: boolean): typeof keyboard;
export declare function press(key: keyof typeof KEYBOARD_MAPPING, presses?: number, interval?: number, _pause?: boolean): typeof keyboard;
export declare function write(message: string, interval?: number, _pause?: boolean): typeof keyboard;
//# sourceMappingURL=actions.d.ts.map