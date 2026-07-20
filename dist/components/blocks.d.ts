import type { Child } from "../jsx-runtime.js";
import type { InputMediaAnimation, InputMediaAudio, InputMediaPhoto, InputMediaVideo, InputMediaVoiceNote, Location } from "../types.js";
import type { CaptionProps, ChildrenProps, ElementChildrenProps, NoChildrenProps } from "./shared.js";
export declare function Paragraph({ children }: ChildrenProps): import("../values.js").BlockValue<import("../types.js").InputRichBlockParagraph>;
export declare function Heading({ children, ...options }: ChildrenProps & {
    size: 1 | 2 | 3 | 4 | 5 | 6;
}): import("../values.js").BlockValue<{
    type: "heading";
    text: import("../types.js").RichText;
    size: 1 | 2 | 3 | 4 | 5 | 6;
}>;
export declare function Pre({ children, ...options }: ChildrenProps & {
    language?: string;
}): import("../values.js").BlockValue<import("../types.js").InputRichBlockPre>;
export declare function Footer({ children }: ChildrenProps): import("../values.js").BlockValue<import("../types.js").InputRichBlockFooter>;
export declare function Divider({ children }: NoChildrenProps): import("../values.js").BlockValue<{
    type: "divider";
}>;
export declare function MathBlock({ children, ...options }: {
    expression: string;
} & NoChildrenProps): import("../values.js").BlockValue<{
    type: "mathematical_expression";
    expression: string;
}>;
export declare function BlockAnchor({ children, ...options }: {
    name: string;
} & NoChildrenProps): import("../values.js").BlockValue<{
    type: "anchor";
    name: string;
}>;
export declare function List({ children }: ElementChildrenProps): import("../values.js").BlockValue<{
    type: "list";
    items: import("../values.js").ListItemValue[];
}>;
type ListItemSelectionProps = {
    checkbox: true;
    checked?: boolean;
} | {
    checkbox?: false;
    checked?: never;
};
export declare function ListItem({ children, ...options }: ElementChildrenProps & ListItemSelectionProps & {
    value?: number;
    labelType?: "a" | "A" | "i" | "I" | "1";
}): import("../values.js").ListItemValue;
export declare function BlockQuote({ children, credit }: ElementChildrenProps & {
    credit?: Child;
}): import("../values.js").BlockValue<import("../types.js").InputRichBlockBlockQuote>;
export declare function PullQuote({ children, credit }: ChildrenProps & {
    credit?: Child;
}): import("../values.js").BlockValue<import("../types.js").InputRichBlockPullQuote>;
export declare function Collage({ children, ...options }: ElementChildrenProps & CaptionProps): import("../values.js").BlockValue<import("../types.js").InputRichBlockCollage>;
export declare function Slideshow({ children, ...options }: ElementChildrenProps & CaptionProps): import("../values.js").BlockValue<import("../types.js").InputRichBlockSlideshow>;
export declare function Table({ children, ...options }: ElementChildrenProps & {
    bordered?: boolean;
    striped?: boolean;
    caption?: Child;
}): import("../values.js").BlockValue<import("../types.js").InputRichBlockTable>;
export declare function TableRow({ children }: ElementChildrenProps): import("../values.js").TableRowValue;
export declare function TableCell({ children, ...options }: ChildrenProps & {
    header?: boolean;
    colspan?: number;
    rowspan?: number;
    align?: "left" | "center" | "right";
    valign?: "top" | "middle" | "bottom";
}): import("../values.js").TableCellValue;
export declare function Details({ children, summary, open }: ElementChildrenProps & {
    summary: Child;
    open?: boolean;
}): import("../values.js").BlockValue<{
    type: "details";
    summary: import("../types.js").RichText;
    blocks: import("../values.js").BlockValue[];
    is_open?: true;
}>;
export declare function Map({ children, ...options }: {
    location: Location;
    zoom: number;
    width: number;
    height: number;
} & CaptionProps & NoChildrenProps): import("../values.js").BlockValue<{
    type: "map";
    location: Location;
    zoom: number;
    width: number;
    height: number;
    caption?: import("../types.js").RichBlockCaption;
}>;
export declare function Animation({ children, ...options }: {
    media: InputMediaAnimation;
} & CaptionProps & NoChildrenProps): import("../values.js").BlockValue<import("../types.js").InputRichBlockAnimation>;
export declare function Audio({ children, ...options }: {
    media: InputMediaAudio;
} & CaptionProps & NoChildrenProps): import("../values.js").BlockValue<import("../types.js").InputRichBlockAudio>;
export declare function Photo({ children, ...options }: {
    media: InputMediaPhoto;
} & CaptionProps & NoChildrenProps): import("../values.js").BlockValue<import("../types.js").InputRichBlockPhoto>;
export declare function Video({ children, ...options }: {
    media: InputMediaVideo;
} & CaptionProps & NoChildrenProps): import("../values.js").BlockValue<import("../types.js").InputRichBlockVideo>;
export declare function VoiceNote({ children, ...options }: {
    media: InputMediaVoiceNote;
} & CaptionProps & NoChildrenProps): import("../values.js").BlockValue<import("../types.js").InputRichBlockVoiceNote>;
/**
 * A temporary “Thinking…” block. Telegram only permits this block in
 * sendRichMessageDraft payloads; the component cannot infer the eventual endpoint.
 */
export declare function Thinking({ children }: ChildrenProps): import("../values.js").BlockValue<import("../types.js").InputRichBlockThinking>;
export {};
//# sourceMappingURL=blocks.d.ts.map