import { richMessage } from "../functions/message.js";
export function RichMessage({ children, ...options }) {
    const blocks = children === undefined ? [] : [children];
    return richMessage(options, ...blocks);
}
//# sourceMappingURL=message.js.map