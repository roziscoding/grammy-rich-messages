import type { BlockNodeKind, Child, ElementChild, Node, NodeKind, RichTextNodeKind } from "../jsx-runtime.js";

export type OptionalNested<T> = T | boolean | null | undefined | readonly OptionalNested<T>[];
export type RichTextInput = OptionalNested<string | number | Node<RichTextNodeKind>>;
export type BlockInput = OptionalNested<Node<BlockNodeKind>>;
export type NodeInput<K extends NodeKind> = OptionalNested<Node<K>>;

const richTextKinds = new globalThis.Set<RichTextNodeKind>([
  "bold", "italic", "underline", "strikethrough", "spoiler", "subscript", "superscript",
  "marked", "code", "date_time", "text_mention", "custom_emoji", "mathematical_expression",
  "url", "email_address", "phone_number", "bank_card_number", "mention", "hashtag", "cashtag",
  "bot_command", "anchor", "anchor_link", "reference", "reference_link",
]);

const blockKinds = new globalThis.Set<BlockNodeKind>([
  "paragraph", "footer", "thinking", "heading", "pre", "divider", "block-mathematical_expression",
  "block-anchor", "list", "blockquote", "pullquote", "collage", "slideshow", "table", "details",
  "map", "animation", "audio", "photo", "video", "voice_note",
]);

function flattenInputs(values: readonly unknown[]): unknown[] {
  return values.flatMap((value): unknown[] => Array.isArray(value) ? flattenInputs(value) : [value]);
}

function isNode(value: unknown): value is Node {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    && typeof (value as { kind?: unknown }).kind === "string"
    && typeof (value as { props?: unknown }).props === "object"
    && (value as { props?: unknown }).props !== null;
}

function describe(value: unknown): string {
  if (isNode(value)) return `<${value.kind}>`;
  if (typeof value === "string") return JSON.stringify(value);
  if (value === undefined) return "undefined";
  try { return JSON.stringify(value); } catch { return String(value); }
}

export function assertBlockChildren(children: readonly unknown[], context: string): void {
  for (const child of flattenInputs(children)) {
    if (child == null || typeof child === "boolean") continue;
    if (!isNode(child) || !blockKinds.has(child.kind as BlockNodeKind)) {
      throw new TypeError(`${context} only accepts rich-message blocks, received ${describe(child)}`);
    }
  }
}

export function assertRichTextNode(value: unknown, context: string): asserts value is Node<RichTextNodeKind> {
  if (!isNode(value) || !richTextKinds.has(value.kind as RichTextNodeKind)) {
    throw new TypeError(`${context} expects a rich-text element, received ${describe(value)}`);
  }
}

export function assertBlockNode(value: unknown, context: string): asserts value is Node<BlockNodeKind> {
  if (!isNode(value) || !blockKinds.has(value.kind as BlockNodeKind)) {
    throw new TypeError(`${context} expects a rich-message block, received ${describe(value)}`);
  }
}

export function assertRichText(children: readonly unknown[], context: string): void {
  for (const child of flattenInputs(children)) {
    if (child == null || typeof child === "boolean" || typeof child === "string" || typeof child === "number") continue;
    if (!isNode(child) || !richTextKinds.has(child.kind as RichTextNodeKind)) {
      throw new TypeError(`${context} only accepts rich-text children, received ${describe(child)}`);
    }
  }
}

export function assertExactNodeKind<K extends NodeKind>(
  value: unknown,
  kind: K,
  context: string,
): asserts value is Node<K> {
  if (!isNode(value) || value.kind !== kind) {
    throw new TypeError(`${context} only accepts <${kind}> children, received ${describe(value)}`);
  }
}

export function assertNodeKind<K extends NodeKind>(children: readonly unknown[], kind: K, context: string): void {
  for (const child of flattenInputs(children)) {
    if (child == null || typeof child === "boolean") continue;
    if (!isNode(child) || child.kind !== kind) {
      throw new TypeError(`${context} only accepts <${kind}> children, received ${describe(child)}`);
    }
  }
}

export function childrenProps(children: readonly Child[]): { children?: Child } {
  if (children.length === 0) return {};
  return { children: children.length === 1 ? children[0] : children };
}

export function elementChildrenProps(children: readonly ElementChild[]): { children?: ElementChild } {
  if (children.length === 0) return {};
  return { children: children.length === 1 ? children[0] : children };
}

export function isOptions(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value) && !isNode(value);
}

export function splitOptions<P extends object, C>(
  first: P | C | undefined,
  rest: readonly C[],
  context: string,
  allowedKeys: readonly string[],
): readonly [P | undefined, readonly C[]] {
  if (isOptions(first)) {
    const allowed = new Set(allowedKeys);
    for (const key of Object.keys(first)) {
      if (!allowed.has(key)) throw new TypeError(`${context} received unknown option ${JSON.stringify(key)}`);
    }
    return [first as P, rest];
  }
  return [undefined, first === undefined ? rest : [first as C, ...rest]];
}

export function assertNoChildren(children: readonly unknown[], context: string): void {
  const meaningful = flattenInputs(children).filter((child) => child != null && typeof child !== "boolean");
  if (meaningful.length > 0) throw new TypeError(`${context} does not accept children`);
}

export function assertCaption(options: { caption?: unknown; credit?: unknown }, context: string): void {
  if (options.caption === undefined && options.credit !== undefined) {
    throw new TypeError(`${context} credit requires caption text`);
  }
  if (options.caption !== undefined) assertRichText([options.caption], `${context} caption`);
  if (options.credit !== undefined) assertRichText([options.credit], `${context} credit`);
}
