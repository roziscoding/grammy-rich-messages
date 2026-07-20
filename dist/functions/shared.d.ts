import type { BlockNodeKind, Child, ElementChild, Node, NodeKind, RichTextNodeKind } from "../jsx-runtime.js";
export type OptionalNested<T> = T | boolean | null | undefined | readonly OptionalNested<T>[];
export type RichTextInput = OptionalNested<string | number | Node<RichTextNodeKind>>;
export type BlockInput = OptionalNested<Node<BlockNodeKind>>;
export type NodeInput<K extends NodeKind> = OptionalNested<Node<K>>;
export declare function assertBlockChildren(children: readonly unknown[], context: string): void;
export declare function assertRichTextNode(value: unknown, context: string): asserts value is Node<RichTextNodeKind>;
export declare function assertBlockNode(value: unknown, context: string): asserts value is Node<BlockNodeKind>;
export declare function assertRichText(children: readonly unknown[], context: string): void;
export declare function assertExactNodeKind<K extends NodeKind>(value: unknown, kind: K, context: string): asserts value is Node<K>;
export declare function assertNodeKind<K extends NodeKind>(children: readonly unknown[], kind: K, context: string): void;
export declare function childrenProps(children: readonly Child[]): {
    children?: Child;
};
export declare function elementChildrenProps(children: readonly ElementChild[]): {
    children?: ElementChild;
};
export declare function isOptions(value: unknown): value is Record<string, unknown>;
export declare function splitOptions<P extends object, C>(first: P | C | undefined, rest: readonly C[], context: string, allowedKeys: readonly string[]): readonly [P | undefined, readonly C[]];
export declare function assertNoChildren(children: readonly unknown[], context: string): void;
export declare function assertCaption(options: {
    caption?: unknown;
    credit?: unknown;
}, context: string): void;
//# sourceMappingURL=shared.d.ts.map