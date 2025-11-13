import * as actions from './actions';
import { Listener } from './listener';
declare class Mouse {
    get position(): {
        x: number;
        y: number;
    };
    press: typeof actions.press;
    release: typeof actions.release;
    click: typeof actions.click;
    moveTo: typeof actions.moveTo;
    moveRel: typeof actions.moveRel;
    isPressed: typeof actions.isPressed;
    dragTo: typeof actions.dragTo;
    dragRel: typeof actions.dragRel;
    scroll: typeof actions.scroll;
    smoothMoveTo: typeof actions.smoothMoveTo;
    hold: typeof actions.hold;
    clickAt: typeof actions.clickAt;
    isAtPosition: typeof actions.isAtPosition;
    waitForPosition: typeof actions.waitForPosition;
    listener: Listener;
}
export declare const mouse: Mouse;
export {};
//# sourceMappingURL=class.d.ts.map