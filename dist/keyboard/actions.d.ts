import { KEYBOARD_MAPPING } from './mapping';
export declare function down(key: keyof typeof KEYBOARD_MAPPING, _pause?: boolean): {
    down: typeof down;
    up: typeof up;
    press: typeof press;
    write: typeof write;
    listener: import("./listener").Listener;
};
export declare function up(key: keyof typeof KEYBOARD_MAPPING, _pause?: boolean): {
    down: typeof down;
    up: typeof up;
    press: typeof press;
    write: typeof write;
    listener: import("./listener").Listener;
};
export declare function press(key: keyof typeof KEYBOARD_MAPPING, presses?: number, interval?: number, _pause?: boolean): {
    down: typeof down;
    up: typeof up;
    press: typeof press;
    write: typeof write;
    listener: import("./listener").Listener;
};
export declare function write(message: string, interval?: number, _pause?: boolean): {
    down: typeof down;
    up: typeof up;
    press: typeof press;
    write: typeof write;
    listener: import("./listener").Listener;
};
//# sourceMappingURL=actions.d.ts.map