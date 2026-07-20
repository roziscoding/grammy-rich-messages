import type { RichBlockCaption, RichText } from "../types.js";
import { type BlockValue, type ListItemValue, type RichTextValue, type TableCellValue, type TableRowValue } from "../values.js";
export type OptionalNested<T> = T | boolean | null | undefined | readonly OptionalNested<T>[];
export type RichTextInput = OptionalNested<string | number | RichTextValue>;
export type BlockInput = OptionalNested<BlockValue>;
export type ListItemInput = OptionalNested<ListItemValue>;
export type TableCellInput = OptionalNested<TableCellValue>;
export type TableRowInput = OptionalNested<TableRowValue>;
export declare function flattenInputs(values: readonly unknown[]): unknown[];
export declare function richText(values: readonly unknown[], context: string): RichText;
export declare function blocks(values: readonly unknown[], context: string): BlockValue[];
export declare function listItems(values: readonly unknown[], context: string): ListItemValue[];
export declare function tableRows(values: readonly unknown[], context: string): TableRowValue[];
export declare function tableCells(values: readonly unknown[], context: string): TableCellValue[];
export declare function assertNoChildren(children: readonly unknown[], context: string): void;
export declare function splitOptions<P extends object, C>(first: P | C | undefined, rest: readonly C[], context: string, allowedKeys: readonly string[], childCategory: "rich-text" | "block" | "list-item" | "table-cell" | "table-row", allowPrimitive?: boolean): readonly [P | undefined, readonly C[]];
export declare function caption(options: {
    caption?: unknown;
    credit?: unknown;
}, context: string): RichBlockCaption | undefined;
//# sourceMappingURL=shared.d.ts.map