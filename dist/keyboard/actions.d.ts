import { KEYBOARD_MAPPING } from './mapping';
export declare function down(key: keyof typeof KEYBOARD_MAPPING, _pause?: boolean): {
    down: typeof down;
    up: typeof up;
    tap: typeof tap;
    write: typeof write;
    listener: import("./listener").Listener;
};
export declare function up(key: keyof typeof KEYBOARD_MAPPING, _pause?: boolean): {
    down: typeof down;
    up: typeof up;
    tap: typeof tap;
    write: typeof write;
    listener: import("./listener").Listener;
};
export declare function tap(key: keyof typeof KEYBOARD_MAPPING, repeat?: number, delay?: number, _pause?: boolean): {
    down: typeof down;
    up: typeof up;
    tap: typeof tap;
    write: typeof write;
    listener: import("./listener").Listener;
};
export declare function write(message: string, delay?: number, _pause?: boolean): {
    down: typeof down;
    up: typeof up;
    tap: typeof tap;
    write: typeof write;
    listener: import("./listener").Listener;
};
//# sourceMappingURL=actions.d.ts.map