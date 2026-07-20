import type { RichTextAnchorLink, RichTextBankCardNumber, RichTextBotCommand, RichTextCashtag, RichTextDateTime, RichTextEmailAddress, RichTextHashtag, RichTextMention, RichTextNested, RichTextPhoneNumber, RichTextReference, RichTextReferenceLink, RichTextTextMention, RichTextUrl } from "../types.js";
import { type RichTextValue } from "../values.js";
import { type RichTextInput } from "./shared.js";
export type { RichTextInput } from "./shared.js";
export declare function bold(...children: readonly RichTextInput[]): RichTextValue<RichTextNested & {
    type: "bold";
}>;
export declare function italic(...children: readonly RichTextInput[]): RichTextValue<RichTextNested & {
    type: "italic";
}>;
export declare function underline(...children: readonly RichTextInput[]): RichTextValue<RichTextNested & {
    type: "underline";
}>;
export declare function strikethrough(...children: readonly RichTextInput[]): RichTextValue<RichTextNested & {
    type: "strikethrough";
}>;
export declare function spoiler(...children: readonly RichTextInput[]): RichTextValue<RichTextNested & {
    type: "spoiler";
}>;
export declare function subscript(...children: readonly RichTextInput[]): RichTextValue<RichTextNested & {
    type: "subscript";
}>;
export declare function superscript(...children: readonly RichTextInput[]): RichTextValue<RichTextNested & {
    type: "superscript";
}>;
export declare function marked(...children: readonly RichTextInput[]): RichTextValue<RichTextNested & {
    type: "marked";
}>;
export declare function code(...children: readonly RichTextInput[]): RichTextValue<RichTextNested & {
    type: "code";
}>;
export interface DateTimeOptions {
    unixTime: number;
    format: string;
}
export declare function dateTime(options: DateTimeOptions, ...children: readonly RichTextInput[]): RichTextValue<RichTextDateTime>;
export interface TextMentionOptions {
    user: Record<string, unknown>;
}
export declare function textMention(options: TextMentionOptions, ...children: readonly RichTextInput[]): RichTextValue<RichTextTextMention>;
export interface CustomEmojiOptions {
    id: string;
    alt: string;
}
export declare function customEmoji(options: CustomEmojiOptions, ...children: readonly never[]): RichTextValue<{
    type: "custom_emoji";
    custom_emoji_id: string;
    alternative_text: string;
}>;
export interface InlineMathOptions {
    expression: string;
}
export declare function inlineMath(options: InlineMathOptions, ...children: readonly never[]): RichTextValue<{
    type: "mathematical_expression";
    expression: string;
}>;
export interface LinkOptions {
    url: string;
}
export declare function link(options: LinkOptions, ...children: readonly RichTextInput[]): RichTextValue<RichTextUrl>;
export interface EmailOptions {
    address: string;
}
export declare function email(options: EmailOptions, ...children: readonly RichTextInput[]): RichTextValue<RichTextEmailAddress>;
export interface PhoneOptions {
    number: string;
}
export declare function phone(options: PhoneOptions, ...children: readonly RichTextInput[]): RichTextValue<RichTextPhoneNumber>;
export interface BankCardOptions {
    number: string;
}
export declare function bankCard(options: BankCardOptions, ...children: readonly RichTextInput[]): RichTextValue<RichTextBankCardNumber>;
export interface MentionOptions {
    username: string;
}
export declare function mention(options: MentionOptions, ...children: readonly RichTextInput[]): RichTextValue<RichTextMention>;
export interface HashtagOptions {
    value: string;
}
export declare function hashtag(options: HashtagOptions, ...children: readonly RichTextInput[]): RichTextValue<RichTextHashtag>;
export interface CashtagOptions {
    value: string;
}
export declare function cashtag(options: CashtagOptions, ...children: readonly RichTextInput[]): RichTextValue<RichTextCashtag>;
export interface BotCommandOptions {
    command: string;
}
export declare function botCommand(options: BotCommandOptions, ...children: readonly RichTextInput[]): RichTextValue<RichTextBotCommand>;
export interface TextAnchorOptions {
    name: string;
}
export declare function textAnchor(options: TextAnchorOptions, ...children: readonly never[]): RichTextValue<{
    type: "anchor";
    name: string;
}>;
export interface NamedTextOptions {
    name: string;
}
export declare function anchorLink(options: NamedTextOptions, ...children: readonly RichTextInput[]): RichTextValue<RichTextAnchorLink>;
export declare function reference(options: NamedTextOptions, ...children: readonly RichTextInput[]): RichTextValue<RichTextReference>;
export declare function referenceLink(options: NamedTextOptions, ...children: readonly RichTextInput[]): RichTextValue<RichTextReferenceLink>;
//# sourceMappingURL=text.d.ts.map