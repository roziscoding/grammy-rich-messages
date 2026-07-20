import type { Child, Node } from "./jsx-runtime.js";

export interface InputRichMessage {
  blocks: InputRichBlock[];
  is_rtl?: boolean;
  skip_entity_detection?: boolean;
}

export type RichText = string | RichText[] | { type: string; [key: string]: unknown };
export type InputRichBlock = { type: string; [key: string]: unknown };

export interface Location {
  latitude: number;
  longitude: number;
  horizontal_accuracy?: number;
  live_period?: number;
  heading?: number;
  proximity_alert_radius?: number;
}

interface InputMediaBase { media: string; [key: string]: unknown; }
export interface InputMediaAnimation extends InputMediaBase { type: "animation"; }
export interface InputMediaAudio extends InputMediaBase { type: "audio"; }
export interface InputMediaPhoto extends InputMediaBase { type: "photo"; }
export interface InputMediaVideo extends InputMediaBase { type: "video"; }
export interface InputMediaVoiceNote extends InputMediaBase { type: "voice_note"; }

type CaptionProps =
  | { caption: Child; credit?: Child }
  | { caption?: undefined; credit?: never };

interface ChildrenProps { children?: Child; }

function node(kind: string, props: object): Node {
  return { kind, props: props as Record<string, unknown> };
}

export function RichMessage(props: ChildrenProps & { isRtl?: boolean; skipEntityDetection?: boolean }): Node {
  return node("rich-message", props);
}

export function Paragraph(props: ChildrenProps): Node { return node("paragraph", props); }
export function Heading(props: ChildrenProps & { size: 1 | 2 | 3 | 4 | 5 | 6 }): Node { return node("heading", props); }
export function Pre(props: ChildrenProps & { language?: string }): Node { return node("pre", props); }
export function Footer(props: ChildrenProps): Node { return node("footer", props); }
export function Divider(props: Record<string, never>): Node { return node("divider", props); }
export function MathBlock(props: { expression: string }): Node { return node("block-mathematical_expression", props); }
export function BlockAnchor(props: { name: string }): Node { return node("block-anchor", props); }
export function List(props: ChildrenProps): Node { return node("list", props); }
export function ListItem(props: ChildrenProps & { checkbox?: boolean; checked?: boolean; value?: number; labelType?: "a" | "A" | "i" | "I" | "1" }): Node { return node("list-item", props); }
export function BlockQuote(props: ChildrenProps & { credit?: Child }): Node { return node("blockquote", props); }
export function PullQuote(props: ChildrenProps & { credit?: Child }): Node { return node("pullquote", props); }
export function Collage(props: ChildrenProps & CaptionProps): Node { return node("collage", props); }
export function Slideshow(props: ChildrenProps & CaptionProps): Node { return node("slideshow", props); }
export function Table(props: ChildrenProps & { bordered?: boolean; striped?: boolean; caption?: Child }): Node { return node("table", props); }
export function TableRow(props: ChildrenProps): Node { return node("table-row", props); }
export function TableCell(props: ChildrenProps & { header?: boolean; colspan?: number; rowspan?: number; align?: "left" | "center" | "right"; valign?: "top" | "middle" | "bottom" }): Node { return node("table-cell", props); }
export function Details(props: ChildrenProps & { summary: Child; open?: boolean }): Node { return node("details", props); }
export function Map(props: { location: Location; zoom: number; width: number; height: number } & CaptionProps): Node { return node("map", props); }
export function Animation(props: { media: InputMediaAnimation } & CaptionProps): Node { return node("animation", props); }
export function Audio(props: { media: InputMediaAudio } & CaptionProps): Node { return node("audio", props); }
export function Photo(props: { media: InputMediaPhoto } & CaptionProps): Node { return node("photo", props); }
export function Video(props: { media: InputMediaVideo } & CaptionProps): Node { return node("video", props); }
export function VoiceNote(props: { media: InputMediaVoiceNote } & CaptionProps): Node { return node("voice_note", props); }
/**
 * A temporary “Thinking…” block. Telegram only permits this block in
 * sendRichMessageDraft payloads; render() cannot infer the eventual endpoint.
 */
export function Thinking(props: ChildrenProps): Node { return node("thinking", props); }

export function Bold(props: ChildrenProps): Node { return node("bold", props); }
export function Italic(props: ChildrenProps): Node { return node("italic", props); }
export function Underline(props: ChildrenProps): Node { return node("underline", props); }
export function Strikethrough(props: ChildrenProps): Node { return node("strikethrough", props); }
export function Spoiler(props: ChildrenProps): Node { return node("spoiler", props); }
export function Subscript(props: ChildrenProps): Node { return node("subscript", props); }
export function Superscript(props: ChildrenProps): Node { return node("superscript", props); }
export function Marked(props: ChildrenProps): Node { return node("marked", props); }
export function Code(props: ChildrenProps): Node { return node("code", props); }
export function DateTime(props: ChildrenProps & { unixTime: number; format: string }): Node { return node("date_time", props); }
export function TextMention(props: ChildrenProps & { user: Record<string, unknown> }): Node { return node("text_mention", props); }
export function CustomEmoji(props: { id: string; alt: string }): Node { return node("custom_emoji", props); }
export function InlineMath(props: { expression: string }): Node { return node("mathematical_expression", props); }
export function Link(props: ChildrenProps & { url: string }): Node { return node("url", props); }
export function Email(props: ChildrenProps & { address: string }): Node { return node("email_address", props); }
export function Phone(props: ChildrenProps & { number: string }): Node { return node("phone_number", props); }
export function BankCard(props: ChildrenProps & { number: string }): Node { return node("bank_card_number", props); }
export function Mention(props: ChildrenProps & { username: string }): Node { return node("mention", props); }
export function Hashtag(props: ChildrenProps & { value: string }): Node { return node("hashtag", props); }
export function Cashtag(props: ChildrenProps & { value: string }): Node { return node("cashtag", props); }
export function BotCommand(props: ChildrenProps & { command: string }): Node { return node("bot_command", props); }
export function TextAnchor(props: { name: string }): Node { return node("anchor", props); }
export function AnchorLink(props: ChildrenProps & { name: string }): Node { return node("anchor_link", props); }
export function Reference(props: ChildrenProps & { name: string }): Node { return node("reference", props); }
export function ReferenceLink(props: ChildrenProps & { name: string }): Node { return node("reference_link", props); }

function flatten(child: Child): Exclude<Child, readonly Child[]>[] {
  if (Array.isArray(child)) return child.flatMap(flatten);
  return [child as Exclude<Child, readonly Child[]>];
}

type RichTextSerializer = (value: Node) => RichText;

function serializeNestedText(value: Node): RichText {
  return { type: value.kind, text: richText(value.props.children as Child) };
}

const richTextSerializers = new globalThis.Map<string, RichTextSerializer>([
  ...["bold", "italic", "underline", "strikethrough", "spoiler", "subscript", "superscript", "marked", "code"]
    .map((kind): [string, RichTextSerializer] => [kind, serializeNestedText]),
  ["date_time", (value) => ({ type: value.kind, text: richText(value.props.children as Child), unix_time: value.props.unixTime, date_time_format: value.props.format })],
  ["text_mention", (value) => ({ type: value.kind, text: richText(value.props.children as Child), user: value.props.user })],
  ["custom_emoji", (value) => ({ type: value.kind, custom_emoji_id: value.props.id, alternative_text: value.props.alt })],
  ["mathematical_expression", (value) => ({ type: value.kind, expression: value.props.expression })],
  ["url", (value) => ({ type: value.kind, text: richText(value.props.children as Child), url: value.props.url })],
  ["email_address", (value) => ({ type: value.kind, text: richText(value.props.children as Child), email_address: value.props.address })],
  ["phone_number", (value) => ({ type: value.kind, text: richText(value.props.children as Child), phone_number: value.props.number })],
  ["bank_card_number", (value) => ({ type: value.kind, text: richText(value.props.children as Child), bank_card_number: value.props.number })],
  ["mention", (value) => ({ type: value.kind, text: richText(value.props.children as Child), username: value.props.username })],
  ["hashtag", (value) => ({ type: value.kind, text: richText(value.props.children as Child), hashtag: value.props.value })],
  ["cashtag", (value) => ({ type: value.kind, text: richText(value.props.children as Child), cashtag: value.props.value })],
  ["bot_command", (value) => ({ type: value.kind, text: richText(value.props.children as Child), bot_command: value.props.command })],
  ["anchor", (value) => ({ type: value.kind, name: value.props.name })],
  ["anchor_link", (value) => ({ type: value.kind, text: richText(value.props.children as Child), anchor_name: value.props.name })],
  ["reference", (value) => ({ type: value.kind, text: richText(value.props.children as Child), name: value.props.name })],
  ["reference_link", (value) => ({ type: value.kind, text: richText(value.props.children as Child), reference_name: value.props.name })],
]);

function richText(child: Child): RichText {
  const parts: RichText[] = [];
  for (const item of flatten(child)) {
    if (item == null || typeof item === "boolean") continue;
    if (typeof item === "string" || typeof item === "number") {
      const value = String(item);
      const last = parts.at(-1);
      if (typeof last === "string") parts[parts.length - 1] = last + value;
      else parts.push(value);
      continue;
    }
    const serializer = richTextSerializers.get(item.kind);
    if (!serializer) throw new TypeError(`Expected rich text, received <${item.kind}>`);
    parts.push(serializer(item));
  }
  return parts.length === 1 ? parts[0]! : parts;
}

function childNodes(child: Child, context: string): Node[] {
  const result: Node[] = [];
  for (const item of flatten(child)) {
    if (item == null || typeof item === "boolean") continue;
    if (typeof item === "string" && item.trim() === "") continue;
    if (typeof item !== "object" || Array.isArray(item)) {
      throw new TypeError(`${context} only accepts TSX elements`);
    }
    result.push(item);
  }
  return result;
}

function caption(props: Record<string, unknown>): Record<string, RichText> | undefined {
  if (props.caption === undefined) {
    if (props.credit !== undefined) throw new TypeError("credit requires caption text");
    return undefined;
  }
  const value: Record<string, RichText> = { text: richText(props.caption as Child) };
  if (props.credit !== undefined) value.credit = richText(props.credit as Child);
  return value;
}

function setOptional(target: InputRichBlock, key: string, value: unknown): void {
  if (value !== undefined && value !== false) target[key] = value;
}

function listItem(value: Node): Record<string, unknown> {
  if (value.kind !== "list-item") throw new TypeError("<List> only accepts <ListItem> children");
  const result: Record<string, unknown> = {
    blocks: childNodes(value.props.children as Child, "<ListItem>").map(block),
  };
  if (value.props.checkbox === true) result.has_checkbox = true;
  if (value.props.checked === true) result.is_checked = true;
  if (value.props.value !== undefined) result.value = value.props.value;
  if (value.props.labelType !== undefined) result.type = value.props.labelType;
  return result;
}

function tableCell(value: Node): Record<string, unknown> {
  if (value.kind !== "table-cell") throw new TypeError("<TableRow> only accepts <TableCell> children");
  const result: Record<string, unknown> = {
    text: richText(value.props.children as Child),
    align: value.props.align ?? "left",
    valign: value.props.valign ?? "top",
  };
  if (value.props.header === true) result.is_header = true;
  if (value.props.colspan !== undefined) result.colspan = value.props.colspan;
  if (value.props.rowspan !== undefined) result.rowspan = value.props.rowspan;
  return result;
}

type BlockSerializer = (value: Node) => InputRichBlock;

function serializeTextBlock(value: Node): InputRichBlock {
  return { type: value.kind, text: richText(value.props.children as Child) };
}

function serializeHeading(value: Node): InputRichBlock {
  return { type: "heading", text: richText(value.props.children as Child), size: value.props.size };
}

function serializePre(value: Node): InputRichBlock {
  const result: InputRichBlock = { type: "pre", text: richText(value.props.children as Child) };
  setOptional(result, "language", value.props.language);
  return result;
}

function serializeList(value: Node): InputRichBlock {
  return { type: "list", items: childNodes(value.props.children as Child, "<List>").map(listItem) };
}

function serializeBlockQuote(value: Node): InputRichBlock {
  const result: InputRichBlock = {
    type: "blockquote",
    blocks: childNodes(value.props.children as Child, "<BlockQuote>").map(block),
  };
  if (value.props.credit !== undefined) result.credit = richText(value.props.credit as Child);
  return result;
}

function serializePullQuote(value: Node): InputRichBlock {
  const result: InputRichBlock = { type: "pullquote", text: richText(value.props.children as Child) };
  if (value.props.credit !== undefined) result.credit = richText(value.props.credit as Child);
  return result;
}

function serializeBlockCollection(value: Node): InputRichBlock {
  const result: InputRichBlock = {
    type: value.kind,
    blocks: childNodes(value.props.children as Child, `<${value.kind}>`).map(block),
  };
  setOptional(result, "caption", caption(value.props));
  return result;
}

function serializeTable(value: Node): InputRichBlock {
  const rows = childNodes(value.props.children as Child, "<Table>").map((row) => {
    if (row.kind !== "table-row") throw new TypeError("<Table> only accepts <TableRow> children");
    return childNodes(row.props.children as Child, "<TableRow>").map(tableCell);
  });
  const result: InputRichBlock = { type: "table", cells: rows };
  if (value.props.bordered === true) result.is_bordered = true;
  if (value.props.striped === true) result.is_striped = true;
  if (value.props.caption !== undefined) result.caption = richText(value.props.caption as Child);
  return result;
}

function serializeDetails(value: Node): InputRichBlock {
  const result: InputRichBlock = {
    type: "details",
    summary: richText(value.props.summary as Child),
    blocks: childNodes(value.props.children as Child, "<Details>").map(block),
  };
  if (value.props.open === true) result.is_open = true;
  return result;
}

function serializeMap(value: Node): InputRichBlock {
  const zoom = value.props.zoom as number;
  const width = value.props.width as number;
  const height = value.props.height as number;
  if (!Number.isInteger(zoom) || zoom < 0 || zoom > 24) throw new RangeError("<Map> zoom must be an integer from 0 to 24");
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 0 || height < 0 || width + height > 10_000) {
    throw new RangeError("<Map> width and height must be non-negative integers whose total does not exceed 10000");
  }
  if ((width === 0) !== (height === 0) || (width > 0 && Math.max(width / height, height / width) > 20)) {
    throw new RangeError("<Map> width-to-height ratio must not exceed 20");
  }
  const result: InputRichBlock = { type: "map", location: value.props.location, zoom, width, height };
  setOptional(result, "caption", caption(value.props));
  return result;
}

function serializeMediaBlock(value: Node): InputRichBlock {
  const result: InputRichBlock = { type: value.kind, [value.kind]: value.props.media };
  setOptional(result, "caption", caption(value.props));
  return result;
}

const blockSerializers = new globalThis.Map<string, BlockSerializer>([
  ...["paragraph", "footer", "thinking"]
    .map((kind): [string, BlockSerializer] => [kind, serializeTextBlock]),
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
    .map((kind): [string, BlockSerializer] => [kind, serializeMediaBlock]),
]);

function block(value: Node): InputRichBlock {
  const serializer = blockSerializers.get(value.kind);
  if (!serializer) throw new TypeError(`Expected a rich-message block, received <${value.kind}>`);
  return serializer(value);
}

export function render(element: Node): InputRichMessage {
  if (element.kind !== "rich-message") throw new TypeError("render() expects a <RichMessage> root");
  const blocks = childNodes(element.props.children as Child, "<RichMessage>").map(block);
  const result: InputRichMessage = { blocks };
  if (element.props.isRtl === true) result.is_rtl = true;
  if (element.props.skipEntityDetection === true) result.skip_entity_detection = true;
  return result;
}

export type { Child } from "./jsx-runtime.js";
