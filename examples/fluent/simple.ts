import { bold } from "../../dist/core";
import { RichMessageBuilder } from "../../dist/fluent";

// The fluent interface accumulates blocks through chained method calls and
// produces the canonical value with build(). Rich-text builders (bold, etc.)
// come from the core entrypoint.
export const simple = new RichMessageBuilder()
  .heading("Welcome", { size: 1 })
  .paragraph("Hello from ", bold("telegram-rich-messages"), ".")
  .build();

export const simpleJson = JSON.stringify(simple);
