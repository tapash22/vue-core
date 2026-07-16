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
  <v-main class="body app-body">
    <v-sheet
      :color="color"
      :rounded="rounded"
      class="app-body-sheet pa-5 scrollbar-thin"
      :class="sheetClass"
    >
      <div :class="['d-flex flex-column', gapClass]">
        <slot />
      </div>
    </v-sheet>
  </v-main>
</template>

<style scoped lang="scss">
.app-body {
  display: flex;
  flex-direction: column;
}

.app-body-sheet {
  flex: 1;
  min-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
