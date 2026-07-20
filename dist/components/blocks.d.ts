import type { Child } from "../jsx-runtime.js";
import type { InputMediaAnimation, InputMediaAudio, InputMediaPhoto, InputMediaVideo, InputMediaVoiceNote, Location } from "../types.js";
import type { CaptionProps, ChildrenProps, ElementChildrenProps, NoChildrenProps } from "./shared.js";
export declare function Paragraph({ children }: ChildrenProps): {
    readonly kind: "paragraph";
    readonly props: ChildrenProps;
};
export declare function Heading({ children, ...options }: ChildrenProps & {
    size: 1 | 2 | 3 | 4 | 5 | 6;
}): {
    readonly kind: "heading";
    readonly props: ChildrenProps & {
        size: 1 | 2 | 3 | 4 | 5 | 6;
    };
};
export declare function Pre({ children, ...options }: ChildrenProps & {
    language?: string;
}): {
    readonly kind: "pre";
    readonly props: ChildrenProps & {
        language?: string;
    };
};
export declare function Footer({ children }: ChildrenProps): {
    readonly kind: "footer";
    readonly props: ChildrenProps;
};
export declare function Divider({ children }: NoChildrenProps): {
    readonly kind: "divider";
    readonly props: NoChildrenProps;
};
export declare function MathBlock({ children, ...options }: {
    expression: string;
} & NoChildrenProps): {
    readonly kind: "block-mathematical_expression";
    readonly props: {
        expression: string;
    } & NoChildrenProps;
};
export declare function BlockAnchor({ children, ...options }: {
    name: string;
} & NoChildrenProps): {
    readonly kind: "block-anchor";
    readonly props: {
        name: string;
    } & NoChildrenProps;
};
export declare function List({ children }: ElementChildrenProps): {
    readonly kind: "list";
    readonly props: ElementChildrenProps;
};
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
}): {
    readonly kind: "list-item";
    readonly props: ElementChildrenProps & (import("./shared.js").ListItemSelectionProps & {
        value?: number;
        labelType?: "a" | "A" | "i" | "I" | "1";
    });
};
export declare function BlockQuote({ children, credit }: ElementChildrenProps & {
    credit?: Child;
}): {
    readonly kind: "blockquote";
    readonly props: ElementChildrenProps & {
        credit?: Child;
    };
};
export declare function PullQuote({ children, credit }: ChildrenProps & {
    credit?: Child;
}): {
    readonly kind: "pullquote";
    readonly props: ChildrenProps & {
        credit?: Child;
    };
};
export declare function Collage({ children, ...options }: ElementChildrenProps & CaptionProps): {
    readonly kind: "collage";
    readonly props: ElementChildrenProps & CaptionProps;
};
export declare function Slideshow({ children, ...options }: ElementChildrenProps & CaptionProps): {
    readonly kind: "slideshow";
    readonly props: ElementChildrenProps & CaptionProps;
};
export declare function Table({ children, ...options }: ElementChildrenProps & {
    bordered?: boolean;
    striped?: boolean;
    caption?: Child;
}): {
    readonly kind: "table";
    readonly props: ElementChildrenProps & {
        bordered?: boolean;
        striped?: boolean;
        caption?: Child;
    };
};
export declare function TableRow({ children }: ElementChildrenProps): {
    readonly kind: "table-row";
    readonly props: ElementChildrenProps;
};
export declare function TableCell({ children, ...options }: ChildrenProps & {
    header?: boolean;
    colspan?: number;
    rowspan?: number;
    align?: "left" | "center" | "right";
    valign?: "top" | "middle" | "bottom";
}): {
    readonly kind: "table-cell";
    readonly props: ChildrenProps & {
        header?: boolean;
        colspan?: number;
        rowspan?: number;
        align?: "left" | "center" | "right";
        valign?: "top" | "middle" | "bottom";
    };
};
export declare function Details({ children, summary, open }: ElementChildrenProps & {
    summary: Child;
    open?: boolean;
}): {
    readonly kind: "details";
    readonly props: ElementChildrenProps & {
        summary: Child;
        open?: boolean;
    };
};
export declare function Map({ children, ...options }: {
    location: Location;
    zoom: number;
    width: number;
    height: number;
} & CaptionProps & NoChildrenProps): {
    readonly kind: "map";
    readonly props: {
        location: Location;
        zoom: number;
        width: number;
        height: number;
    } & (CaptionProps & NoChildrenProps);
};
export declare function Animation({ children, ...options }: {
    media: InputMediaAnimation;
} & CaptionProps & NoChildrenProps): {
    readonly kind: "animation";
    readonly props: {
        media: InputMediaAnimation;
    } & (CaptionProps & NoChildrenProps);
};
export declare function Audio({ children, ...options }: {
    media: InputMediaAudio;
} & CaptionProps & NoChildrenProps): {
    readonly kind: "audio";
    readonly props: {
        media: InputMediaAudio;
    } & (CaptionProps & NoChildrenProps);
};
export declare function Photo({ children, ...options }: {
    media: InputMediaPhoto;
} & CaptionProps & NoChildrenProps): {
    readonly kind: "photo";
    readonly props: {
        media: InputMediaPhoto;
    } & (CaptionProps & NoChildrenProps);
};
export declare function Video({ children, ...options }: {
    media: InputMediaVideo;
} & CaptionProps & NoChildrenProps): {
    readonly kind: "video";
    readonly props: {
        media: InputMediaVideo;
    } & (CaptionProps & NoChildrenProps);
};
export declare function VoiceNote({ children, ...options }: {
    media: InputMediaVoiceNote;
} & CaptionProps & NoChildrenProps): {
    readonly kind: "voice_note";
    readonly props: {
        media: InputMediaVoiceNote;
    } & (CaptionProps & NoChildrenProps);
};
/**
 * A temporary “Thinking…” block. Telegram only permits this block in
 * sendRichMessageDraft payloads; render() cannot infer the eventual endpoint.
 */
export declare function Thinking({ children }: ChildrenProps): {
    readonly kind: "thinking";
    readonly props: ChildrenProps;
};
export {};
//# sourceMappingURL=blocks.d.ts.map