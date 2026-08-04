export const aliases: Record<string, unknown> = {};

const defaultTextField = {
  variant: 'outlined',
  slim: true,
  hideDetails: 'auto',
  rounded: 'lg',
  bgColor: 'surface',
};

export const defaults = {
  VTextField: { ...defaultTextField },
};
