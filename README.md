# telegram-rich-messages

Compose [Telegram Bot API rich messages](https://core.telegram.org/bots/api#rich-messages) with type-safe functions, TSX, or both, then render them to an `InputRichMessage` object.

- **No React** and no virtual DOM
- **No bot framework** and no Bot API client
- Functional builders preserve exact node kinds for compile-time hierarchy checks
- Runtime validation protects JavaScript callers, casts, and TSX composition
- Covers all Bot API 10.2 input rich-text entities and block types
- Produces plain JSON-ready objects for `sendRichMessage`, `sendRichMessageDraft`, `editMessageText`, or `InputRichMessageContent`

> This repository is currently private and the package is not published to npm. Install it from GitHub with an account that has access:
>
> ```sh
> npm install github:roziscoding/telegram-rich-messages
> ```

## TypeScript setup

The library provides its own tiny JSX runtime. Point TypeScript at it:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "telegram-rich-messages"
  }
}
```

Use `.tsx` files. There is no React dependency to install.

## Proof of concept

### Text and structure

```tsx
import {
  Bold,
  Details,
  Heading,
  Link,
  List,
  ListItem,
  Paragraph,
  RichMessage,
  render,
} from "telegram-rich-messages";

const richMessage = render(
  <RichMessage skipEntityDetection>
    <Heading size={1}>Build report</Heading>

    <Paragraph>
      Status: <Bold>green</Bold>. See the
      {" "}<Link url="https://example.com/build/42">full report</Link>.
    </Paragraph>

    <List>
      <ListItem checkbox checked>
        <Paragraph>Type-check</Paragraph>
      </ListItem>
      <ListItem checkbox checked>
        <Paragraph>Run tests</Paragraph>
      </ListItem>
    </List>

    <Details summary={<Bold>Artifacts</Bold>}>
      <Paragraph>dist/index.js</Paragraph>
      <Paragraph>dist/index.d.ts</Paragraph>
    </Details>
  </RichMessage>,
);
```

`richMessage` is a plain object ready to use as the Bot API's `rich_message` value:

```json
{
  "blocks": [
    { "type": "heading", "text": "Build report", "size": 1 },
    {
      "type": "paragraph",
      "text": [
        "Status: ",
        { "type": "bold", "text": "green" },
        ". See the ",
        { "type": "url", "text": "full report", "url": "https://example.com/build/42" },
        "."
      ]
    },
    {
      "type": "list",
      "items": [
        {
          "blocks": [{ "type": "paragraph", "text": "Type-check" }],
          "has_checkbox": true,
          "is_checked": true
        },
        {
          "blocks": [{ "type": "paragraph", "text": "Run tests" }],
          "has_checkbox": true,
          "is_checked": true
        }
      ]
    },
    {
      "type": "details",
      "summary": { "type": "bold", "text": "Artifacts" },
      "blocks": [
        { "type": "paragraph", "text": "dist/index.js" },
        { "type": "paragraph", "text": "dist/index.d.ts" }
      ]
    }
  ],
  "skip_entity_detection": true
}
```

### Tables and media blocks

```tsx
import {
  Bold,
  Photo,
  RichMessage,
  Table,
  TableCell,
  TableRow,
  render,
} from "telegram-rich-messages";

const richMessage = render(
  <RichMessage>
    <Table bordered striped caption="Benchmark">
      <TableRow>
        <TableCell header>Model</TableCell>
        <TableCell header align="right">Score</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Aster-1</TableCell>
        <TableCell align="right"><Bold>98.4</Bold></TableCell>
      </TableRow>
    </Table>

    <Photo
      media={{
        type: "photo",
        media: "AgACAgQAAxkBAAIB...",
        has_spoiler: false,
      }}
      caption="Confusion matrix"
      credit="Evaluation suite"
    />
  </RichMessage>,
);

const json = JSON.stringify(richMessage);
```

This example stops at composition and conversion deliberately. Transport, authentication, retries, and Bot API calls belong to the consuming application.

### Dynamic composition

TSX expressions, fragments, arrays, and conditional children work without React:

```tsx
import { Bold, Paragraph, RichMessage, render } from "telegram-rich-messages";

const checks = ["types", "tests", "bundle"];
const includeFooter = true;

const richMessage = render(
  <RichMessage>
    {checks.map((check) => (
      <Paragraph><Bold>{check}</Bold>: passed</Paragraph>
    ))}
    {includeFooter && <Paragraph>Generated automatically.</Paragraph>}
  </RichMessage>,
);
```

### Functional composition

Every TSX component has a lower-camel-case functional builder. Builders with props receive an options object first; child nodes follow as variadic arguments:

```ts
import {
  bold,
  heading,
  list,
  listItem,
  paragraph,
  richMessage,
  table,
  tableCell,
  tableRow,
  render,
} from "telegram-rich-messages";

const message = richMessage(
  heading({ size: 1 }, "Build report"),
  paragraph("Status: ", bold("green")),
  list(
    listItem({ checkbox: true, checked: true }, paragraph("Type-check")),
    listItem({ checkbox: true, checked: true }, paragraph("Run tests")),
  ),
  table(
    { bordered: true, caption: "Benchmark" },
    tableRow(
      tableCell({ header: true }, "Model"),
      tableCell({ header: true, align: "right" }, "Score"),
    ),
    tableRow(
      tableCell("Aster-1"),
      tableCell({ align: "right" }, bold(98.4)),
    ),
  ),
);

const input = render(message);
```

Function return types preserve their discriminator. For example, `tableRow()` returns `Node<"table-row">`, so invalid hierarchy is caught by TypeScript:

```ts
table(tableRow(tableCell("valid"))); // valid
table(paragraph("not a row"));       // TypeScript error
bold(paragraph("not rich text"));    // TypeScript error
```

The same rules are checked at runtime. This protects plain JavaScript consumers and TypeScript code that arrives through `any`, `unknown`, or a cast instead of merely trusting the declaration file.

### Mixing functions and TSX

Functional nodes can be embedded directly in TSX. Custom components can also delegate to builders:

```tsx
import {
  Paragraph,
  RichMessage,
  bold,
  table,
  tableCell,
  tableRow,
} from "telegram-rich-messages";

function ResultRow({ name, score }: { name: string; score: number }) {
  return tableRow(
    tableCell(name),
    tableCell({ align: "right" }, bold(score)),
  );
}

const message = (
  <RichMessage>
    <Paragraph>Generated with TSX.</Paragraph>
    {table(
      { bordered: true },
      ResultRow({ name: "Aster-1", score: 98.4 }),
    )}
  </RichMessage>
);
```

TypeScript deliberately gives every JSX expression the broad `JSX.Element` type. To move a JSX node back into a strict functional boundary, narrow it explicitly with a runtime guard:

```tsx
import {
  TableCell,
  TableRow,
  bold,
  expectTableRow,
  richMessage,
  table,
} from "telegram-rich-messages";

const row = (
  <TableRow>
    <TableCell>{bold("hybrid")}</TableCell>
  </TableRow>
);

const message = richMessage(
  table(expectTableRow(row)),
);
```

Available guards are `expectRichText`, `expectBlock`, `expectListItem`, `expectTableRow`, and `expectTableCell`. They validate the runtime node kind and return the corresponding narrowed TypeScript type. JavaScript callers may pass JSX nodes directly to builders—the builders still perform the same runtime checks—but the explicit guards preserve strict typing in TypeScript.

## API map

| Bot API concept | TSX components | Functional builders |
|---|---|---|
| Root | `RichMessage` | `richMessage` |
| Text blocks | `Paragraph`, `Heading`, `Pre`, `Footer`, `Thinking` | `paragraph`, `heading`, `pre`, `footer`, `thinking` |
| Structure | `Divider`, `MathBlock`, `BlockAnchor`, `List`, `ListItem`, `BlockQuote`, `PullQuote`, `Details` | `divider`, `mathBlock`, `blockAnchor`, `list`, `listItem`, `blockQuote`, `pullQuote`, `details` |
| Layout | `Collage`, `Slideshow`, `Table`, `TableRow`, `TableCell`, `Map` | `collage`, `slideshow`, `table`, `tableRow`, `tableCell`, `map` |
| Media | `Animation`, `Audio`, `Photo`, `Video`, `VoiceNote` | `animation`, `audio`, `photo`, `video`, `voiceNote` |
| Text styling | `Bold`, `Italic`, `Underline`, `Strikethrough`, `Spoiler`, `Subscript`, `Superscript`, `Marked`, `Code` | `bold`, `italic`, `underline`, `strikethrough`, `spoiler`, `subscript`, `superscript`, `marked`, `code` |
| Text entities | `DateTime`, `TextMention`, `CustomEmoji`, `InlineMath`, `Link`, `Email`, `Phone`, `BankCard`, `Mention`, `Hashtag`, `Cashtag`, `BotCommand`, `TextAnchor`, `AnchorLink`, `Reference`, `ReferenceLink` | `dateTime`, `textMention`, `customEmoji`, `inlineMath`, `link`, `email`, `phone`, `bankCard`, `mention`, `hashtag`, `cashtag`, `botCommand`, `textAnchor`, `anchorLink`, `reference`, `referenceLink` |

Component props use idiomatic camelCase; `render()` converts them to the Bot API's snake_case fields. Invalid block nesting and invalid map dimensions are rejected before an object is returned.

> **Draft-only block:** Telegram permits `Thinking` only in `sendRichMessageDraft` payloads. The renderer cannot infer which endpoint will eventually consume the object, so endpoint selection remains the caller's responsibility.

## Type safety

The library checks component props, required fields, conditional prop combinations, leaf/structural children categories, and the complete rendered Bot API schema at compile time.

```tsx
<ListItem checked />;
// Error: checked requires checkbox={true}

<Table>raw text</Table>;
// Error: structural containers only accept JSX elements

<Divider>no children</Divider>;
// Error: leaf components do not accept children
```

`InputRichBlock` and `RichTextEntity` are discriminated unions, so rendered output narrows by `type`:

```ts
const first = render(message).blocks[0];

if (first?.type === "table") {
  first.cells; // RichBlockTableCell[][]
}
```

TypeScript treats every JSX expression as the opaque global `JSX.Element` type. Consequently, component identity inside JSX `children` cannot be checked statically: `<Table><Paragraph /></Table>` compiles, but the component factory rejects it at runtime. Functional builders preserve exact node kinds and catch the equivalent `table(paragraph())` call at compile time as well as runtime.

## Development

The source is organized by responsibility:

```text
src/
├── components/   # Public TSX component factories
├── functions/    # Typed builders, hierarchy validators, narrowing guards
├── serialize/    # Rich-text and block serializer registries
├── render.ts     # RichMessage root conversion
├── types.ts      # Public Bot API output and media types
├── jsx-runtime.ts
└── index.ts      # Public package exports only
```

```sh
bun install
bun run check
```

`bun run check` builds declarations, type-checks the source/examples/tests, and runs the test suite.

## Scope

This library only composes and converts rich messages. It intentionally contains no HTTP client, token handling, update consumption, webhook code, polling, or dependency on a Telegram bot library.

The implementation follows the official [Bot API rich messages documentation](https://core.telegram.org/bots/api#rich-messages), including the input block entities added in Bot API 10.2.

## License

MIT
