import { type RichMessageValue } from "../values.js";
import { type BlockInput } from "./shared.js";
export interface RichMessageOptions {
    isRtl?: boolean;
    skipEntityDetection?: boolean;
}
export declare function richMessage(...children: readonly BlockInput[]): RichMessageValue;
export declare function richMessage(options: RichMessageOptions, ...children: readonly BlockInput[]): RichMessageValue;
//# sourceMappingURL=message.d.ts.map