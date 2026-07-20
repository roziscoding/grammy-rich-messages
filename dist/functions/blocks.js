import { node } from "../node.js";
import { assertBlockChildren, assertCaption, assertNoChildren, assertNodeKind, assertRichText, childrenProps, elementChildrenProps, splitOptions, } from "./shared.js";
function richTextBlock(kind, context, children) {
    assertRichText(children, context);
    return node(kind, childrenProps(children));
}
export function paragraph(...children) { return richTextBlock("paragraph", "paragraph()", children); }
export function footer(...children) { return richTextBlock("footer", "footer()", children); }
export function thinking(...children) { return richTextBlock("thinking", "thinking()", children); }
export function heading(options, ...children) {
    assertRichText(children, "heading()");
    return node("heading", { ...options, ...childrenProps(children) });
}
export function pre(first, ...rest) {
    const [options, children] = splitOptions(first, rest, "pre()", ["language"]);
    assertRichText(children, "pre()");
    return node("pre", { ...options, ...childrenProps(children) });
}
export function divider(...children) {
    assertNoChildren(children, "divider()");
    return node("divider", {});
}
export function mathBlock(options, ...children) {
    assertNoChildren(children, "mathBlock()");
    return node("block-mathematical_expression", options);
}
export function blockAnchor(options, ...children) {
    assertNoChildren(children, "blockAnchor()");
    return node("block-anchor", options);
}
export function list(...items) {
    assertNodeKind(items, "list-item", "list()");
    return node("list", elementChildrenProps(items));
}
export function listItem(first, ...rest) {
    const [options = {}, blocks] = splitOptions(first, rest, "listItem()", ["checkbox", "checked", "value", "labelType"]);
    assertBlockChildren(blocks, "listItem()");
    if (options.checked === true && options.checkbox !== true) {
        throw new TypeError("listItem() checked requires checkbox");
    }
    return node("list-item", { ...options, ...elementChildrenProps(blocks) });
}
export function blockQuote(first, ...rest) {
    const [options = {}, blocks] = splitOptions(first, rest, "blockQuote()", ["credit"]);
    assertBlockChildren(blocks, "blockQuote()");
    if (options.credit !== undefined)
        assertRichText([options.credit], "blockQuote() credit");
    return node("blockquote", { ...options, ...elementChildrenProps(blocks) });
}
export function pullQuote(first, ...rest) {
    const [options = {}, children] = splitOptions(first, rest, "pullQuote()", ["credit"]);
    assertRichText(children, "pullQuote()");
    if (options.credit !== undefined)
        assertRichText([options.credit], "pullQuote() credit");
    return node("pullquote", { ...options, ...childrenProps(children) });
}
function collection(kind, context, options, blocks) {
    assertCaption(options, context);
    assertBlockChildren(blocks, context);
    return node(kind, { ...options, ...elementChildrenProps(blocks) });
}
export function collage(first, ...rest) {
    const [options = {}, blocks] = splitOptions(first, rest, "collage()", ["caption", "credit"]);
    return collection("collage", "collage()", options, blocks);
}
export function slideshow(first, ...rest) {
    const [options = {}, blocks] = splitOptions(first, rest, "slideshow()", ["caption", "credit"]);
    return collection("slideshow", "slideshow()", options, blocks);
}
export function table(first, ...rest) {
    const [options = {}, rows] = splitOptions(first, rest, "table()", ["bordered", "striped", "caption"]);
    assertNodeKind(rows, "table-row", "table()");
    if (options.caption !== undefined)
        assertRichText([options.caption], "table() caption");
    return node("table", { ...options, ...elementChildrenProps(rows) });
}
export function tableRow(...cells) {
    assertNodeKind(cells, "table-cell", "tableRow()");
    return node("table-row", elementChildrenProps(cells));
}
export function tableCell(first, ...rest) {
    const [options = {}, children] = splitOptions(first, rest, "tableCell()", ["header", "colspan", "rowspan", "align", "valign"]);
    assertRichText(children, "tableCell()");
    return node("table-cell", { ...options, ...childrenProps(children) });
}
export function details(options, ...blocks) {
    assertRichText([options.summary], "details() summary");
    assertBlockChildren(blocks, "details()");
    return node("details", { ...options, ...elementChildrenProps(blocks) });
}
export function map(options, ...children) {
    assertNoChildren(children, "map()");
    assertCaption(options, "map()");
    const { zoom, width, height } = options;
    if (!Number.isInteger(zoom) || zoom < 0 || zoom > 24)
        throw new RangeError("map() zoom must be an integer from 0 to 24");
    if (!Number.isInteger(width) || !Number.isInteger(height) || width < 0 || height < 0 || width + height > 10_000) {
        throw new RangeError("map() width and height must be non-negative integers whose total does not exceed 10000");
    }
    if ((width === 0) !== (height === 0) || (width > 0 && Math.max(width / height, height / width) > 20)) {
        throw new RangeError("map() width-to-height ratio must not exceed 20");
    }
    return node("map", options);
}
function media(kind, context, options, children) {
    assertNoChildren(children, context);
    assertCaption(options, context);
    return node(kind, options);
}
export function animation(options, ...children) { return media("animation", "animation()", options, children); }
export function audio(options, ...children) { return media("audio", "audio()", options, children); }
export function photo(options, ...children) { return media("photo", "photo()", options, children); }
export function video(options, ...children) { return media("video", "video()", options, children); }
export function voiceNote(options, ...children) { return media("voice_note", "voiceNote()", options, children); }
//# sourceMappingURL=blocks.js.map