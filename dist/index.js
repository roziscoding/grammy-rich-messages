function node(kind, props) {
    return { kind, props: props };
}
export function RichMessage(props) {
    return node("rich-message", props);
}
export function Paragraph(props) { return node("paragraph", props); }
export function Heading(props) { return node("heading", props); }
export function Pre(props) { return node("pre", props); }
export function Footer(props) { return node("footer", props); }
export function Divider(props) { return node("divider", props); }
export function MathBlock(props) { return node("block-mathematical_expression", props); }
export function BlockAnchor(props) { return node("block-anchor", props); }
export function List(props) { return node("list", props); }
export function ListItem(props) { return node("list-item", props); }
export function BlockQuote(props) { return node("blockquote", props); }
export function PullQuote(props) { return node("pullquote", props); }
export function Collage(props) { return node("collage", props); }
export function Slideshow(props) { return node("slideshow", props); }
export function Table(props) { return node("table", props); }
export function TableRow(props) { return node("table-row", props); }
export function TableCell(props) { return node("table-cell", props); }
export function Details(props) { return node("details", props); }
export function Map(props) { return node("map", props); }
export function Animation(props) { return node("animation", props); }
export function Audio(props) { return node("audio", props); }
export function Photo(props) { return node("photo", props); }
export function Video(props) { return node("video", props); }
export function VoiceNote(props) { return node("voice_note", props); }
/**
 * A temporary “Thinking…” block. Telegram only permits this block in
 * sendRichMessageDraft payloads; render() cannot infer the eventual endpoint.
 */
export function Thinking(props) { return node("thinking", props); }
export function Bold(props) { return node("bold", props); }
export function Italic(props) { return node("italic", props); }
export function Underline(props) { return node("underline", props); }
export function Strikethrough(props) { return node("strikethrough", props); }
export function Spoiler(props) { return node("spoiler", props); }
export function Subscript(props) { return node("subscript", props); }
export function Superscript(props) { return node("superscript", props); }
export function Marked(props) { return node("marked", props); }
export function Code(props) { return node("code", props); }
export function DateTime(props) { return node("date_time", props); }
export function TextMention(props) { return node("text_mention", props); }
export function CustomEmoji(props) { return node("custom_emoji", props); }
export function InlineMath(props) { return node("mathematical_expression", props); }
export function Link(props) { return node("url", props); }
export function Email(props) { return node("email_address", props); }
export function Phone(props) { return node("phone_number", props); }
export function BankCard(props) { return node("bank_card_number", props); }
export function Mention(props) { return node("mention", props); }
export function Hashtag(props) { return node("hashtag", props); }
export function Cashtag(props) { return node("cashtag", props); }
export function BotCommand(props) { return node("bot_command", props); }
export function TextAnchor(props) { return node("anchor", props); }
export function AnchorLink(props) { return node("anchor_link", props); }
export function Reference(props) { return node("reference", props); }
export function ReferenceLink(props) { return node("reference_link", props); }
function flatten(child) {
    if (Array.isArray(child))
        return child.flatMap(flatten);
    return [child];
}
function serializeNestedText(value) {
    return { type: value.kind, text: richText(value.props.children) };
}
const richTextSerializers = new globalThis.Map([
    ...["bold", "italic", "underline", "strikethrough", "spoiler", "subscript", "superscript", "marked", "code"]
        .map((kind) => [kind, serializeNestedText]),
    ["date_time", (value) => ({ type: value.kind, text: richText(value.props.children), unix_time: value.props.unixTime, date_time_format: value.props.format })],
    ["text_mention", (value) => ({ type: value.kind, text: richText(value.props.children), user: value.props.user })],
    ["custom_emoji", (value) => ({ type: value.kind, custom_emoji_id: value.props.id, alternative_text: value.props.alt })],
    ["mathematical_expression", (value) => ({ type: value.kind, expression: value.props.expression })],
    ["url", (value) => ({ type: value.kind, text: richText(value.props.children), url: value.props.url })],
    ["email_address", (value) => ({ type: value.kind, text: richText(value.props.children), email_address: value.props.address })],
    ["phone_number", (value) => ({ type: value.kind, text: richText(value.props.children), phone_number: value.props.number })],
    ["bank_card_number", (value) => ({ type: value.kind, text: richText(value.props.children), bank_card_number: value.props.number })],
    ["mention", (value) => ({ type: value.kind, text: richText(value.props.children), username: value.props.username })],
    ["hashtag", (value) => ({ type: value.kind, text: richText(value.props.children), hashtag: value.props.value })],
    ["cashtag", (value) => ({ type: value.kind, text: richText(value.props.children), cashtag: value.props.value })],
    ["bot_command", (value) => ({ type: value.kind, text: richText(value.props.children), bot_command: value.props.command })],
    ["anchor", (value) => ({ type: value.kind, name: value.props.name })],
    ["anchor_link", (value) => ({ type: value.kind, text: richText(value.props.children), anchor_name: value.props.name })],
    ["reference", (value) => ({ type: value.kind, text: richText(value.props.children), name: value.props.name })],
    ["reference_link", (value) => ({ type: value.kind, text: richText(value.props.children), reference_name: value.props.name })],
]);
function richText(child) {
    const parts = [];
    for (const item of flatten(child)) {
        if (item == null || typeof item === "boolean")
            continue;
        if (typeof item === "string" || typeof item === "number") {
            const value = String(item);
            const last = parts.at(-1);
            if (typeof last === "string")
                parts[parts.length - 1] = last + value;
            else
                parts.push(value);
            continue;
        }
        const serializer = richTextSerializers.get(item.kind);
        if (!serializer)
            throw new TypeError(`Expected rich text, received <${item.kind}>`);
        parts.push(serializer(item));
    }
    return parts.length === 1 ? parts[0] : parts;
}
function childNodes(child, context) {
    const result = [];
    for (const item of flatten(child)) {
        if (item == null || typeof item === "boolean")
            continue;
        if (typeof item === "string" && item.trim() === "")
            continue;
        if (typeof item !== "object" || Array.isArray(item)) {
            throw new TypeError(`${context} only accepts TSX elements`);
        }
        result.push(item);
    }
    return result;
}
function caption(props) {
    if (props.caption === undefined) {
        if (props.credit !== undefined)
            throw new TypeError("credit requires caption text");
        return undefined;
    }
    const value = { text: richText(props.caption) };
    if (props.credit !== undefined)
        value.credit = richText(props.credit);
    return value;
}
function setOptional(target, key, value) {
    if (value !== undefined && value !== false)
        target[key] = value;
}
function listItem(value) {
    if (value.kind !== "list-item")
        throw new TypeError("<List> only accepts <ListItem> children");
    const result = {
        blocks: childNodes(value.props.children, "<ListItem>").map(block),
    };
    if (value.props.checkbox === true)
        result.has_checkbox = true;
    if (value.props.checked === true)
        result.is_checked = true;
    if (value.props.value !== undefined)
        result.value = value.props.value;
    if (value.props.labelType !== undefined)
        result.type = value.props.labelType;
    return result;
}
function tableCell(value) {
    if (value.kind !== "table-cell")
        throw new TypeError("<TableRow> only accepts <TableCell> children");
    const result = {
        text: richText(value.props.children),
        align: value.props.align ?? "left",
        valign: value.props.valign ?? "top",
    };
    if (value.props.header === true)
        result.is_header = true;
    if (value.props.colspan !== undefined)
        result.colspan = value.props.colspan;
    if (value.props.rowspan !== undefined)
        result.rowspan = value.props.rowspan;
    return result;
}
function serializeTextBlock(value) {
    return { type: value.kind, text: richText(value.props.children) };
}
function serializeHeading(value) {
    return { type: "heading", text: richText(value.props.children), size: value.props.size };
}
function serializePre(value) {
    const result = { type: "pre", text: richText(value.props.children) };
    setOptional(result, "language", value.props.language);
    return result;
}
function serializeList(value) {
    return { type: "list", items: childNodes(value.props.children, "<List>").map(listItem) };
}
function serializeBlockQuote(value) {
    const result = {
        type: "blockquote",
        blocks: childNodes(value.props.children, "<BlockQuote>").map(block),
    };
    if (value.props.credit !== undefined)
        result.credit = richText(value.props.credit);
    return result;
}
function serializePullQuote(value) {
    const result = { type: "pullquote", text: richText(value.props.children) };
    if (value.props.credit !== undefined)
        result.credit = richText(value.props.credit);
    return result;
}
function serializeBlockCollection(value) {
    const result = {
        type: value.kind,
        blocks: childNodes(value.props.children, `<${value.kind}>`).map(block),
    };
    setOptional(result, "caption", caption(value.props));
    return result;
}
function serializeTable(value) {
    const rows = childNodes(value.props.children, "<Table>").map((row) => {
        if (row.kind !== "table-row")
            throw new TypeError("<Table> only accepts <TableRow> children");
        return childNodes(row.props.children, "<TableRow>").map(tableCell);
    });
    const result = { type: "table", cells: rows };
    if (value.props.bordered === true)
        result.is_bordered = true;
    if (value.props.striped === true)
        result.is_striped = true;
    if (value.props.caption !== undefined)
        result.caption = richText(value.props.caption);
    return result;
}
function serializeDetails(value) {
    const result = {
        type: "details",
        summary: richText(value.props.summary),
        blocks: childNodes(value.props.children, "<Details>").map(block),
    };
    if (value.props.open === true)
        result.is_open = true;
    return result;
}
function serializeMap(value) {
    const zoom = value.props.zoom;
    const width = value.props.width;
    const height = value.props.height;
    if (!Number.isInteger(zoom) || zoom < 0 || zoom > 24)
        throw new RangeError("<Map> zoom must be an integer from 0 to 24");
    if (!Number.isInteger(width) || !Number.isInteger(height) || width < 0 || height < 0 || width + height > 10_000) {
        throw new RangeError("<Map> width and height must be non-negative integers whose total does not exceed 10000");
    }
    if ((width === 0) !== (height === 0) || (width > 0 && Math.max(width / height, height / width) > 20)) {
        throw new RangeError("<Map> width-to-height ratio must not exceed 20");
    }
    const result = { type: "map", location: value.props.location, zoom, width, height };
    setOptional(result, "caption", caption(value.props));
    return result;
}
function serializeMediaBlock(value) {
    const result = { type: value.kind, [value.kind]: value.props.media };
    setOptional(result, "caption", caption(value.props));
    return result;
}
const blockSerializers = new globalThis.Map([
    ...["paragraph", "footer", "thinking"]
        .map((kind) => [kind, serializeTextBlock]),
    ["heading", serializeHeading],
    ["pre", serializePre],
    ["divider", () => ({ type: "divider" })],
    ["block-mathematical_expression", (value) => ({ type: "mathematical_expression", expression: value.props.expression })],
    ["block-anchor", (value) => ({ type: "anchor", name: value.props.name })],
    ["list", serializeList],
    ["blockquote", serializeBlockQuote],
    ["pullquote", serializePullQuote],
    ["collage", serializeBlockCollection],
    ["slideshow", serializeBlockCollection],
    ["table", serializeTable],
    ["details", serializeDetails],
    ["map", serializeMap],
    ...["animation", "audio", "photo", "video", "voice_note"]
        .map((kind) => [kind, serializeMediaBlock]),
]);
function block(value) {
    const serializer = blockSerializers.get(value.kind);
    if (!serializer)
        throw new TypeError(`Expected a rich-message block, received <${value.kind}>`);
    return serializer(value);
}
export function render(element) {
    if (element.kind !== "rich-message")
        throw new TypeError("render() expects a <RichMessage> root");
    const blocks = childNodes(element.props.children, "<RichMessage>").map(block);
    const result = { blocks };
    if (element.props.isRtl === true)
        result.is_rtl = true;
    if (element.props.skipEntityDetection === true)
        result.skip_entity_detection = true;
    return result;
}
//# sourceMappingURL=index.js.map