<script setup lang="ts">
import download from 'downloadjs';
import { defineAsyncComponent, ref } from 'vue';
import IconEye from '~icons/mdi/eye-off-outline';
import IconFileDownload from '~icons/mdi/file-download';

const AppFilePreviewDialog = defineAsyncComponent(
  () => import('@/components/dialogs/AppFilePreviewDialog.vue')
);

const props = withDefaults(defineProps<{ file?: File; title?: string }>(), {
  title: 'File',
});

const showFilePreviewDialog = ref(false);

async function preview() {
  if (props.file) {
    showFilePreviewDialog.value = true;
  }
}

function downloadFile() {
  if (props.file) {
    download(props.file, props.title);
  }
}
</script>

<template>
  <v-card
    variant="tonal"
    density="compact"
    rounded="xl"
    max-width="400"
    :title="title"
    :prepend-icon="IconFileDownload"
    :append-icon="IconEye"
    @click.prevent="preview"
  >
    <app-file-preview-dialog
      v-model="showFilePreviewDialog"
      v-if="file"
      :title="title"
      :file="file"
    >
      <template #confirm-button>
        <v-btn @click.prevent="downloadFile">Download</v-btn>
      </template>
    </app-file-preview-dialog>
  </v-card>
</template>
