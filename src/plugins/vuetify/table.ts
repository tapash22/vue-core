import AppTable from '@/components/tables/AppTable.vue';

export const aliases: Record<string, unknown> = {
  AeslTable: AppTable,
};
export const defaults = {
  AppTable: {
    VDataTable: {
      hover: true,
      color: 'primary',
      density: 'default',
    },
  },
};
