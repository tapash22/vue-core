import AppMainAppbar from '@/layout/AppMainAppbar.vue';

export const aliases = {
  AppMainAppbar: AppMainAppbar,
};
export const defaults = {
  AppMainAppbar: {
    VAppBar: {
      border: true,
      elevation: 0,
      flat: false,
      location: 'top',
      class: ['px-2'],

      VToolbarTitle: {
        class: ['text-h5', 'font-weight-black'],
      },
    },
  },
};
