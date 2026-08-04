export const aliases: Record<string, unknown> = {};

const defaultTextField = {
  // variant: 'outlined',
  // slim: true,
  // hideDetails: 'auto',
  // rounded: 'lg',
  // bgColor: 'surface',
  variant: 'outlined',
  slim: true,
  hideDetails: 'auto',
  rounded: 'lg',
  bgColor: 'surface',
  class: 'custom-text-field', // Add custom class here
};

export const defaults = {
  VTextField: { ...defaultTextField },
};
