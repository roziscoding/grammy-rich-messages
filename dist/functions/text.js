import { node } from "../node.js";
import { assertNoChildren, assertRichText, childrenProps, } from "./shared.js";
function nested(kind, context, children) {
    assertRichText(children, context);
    return node(kind, childrenProps(children));
}
export function bold(...children) { return nested("bold", "bold()", children); }
export function italic(...children) { return nested("italic", "italic()", children); }
export function underline(...children) { return nested("underline", "underline()", children); }
export function strikethrough(...children) { return nested("strikethrough", "strikethrough()", children); }
export function spoiler(...children) { return nested("spoiler", "spoiler()", children); }
export function subscript(...children) { return nested("subscript", "subscript()", children); }
export function superscript(...children) { return nested("superscript", "superscript()", children); }
export function marked(...children) { return nested("marked", "marked()", children); }
export function code(...children) { return nested("code", "code()", children); }
function withChildren(kind, context, options, children) {
    assertRichText(children, context);
    return node(kind, { ...options, ...childrenProps(children) });
}
export function dateTime(options, ...children) {
    return withChildren("date_time", "dateTime()", options, children);
}
export function textMention(options, ...children) {
    return withChildren("text_mention", "textMention()", options, children);
}
export function customEmoji(options, ...children) {
    assertNoChildren(children, "customEmoji()");
    return node("custom_emoji", options);
}
export function inlineMath(options, ...children) {
    assertNoChildren(children, "inlineMath()");
    return node("mathematical_expression", options);
}
export function link(options, ...children) {
    return withChildren("url", "link()", options, children);
}
export function email(options, ...children) {
    return withChildren("email_address", "email()", options, children);
}
export function phone(options, ...children) {
    return withChildren("phone_number", "phone()", options, children);
}
export function bankCard(options, ...children) {
    return withChildren("bank_card_number", "bankCard()", options, children);
}
export function mention(options, ...children) {
    return withChildren("mention", "mention()", options, children);
}
export function hashtag(options, ...children) {
    return withChildren("hashtag", "hashtag()", options, children);
}
export function cashtag(options, ...children) {
    return withChildren("cashtag", "cashtag()", options, children);
}
export function botCommand(options, ...children) {
    return withChildren("bot_command", "botCommand()", options, children);
}
export function textAnchor(options, ...children) {
    assertNoChildren(children, "textAnchor()");
    return node("anchor", options);
}
export function anchorLink(options, ...children) {
    return withChildren("anchor_link", "anchorLink()", options, children);
}
export function reference(options, ...children) {
    return withChildren("reference", "reference()", options, children);
}
export function referenceLink(options, ...children) {
    return withChildren("reference_link", "referenceLink()", options, children);
}
//# sourceMappingURL=text.js.map