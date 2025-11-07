import { LEFT, MIDDLE, RIGHT, PRIMARY, SECONDARY, X1, X2 } from './constants';
export { LEFT, MIDDLE, RIGHT, PRIMARY, SECONDARY, X1, X2 };
export declare function mouseDown(x?: number, y?: number, button?: string, _pause?: boolean): void;
export declare function mouseUp(x?: number, y?: number, button?: string, _pause?: boolean): void;
export declare function click(x?: number, y?: number, clicks?: number, interval?: number, button?: string, _pause?: boolean): void;
export declare function leftClick(x?: number, y?: number, interval?: number, _pause?: boolean): void;
export declare function rightClick(x?: number, y?: number, interval?: number, _pause?: boolean): void;
export declare function middleClick(x?: number, y?: number, interval?: number, _pause?: boolean): void;
export declare function doubleClick(x?: number, y?: number, interval?: number, button?: string, _pause?: boolean): void;
export declare function tripleClick(x?: number, y?: number, interval?: number, button?: string, _pause?: boolean): void;
export declare function moveTo(x?: number, y?: number, _pause?: boolean, relative?: boolean): void;
export declare function moveRel(xOffset?: number, yOffset?: number, _pause?: boolean, relative?: boolean): void;
export declare const move: typeof moveRel;
//# sourceMappingURL=mouse.d.ts.map