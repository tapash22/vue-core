import AppForm from '@/components/forms/AppForm.vue';

export const aliases = {
  AeslForm: AppForm,
};
export const defaults = {
  AppForm: {
    VTextField: {
      class: ['mb-4'],
      VLabel: {
        style: {
          opacity: 1,
        },
      },
    },
  },
};
