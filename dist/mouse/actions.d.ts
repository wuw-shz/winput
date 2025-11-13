import { MouseButton } from './buttons';
export declare function press(button?: MouseButton, _pause?: boolean): {
    get position(): {
        x: number;
        y: number;
    };
    press: typeof press;
    release: typeof release;
    click: typeof click;
    moveTo: typeof moveTo;
    moveRel: typeof moveRel;
    isPressed: typeof isPressed;
    dragTo: typeof dragTo;
    dragRel: typeof dragRel;
    scroll: typeof scroll;
    smoothMoveTo: typeof smoothMoveTo;
    hold: typeof hold;
    clickAt: typeof clickAt;
    isAtPosition: typeof isAtPosition;
    waitForPosition: typeof waitForPosition;
    listener: import("./listener").Listener;
};
export declare function release(button?: MouseButton, _pause?: boolean): {
    get position(): {
        x: number;
        y: number;
    };
    press: typeof press;
    release: typeof release;
    click: typeof click;
    moveTo: typeof moveTo;
    moveRel: typeof moveRel;
    isPressed: typeof isPressed;
    dragTo: typeof dragTo;
    dragRel: typeof dragRel;
    scroll: typeof scroll;
    smoothMoveTo: typeof smoothMoveTo;
    hold: typeof hold;
    clickAt: typeof clickAt;
    isAtPosition: typeof isAtPosition;
    waitForPosition: typeof waitForPosition;
    listener: import("./listener").Listener;
};
export declare function click(button?: Exclude<MouseButton, 'x1' | 'x2'>, repeat?: number, delay?: number, _pause?: boolean): {
    get position(): {
        x: number;
        y: number;
    };
    press: typeof press;
    release: typeof release;
    click: typeof click;
    moveTo: typeof moveTo;
    moveRel: typeof moveRel;
    isPressed: typeof isPressed;
    dragTo: typeof dragTo;
    dragRel: typeof dragRel;
    scroll: typeof scroll;
    smoothMoveTo: typeof smoothMoveTo;
    hold: typeof hold;
    clickAt: typeof clickAt;
    isAtPosition: typeof isAtPosition;
    waitForPosition: typeof waitForPosition;
    listener: import("./listener").Listener;
};
export declare function moveTo(x?: number, y?: number, relative?: boolean, _pause?: boolean): {
    get position(): {
        x: number;
        y: number;
    };
    press: typeof press;
    release: typeof release;
    click: typeof click;
    moveTo: typeof moveTo;
    moveRel: typeof moveRel;
    isPressed: typeof isPressed;
    dragTo: typeof dragTo;
    dragRel: typeof dragRel;
    scroll: typeof scroll;
    smoothMoveTo: typeof smoothMoveTo;
    hold: typeof hold;
    clickAt: typeof clickAt;
    isAtPosition: typeof isAtPosition;
    waitForPosition: typeof waitForPosition;
    listener: import("./listener").Listener;
};
export declare function moveRel(xOffset?: number, yOffset?: number, relative?: boolean, _pause?: boolean): {
    get position(): {
        x: number;
        y: number;
    };
    press: typeof press;
    release: typeof release;
    click: typeof click;
    moveTo: typeof moveTo;
    moveRel: typeof moveRel;
    isPressed: typeof isPressed;
    dragTo: typeof dragTo;
    dragRel: typeof dragRel;
    scroll: typeof scroll;
    smoothMoveTo: typeof smoothMoveTo;
    hold: typeof hold;
    clickAt: typeof clickAt;
    isAtPosition: typeof isAtPosition;
    waitForPosition: typeof waitForPosition;
    listener: import("./listener").Listener;
};
export declare const move: typeof moveRel;
export declare function isPressed(button: MouseButton): boolean;
export declare function dragTo(x: number, y: number, button?: Exclude<MouseButton, 'x1' | 'x2'>, duration?: number, _pause?: boolean): {
    get position(): {
        x: number;
        y: number;
    };
    press: typeof press;
    release: typeof release;
    click: typeof click;
    moveTo: typeof moveTo;
    moveRel: typeof moveRel;
    isPressed: typeof isPressed;
    dragTo: typeof dragTo;
    dragRel: typeof dragRel;
    scroll: typeof scroll;
    smoothMoveTo: typeof smoothMoveTo;
    hold: typeof hold;
    clickAt: typeof clickAt;
    isAtPosition: typeof isAtPosition;
    waitForPosition: typeof waitForPosition;
    listener: import("./listener").Listener;
};
export declare function dragRel(xOffset: number, yOffset: number, button?: Exclude<MouseButton, 'x1' | 'x2'>, duration?: number, _pause?: boolean): {
    get position(): {
        x: number;
        y: number;
    };
    press: typeof press;
    release: typeof release;
    click: typeof click;
    moveTo: typeof moveTo;
    moveRel: typeof moveRel;
    isPressed: typeof isPressed;
    dragTo: typeof dragTo;
    dragRel: typeof dragRel;
    scroll: typeof scroll;
    smoothMoveTo: typeof smoothMoveTo;
    hold: typeof hold;
    clickAt: typeof clickAt;
    isAtPosition: typeof isAtPosition;
    waitForPosition: typeof waitForPosition;
    listener: import("./listener").Listener;
};
export declare function scroll(clicks: number, direction?: 'vertical' | 'horizontal', _pause?: boolean): {
    get position(): {
        x: number;
        y: number;
    };
    press: typeof press;
    release: typeof release;
    click: typeof click;
    moveTo: typeof moveTo;
    moveRel: typeof moveRel;
    isPressed: typeof isPressed;
    dragTo: typeof dragTo;
    dragRel: typeof dragRel;
    scroll: typeof scroll;
    smoothMoveTo: typeof smoothMoveTo;
    hold: typeof hold;
    clickAt: typeof clickAt;
    isAtPosition: typeof isAtPosition;
    waitForPosition: typeof waitForPosition;
    listener: import("./listener").Listener;
};
declare const easingFunctions: {
    linear: (t: number) => number;
    easeInQuad: (t: number) => number;
    easeOutQuad: (t: number) => number;
    easeInOutQuad: (t: number) => number;
    easeInCubic: (t: number) => number;
    easeOutCubic: (t: number) => number;
    easeInOutCubic: (t: number) => number;
};
export type EasingFunction = keyof typeof easingFunctions;
export declare function smoothMoveTo(x: number, y: number, duration?: number, // seconds
easing?: EasingFunction, _pause?: boolean): Promise<{
    get position(): {
        x: number;
        y: number;
    };
    press: typeof press;
    release: typeof release;
    click: typeof click;
    moveTo: typeof moveTo;
    moveRel: typeof moveRel;
    isPressed: typeof isPressed;
    dragTo: typeof dragTo;
    dragRel: typeof dragRel;
    scroll: typeof scroll;
    smoothMoveTo: typeof smoothMoveTo;
    hold: typeof hold;
    clickAt: typeof clickAt;
    isAtPosition: typeof isAtPosition;
    waitForPosition: typeof waitForPosition;
    listener: import("./listener").Listener;
}>;
export declare function hold(button: MouseButton, duration: number, // seconds
_pause?: boolean): {
    get position(): {
        x: number;
        y: number;
    };
    press: typeof press;
    release: typeof release;
    click: typeof click;
    moveTo: typeof moveTo;
    moveRel: typeof moveRel;
    isPressed: typeof isPressed;
    dragTo: typeof dragTo;
    dragRel: typeof dragRel;
    scroll: typeof scroll;
    smoothMoveTo: typeof smoothMoveTo;
    hold: typeof hold;
    clickAt: typeof clickAt;
    isAtPosition: typeof isAtPosition;
    waitForPosition: typeof waitForPosition;
    listener: import("./listener").Listener;
};
export declare function clickAt(x: number, y: number, button?: Exclude<MouseButton, 'x1' | 'x2'>, _pause?: boolean): {
    get position(): {
        x: number;
        y: number;
    };
    press: typeof press;
    release: typeof release;
    click: typeof click;
    moveTo: typeof moveTo;
    moveRel: typeof moveRel;
    isPressed: typeof isPressed;
    dragTo: typeof dragTo;
    dragRel: typeof dragRel;
    scroll: typeof scroll;
    smoothMoveTo: typeof smoothMoveTo;
    hold: typeof hold;
    clickAt: typeof clickAt;
    isAtPosition: typeof isAtPosition;
    waitForPosition: typeof waitForPosition;
    listener: import("./listener").Listener;
};
export declare function isAtPosition(x: number, y: number, tolerance?: number): boolean;
export declare function waitForPosition(x: number, y: number, timeout?: number, // milliseconds
tolerance?: number): Promise<boolean>;
export declare function waitForPress(button: MouseButton, timeout?: number): Promise<boolean>;
export declare function waitForRelease(button: MouseButton, timeout?: number): Promise<boolean>;
export {};
//# sourceMappingURL=actions.d.ts.map