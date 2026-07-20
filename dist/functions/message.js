import { node } from "../node.js";
import { assertBlockChildren, elementChildrenProps, splitOptions } from "./shared.js";
export function richMessage(first, ...rest) {
    const [options = {}, blocks] = splitOptions(first, rest, "richMessage()", ["isRtl", "skipEntityDetection"]);
    assertBlockChildren(blocks, "richMessage()");
    return node("rich-message", { ...options, ...elementChildrenProps(blocks) });
}
//# sourceMappingURL=message.js.map