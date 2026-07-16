import AeslDialog from '@/components/dialogs/AeslDialog.vue';

export const aliases = {
  AeslDialog: AeslDialog,
};
export const defaults = {
  AeslDialog: {
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
