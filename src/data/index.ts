import { AppTableHeader } from '@/types/table';

export const headers: AppTableHeader[] = [
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
  // {
  //   title: 'Body',
  //   key: 'body',
  //   headerProps: {
  //     context: {
  //       type: 'file',
  //       file: (item) => {
  //         // Coerce value safely to string to satisfy BlobPart type constraint
  //         const content =
  //           typeof item.body === 'string' ? item.body : String(item.body ?? '');
  //         const filename =
  //           typeof item.title === 'string'
  //             ? `${item.title}.txt`
  //             : 'body-content.txt';

  //         return new File([content], filename, { type: 'text/plain' });
  //       },
  //     },
  //   },
  // },
];
