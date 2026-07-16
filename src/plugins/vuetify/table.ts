import AeslTable from '@/components/tables/AeslTable.vue';

export const aliases: Record<string, unknown> = {
  AeslTable: AeslTable,
};
export const defaults = {
  AeslTable: {
    VDataTable: {
      hover: true,
      color: 'primary',
      density: 'default',
    },
  },
};
