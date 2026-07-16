<script setup lang="ts">
import { useDefaults } from 'vuetify';
import type { VForm } from 'vuetify/components/VForm';
withDefaults(
  defineProps<{
    title: string;
    subTitle?: string;
    validateOn?: VForm['validate-on'];
  }>(),
  {
    validateOn: 'blur lazy',
  }
);

useDefaults();
</script>
<template>
  <v-form
    :validate-on="validateOn"
    class="d-flex flex-column w-100 ga-2 justify-center align-center"
    v-slot="slotProps"
  >
    <div class="text-h5 font-weight-bold">{{ title }}</div>
    <div v-if="subTitle" class="text-subtitle-1">{{ subTitle }}</div>
    <div class="mt-6 w-100">
      <slot v-bind="slotProps" />
    </div>
    <v-footer class="w-100 pa-0">
      <slot name="form-controls" v-bind="slotProps" />
    </v-footer>
  </v-form>
</template>
