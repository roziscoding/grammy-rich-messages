import { brand } from "../values.js";
import { assertNoChildren, richText } from "./shared.js";
function nested(type, context, children) {
    return brand({ type, text: richText(children, context) }, "rich-text");
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
function entity(value) {
    return brand(value, "rich-text");
}
export function dateTime(options, ...children) {
    return entity({
        type: "date_time",
        text: richText(children, "dateTime()"),
        unix_time: options.unixTime,
        date_time_format: options.format,
    });
}
export function textMention(options, ...children) {
    return entity({ type: "text_mention", text: richText(children, "textMention()"), user: options.user });
}
export function customEmoji(options, ...children) {
    assertNoChildren(children, "customEmoji()");
    return entity({ type: "custom_emoji", custom_emoji_id: options.id, alternative_text: options.alt });
}
export function inlineMath(options, ...children) {
    assertNoChildren(children, "inlineMath()");
    return entity({ type: "mathematical_expression", expression: options.expression });
}
function textEntity(value, context, children) {
    return entity({ ...value, text: richText(children, context) });
}
export function link(options, ...children) {
    return textEntity({ type: "url", url: options.url }, "link()", children);
}
export function email(options, ...children) {
    return textEntity({ type: "email_address", email_address: options.address }, "email()", children);
}
export function phone(options, ...children) {
    return textEntity({ type: "phone_number", phone_number: options.number }, "phone()", children);
}
export function bankCard(options, ...children) {
    return textEntity({ type: "bank_card_number", bank_card_number: options.number }, "bankCard()", children);
}
export function mention(options, ...children) {
    return textEntity({ type: "mention", username: options.username }, "mention()", children);
}
export function hashtag(options, ...children) {
    return textEntity({ type: "hashtag", hashtag: options.value }, "hashtag()", children);
}
export function cashtag(options, ...children) {
    return textEntity({ type: "cashtag", cashtag: options.value }, "cashtag()", children);
}
export function botCommand(options, ...children) {
    return textEntity({ type: "bot_command", bot_command: options.command }, "botCommand()", children);
}
export function textAnchor(options, ...children) {
    assertNoChildren(children, "textAnchor()");
    return entity({ type: "anchor", name: options.name });
}
export function anchorLink(options, ...children) {
    return textEntity({ type: "anchor_link", anchor_name: options.name }, "anchorLink()", children);
}
export function reference(options, ...children) {
    return textEntity({ type: "reference", name: options.name }, "reference()", children);
}
export function referenceLink(options, ...children) {
    return textEntity({ type: "reference_link", reference_name: options.name }, "referenceLink()", children);
}
//# sourceMappingURL=text.js.map