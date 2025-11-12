import * as actions from './actions';
import { Listener } from './listener';
declare class Keyboard {
    down: typeof actions.down;
    up: typeof actions.up;
    tap: typeof actions.tap;
    write: typeof actions.write;
    listener: Listener;
}
export declare const keyboard: Keyboard;
export {};
//# sourceMappingURL=class.d.ts.map