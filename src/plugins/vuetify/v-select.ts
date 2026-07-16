export const aliases: Record<string, unknown> = {};

const defaultSelect = {
  variant: 'outlined',
  slim: true,
  hideDetails: 'auto',
};
export const defaults = {
  VSelect: { ...defaultSelect },
  VAutocomplete: { ...defaultSelect },
  VCombobox: { ...defaultSelect },
};
