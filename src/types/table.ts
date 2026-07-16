// table values are always primitives
export type TableValue =
  string | number | boolean | Date | File | null | undefined;

export interface TableItem {
  [key: string]: TableValue | TableItem;
}
