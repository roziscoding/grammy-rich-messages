import { animation, audio, blockAnchor, blockQuote, collage, details, divider, footer, heading, list, listItem, map as mapBuilder, mathBlock, paragraph, photo, pre, pullQuote, slideshow, table, tableCell, tableRow, thinking, video, voiceNote, } from "../functions/blocks.js";
function richChildren(children) {
    return children === undefined ? [] : [children];
}
function blockChildren(children) {
    return children === undefined ? [] : [children];
}
function forbiddenChildren(children) {
    return children === undefined ? [] : [children];
}
export function Paragraph({ children }) { return paragraph(...richChildren(children)); }
export function Heading({ children, ...options }) {
    return heading(options, ...richChildren(children));
}
export function Pre({ children, ...options }) {
    return pre(options, ...richChildren(children));
}
export function Footer({ children }) { return footer(...richChildren(children)); }
export function Divider({ children }) { return divider(...forbiddenChildren(children)); }
export function MathBlock({ children, ...options }) {
    return mathBlock(options, ...forbiddenChildren(children));
}
export function BlockAnchor({ children, ...options }) {
    return blockAnchor(options, ...forbiddenChildren(children));
}
export function List({ children }) {
    return list(...(children === undefined ? [] : [children]));
}
export function ListItem({ children, ...options }) {
    return listItem(options, ...blockChildren(children));
}
export function BlockQuote({ children, credit }) {
    const options = credit === undefined ? {} : { credit: credit };
    return blockQuote(options, ...blockChildren(children));
}
export function PullQuote({ children, credit }) {
    const options = credit === undefined ? {} : { credit: credit };
    return pullQuote(options, ...richChildren(children));
}
export function Collage({ children, ...options }) {
    return collage(options, ...blockChildren(children));
}
export function Slideshow({ children, ...options }) {
    return slideshow(options, ...blockChildren(children));
}
export function Table({ children, ...options }) {
    return table(options, ...(children === undefined ? [] : [children]));
}
export function TableRow({ children }) {
    return tableRow(...(children === undefined ? [] : [children]));
}
export function TableCell({ children, ...options }) {
    return tableCell(options, ...richChildren(children));
}
export function Details({ children, summary, open }) {
    return details({ summary: summary, ...(open === undefined ? {} : { open }) }, ...blockChildren(children));
}
export function Map({ children, ...options }) {
    return mapBuilder(options, ...forbiddenChildren(children));
}
export function Animation({ children, ...options }) {
    return animation(options, ...forbiddenChildren(children));
}
export function Audio({ children, ...options }) {
    return audio(options, ...forbiddenChildren(children));
}
export function Photo({ children, ...options }) {
    return photo(options, ...forbiddenChildren(children));
}
export function Video({ children, ...options }) {
    return video(options, ...forbiddenChildren(children));
}
export function VoiceNote({ children, ...options }) {
    return voiceNote(options, ...forbiddenChildren(children));
}
/**
 * A temporary “Thinking…” block. Telegram only permits this block in
 * sendRichMessageDraft payloads; the component cannot infer the eventual endpoint.
 */
export function Thinking({ children }) { return thinking(...richChildren(children)); }
//# sourceMappingURL=blocks.js.map