<script setup lang="ts">
import AppFilePreviewCard from '../cards/AppFilePreviewCard.vue';

withDefaults(
  defineProps<{ file: File; title?: string; previewConfirmTitle?: string }>(),
  {
    title: 'Preview',
  }
);

const dialog = defineModel({ required: false });
</script>

<template>
  <app-dialog v-model="dialog" :title="title" size="xl">
    <app-file-preview-card :file="file">
      <template #preview-form v-if="$slots['preview-form']">
        <slot name="preview-form" />
      </template>
    </app-file-preview-card>
    <template #footer-controls>
      <v-defaults-provider
        :defaults="{
          VRow: {
            justify: 'center',
            align: 'center',
            VCol: {
              cols: 12,
              md: 4,
              VBtn: {
                class: ['w-100', 'font-weight-bold'],
              },
            },
          },
        }"
      >
        <v-row>
          <v-col v-if="$slots['cancel-button']">
            <slot name="cancel-button" />
          </v-col>
          <v-col v-if="$slots['confirm-button']">
            <slot name="confirm-button" />
          </v-col>
        </v-row>
      </v-defaults-provider>
    </template>
  </app-dialog>
</template>
