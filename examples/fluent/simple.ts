import { bold } from "../../dist/core";
import { RichMessage } from "../../dist/fluent";

// The fluent interface accumulates blocks through chained method calls. The
// instance implements InputRichMessage directly, so it serializes to the
// canonical value via toJSON(). Rich-text builders (bold, etc.) come from the
// core entrypoint.
export const simple = new RichMessage()
  .heading("Welcome", { size: 1 })
  .paragraph("Hello from ", bold("telegram-rich-messages"), ".");

export const simpleJson = JSON.stringify(simple);
