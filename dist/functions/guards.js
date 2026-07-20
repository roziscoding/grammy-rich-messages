import { assertBlockNode, assertExactNodeKind, assertRichTextNode } from "./shared.js";
export function expectRichText(value) {
    assertRichTextNode(value, "expectRichText()");
    return value;
}
export function expectBlock(value) {
    assertBlockNode(value, "expectBlock()");
    return value;
}
export function expectListItem(value) {
    assertExactNodeKind(value, "list-item", "expectListItem()");
    return value;
}
export function expectTableRow(value) {
    assertExactNodeKind(value, "table-row", "expectTableRow()");
    return value;
}
export function expectTableCell(value) {
    assertExactNodeKind(value, "table-cell", "expectTableCell()");
    return value;
}
//# sourceMappingURL=guards.js.map