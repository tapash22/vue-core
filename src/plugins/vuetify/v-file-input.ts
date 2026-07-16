import { markRaw } from 'vue';
import { VFileInput } from 'vuetify/components';
import IconFileUpload from '~icons/aes-light-files/file-upload';
const FileUploadIcon = markRaw(IconFileUpload);

export const aliases: Record<string, unknown> = {
  VMultiFileInput: VFileInput,
};

const defaultFileInput = {
  variant: 'outlined',
  slim: true,
  hideDetails: 'auto',
  prependIcon: '',
  appendInnerIcon: FileUploadIcon,
};
export const defaults = {
  VFileInput: { ...defaultFileInput },
  VMultiFileInput: { ...defaultFileInput, chips: true, multiple: true },
};
