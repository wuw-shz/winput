import { ImageData } from "../types/image";
import { Image } from "./class";
export declare function loadImage(path: string): Promise<Image | null>;
export declare function saveImage(img: Image | ImageData, path?: string): Promise<boolean>;
//# sourceMappingURL=actions.d.ts.map