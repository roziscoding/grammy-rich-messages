import { richMessage, type RichMessageOptions } from "../functions/message.js";
import type { BlockInput } from "../functions/blocks.js";
import type { ElementChildrenProps } from "./shared.js";

export function RichMessage({ children, ...options }: ElementChildrenProps & { isRtl?: boolean; skipEntityDetection?: boolean }) {
  const blocks = children === undefined ? [] : [children as BlockInput];
  return richMessage(options as RichMessageOptions, ...blocks);
}
