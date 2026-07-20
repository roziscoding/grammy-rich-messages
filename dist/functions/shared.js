const richTextKinds = new globalThis.Set([
    "bold", "italic", "underline", "strikethrough", "spoiler", "subscript", "superscript",
    "marked", "code", "date_time", "text_mention", "custom_emoji", "mathematical_expression",
    "url", "email_address", "phone_number", "bank_card_number", "mention", "hashtag", "cashtag",
    "bot_command", "anchor", "anchor_link", "reference", "reference_link",
]);
const blockKinds = new globalThis.Set([
    "paragraph", "footer", "thinking", "heading", "pre", "divider", "block-mathematical_expression",
    "block-anchor", "list", "blockquote", "pullquote", "collage", "slideshow", "table", "details",
    "map", "animation", "audio", "photo", "video", "voice_note",
]);
function flattenInputs(values) {
    return values.flatMap((value) => Array.isArray(value) ? flattenInputs(value) : [value]);
}
function isNode(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value)
        && typeof value.kind === "string"
        && typeof value.props === "object"
        && value.props !== null;
}
function describe(value) {
    if (isNode(value))
        return `<${value.kind}>`;
    if (typeof value === "string")
        return JSON.stringify(value);
    if (value === undefined)
        return "undefined";
    try {
        return JSON.stringify(value);
    }
    catch {
        return String(value);
    }
}
export function assertBlockChildren(children, context) {
    for (const child of flattenInputs(children)) {
        if (child == null || typeof child === "boolean")
            continue;
        if (!isNode(child) || !blockKinds.has(child.kind)) {
            throw new TypeError(`${context} only accepts rich-message blocks, received ${describe(child)}`);
        }
    }
}
export function assertRichTextNode(value, context) {
    if (!isNode(value) || !richTextKinds.has(value.kind)) {
        throw new TypeError(`${context} expects a rich-text element, received ${describe(value)}`);
    }
}
export function assertBlockNode(value, context) {
    if (!isNode(value) || !blockKinds.has(value.kind)) {
        throw new TypeError(`${context} expects a rich-message block, received ${describe(value)}`);
    }
}
export function assertRichText(children, context) {
    for (const child of flattenInputs(children)) {
        if (child == null || typeof child === "boolean" || typeof child === "string" || typeof child === "number")
            continue;
        if (!isNode(child) || !richTextKinds.has(child.kind)) {
            throw new TypeError(`${context} only accepts rich-text children, received ${describe(child)}`);
        }
    }
}
export function assertExactNodeKind(value, kind, context) {
    if (!isNode(value) || value.kind !== kind) {
        throw new TypeError(`${context} only accepts <${kind}> children, received ${describe(value)}`);
    }
}
export function assertNodeKind(children, kind, context) {
    for (const child of flattenInputs(children)) {
        if (child == null || typeof child === "boolean")
            continue;
        if (!isNode(child) || child.kind !== kind) {
            throw new TypeError(`${context} only accepts <${kind}> children, received ${describe(child)}`);
        }
    }
}
export function childrenProps(children) {
    if (children.length === 0)
        return {};
    return { children: children.length === 1 ? children[0] : children };
}
export function elementChildrenProps(children) {
    if (children.length === 0)
        return {};
    return { children: children.length === 1 ? children[0] : children };
}
export function isOptions(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value) && !isNode(value);
}
export function splitOptions(first, rest, context, allowedKeys) {
    if (isOptions(first)) {
        const allowed = new Set(allowedKeys);
        for (const key of Object.keys(first)) {
            if (!allowed.has(key))
                throw new TypeError(`${context} received unknown option ${JSON.stringify(key)}`);
        }
        return [first, rest];
    }
    return [undefined, first === undefined ? rest : [first, ...rest]];
}
export function assertNoChildren(children, context) {
    const meaningful = flattenInputs(children).filter((child) => child != null && typeof child !== "boolean");
    if (meaningful.length > 0)
        throw new TypeError(`${context} does not accept children`);
}
export function assertCaption(options, context) {
    if (options.caption === undefined && options.credit !== undefined) {
        throw new TypeError(`${context} credit requires caption text`);
    }
    if (options.caption !== undefined)
        assertRichText([options.caption], `${context} caption`);
    if (options.credit !== undefined)
        assertRichText([options.credit], `${context} credit`);
}
//# sourceMappingURL=shared.js.map