import { kindOf } from "../values.js";
function expectKind(value, kind, context) {
    if (kindOf(value) !== kind)
        throw new TypeError(`${context} expects <${kind}>`);
}
export function expectRichText(value) {
    if (kindOf(value) !== "rich-text")
        throw new TypeError("expectRichText() expects a rich-text element");
    return value;
}
export function expectBlock(value) {
    expectKind(value, "block", "expectBlock()");
    return value;
}
export function expectListItem(value) {
    expectKind(value, "list-item", "expectListItem()");
    return value;
}
export function expectTableRow(value) {
    if (kindOf(value) !== "table-row")
        throw new TypeError("expectTableRow() only accepts <table-row>");
    return value;
}
export function expectTableCell(value) {
    expectKind(value, "table-cell", "expectTableCell()");
    return value;
}
export function expectRichMessage(value) {
    if (kindOf(value) !== "rich-message")
        throw new TypeError("expectRichMessage() expects a <RichMessage> root");
    return value;
}
//# sourceMappingURL=guards.js.map