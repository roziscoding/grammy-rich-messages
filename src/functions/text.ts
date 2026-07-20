import type { Node, RichTextNodeKind } from "../jsx-runtime.js";
import { node } from "../node.js";
import {
  assertNoChildren,
  assertRichText,
  childrenProps,
  type RichTextInput,
} from "./shared.js";

export type { RichTextInput } from "./shared.js";

type NestedKind = "bold" | "italic" | "underline" | "strikethrough" | "spoiler" | "subscript" | "superscript" | "marked" | "code";

function nested<K extends NestedKind>(kind: K, context: string, children: readonly RichTextInput[]): Node<K> {
  assertRichText(children, context);
  return node(kind, childrenProps(children));
}

export function bold(...children: readonly RichTextInput[]) { return nested("bold", "bold()", children); }
export function italic(...children: readonly RichTextInput[]) { return nested("italic", "italic()", children); }
export function underline(...children: readonly RichTextInput[]) { return nested("underline", "underline()", children); }
export function strikethrough(...children: readonly RichTextInput[]) { return nested("strikethrough", "strikethrough()", children); }
export function spoiler(...children: readonly RichTextInput[]) { return nested("spoiler", "spoiler()", children); }
export function subscript(...children: readonly RichTextInput[]) { return nested("subscript", "subscript()", children); }
export function superscript(...children: readonly RichTextInput[]) { return nested("superscript", "superscript()", children); }
export function marked(...children: readonly RichTextInput[]) { return nested("marked", "marked()", children); }
export function code(...children: readonly RichTextInput[]) { return nested("code", "code()", children); }

function withChildren<K extends RichTextNodeKind, P extends object>(
  kind: K,
  context: string,
  options: P,
  children: readonly RichTextInput[],
): Node<K> {
  assertRichText(children, context);
  return node(kind, { ...options, ...childrenProps(children) } as never);
}

export interface DateTimeOptions { unixTime: number; format: string; }
export function dateTime(options: DateTimeOptions, ...children: readonly RichTextInput[]) {
  return withChildren("date_time", "dateTime()", options, children);
}

export interface TextMentionOptions { user: Record<string, unknown>; }
export function textMention(options: TextMentionOptions, ...children: readonly RichTextInput[]) {
  return withChildren("text_mention", "textMention()", options, children);
}

export interface CustomEmojiOptions { id: string; alt: string; }
export function customEmoji(options: CustomEmojiOptions, ...children: readonly never[]) {
  assertNoChildren(children, "customEmoji()");
  return node("custom_emoji", options);
}

export interface InlineMathOptions { expression: string; }
export function inlineMath(options: InlineMathOptions, ...children: readonly never[]) {
  assertNoChildren(children, "inlineMath()");
  return node("mathematical_expression", options);
}

export interface LinkOptions { url: string; }
export function link(options: LinkOptions, ...children: readonly RichTextInput[]) {
  return withChildren("url", "link()", options, children);
}

export interface EmailOptions { address: string; }
export function email(options: EmailOptions, ...children: readonly RichTextInput[]) {
  return withChildren("email_address", "email()", options, children);
}

export interface PhoneOptions { number: string; }
export function phone(options: PhoneOptions, ...children: readonly RichTextInput[]) {
  return withChildren("phone_number", "phone()", options, children);
}

export interface BankCardOptions { number: string; }
export function bankCard(options: BankCardOptions, ...children: readonly RichTextInput[]) {
  return withChildren("bank_card_number", "bankCard()", options, children);
}

export interface MentionOptions { username: string; }
export function mention(options: MentionOptions, ...children: readonly RichTextInput[]) {
  return withChildren("mention", "mention()", options, children);
}

export interface HashtagOptions { value: string; }
export function hashtag(options: HashtagOptions, ...children: readonly RichTextInput[]) {
  return withChildren("hashtag", "hashtag()", options, children);
}

export interface CashtagOptions { value: string; }
export function cashtag(options: CashtagOptions, ...children: readonly RichTextInput[]) {
  return withChildren("cashtag", "cashtag()", options, children);
}

export interface BotCommandOptions { command: string; }
export function botCommand(options: BotCommandOptions, ...children: readonly RichTextInput[]) {
  return withChildren("bot_command", "botCommand()", options, children);
}

export interface TextAnchorOptions { name: string; }
export function textAnchor(options: TextAnchorOptions, ...children: readonly never[]) {
  assertNoChildren(children, "textAnchor()");
  return node("anchor", options);
}

export interface NamedTextOptions { name: string; }
export function anchorLink(options: NamedTextOptions, ...children: readonly RichTextInput[]) {
  return withChildren("anchor_link", "anchorLink()", options, children);
}
export function reference(options: NamedTextOptions, ...children: readonly RichTextInput[]) {
  return withChildren("reference", "reference()", options, children);
}
export function referenceLink(options: NamedTextOptions, ...children: readonly RichTextInput[]) {
  return withChildren("reference_link", "referenceLink()", options, children);
}
