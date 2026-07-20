import type { InputMediaAnimation, InputMediaAudio, InputMediaPhoto, InputMediaVideo, InputMediaVoiceNote, InputRichBlock, Location } from "../types.js";
import { type BlockValue, type ListItemValue, type TableCellValue, type TableRowValue } from "../values.js";
import { type BlockInput, type ListItemInput, type RichTextInput, type TableCellInput, type TableRowInput } from "./shared.js";
export type { BlockInput, ListItemInput, TableCellInput, TableRowInput } from "./shared.js";
export type CaptionOptions = {
    caption: RichTextInput;
    credit?: RichTextInput;
} | {
    caption?: undefined;
    credit?: never;
};
export declare function paragraph(...children: readonly RichTextInput[]): BlockValue<import("../types.js").InputRichBlockParagraph>;
export declare function footer(...children: readonly RichTextInput[]): BlockValue<import("../types.js").InputRichBlockFooter>;
export declare function thinking(...children: readonly RichTextInput[]): BlockValue<import("../types.js").InputRichBlockThinking>;
export interface HeadingOptions {
    size: 1 | 2 | 3 | 4 | 5 | 6;
}
export declare function heading(options: HeadingOptions, ...children: readonly RichTextInput[]): BlockValue<{
    type: "heading";
    text: import("../types.js").RichText;
    size: 1 | 2 | 3 | 4 | 5 | 6;
}>;
export interface PreOptions {
    language?: string;
}
export declare function pre(...children: readonly RichTextInput[]): BlockValue<Extract<InputRichBlock, {
    type: "pre";
}>>;
export declare function pre(options: PreOptions, ...children: readonly RichTextInput[]): BlockValue<Extract<InputRichBlock, {
    type: "pre";
}>>;
export declare function divider(...children: readonly never[]): BlockValue<{
    type: "divider";
}>;
export interface MathBlockOptions {
    expression: string;
}
export declare function mathBlock(options: MathBlockOptions, ...children: readonly never[]): BlockValue<{
    type: "mathematical_expression";
    expression: string;
}>;
export interface BlockAnchorOptions {
    name: string;
}
export declare function blockAnchor(options: BlockAnchorOptions, ...children: readonly never[]): BlockValue<{
    type: "anchor";
    name: string;
}>;
export declare function list(...items: readonly ListItemInput[]): BlockValue<{
    type: "list";
    items: ListItemValue[];
}>;
export type ListItemOptions = ({
    checkbox: true;
    checked?: boolean;
} | {
    checkbox?: false;
    checked?: never;
}) & {
    value?: number;
    labelType?: "a" | "A" | "i" | "I" | "1";
};
export declare function listItem(...children: readonly BlockInput[]): ListItemValue;
export declare function listItem(options: ListItemOptions, ...children: readonly BlockInput[]): ListItemValue;
export interface BlockQuoteOptions {
    credit?: RichTextInput;
}
export declare function blockQuote(...children: readonly BlockInput[]): BlockValue<Extract<InputRichBlock, {
    type: "blockquote";
}>>;
export declare function blockQuote(options: BlockQuoteOptions, ...children: readonly BlockInput[]): BlockValue<Extract<InputRichBlock, {
    type: "blockquote";
}>>;
export interface PullQuoteOptions {
    credit?: RichTextInput;
}
export declare function pullQuote(...children: readonly RichTextInput[]): BlockValue<Extract<InputRichBlock, {
    type: "pullquote";
}>>;
export declare function pullQuote(options: PullQuoteOptions, ...children: readonly RichTextInput[]): BlockValue<Extract<InputRichBlock, {
    type: "pullquote";
}>>;
export declare function collage(...children: readonly BlockInput[]): BlockValue<Extract<InputRichBlock, {
    type: "collage";
}>>;
export declare function collage(options: CaptionOptions, ...children: readonly BlockInput[]): BlockValue<Extract<InputRichBlock, {
    type: "collage";
}>>;
export declare function slideshow(...children: readonly BlockInput[]): BlockValue<Extract<InputRichBlock, {
    type: "slideshow";
}>>;
export declare function slideshow(options: CaptionOptions, ...children: readonly BlockInput[]): BlockValue<Extract<InputRichBlock, {
    type: "slideshow";
}>>;
export interface TableOptions {
    bordered?: boolean;
    striped?: boolean;
    caption?: RichTextInput;
}
export declare function table(...rows: readonly TableRowInput[]): BlockValue<Extract<InputRichBlock, {
    type: "table";
}>>;
export declare function table(options: TableOptions, ...rows: readonly TableRowInput[]): BlockValue<Extract<InputRichBlock, {
    type: "table";
}>>;
export declare function tableRow(...children: readonly TableCellInput[]): TableRowValue;
export interface TableCellOptions {
    header?: boolean;
    colspan?: number;
    rowspan?: number;
    align?: "left" | "center" | "right";
    valign?: "top" | "middle" | "bottom";
}
export declare function tableCell(...children: readonly RichTextInput[]): TableCellValue;
export declare function tableCell(options: TableCellOptions, ...children: readonly RichTextInput[]): TableCellValue;
export interface DetailsOptions {
    summary: RichTextInput;
    open?: boolean;
}
export declare function details(options: DetailsOptions, ...children: readonly BlockInput[]): BlockValue<{
    type: "details";
    summary: import("../types.js").RichText;
    blocks: BlockValue[];
    is_open?: true;
}>;
export type MapOptions = CaptionOptions & {
    location: Location;
    zoom: number;
    width: number;
    height: number;
};
export declare function map(options: MapOptions, ...children: readonly never[]): BlockValue<{
    type: "map";
    location: Location;
    zoom: number;
    width: number;
    height: number;
    caption?: import("../types.js").RichBlockCaption;
}>;
export type AnimationOptions = {
    media: InputMediaAnimation;
} & CaptionOptions;
export type AudioOptions = {
    media: InputMediaAudio;
} & CaptionOptions;
export type PhotoOptions = {
    media: InputMediaPhoto;
} & CaptionOptions;
export type VideoOptions = {
    media: InputMediaVideo;
} & CaptionOptions;
export type VoiceNoteOptions = {
    media: InputMediaVoiceNote;
} & CaptionOptions;
export declare function animation(options: AnimationOptions, ...children: readonly never[]): BlockValue<import("../types.js").InputRichBlockAnimation>;
export declare function audio(options: AudioOptions, ...children: readonly never[]): BlockValue<import("../types.js").InputRichBlockAudio>;
export declare function photo(options: PhotoOptions, ...children: readonly never[]): BlockValue<import("../types.js").InputRichBlockPhoto>;
export declare function video(options: VideoOptions, ...children: readonly never[]): BlockValue<import("../types.js").InputRichBlockVideo>;
export declare function voiceNote(options: VoiceNoteOptions, ...children: readonly never[]): BlockValue<import("../types.js").InputRichBlockVoiceNote>;
//# sourceMappingURL=blocks.d.ts.map