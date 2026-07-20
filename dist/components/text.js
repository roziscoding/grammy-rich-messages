import { anchorLink, bankCard, bold, botCommand, cashtag, code, customEmoji, dateTime, email, hashtag, inlineMath, italic, link, marked, mention, phone, reference, referenceLink, spoiler, strikethrough, subscript, superscript, textAnchor, textMention, underline, } from "../functions/text.js";
function richChildren(children) {
    return children === undefined ? [] : [children];
}
function forbiddenChildren(children) {
    return children === undefined ? [] : [children];
}
export function Bold({ children }) { return bold(...richChildren(children)); }
export function Italic({ children }) { return italic(...richChildren(children)); }
export function Underline({ children }) { return underline(...richChildren(children)); }
export function Strikethrough({ children }) { return strikethrough(...richChildren(children)); }
export function Spoiler({ children }) { return spoiler(...richChildren(children)); }
export function Subscript({ children }) { return subscript(...richChildren(children)); }
export function Superscript({ children }) { return superscript(...richChildren(children)); }
export function Marked({ children }) { return marked(...richChildren(children)); }
export function Code({ children }) { return code(...richChildren(children)); }
export function DateTime({ children, ...options }) {
    return dateTime(options, ...richChildren(children));
}
export function TextMention({ children, ...options }) {
    return textMention(options, ...richChildren(children));
}
export function CustomEmoji({ children, ...options }) {
    return customEmoji(options, ...forbiddenChildren(children));
}
export function InlineMath({ children, ...options }) {
    return inlineMath(options, ...forbiddenChildren(children));
}
export function Link({ children, ...options }) {
    return link(options, ...richChildren(children));
}
export function Email({ children, ...options }) {
    return email(options, ...richChildren(children));
}
export function Phone({ children, ...options }) {
    return phone(options, ...richChildren(children));
}
export function BankCard({ children, ...options }) {
    return bankCard(options, ...richChildren(children));
}
export function Mention({ children, ...options }) {
    return mention(options, ...richChildren(children));
}
export function Hashtag({ children, ...options }) {
    return hashtag(options, ...richChildren(children));
}
export function Cashtag({ children, ...options }) {
    return cashtag(options, ...richChildren(children));
}
export function BotCommand({ children, ...options }) {
    return botCommand(options, ...richChildren(children));
}
export function TextAnchor({ children, ...options }) {
    return textAnchor(options, ...forbiddenChildren(children));
}
export function AnchorLink({ children, ...options }) {
    return anchorLink(options, ...richChildren(children));
}
export function Reference({ children, ...options }) {
    return reference(options, ...richChildren(children));
}
export function ReferenceLink({ children, ...options }) {
    return referenceLink(options, ...richChildren(children));
}
//# sourceMappingURL=text.js.map