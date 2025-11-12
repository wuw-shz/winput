import * as mouse from './index';
export declare function down(x?: number, y?: number, button?: string, _pause?: boolean): typeof mouse;
export declare function up(x?: number, y?: number, button?: string, _pause?: boolean): typeof mouse;
export declare function click(x?: number, y?: number, clicks?: number, interval?: number, button?: string, _pause?: boolean): typeof mouse;
export declare function moveTo(x?: number, y?: number, _pause?: boolean, relative?: boolean): typeof mouse;
export declare function moveRel(xOffset?: number, yOffset?: number, _pause?: boolean, relative?: boolean): typeof mouse;
export declare const move: typeof moveRel;
//# sourceMappingURL=actions.d.ts.map