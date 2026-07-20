import { type RichTextInput } from "./shared.js";
export type { RichTextInput } from "./shared.js";
export declare function bold(...children: readonly RichTextInput[]): {
    readonly kind: "bold";
    readonly props: import("../jsx-runtime.js").ChildrenProps;
};
export declare function italic(...children: readonly RichTextInput[]): {
    readonly kind: "italic";
    readonly props: import("../jsx-runtime.js").ChildrenProps;
};
export declare function underline(...children: readonly RichTextInput[]): {
    readonly kind: "underline";
    readonly props: import("../jsx-runtime.js").ChildrenProps;
};
export declare function strikethrough(...children: readonly RichTextInput[]): {
    readonly kind: "strikethrough";
    readonly props: import("../jsx-runtime.js").ChildrenProps;
};
export declare function spoiler(...children: readonly RichTextInput[]): {
    readonly kind: "spoiler";
    readonly props: import("../jsx-runtime.js").ChildrenProps;
};
export declare function subscript(...children: readonly RichTextInput[]): {
    readonly kind: "subscript";
    readonly props: import("../jsx-runtime.js").ChildrenProps;
};
export declare function superscript(...children: readonly RichTextInput[]): {
    readonly kind: "superscript";
    readonly props: import("../jsx-runtime.js").ChildrenProps;
};
export declare function marked(...children: readonly RichTextInput[]): {
    readonly kind: "marked";
    readonly props: import("../jsx-runtime.js").ChildrenProps;
};
export declare function code(...children: readonly RichTextInput[]): {
    readonly kind: "code";
    readonly props: import("../jsx-runtime.js").ChildrenProps;
};
export interface DateTimeOptions {
    unixTime: number;
    format: string;
}
export declare function dateTime(options: DateTimeOptions, ...children: readonly RichTextInput[]): {
    readonly kind: "date_time";
    readonly props: import("../jsx-runtime.js").ChildrenProps & {
        unixTime: number;
        format: string;
    };
};
export interface TextMentionOptions {
    user: Record<string, unknown>;
}
export declare function textMention(options: TextMentionOptions, ...children: readonly RichTextInput[]): {
    readonly kind: "text_mention";
    readonly props: import("../jsx-runtime.js").ChildrenProps & {
        user: Record<string, unknown>;
    };
};
export interface CustomEmojiOptions {
    id: string;
    alt: string;
}
export declare function customEmoji(options: CustomEmojiOptions, ...children: readonly never[]): {
    readonly kind: "custom_emoji";
    readonly props: {
        id: string;
        alt: string;
    } & import("../jsx-runtime.js").NoChildrenProps;
};
export interface InlineMathOptions {
    expression: string;
}
export declare function inlineMath(options: InlineMathOptions, ...children: readonly never[]): {
    readonly kind: "mathematical_expression";
    readonly props: {
        expression: string;
    } & import("../jsx-runtime.js").NoChildrenProps;
};
export interface LinkOptions {
    url: string;
}
export declare function link(options: LinkOptions, ...children: readonly RichTextInput[]): {
    readonly kind: "url";
    readonly props: import("../jsx-runtime.js").ChildrenProps & {
        url: string;
    };
};
export interface EmailOptions {
    address: string;
}
export declare function email(options: EmailOptions, ...children: readonly RichTextInput[]): {
    readonly kind: "email_address";
    readonly props: import("../jsx-runtime.js").ChildrenProps & {
        address: string;
    };
};
export interface PhoneOptions {
    number: string;
}
export declare function phone(options: PhoneOptions, ...children: readonly RichTextInput[]): {
    readonly kind: "phone_number";
    readonly props: import("../jsx-runtime.js").ChildrenProps & {
        number: string;
    };
};
export interface BankCardOptions {
    number: string;
}
export declare function bankCard(options: BankCardOptions, ...children: readonly RichTextInput[]): {
    readonly kind: "bank_card_number";
    readonly props: import("../jsx-runtime.js").ChildrenProps & {
        number: string;
    };
};
export interface MentionOptions {
    username: string;
}
export declare function mention(options: MentionOptions, ...children: readonly RichTextInput[]): {
    readonly kind: "mention";
    readonly props: import("../jsx-runtime.js").ChildrenProps & {
        username: string;
    };
};
export interface HashtagOptions {
    value: string;
}
export declare function hashtag(options: HashtagOptions, ...children: readonly RichTextInput[]): {
    readonly kind: "hashtag";
    readonly props: import("../jsx-runtime.js").ChildrenProps & {
        value: string;
    };
};
export interface CashtagOptions {
    value: string;
}
export declare function cashtag(options: CashtagOptions, ...children: readonly RichTextInput[]): {
    readonly kind: "cashtag";
    readonly props: import("../jsx-runtime.js").ChildrenProps & {
        value: string;
    };
};
export interface BotCommandOptions {
    command: string;
}
export declare function botCommand(options: BotCommandOptions, ...children: readonly RichTextInput[]): {
    readonly kind: "bot_command";
    readonly props: import("../jsx-runtime.js").ChildrenProps & {
        command: string;
    };
};
export interface TextAnchorOptions {
    name: string;
}
export declare function textAnchor(options: TextAnchorOptions, ...children: readonly never[]): {
    readonly kind: "anchor";
    readonly props: {
        name: string;
    } & import("../jsx-runtime.js").NoChildrenProps;
};
export interface NamedTextOptions {
    name: string;
}
export declare function anchorLink(options: NamedTextOptions, ...children: readonly RichTextInput[]): {
    readonly kind: "anchor_link";
    readonly props: import("../jsx-runtime.js").ChildrenProps & {
        name: string;
    };
};
export declare function reference(options: NamedTextOptions, ...children: readonly RichTextInput[]): {
    readonly kind: "reference";
    readonly props: import("../jsx-runtime.js").ChildrenProps & {
        name: string;
    };
};
export declare function referenceLink(options: NamedTextOptions, ...children: readonly RichTextInput[]): {
    readonly kind: "reference_link";
    readonly props: import("../jsx-runtime.js").ChildrenProps & {
        name: string;
    };
};
//# sourceMappingURL=text.d.ts.map