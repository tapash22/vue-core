<script setup lang="ts">
import { ref, useSlots } from 'vue';
import { useDefaults } from 'vuetify';
import type { VForm } from 'vuetify/components/VForm';
import AppButton from '../button/AppButton.vue';
import AppDialog from '../dialogs/AppDialog.vue';

const props = withDefaults(
  defineProps<{
    title: string;
    subTitle?: string;
    size?: 'tiny' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    submitText?: string;
    cancelText?: string;
    disableClose?: boolean;
    disableSubmit?: boolean;
    validateOn?: VForm['validate-on'];
    rows?: number;
    cols?: number;
  }>(),
  {
    size: 'sm',
    submitText: 'Submit',
    cancelText: 'Cancel',
    disableClose: false,
    disableSubmit: false,
    validateOn: 'blur lazy',
    rows: 1,
    cols: 1,
  }
);

const emit = defineEmits<{
  (e: 'submit', closeDialog: () => void): void;
}>();

const slots = useSlots();
const isDialogOpen = defineModel<boolean>({ required: false, default: false });
const formRef = ref<VForm | null>(null);

// Calculate sequence index for smooth row animation staggering
const getAnimationIndex = (currentRow: number) => {
  let activeRowCount = 0;
  for (let r = 1; r <= currentRow; r++) {
    const hasFull = !!slots[`field-${r}-full`];
    const hasCols = Array.from({ length: props.cols }, (_, i) => i + 1).some(
      (c) => !!slots[`field-${r}-${c}`]
    );
    if (hasFull || hasCols) activeRowCount++;
  }
  return activeRowCount;
};

// Completely reset form values and clear validation/blur errors
const resetForm = () => {
  if (formRef.value) {
    formRef.value.reset();
    formRef.value.resetValidation();
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

      <!-- Main Fields Container (Dynamic Grid) -->
      <div class="my-2 w-100">
        <!-- Default slot fallback if custom dynamic slots are not used -->
        <slot v-bind="formSlotProps" />

        <!-- Dynamic Grid Layout -->
        <template v-for="row in rows" :key="`form-modal-row-${row}`">
          <v-row
            v-if="
              $slots[`field-${row}-full`] ||
              Array.from({ length: cols }, (_, i) => i + 1).some(
                (col) => $slots[`field-${row}-${col}`]
              )
            "
            class="py-2"
            :style="{ animationDelay: `${getAnimationIndex(row) * 60}ms` }"
          >
            <!-- Full Row Slot -->
            <v-col v-if="$slots[`field-${row}-full`]" cols="12">
              <slot :name="`field-${row}-full`" v-bind="formSlotProps" />
            </v-col>

            <!-- Column Grid Slots -->
            <template v-else v-for="col in cols" :key="`form-modal-col-${col}`">
              <v-col v-if="$slots[`field-${row}-${col}`]">
                <slot :name="`field-${row}-${col}`" v-bind="formSlotProps" />
              </v-col>
            </template>
          </v-row>
        </template>
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
