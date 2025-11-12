import { MouseButton } from './buttons';
export declare function down(button?: MouseButton, _pause?: boolean): {
    get position(): {
        x: number;
        y: number;
    };
    down: typeof down;
    up: typeof up;
    click: typeof click;
    moveTo: typeof moveTo;
    moveRel: typeof moveRel;
    listener: import("./listener").Listener;
};
export declare function up(button?: MouseButton, _pause?: boolean): {
    get position(): {
        x: number;
        y: number;
    };
    down: typeof down;
    up: typeof up;
    click: typeof click;
    moveTo: typeof moveTo;
    moveRel: typeof moveRel;
    listener: import("./listener").Listener;
};
export declare function click(button?: Exclude<MouseButton, 'x1' | 'x2'>, clicks?: number, interval?: number, _pause?: boolean): {
    get position(): {
        x: number;
        y: number;
    };
    down: typeof down;
    up: typeof up;
    click: typeof click;
    moveTo: typeof moveTo;
    moveRel: typeof moveRel;
    listener: import("./listener").Listener;
};
export declare function moveTo(x?: number, y?: number, relative?: boolean, _pause?: boolean): {
    get position(): {
        x: number;
        y: number;
    };
    down: typeof down;
    up: typeof up;
    click: typeof click;
    moveTo: typeof moveTo;
    moveRel: typeof moveRel;
    listener: import("./listener").Listener;
};
export declare function moveRel(xOffset?: number, yOffset?: number, relative?: boolean, _pause?: boolean): {
    get position(): {
        x: number;
        y: number;
    };
    down: typeof down;
    up: typeof up;
    click: typeof click;
    moveTo: typeof moveTo;
    moveRel: typeof moveRel;
    listener: import("./listener").Listener;
};
export declare const move: typeof moveRel;
//# sourceMappingURL=actions.d.ts.map