import { brand } from "../values.js";
import { assertNoChildren, blocks, caption, listItems, richText, splitOptions, tableCells, tableRows, } from "./shared.js";
function block(value) {
    return brand(value, "block");
}
function richTextBlock(type, context, children) {
    return block({ type, text: richText(children, context) });
}
export function paragraph(...children) { return richTextBlock("paragraph", "paragraph()", children); }
export function footer(...children) { return richTextBlock("footer", "footer()", children); }
export function thinking(...children) { return richTextBlock("thinking", "thinking()", children); }
export function heading(options, ...children) {
    return block({ type: "heading", text: richText(children, "heading()"), size: options.size });
}
export function pre(first, ...rest) {
    const [options, children] = splitOptions(first, rest, "pre()", ["language"], "rich-text", true);
    return block({ type: "pre", text: richText(children, "pre()"), ...(options?.language === undefined ? {} : { language: options.language }) });
}
export function divider(...children) {
    assertNoChildren(children, "divider()");
    return block({ type: "divider" });
}
export function mathBlock(options, ...children) {
    assertNoChildren(children, "mathBlock()");
    return block({ type: "mathematical_expression", expression: options.expression });
}
export function blockAnchor(options, ...children) {
    assertNoChildren(children, "blockAnchor()");
    return block({ type: "anchor", name: options.name });
}
export function list(...items) {
    return block({ type: "list", items: listItems(items, "list()") });
}
export function listItem(first, ...rest) {
    const [options = {}, children] = splitOptions(first, rest, "listItem()", ["checkbox", "checked", "value", "labelType"], "block");
    if (options.checked === true && options.checkbox !== true) {
        throw new TypeError("listItem() checked requires checkbox");
    }
    const value = {
        blocks: blocks(children, "listItem()"),
        ...(options.value === undefined ? {} : { value: options.value }),
        ...(options.labelType === undefined ? {} : { type: options.labelType }),
        ...(options.checkbox === true ? { has_checkbox: true, ...(options.checked === true ? { is_checked: true } : {}) } : {}),
    };
    return brand(value, "list-item");
}
export function blockQuote(first, ...rest) {
    const [options = {}, children] = splitOptions(first, rest, "blockQuote()", ["credit"], "block");
    return block({
        type: "blockquote",
        blocks: blocks(children, "blockQuote()"),
        ...(options.credit === undefined ? {} : { credit: richText([options.credit], "blockQuote() credit") }),
    });
}
export function pullQuote(first, ...rest) {
    const [options = {}, children] = splitOptions(first, rest, "pullQuote()", ["credit"], "rich-text", true);
    return block({
        type: "pullquote",
        text: richText(children, "pullQuote()"),
        ...(options.credit === undefined ? {} : { credit: richText([options.credit], "pullQuote() credit") }),
    });
}
function collection(type, context, options, children) {
    const richCaption = caption(options, context);
    return block({ type, blocks: blocks(children, context), ...(richCaption === undefined ? {} : { caption: richCaption }) });
}
export function collage(first, ...rest) {
    const [options = {}, children] = splitOptions(first, rest, "collage()", ["caption", "credit"], "block");
    return collection("collage", "collage()", options, children);
}
export function slideshow(first, ...rest) {
    const [options = {}, children] = splitOptions(first, rest, "slideshow()", ["caption", "credit"], "block");
    return collection("slideshow", "slideshow()", options, children);
}
export function table(first, ...rest) {
    const [options = {}, children] = splitOptions(first, rest, "table()", ["bordered", "striped", "caption"], "table-row");
    return block({
        type: "table",
        cells: tableRows(children, "table()").map((row) => row.cells),
        ...(options.bordered === true ? { is_bordered: true } : {}),
        ...(options.striped === true ? { is_striped: true } : {}),
        ...(options.caption === undefined ? {} : { caption: richText([options.caption], "table() caption") }),
    });
}
export function tableRow(...children) {
    return brand({ cells: tableCells(children, "tableRow()") }, "table-row");
}
export function tableCell(first, ...rest) {
    const [options = {}, children] = splitOptions(first, rest, "tableCell()", ["header", "colspan", "rowspan", "align", "valign"], "rich-text", true);
    const value = {
        ...(children.length === 0 ? {} : { text: richText(children, "tableCell()") }),
        align: options.align ?? "left",
        valign: options.valign ?? "top",
        ...(options.header === true ? { is_header: true } : {}),
        ...(options.colspan === undefined ? {} : { colspan: options.colspan }),
        ...(options.rowspan === undefined ? {} : { rowspan: options.rowspan }),
    };
    return brand(value, "table-cell");
}
export function details(options, ...children) {
    return block({
        type: "details",
        summary: richText([options.summary], "details() summary"),
        blocks: blocks(children, "details()"),
        ...(options.open === true ? { is_open: true } : {}),
    });
}
export function map(options, ...children) {
    assertNoChildren(children, "map()");
    const { zoom, width, height } = options;
    if (!Number.isInteger(zoom) || zoom < 0 || zoom > 24)
        throw new RangeError("map() zoom must be an integer from 0 to 24");
    if (!Number.isInteger(width) || !Number.isInteger(height) || width < 0 || height < 0 || width + height > 10_000) {
        throw new RangeError("map() width and height must be non-negative integers whose total does not exceed 10000");
    }
    if ((width === 0) !== (height === 0) || (width > 0 && Math.max(width / height, height / width) > 20)) {
        throw new RangeError("map() width-to-height ratio must not exceed 20");
    }
    const richCaption = caption(options, "map()");
    return block({ type: "map", location: options.location, zoom, width, height, ...(richCaption === undefined ? {} : { caption: richCaption }) });
}
function media(type, context, options, children) {
    assertNoChildren(children, context);
    const richCaption = caption(options, context);
    const mediaField = type === "voice_note" ? "voice_note" : type;
    return block({
        type,
        [mediaField]: options.media,
        ...(richCaption === undefined ? {} : { caption: richCaption }),
    });
}
export function animation(options, ...children) { return media("animation", "animation()", options, children); }
export function audio(options, ...children) { return media("audio", "audio()", options, children); }
export function photo(options, ...children) { return media("photo", "photo()", options, children); }
export function video(options, ...children) { return media("video", "video()", options, children); }
export function voiceNote(options, ...children) { return media("voice_note", "voiceNote()", options, children); }
//# sourceMappingURL=blocks.js.map