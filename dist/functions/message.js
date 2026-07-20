import { brand } from "../values.js";
import { blocks, splitOptions } from "./shared.js";
export function richMessage(first, ...rest) {
    const [options = {}, children] = splitOptions(first, rest, "richMessage()", ["isRtl", "skipEntityDetection"], "block");
    const value = {
        blocks: blocks(children, "richMessage()"),
        ...(options.isRtl === true ? { is_rtl: true } : {}),
        ...(options.skipEntityDetection === true ? { skip_entity_detection: true } : {}),
    };
    return brand(value, "rich-message");
}
//# sourceMappingURL=message.js.map