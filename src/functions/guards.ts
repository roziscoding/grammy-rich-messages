import type { BlockNodeKind, Node, RichTextNodeKind } from "../jsx-runtime.js";
import { assertBlockNode, assertExactNodeKind, assertRichTextNode } from "./shared.js";

export function expectRichText(value: unknown): Node<RichTextNodeKind> {
  assertRichTextNode(value, "expectRichText()");
  return value;
}

export function expectBlock(value: unknown): Node<BlockNodeKind> {
  assertBlockNode(value, "expectBlock()");
  return value;
}

export function expectListItem(value: unknown): Node<"list-item"> {
  assertExactNodeKind(value, "list-item", "expectListItem()");
  return value;
}

export function expectTableRow(value: unknown): Node<"table-row"> {
  assertExactNodeKind(value, "table-row", "expectTableRow()");
  return value;
}

export function expectTableCell(value: unknown): Node<"table-cell"> {
  assertExactNodeKind(value, "table-cell", "expectTableCell()");
  return value;
}
