import type { BlockValue, ListItemValue, RichMessageValue, RichTextValue, TableCellValue, TableRowValue } from "./values.js";
export type Element = RichTextValue | BlockValue | ListItemValue | TableCellValue | TableRowValue | RichMessageValue;
export type Child = Element | string | number | boolean | null | undefined | readonly Child[];
export type ElementChild = Element | boolean | null | undefined | readonly ElementChild[];
export interface ChildrenProps {
    children?: Child;
}
export interface ElementChildrenProps {
    children?: ElementChild;
}
export interface NoChildrenProps {
    children?: never;
}
export type CaptionProps = {
    caption: Child;
    credit?: Child;
} | {
    caption?: undefined;
    credit?: never;
};
export type Component<P = Record<string, unknown>> = (props: P) => Element;
export declare const Fragment: unique symbol;
export declare function jsx(type: Component<any> | typeof Fragment, props: Record<string, unknown>): Child;
export declare const jsxs: typeof jsx;
export declare const jsxDEV: typeof jsx;
export declare namespace JSX {
    type Element = import("./jsx-runtime.js").Element;
    interface ElementChildrenAttribute {
        children: {};
    }
    interface IntrinsicElements {
    }
}
//# sourceMappingURL=jsx-runtime.d.ts.map