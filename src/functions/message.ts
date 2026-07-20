import type { Node } from "../jsx-runtime.js";
import { node } from "../node.js";
import { assertBlockChildren, elementChildrenProps, splitOptions, type BlockInput } from "./shared.js";

export interface RichMessageOptions {
  isRtl?: boolean;
  skipEntityDetection?: boolean;
}

export function richMessage(...blocks: readonly BlockInput[]): Node<"rich-message">;
export function richMessage(options: RichMessageOptions, ...blocks: readonly BlockInput[]): Node<"rich-message">;
export function richMessage(first?: RichMessageOptions | BlockInput, ...rest: readonly BlockInput[]) {
  const [options = {}, blocks] = splitOptions<RichMessageOptions, BlockInput>(
    first, rest, "richMessage()", ["isRtl", "skipEntityDetection"],
  );
  assertBlockChildren(blocks, "richMessage()");
  return node("rich-message", { ...options, ...elementChildrenProps(blocks) });
}
