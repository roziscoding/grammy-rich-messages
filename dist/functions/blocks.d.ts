import type { Node } from "../jsx-runtime.js";
import type { InputMediaAnimation, InputMediaAudio, InputMediaPhoto, InputMediaVideo, InputMediaVoiceNote, Location } from "../types.js";
import { type BlockInput, type NodeInput, type RichTextInput } from "./shared.js";
export type { BlockInput, NodeInput } from "./shared.js";
export type CaptionOptions = {
    caption: RichTextInput;
    credit?: RichTextInput;
} | {
    caption?: undefined;
    credit?: never;
};
export declare function paragraph(...children: readonly RichTextInput[]): {
    readonly kind: "paragraph";
    readonly props: import("../jsx-runtime.js").ChildrenProps;
};
export declare function footer(...children: readonly RichTextInput[]): {
    readonly kind: "footer";
    readonly props: import("../jsx-runtime.js").ChildrenProps;
};
export declare function thinking(...children: readonly RichTextInput[]): {
    readonly kind: "thinking";
    readonly props: import("../jsx-runtime.js").ChildrenProps;
};
export interface HeadingOptions {
    size: 1 | 2 | 3 | 4 | 5 | 6;
}
export declare function heading(options: HeadingOptions, ...children: readonly RichTextInput[]): {
    readonly kind: "heading";
    readonly props: import("../jsx-runtime.js").ChildrenProps & {
        size: 1 | 2 | 3 | 4 | 5 | 6;
    };
};
export interface PreOptions {
    language?: string;
}
export declare function pre(...children: readonly RichTextInput[]): Node<"pre">;
export declare function pre(options: PreOptions, ...children: readonly RichTextInput[]): Node<"pre">;
export declare function divider(...children: readonly never[]): {
    readonly kind: "divider";
    readonly props: import("../jsx-runtime.js").NoChildrenProps;
};
export interface MathBlockOptions {
    expression: string;
}
export declare function mathBlock(options: MathBlockOptions, ...children: readonly never[]): {
    readonly kind: "block-mathematical_expression";
    readonly props: {
        expression: string;
    } & import("../jsx-runtime.js").NoChildrenProps;
};
export interface BlockAnchorOptions {
    name: string;
}
export declare function blockAnchor(options: BlockAnchorOptions, ...children: readonly never[]): {
    readonly kind: "block-anchor";
    readonly props: {
        name: string;
    } & import("../jsx-runtime.js").NoChildrenProps;
};
export declare function list(...items: readonly NodeInput<"list-item">[]): {
    readonly kind: "list";
    readonly props: import("../jsx-runtime.js").ElementChildrenProps;
};
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
export declare function listItem(...blocks: readonly BlockInput[]): Node<"list-item">;
export declare function listItem(options: ListItemOptions, ...blocks: readonly BlockInput[]): Node<"list-item">;
export interface BlockQuoteOptions {
    credit?: RichTextInput;
}
export declare function blockQuote(...blocks: readonly BlockInput[]): Node<"blockquote">;
export declare function blockQuote(options: BlockQuoteOptions, ...blocks: readonly BlockInput[]): Node<"blockquote">;
export interface PullQuoteOptions {
    credit?: RichTextInput;
}
export declare function pullQuote(...children: readonly RichTextInput[]): Node<"pullquote">;
export declare function pullQuote(options: PullQuoteOptions, ...children: readonly RichTextInput[]): Node<"pullquote">;
export declare function collage(...blocks: readonly BlockInput[]): Node<"collage">;
export declare function collage(options: CaptionOptions, ...blocks: readonly BlockInput[]): Node<"collage">;
export declare function slideshow(...blocks: readonly BlockInput[]): Node<"slideshow">;
export declare function slideshow(options: CaptionOptions, ...blocks: readonly BlockInput[]): Node<"slideshow">;
export interface TableOptions {
    bordered?: boolean;
    striped?: boolean;
    caption?: RichTextInput;
}
export declare function table(...rows: readonly NodeInput<"table-row">[]): Node<"table">;
export declare function table(options: TableOptions, ...rows: readonly NodeInput<"table-row">[]): Node<"table">;
export declare function tableRow(...cells: readonly NodeInput<"table-cell">[]): {
    readonly kind: "table-row";
    readonly props: import("../jsx-runtime.js").ElementChildrenProps;
};
export interface TableCellOptions {
    header?: boolean;
    colspan?: number;
    rowspan?: number;
    align?: "left" | "center" | "right";
    valign?: "top" | "middle" | "bottom";
}
export declare function tableCell(...children: readonly RichTextInput[]): Node<"table-cell">;
export declare function tableCell(options: TableCellOptions, ...children: readonly RichTextInput[]): Node<"table-cell">;
export interface DetailsOptions {
    summary: RichTextInput;
    open?: boolean;
}
export declare function details(options: DetailsOptions, ...blocks: readonly BlockInput[]): {
    readonly kind: "details";
    readonly props: import("../jsx-runtime.js").ElementChildrenProps & {
        summary: import("../jsx-runtime.js").Child;
        open?: boolean;
    };
};
export type MapOptions = CaptionOptions & {
    location: Location;
    zoom: number;
    width: number;
    height: number;
};
export declare function map(options: MapOptions, ...children: readonly never[]): {
    readonly kind: "map";
    readonly props: {
        location: Location;
        zoom: number;
        width: number;
        height: number;
    } & (import("../jsx-runtime.js").CaptionProps & import("../jsx-runtime.js").NoChildrenProps);
};
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
export declare function animation(options: AnimationOptions, ...children: readonly never[]): {
    readonly kind: "animation";
    readonly props: {
        media: InputMediaAnimation;
    } & (import("../jsx-runtime.js").CaptionProps & import("../jsx-runtime.js").NoChildrenProps);
};
export declare function audio(options: AudioOptions, ...children: readonly never[]): {
    readonly kind: "audio";
    readonly props: {
        media: InputMediaAudio;
    } & (import("../jsx-runtime.js").CaptionProps & import("../jsx-runtime.js").NoChildrenProps);
};
export declare function photo(options: PhotoOptions, ...children: readonly never[]): {
    readonly kind: "photo";
    readonly props: {
        media: InputMediaPhoto;
    } & (import("../jsx-runtime.js").CaptionProps & import("../jsx-runtime.js").NoChildrenProps);
};
export declare function video(options: VideoOptions, ...children: readonly never[]): {
    readonly kind: "video";
    readonly props: {
        media: InputMediaVideo;
    } & (import("../jsx-runtime.js").CaptionProps & import("../jsx-runtime.js").NoChildrenProps);
};
export declare function voiceNote(options: VoiceNoteOptions, ...children: readonly never[]): {
    readonly kind: "voice_note";
    readonly props: {
        media: InputMediaVoiceNote;
    } & (import("../jsx-runtime.js").CaptionProps & import("../jsx-runtime.js").NoChildrenProps);
};
//# sourceMappingURL=blocks.d.ts.map