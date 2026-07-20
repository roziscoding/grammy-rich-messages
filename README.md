# telegram-rich-messages

Build [Telegram Bot API rich messages](https://core.telegram.org/bots/api#rich-messages) with typed functions, TSX, or both. Builders produce the canonical Telegram objects directly.

- No React or virtual DOM
- No Bot API client or bot framework
- Compile-time hierarchy checks with functional builders
- Runtime validation for JavaScript, casts, and TSX composition
- Covers the Bot API 10.2 rich-text entities and block types

## Usage

The API can be used with functional builders or TSX. Both forms create the same canonical values, use the same runtime validation, and can be mixed in one message.

- **[Functional API](#functional-api):** provides the strongest TypeScript guarantees because each builder preserves its exact value category, allowing invalid nesting to be caught at compile time. Deeply nested messages, however, can be harder to scan.
- **[TSX](#tsx):** mirrors the message structure and works naturally with arrays, conditions, fragments, and custom components. TypeScript widens JSX expressions to `JSX.Element`, so parent-child hierarchy is checked at runtime instead of compile time.

### Functional API

```ts
import {
  bold,
  heading,
  paragraph,
  richMessage,
  table,
  tableCell,
  tableRow,
} from "telegram-rich-messages";

const input = richMessage(
  heading({ size: 1 }, "Build report"),
  paragraph("Status: ", bold("green")),
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
```

Builders preserve their value category, so TypeScript checks the hierarchy:

```ts
table(tableRow(tableCell("valid"))); // valid
table(paragraph("not a row"));       // type error
bold(paragraph("not rich text"));    // type error
```

The same checks run at runtime for JavaScript and values coming from `any`, `unknown`, or casts.

### TSX

Point TypeScript at the package's JSX runtime:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "telegram-rich-messages"
  }
}
```

Then use `.tsx` files without installing React:

```tsx
import {
  Bold,
  Heading,
  Paragraph,
  RichMessage,
  Table,
  TableCell,
  TableRow,
  expectRichMessage,
} from "telegram-rich-messages";

const input = expectRichMessage(
  <RichMessage skipEntityDetection>
    <Heading size={1}>Build report</Heading>
    <Paragraph>Status: <Bold>green</Bold></Paragraph>

    <Table bordered>
      <TableRow>
        <TableCell header>Model</TableCell>
        <TableCell header>Score</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Aster-1</TableCell>
        <TableCell>98.4</TableCell>
      </TableRow>
    </Table>
  </RichMessage>,
);
```

Arrays, fragments, conditional children, and custom components work normally.

## Mixing functions and TSX

Functional nodes can go directly inside TSX:

```tsx
<RichMessage>
  <Paragraph>Generated with TSX.</Paragraph>
  {table(
    { bordered: true },
    tableRow(tableCell(bold("Generated with functions."))),
  )}
</RichMessage>
```

TypeScript widens JSX expressions to `JSX.Element`. Use a runtime narrowing guard when a JSX node needs to enter a strict functional boundary:

```tsx
const row = (
  <TableRow>
    <TableCell>{bold("hybrid")}</TableCell>
  </TableRow>
);

const message = richMessage(
  table(expectTableRow(row)),
);
```

Available guards:

- `expectRichText`
- `expectBlock`
- `expectListItem`
- `expectTableRow`
- `expectTableCell`
- `expectRichMessage`

## API

Every TSX component has a lower-camel-case builder.

| Category | TSX | Functions |
|---|---|---|
| Root | `RichMessage` | `richMessage` |
| Text blocks | `Paragraph`, `Heading`, `Pre`, `Footer` | `paragraph`, `heading`, `pre`, `footer` |
| Structure | `Divider`, `MathBlock`, `BlockAnchor`, `List`, `ListItem`, `BlockQuote`, `PullQuote`, `Details` | `divider`, `mathBlock`, `blockAnchor`, `list`, `listItem`, `blockQuote`, `pullQuote`, `details` |
| Layout | `Collage`, `Slideshow`, `Table`, `TableRow`, `TableCell`, `Map` | `collage`, `slideshow`, `table`, `tableRow`, `tableCell`, `map` |
| Media | `Animation`, `Audio`, `Photo`, `Video`, `VoiceNote` | `animation`, `audio`, `photo`, `video`, `voiceNote` |
| Styling | `Bold`, `Italic`, `Underline`, `Strikethrough`, `Spoiler`, `Subscript`, `Superscript`, `Marked`, `Code` | `bold`, `italic`, `underline`, `strikethrough`, `spoiler`, `subscript`, `superscript`, `marked`, `code` |
| Entities | `DateTime`, `TextMention`, `CustomEmoji`, `InlineMath`, `Link`, `Email`, `Phone`, `BankCard`, `Mention`, `Hashtag`, `Cashtag`, `BotCommand`, `TextAnchor`, `AnchorLink`, `Reference`, `ReferenceLink` | `dateTime`, `textMention`, `customEmoji`, `inlineMath`, `link`, `email`, `phone`, `bankCard`, `mention`, `hashtag`, `cashtag`, `botCommand`, `textAnchor`, `anchorLink`, `reference`, `referenceLink` |

Props use camelCase. Builders immediately produce the Bot API's snake_case fields.

Public composition types include `RichTextValue`, `BlockValue`, `ListItemValue`, `TableCellValue`, `TableRowValue`, and `RichMessageValue`.

## Development

```sh
bun install
bun run check
```

`bun run check` builds declarations, type-checks the source and tests, then runs the test suite.

## Scope

This package only builds rich-message objects. Authentication, HTTP calls, retries, webhooks, and polling belong to the consuming application.

## License

MIT
