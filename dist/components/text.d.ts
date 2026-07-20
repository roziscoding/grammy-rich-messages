import type { ChildrenProps, NoChildrenProps } from "./shared.js";
export declare function Bold({ children }: ChildrenProps): import("../values.js").RichTextValue<import("../types.js").RichTextNested & {
    type: "bold";
}>;
export declare function Italic({ children }: ChildrenProps): import("../values.js").RichTextValue<import("../types.js").RichTextNested & {
    type: "italic";
}>;
export declare function Underline({ children }: ChildrenProps): import("../values.js").RichTextValue<import("../types.js").RichTextNested & {
    type: "underline";
}>;
export declare function Strikethrough({ children }: ChildrenProps): import("../values.js").RichTextValue<import("../types.js").RichTextNested & {
    type: "strikethrough";
}>;
export declare function Spoiler({ children }: ChildrenProps): import("../values.js").RichTextValue<import("../types.js").RichTextNested & {
    type: "spoiler";
}>;
export declare function Subscript({ children }: ChildrenProps): import("../values.js").RichTextValue<import("../types.js").RichTextNested & {
    type: "subscript";
}>;
export declare function Superscript({ children }: ChildrenProps): import("../values.js").RichTextValue<import("../types.js").RichTextNested & {
    type: "superscript";
}>;
export declare function Marked({ children }: ChildrenProps): import("../values.js").RichTextValue<import("../types.js").RichTextNested & {
    type: "marked";
}>;
export declare function Code({ children }: ChildrenProps): import("../values.js").RichTextValue<import("../types.js").RichTextNested & {
    type: "code";
}>;
export declare function DateTime({ children, ...options }: ChildrenProps & {
    unixTime: number;
    format: string;
}): import("../values.js").RichTextValue<import("../types.js").RichTextDateTime>;
export declare function TextMention({ children, ...options }: ChildrenProps & {
    user: Record<string, unknown>;
}): import("../values.js").RichTextValue<import("../types.js").RichTextTextMention>;
export declare function CustomEmoji({ children, ...options }: {
    id: string;
    alt: string;
} & NoChildrenProps): import("../values.js").RichTextValue<{
    type: "custom_emoji";
    custom_emoji_id: string;
    alternative_text: string;
}>;
export declare function InlineMath({ children, ...options }: {
    expression: string;
} & NoChildrenProps): import("../values.js").RichTextValue<{
    type: "mathematical_expression";
    expression: string;
}>;
export declare function Link({ children, ...options }: ChildrenProps & {
    url: string;
}): import("../values.js").RichTextValue<import("../types.js").RichTextUrl>;
export declare function Email({ children, ...options }: ChildrenProps & {
    address: string;
}): import("../values.js").RichTextValue<import("../types.js").RichTextEmailAddress>;
export declare function Phone({ children, ...options }: ChildrenProps & {
    number: string;
}): import("../values.js").RichTextValue<import("../types.js").RichTextPhoneNumber>;
export declare function BankCard({ children, ...options }: ChildrenProps & {
    number: string;
}): import("../values.js").RichTextValue<import("../types.js").RichTextBankCardNumber>;
export declare function Mention({ children, ...options }: ChildrenProps & {
    username: string;
}): import("../values.js").RichTextValue<import("../types.js").RichTextMention>;
export declare function Hashtag({ children, ...options }: ChildrenProps & {
    value: string;
}): import("../values.js").RichTextValue<import("../types.js").RichTextHashtag>;
export declare function Cashtag({ children, ...options }: ChildrenProps & {
    value: string;
}): import("../values.js").RichTextValue<import("../types.js").RichTextCashtag>;
export declare function BotCommand({ children, ...options }: ChildrenProps & {
    command: string;
}): import("../values.js").RichTextValue<import("../types.js").RichTextBotCommand>;
export declare function TextAnchor({ children, ...options }: {
    name: string;
} & NoChildrenProps): import("../values.js").RichTextValue<{
    type: "anchor";
    name: string;
}>;
export declare function AnchorLink({ children, ...options }: ChildrenProps & {
    name: string;
}): import("../values.js").RichTextValue<import("../types.js").RichTextAnchorLink>;
export declare function Reference({ children, ...options }: ChildrenProps & {
    name: string;
}): import("../values.js").RichTextValue<import("../types.js").RichTextReference>;
export declare function ReferenceLink({ children, ...options }: ChildrenProps & {
    name: string;
}): import("../values.js").RichTextValue<import("../types.js").RichTextReferenceLink>;
//# sourceMappingURL=text.d.ts.map