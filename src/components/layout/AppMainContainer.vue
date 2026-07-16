<script setup lang="ts">
import { computed } from 'vue';

// TypeScript Interface for Props
interface Props {
  color?: string;
  rounded?: boolean | string;
  gap?: string | number;
  sheetClass?: string;
}

// Define props with strict TS types and modern Vue 3 default values
const props = withDefaults(defineProps<Props>(), {
  color: 'transparent',
  rounded: false,
  gap: 5,
  sheetClass: '',
});

// Dynamic class helper for the gap spacing
const gapClass = computed<string>(() => `ga-${props.gap}`);
</script>

<template>
  <v-main class="body">
    <v-sheet
      :color="color"
      :rounded="rounded"
      width="100%"
      :class="['pa-5', sheetClass]"
    >
      <div :class="['w-100 d-flex flex-column justify-start', gapClass]">
        <slot />
      </div>
    </v-sheet>
  </v-main>
</template>
