import { kindOf } from "../values.js";
export function flattenInputs(values) {
    return values.flatMap((value) => Array.isArray(value) ? flattenInputs(value) : [value]);
}
function describe(value) {
    const kind = kindOf(value);
    if (kind !== undefined)
        return `<${kind}>`;
    if (typeof value === "object" && value !== null && "type" in value)
        return `<${String(value.type)}>`;
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
export function richText(values, context) {
    const parts = [];
    for (const item of flattenInputs(values)) {
        if (item == null || typeof item === "boolean")
            continue;
        if (typeof item === "string" || typeof item === "number") {
            const text = String(item);
            const last = parts.at(-1);
            if (typeof last === "string")
                parts[parts.length - 1] = last + text;
            else
                parts.push(text);
            continue;
        }
        if (kindOf(item) !== "rich-text") {
            throw new TypeError(`${context} only accepts rich-text children, received ${describe(item)}`);
        }
        parts.push(item);
    }
    return parts.length === 1 ? parts[0] : parts;
}
function collectBranded(values, kind, context) {
    const result = [];
    for (const item of flattenInputs(values)) {
        if (item == null || typeof item === "boolean")
            continue;
        if (typeof item === "string" && item.trim() === "")
            continue;
        if (kindOf(item) !== kind)
            throw new TypeError(`${context} only accepts <${kind}> children, received ${describe(item)}`);
        result.push(item);
    }
    return result;
}
export function blocks(values, context) {
    if (context === "richMessage()") {
        const result = [];
        for (const item of flattenInputs(values)) {
            if (item == null || typeof item === "boolean")
                continue;
            if (kindOf(item) !== "block")
                throw new TypeError("richMessage() only accepts rich-message blocks");
            result.push(item);
        }
        return result;
    }
    return collectBranded(values, "block", context);
}
export function listItems(values, context) {
    return collectBranded(values, "list-item", context);
}
export function tableRows(values, context) {
    return collectBranded(values, "table-row", context);
}
export function tableCells(values, context) {
    return collectBranded(values, "table-cell", context);
}
export function assertNoChildren(children, context) {
    const meaningful = flattenInputs(children).filter((child) => child != null && typeof child !== "boolean");
    if (meaningful.length > 0)
        throw new TypeError(`${context} does not accept children`);
}
function isPossibleInput(value, category, allowPrimitive) {
    if (value == null || typeof value === "boolean" || Array.isArray(value))
        return true;
    if (allowPrimitive && (typeof value === "string" || typeof value === "number"))
        return true;
    return kindOf(value) !== undefined;
}
export function splitOptions(first, rest, context, allowedKeys, childCategory, allowPrimitive = false) {
    if (first === undefined)
        return [undefined, rest];
    if (isPossibleInput(first, childCategory, allowPrimitive))
        return [undefined, [first, ...rest]];
    if (typeof first !== "object" || first === null)
        return [undefined, [first, ...rest]];
    const allowed = new Set(allowedKeys);
    for (const key of Object.keys(first)) {
        if (!allowed.has(key))
            throw new TypeError(`${context} received unknown option ${JSON.stringify(key)}`);
    }
    return [first, rest];
}
export function caption(options, context) {
    if (options.caption === undefined) {
        if (options.credit !== undefined)
            throw new TypeError(`${context} credit requires caption text`);
        return undefined;
    }
    return {
        text: richText([options.caption], `${context} caption`),
        ...(options.credit === undefined ? {} : { credit: richText([options.credit], `${context} credit`) }),
    };
}
//# sourceMappingURL=shared.js.map