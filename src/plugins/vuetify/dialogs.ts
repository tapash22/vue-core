import AppDialog from '@/components/dialogs/AppDialog.vue';

export const aliases = {
  AeslDialog: AppDialog,
};
export const defaults = {
  AppDialog: {
    VDialog: {
      contained: false,
      maxHeight: '85%',
      maxWidth: '80%',
      minWidth: '400px',
      minHeight: '300px',
      VCard: {
        VCardTitle: {
          class: ['text-h5', 'font-weight-bold'],
          VBtn: {
            size: 'small',
            variant: 'text',
            color: 'secondary',
            rounded: 'lg',
          },
        },
        VCardActions: {
          VBtn: {
            variant: 'elevated',
            width: 170,
            rounded: 'lg',
          },
        },
      },
    },
  },
};
