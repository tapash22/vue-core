<script setup lang="ts">
import { useApi } from '@/composables/useApi';
import download from 'downloadjs';
import { computed, defineAsyncComponent, ref } from 'vue';
import IconFileDownload from '~icons/aes-light-files/file-download';
import IconEye from '~icons/aes-light-security/eye';
import IconExclamationCircle from '~icons/aes-light-sign-controls/exclamation-circle';

const AppFilePreviewDialog = defineAsyncComponent(
  () => import('@/components/dialogs/AppFilePreviewDialog.vue')
);

const props = defineProps<{
  link?: string | null;
}>();

const fileName = computed(() => {
  const tokenArr = props.link?.split('/') || [];
  return tokenArr.length && tokenArr[tokenArr.length - 1];
});

const {
  execute: fetchFile,
  isLoading: isFileFetching,
  data: file,
  error: fetchingError,
} = useApi<File>('/jj', 'GET', {});

const showFilePreviewDialog = ref(false);

async function fetchAndPreview() {
  if (props.link) {
    await fetchFile({
      params: {
        downloadPath: props.link,
      },
      responseType: 'blob',
    });
    showFilePreviewDialog.value = true;
  }
}

function downloadFile() {
  if (file.value) {
    download(file.value, fileName.value || 'File');
  }
}
</script>
<template>
  <v-card
    variant="tonal"
    density="compact"
    rounded="xl"
    :loading="isFileFetching"
    :disabled="!link || isFileFetching || fetchingError !== undefined"
    :color="
      isFileFetching || !link
        ? 'secondary'
        : fetchingError
          ? 'error'
          : 'success'
    "
    max-width="400"
    :title="link ? (fetchingError ? 'Error' : fileName || 'File') : 'No File'"
    :prepend-icon="
      fetchingError !== undefined ? IconExclamationCircle : IconFileDownload
    "
    :append-icon="IconEye"
    @click.prevent="fetchAndPreview"
  >
    <app-file-preview-dialog
      v-model="showFilePreviewDialog"
      v-if="file"
      :title="fileName || 'File'"
      :file="file"
    >
      <template #confirm-button>
        <v-btn @click.prevent="downloadFile">Download</v-btn>
      </template>
    </app-file-preview-dialog>
  </v-card>
</template>
