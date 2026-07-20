import type { BlockValue, ListItemValue, RichMessageValue, RichTextValue, TableCellValue, TableRowValue } from "./values.js";

export type Element = RichTextValue | BlockValue | ListItemValue | TableCellValue | TableRowValue | RichMessageValue;
export type Child = Element | string | number | boolean | null | undefined | readonly Child[];
export type ElementChild = Element | boolean | null | undefined | readonly ElementChild[];

export interface ChildrenProps { children?: Child; }
export interface ElementChildrenProps { children?: ElementChild; }
export interface NoChildrenProps { children?: never; }
export type CaptionProps =
  | { caption: Child; credit?: Child }
  | { caption?: undefined; credit?: never };

export type Component<P = Record<string, unknown>> = (props: P) => Element;

export const Fragment = Symbol.for("telegram-rich-messages.fragment");

export function jsx(type: Component<any> | typeof Fragment, props: Record<string, unknown>): Child {
  if (type === Fragment) return props.children as Child;
  return type(props);
}

export const jsxs = jsx;
export const jsxDEV = jsx;

export namespace JSX {
  export type Element = import("./jsx-runtime.js").Element;
  export interface ElementChildrenAttribute { children: {}; }
  export interface IntrinsicElements {}
}
