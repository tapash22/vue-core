import { AppTableCellContext } from '@/components/tables/cells/AppTableCell.vue';

// table values are always primitives
export type TableValue =
  string | number | boolean | Date | File | null | undefined;

//table header declear as have
export interface AppTableHeader {
  title: string;
  key: string;

  align?: 'start' | 'center' | 'end';
  sortable?: boolean;
  width?: string | number;

  headerProps?: {
    style?: string;
    context?: AppTableCellContext;
  };

  cellProps?: {
    style?: string;
  };
}

export interface TableItem {
  [key: string]: TableValue | TableItem;
}
