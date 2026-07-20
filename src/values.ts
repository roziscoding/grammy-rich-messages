import type {
  InputRichBlock,
  RenderedRichMessage,
  RichBlockListItem,
  RichBlockTableCell,
  RichTextEntity,
} from "./types.js";

const valueKindKey = "__telegramRichMessagesValueKind" as const;
type ValueKind = "rich-text" | "block" | "list-item" | "table-cell" | "table-row" | "rich-message";
export type BrandedValue<T, K extends ValueKind> = T & { readonly __telegramRichMessagesValueKind: K };

export type RichTextValue<T extends RichTextEntity = RichTextEntity> = BrandedValue<T, "rich-text">;
export type BlockValue<T extends InputRichBlock = InputRichBlock> = BrandedValue<T, "block">;
export type ListItemValue = BrandedValue<RichBlockListItem, "list-item">;
export type TableCellValue = BrandedValue<RichBlockTableCell, "table-cell">;
export type RichMessageValue = BrandedValue<RenderedRichMessage, "rich-message">;

export interface TableRowValue {
  readonly cells: TableCellValue[];
  readonly __telegramRichMessagesValueKind: "table-row";
}

export function brand<T extends object, K extends ValueKind>(value: T, kind: K): BrandedValue<T, K> {
  Object.defineProperty(value, valueKindKey, { value: kind, enumerable: false });
  return value as BrandedValue<T, K>;
}

export function kindOf(value: unknown): ValueKind | undefined {
  return typeof value === "object" && value !== null
    ? (value as { __telegramRichMessagesValueKind?: ValueKind })[valueKindKey]
    : undefined;
}
