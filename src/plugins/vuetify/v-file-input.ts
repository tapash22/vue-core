// import { markRaw } from 'vue';
import { VFileInput } from 'vuetify/components';
import IconFileupload from '~icons/mdi/file-upload-outline';
// const FileUploadIcon = markRaw(IconFileUpload);

export const aliases: Record<string, unknown> = {
  VMultiFileInput: VFileInput,
};

const defaultFileInput = {
  variant: 'outlined',
  slim: true,
  hideDetails: 'auto',
  prependIcon: '',
  appendInnerIcon: IconFileupload,
};
export const defaults = {
  VFileInput: { ...defaultFileInput },
  VMultiFileInput: { ...defaultFileInput, chips: true, multiple: true },
};
