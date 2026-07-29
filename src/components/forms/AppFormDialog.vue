<script setup lang="ts">
import { ref } from 'vue';
import { useDefaults } from 'vuetify';
import type { VForm } from 'vuetify/components/VForm';
import AppButton from '../button/AppButton.vue';
import AppDialog from '../dialogs/AppDialog.vue';

withDefaults(
  defineProps<{
    title: string;
    subTitle?: string;
    size?: 'tiny' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    submitText?: string;
    cancelText?: string;
    disableClose?: boolean;
    disableSubmit?: boolean;
    validateOn?: VForm['validate-on'];
  }>(),
  {
    size: 'sm',
    submitText: 'Submit',
    cancelText: 'Cancel',
    disableClose: false,
    disableSubmit: false,
    validateOn: 'blur lazy',
  }
);

const emit = defineEmits<{
  (e: 'submit', closeDialog: () => void): void;
}>();

const isDialogOpen = defineModel<boolean>({ required: false, default: false });
const formRef = ref<VForm | null>(null);

// Completely reset form values and clear validation/blur errors
const resetForm = () => {
  if (formRef.value) {
    formRef.value.reset();
    formRef.value.resetValidation(); // Clears dirty blur states & error messages
  }
};

// Handle Form Submission
const handleSubmit = async (closeDialogFn: () => void) => {
  if (!formRef.value) return;

  const { valid } = await formRef.value.validate();

  if (valid) {
    emit('submit', () => {
      resetForm();
      closeDialogFn();
    });
  }
};

// Handle Cancel
const handleCancel = (closeDialogFn: () => void) => {
  resetForm();
  closeDialogFn();
};

useDefaults();
</script>

<template>
  <AppDialog
    v-model="isDialogOpen"
    :title="title"
    :size="size"
    :disable-close="disableClose"
    :show-footer="true"
    @on-close="resetForm"
  >
    <!-- Pass activator slot through -->
    <template #activator="slotProps">
      <slot name="activator" v-bind="slotProps" />
    </template>

    <!-- Master Form Container -->
    <v-form
      ref="formRef"
      :validate-on="validateOn"
      class="d-flex flex-column w-100 ga-2 justify-center align-center"
      @submit.prevent
      v-slot="formSlotProps"
    >
      <!-- Optional Subtitle -->
      <div v-if="subTitle" class="text-subtitle-1 mb-2">{{ subTitle }}</div>

      <!-- Main Fields Slot -->
      <div class="mt-2 w-100">
        <slot v-bind="formSlotProps" />
      </div>
    </v-form>

    <!-- Footer Action Controls -->
    <template #footer-controls="{ closeDialog }">
      <!-- Cancel Button -->
      <AppButton
        color="primary"
        :title="cancelText"
        @click="handleCancel(closeDialog)"
      />
      <!-- Uses defaults (color="button" textColor="buttonText") -->
      <AppButton
        variant="flat"
        :title="submitText"
        :disabled="disableSubmit"
        @click="handleSubmit(closeDialog)"
      />
    </template>
  </AppDialog>
</template>
