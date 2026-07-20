import type { Node } from "../jsx-runtime.js";
import type {
  InputMediaAnimation,
  InputMediaAudio,
  InputMediaPhoto,
  InputMediaVideo,
  InputMediaVoiceNote,
  Location,
} from "../types.js";
import { node } from "../node.js";
import {
  assertBlockChildren,
  assertCaption,
  assertNoChildren,
  assertNodeKind,
  assertRichText,
  childrenProps,
  elementChildrenProps,
  splitOptions,
  type BlockInput,
  type NodeInput,
  type RichTextInput,
} from "./shared.js";

export type { BlockInput, NodeInput } from "./shared.js";

export type CaptionOptions =
  | { caption: RichTextInput; credit?: RichTextInput }
  | { caption?: undefined; credit?: never };

function richTextBlock<K extends "paragraph" | "footer" | "thinking">(
  kind: K,
  context: string,
  children: readonly RichTextInput[],
): Node<K> {
  assertRichText(children, context);
  return node(kind, childrenProps(children));
}

export function paragraph(...children: readonly RichTextInput[]) { return richTextBlock("paragraph", "paragraph()", children); }
export function footer(...children: readonly RichTextInput[]) { return richTextBlock("footer", "footer()", children); }
export function thinking(...children: readonly RichTextInput[]) { return richTextBlock("thinking", "thinking()", children); }

export interface HeadingOptions { size: 1 | 2 | 3 | 4 | 5 | 6; }
export function heading(options: HeadingOptions, ...children: readonly RichTextInput[]) {
  assertRichText(children, "heading()");
  return node("heading", { ...options, ...childrenProps(children) });
}

export interface PreOptions { language?: string; }
export function pre(...children: readonly RichTextInput[]): Node<"pre">;
export function pre(options: PreOptions, ...children: readonly RichTextInput[]): Node<"pre">;
export function pre(first?: PreOptions | RichTextInput, ...rest: readonly RichTextInput[]) {
  const [options, children] = splitOptions<PreOptions, RichTextInput>(first, rest, "pre()", ["language"]);
  assertRichText(children, "pre()");
  return node("pre", { ...options, ...childrenProps(children) });
}

export function divider(...children: readonly never[]) {
  assertNoChildren(children, "divider()");
  return node("divider", {});
}

export interface MathBlockOptions { expression: string; }
export function mathBlock(options: MathBlockOptions, ...children: readonly never[]) {
  assertNoChildren(children, "mathBlock()");
  return node("block-mathematical_expression", options);
}

export interface BlockAnchorOptions { name: string; }
export function blockAnchor(options: BlockAnchorOptions, ...children: readonly never[]) {
  assertNoChildren(children, "blockAnchor()");
  return node("block-anchor", options);
}

export function list(...items: readonly NodeInput<"list-item">[]) {
  assertNodeKind(items, "list-item", "list()");
  return node("list", elementChildrenProps(items));
}

export type ListItemOptions = (
  | { checkbox: true; checked?: boolean }
  | { checkbox?: false; checked?: never }
) & {
  value?: number;
  labelType?: "a" | "A" | "i" | "I" | "1";
};

export function listItem(...blocks: readonly BlockInput[]): Node<"list-item">;
export function listItem(options: ListItemOptions, ...blocks: readonly BlockInput[]): Node<"list-item">;
export function listItem(first?: ListItemOptions | BlockInput, ...rest: readonly BlockInput[]) {
  const [options = {}, blocks] = splitOptions<ListItemOptions, BlockInput>(
    first, rest, "listItem()", ["checkbox", "checked", "value", "labelType"],
  );
  assertBlockChildren(blocks, "listItem()");
  if ((options as { checked?: unknown }).checked === true && (options as { checkbox?: unknown }).checkbox !== true) {
    throw new TypeError("listItem() checked requires checkbox");
  }
  return node("list-item", { ...options, ...elementChildrenProps(blocks) } as never);
}

export interface BlockQuoteOptions { credit?: RichTextInput; }
export function blockQuote(...blocks: readonly BlockInput[]): Node<"blockquote">;
export function blockQuote(options: BlockQuoteOptions, ...blocks: readonly BlockInput[]): Node<"blockquote">;
export function blockQuote(first?: BlockQuoteOptions | BlockInput, ...rest: readonly BlockInput[]) {
  const [options = {}, blocks] = splitOptions<BlockQuoteOptions, BlockInput>(first, rest, "blockQuote()", ["credit"]);
  assertBlockChildren(blocks, "blockQuote()");
  if (options.credit !== undefined) assertRichText([options.credit], "blockQuote() credit");
  return node("blockquote", { ...options, ...elementChildrenProps(blocks) });
}

export interface PullQuoteOptions { credit?: RichTextInput; }
export function pullQuote(...children: readonly RichTextInput[]): Node<"pullquote">;
export function pullQuote(options: PullQuoteOptions, ...children: readonly RichTextInput[]): Node<"pullquote">;
export function pullQuote(first?: PullQuoteOptions | RichTextInput, ...rest: readonly RichTextInput[]) {
  const [options = {}, children] = splitOptions<PullQuoteOptions, RichTextInput>(first, rest, "pullQuote()", ["credit"]);
  assertRichText(children, "pullQuote()");
  if (options.credit !== undefined) assertRichText([options.credit], "pullQuote() credit");
  return node("pullquote", { ...options, ...childrenProps(children) });
}

function collection<K extends "collage" | "slideshow">(
  kind: K,
  context: string,
  options: CaptionOptions,
  blocks: readonly BlockInput[],
): Node<K> {
  assertCaption(options, context);
  assertBlockChildren(blocks, context);
  return node(kind, { ...options, ...elementChildrenProps(blocks) } as never);
}

export function collage(...blocks: readonly BlockInput[]): Node<"collage">;
export function collage(options: CaptionOptions, ...blocks: readonly BlockInput[]): Node<"collage">;
export function collage(first?: CaptionOptions | BlockInput, ...rest: readonly BlockInput[]) {
  const [options = {}, blocks] = splitOptions<CaptionOptions, BlockInput>(
    first, rest, "collage()", ["caption", "credit"],
  );
  return collection("collage", "collage()", options, blocks);
}

export function slideshow(...blocks: readonly BlockInput[]): Node<"slideshow">;
export function slideshow(options: CaptionOptions, ...blocks: readonly BlockInput[]): Node<"slideshow">;
export function slideshow(first?: CaptionOptions | BlockInput, ...rest: readonly BlockInput[]) {
  const [options = {}, blocks] = splitOptions<CaptionOptions, BlockInput>(
    first, rest, "slideshow()", ["caption", "credit"],
  );
  return collection("slideshow", "slideshow()", options, blocks);
}

export interface TableOptions {
  bordered?: boolean;
  striped?: boolean;
  caption?: RichTextInput;
}
export function table(...rows: readonly NodeInput<"table-row">[]): Node<"table">;
export function table(options: TableOptions, ...rows: readonly NodeInput<"table-row">[]): Node<"table">;
export function table(first?: TableOptions | NodeInput<"table-row">, ...rest: readonly NodeInput<"table-row">[]) {
  const [options = {}, rows] = splitOptions<TableOptions, NodeInput<"table-row">>(
    first, rest, "table()", ["bordered", "striped", "caption"],
  );
  assertNodeKind(rows, "table-row", "table()");
  if (options.caption !== undefined) assertRichText([options.caption], "table() caption");
  return node("table", { ...options, ...elementChildrenProps(rows) });
}

export function tableRow(...cells: readonly NodeInput<"table-cell">[]) {
  assertNodeKind(cells, "table-cell", "tableRow()");
  return node("table-row", elementChildrenProps(cells));
}

export interface TableCellOptions {
  header?: boolean;
  colspan?: number;
  rowspan?: number;
  align?: "left" | "center" | "right";
  valign?: "top" | "middle" | "bottom";
}
export function tableCell(...children: readonly RichTextInput[]): Node<"table-cell">;
export function tableCell(options: TableCellOptions, ...children: readonly RichTextInput[]): Node<"table-cell">;
export function tableCell(first?: TableCellOptions | RichTextInput, ...rest: readonly RichTextInput[]) {
  const [options = {}, children] = splitOptions<TableCellOptions, RichTextInput>(
    first, rest, "tableCell()", ["header", "colspan", "rowspan", "align", "valign"],
  );
  assertRichText(children, "tableCell()");
  return node("table-cell", { ...options, ...childrenProps(children) });
}

export interface DetailsOptions { summary: RichTextInput; open?: boolean; }
export function details(options: DetailsOptions, ...blocks: readonly BlockInput[]) {
  assertRichText([options.summary], "details() summary");
  assertBlockChildren(blocks, "details()");
  return node("details", { ...options, ...elementChildrenProps(blocks) });
}

export type MapOptions = CaptionOptions & {
  location: Location;
  zoom: number;
  width: number;
  height: number;
};
export function map(options: MapOptions, ...children: readonly never[]) {
  assertNoChildren(children, "map()");
  assertCaption(options, "map()");
  const { zoom, width, height } = options;
  if (!Number.isInteger(zoom) || zoom < 0 || zoom > 24) throw new RangeError("map() zoom must be an integer from 0 to 24");
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 0 || height < 0 || width + height > 10_000) {
    throw new RangeError("map() width and height must be non-negative integers whose total does not exceed 10000");
  }
  if ((width === 0) !== (height === 0) || (width > 0 && Math.max(width / height, height / width) > 20)) {
    throw new RangeError("map() width-to-height ratio must not exceed 20");
  }
  return node("map", options);
}

export type AnimationOptions = { media: InputMediaAnimation } & CaptionOptions;
export type AudioOptions = { media: InputMediaAudio } & CaptionOptions;
export type PhotoOptions = { media: InputMediaPhoto } & CaptionOptions;
export type VideoOptions = { media: InputMediaVideo } & CaptionOptions;
export type VoiceNoteOptions = { media: InputMediaVoiceNote } & CaptionOptions;

function media<K extends "animation" | "audio" | "photo" | "video" | "voice_note", P extends CaptionOptions & object>(
  kind: K,
  context: string,
  options: P,
  children: readonly never[],
): Node<K> {
  assertNoChildren(children, context);
  assertCaption(options, context);
  return node(kind, options as never);
}

export function animation(options: AnimationOptions, ...children: readonly never[]) { return media("animation", "animation()", options, children); }
export function audio(options: AudioOptions, ...children: readonly never[]) { return media("audio", "audio()", options, children); }
export function photo(options: PhotoOptions, ...children: readonly never[]) { return media("photo", "photo()", options, children); }
export function video(options: VideoOptions, ...children: readonly never[]) { return media("video", "video()", options, children); }
export function voiceNote(options: VoiceNoteOptions, ...children: readonly never[]) { return media("voice_note", "voiceNote()", options, children); }
