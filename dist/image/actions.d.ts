import { ImageBuffer } from "../types/image";
import { ImageProcessor } from "./class";
export declare function loadImage(path: string): Promise<ImageProcessor | null>;
export declare function saveImage(img: ImageBuffer, path?: string): Promise<boolean>;
//# sourceMappingURL=actions.d.ts.map