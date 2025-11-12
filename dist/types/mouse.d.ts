export type MouseEventMove = {
    event: 'move';
    x: number;
    y: number;
    lastX: number;
    lastY: number;
    deltaX: number;
    deltaY: number;
};
export type MouseEventButton = {
    event: 'down' | 'up';
    button: 'left' | 'right' | 'middle' | 'x1' | 'x2';
    x: number;
    y: number;
};
export type MouseEvent = MouseEventMove | MouseEventButton;
export type MouseEvents = {
    move: MouseEventMove;
    down: MouseEventButton;
    up: MouseEventButton;
};
export type MouseCallback = (ev: MouseEvent) => void;
//# sourceMappingURL=mouse.d.ts.map