import type { Node } from "../jsx-runtime.js";
import { type BlockInput } from "./shared.js";
export interface RichMessageOptions {
    isRtl?: boolean;
    skipEntityDetection?: boolean;
}
export declare function richMessage(...blocks: readonly BlockInput[]): Node<"rich-message">;
export declare function richMessage(options: RichMessageOptions, ...blocks: readonly BlockInput[]): Node<"rich-message">;
//# sourceMappingURL=message.d.ts.map