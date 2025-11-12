import * as actions from './actions';
import { Listener } from './listener';
declare class Mouse {
    get position(): {
        x: number;
        y: number;
    };
    down: typeof actions.down;
    up: typeof actions.up;
    click: typeof actions.click;
    moveTo: typeof actions.moveTo;
    moveRel: typeof actions.moveRel;
    listener: Listener;
}
export declare const mouse: Mouse;
export {};
//# sourceMappingURL=class.d.ts.map