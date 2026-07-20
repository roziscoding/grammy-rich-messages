import type { BlockNodeKind, Node, RichTextNodeKind } from "../jsx-runtime.js";
export declare function expectRichText(value: unknown): Node<RichTextNodeKind>;
export declare function expectBlock(value: unknown): Node<BlockNodeKind>;
export declare function expectListItem(value: unknown): Node<"list-item">;
export declare function expectTableRow(value: unknown): Node<"table-row">;
export declare function expectTableCell(value: unknown): Node<"table-cell">;
//# sourceMappingURL=guards.d.ts.map