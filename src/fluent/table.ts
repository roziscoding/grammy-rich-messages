import {
  table,
  tableCell,
  tableRow,
  type TableCellOptions,
  type TableOptions,
} from "../core/blocks";
import type { RichTextInput } from "../core/text";
import { cloneValue, type BlockValue, type TableCellValue, type TableRowValue } from "../core/values";
import type { InputRichBlockTable } from "../deps";

export type TableRowConfigurator = (row: TableRowBuilder) => unknown;
export type TableConfigurator = (table: TableBuilder) => unknown;

export class TableRowBuilder {
  readonly #cells: TableCellValue[] = [];

  get cells(): readonly TableCellValue[] {
    return cloneValue(this.#cells);
  }

  cell(content?: RichTextInput, options: TableCellOptions = {}): this {
    const value = content === undefined ? tableCell(options) : tableCell(options, content);
    this.#cells.push(cloneValue(value));
    return this;
  }

  build(): TableRowValue {
    return tableRow(...cloneValue(this.#cells));
  }
}

export class TableBuilder {
  readonly #options: TableOptions;
  readonly #rows: TableRowValue[] = [];

  constructor(options: TableOptions = {}) {
    this.#options = cloneValue(options);
  }

  get rowValues(): readonly TableRowValue[] {
    return cloneValue(this.#rows);
  }

  row(configure: TableRowConfigurator): this {
    const row = new TableRowBuilder();
    configure(row);
    this.#rows.push(row.build());
    return this;
  }

  rows<T>(items: Iterable<T>, configure: (row: TableRowBuilder, item: T, index: number) => unknown): this {
    let index = 0;
    for (const item of items) {
      const row = new TableRowBuilder();
      configure(row, item, index++);
      this.#rows.push(row.build());
    }
    return this;
  }

  build(): BlockValue<never, InputRichBlockTable> {
    return table(cloneValue(this.#options), ...cloneValue(this.#rows));
  }
}
