import * as actions from './actions';
import { Listener } from './listener';
declare class Keyboard {
    press: typeof actions.press;
    release: typeof actions.release;
    tap: typeof actions.tap;
    repeatTap: typeof actions.repeatTap;
    write: typeof actions.write;
    isPressed: typeof actions.isPressed;
    hotkey: typeof actions.hotkey;
    hold: typeof actions.hold;
    isAnyPressed: typeof actions.isAnyPressed;
    areAllPressed: typeof actions.areAllPressed;
    waitForPress: typeof actions.waitForPress;
    waitForRelease: typeof actions.waitForRelease;
    toggleKey: typeof actions.toggleKey;
    getKeyState: typeof actions.getKeyState;
    releaseAll: typeof actions.releaseAll;
    listener: Listener;
}
export declare const keyboard: Keyboard;
export {};
//# sourceMappingURL=class.d.ts.map