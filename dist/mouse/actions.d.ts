import { MouseButton } from './buttons';
import * as mouse from './index';
export declare function down(button?: MouseButton, _pause?: boolean): typeof mouse;
export declare function up(button?: MouseButton, _pause?: boolean): typeof mouse;
export declare function click(button?: Exclude<MouseButton, 'x1' | 'x2'>, clicks?: number, interval?: number, _pause?: boolean): typeof mouse;
export declare function moveTo(x?: number, y?: number, relative?: boolean, _pause?: boolean): typeof mouse;
export declare function moveRel(xOffset?: number, yOffset?: number, relative?: boolean, _pause?: boolean): typeof mouse;
export declare const move: typeof moveRel;
//# sourceMappingURL=actions.d.ts.map