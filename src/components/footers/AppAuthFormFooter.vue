<script setup lang="ts">
import { useDefaults } from 'vuetify';
defineProps<{
  queryText: string;
  querySuggestion?: {
    title: string;
    link: string;
  };
}>();
// modify using vuetify config
useDefaults();
</script>
<template>
  <div class="d-flex flex-column w-100 align-center justify-center">
    <slot />
    <div class="mt-7 text-subtitle-1">{{ queryText }}</div>
    <v-primary-text-link v-if="querySuggestion" :to="querySuggestion.link">{{
      querySuggestion.title
    }}</v-primary-text-link>
  </div>
</template>
