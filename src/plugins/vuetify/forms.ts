import AeslForm from '@/components/forms/AeslForm.vue';

export const aliases = {
  AeslForm: AeslForm,
};
export const defaults = {
  AeslForm: {
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
