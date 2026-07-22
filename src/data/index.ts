export interface TableHeader {
  title: string;
  key: string;
}
export type TableHeaderList = TableHeader[];

export const headers: TableHeaderList = [
  {
    title: 'ID',
    key: 'id',
  },
  {
    title: 'user Id',
    key: 'userId',
  },
  {
    title: 'Title',
    key: 'title',
  },
  {
    title: 'Body',
    key: 'body',
  },
];
