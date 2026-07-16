import { VBtn } from 'vuetify/components/VBtn';

export const aliases: Record<string, unknown> = {
  VPrimaryTextLink: VBtn,
  VPrimaryAddBtn: VBtn,
};
export const defaults = {
  VPrimaryTextLink: {
    variant: 'plain',
    color: 'primary',
    flat: true,
    slim: true,
    class: ['font-weight-black', 'text-capitalize', 'text-subtitle-1'],
    style: {
      opacity: 1,
      display: 'inline',
      width: 'auto',
      height: 'auto',
    },
  },
  VBtn: {
    rounded: 'none',
    class: ['font-weight-black', 'text-capitalize', 'text-subtitle-1'],
  },
};
