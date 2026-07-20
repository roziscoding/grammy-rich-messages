const valueKindKey = "__telegramRichMessagesValueKind";
export function brand(value, kind) {
    Object.defineProperty(value, valueKindKey, { value: kind, enumerable: false });
    return value;
}
export function kindOf(value) {
    return typeof value === "object" && value !== null
        ? value[valueKindKey]
        : undefined;
}
//# sourceMappingURL=values.js.map