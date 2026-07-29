<script setup lang="ts">
import { type Component, computed } from 'vue';

type IconProp = string | object | Component | undefined;

const props = withDefaults(
  defineProps<{
    /** Title/Text inside the button */
    title?: string;
    /** Component name or registered Vuetify alias */
    component?: string;
    /** Icon name (string), JSON object ({ name: ... }), or imported SVG component */
    icon?: IconProp;
    /** Icon placed before text */
    preicon?: IconProp;
    /** Icon placed after text */
    posticon?: IconProp;
    /** Theme color key (e.g. 'button', 'primary', 'error') */
    color?: string;
    /** Theme text color key (e.g. 'buttonText', 'heading', 'white') */
    textColor?: string;
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'flat' | 'text' | 'elevated' | 'outlined' | 'tonal' | 'plain';
  }>(),
  {
    title: '',
    component: 'v-btn',
    color: 'button',
    textColor: 'buttonText',
    disabled: false,
    loading: false,
    type: 'button',
    variant: 'flat',
  }
);

defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

// Generates dynamic bg-* and text-* classes for theme colors
const computedClasses = computed(() => {
  const classes: string[] = ['custom-app-btn'];

  if (
    props.color &&
    !props.color.startsWith('#') &&
    !props.color.startsWith('rgb')
  ) {
    classes.push(`bg-${props.color}`);
  }

  if (
    props.textColor &&
    !props.textColor.startsWith('#') &&
    !props.textColor.startsWith('rgb')
  ) {
    classes.push(`text-${props.textColor}`);
  }

  return classes;
});
</script>

<template>
  <component
    :is="component"
    :variant="variant"
    :disabled="disabled"
    :loading="loading"
    :type="type"
    :class="computedClasses"
    class="d-flex align-middle pa-2 w-auto rounded-md"
    @click="$emit('click', $event)"
  >
    <!-- Pre-Icon -->
    <template v-if="preicon">
      <component :is="preicon" />
    </template>

    <!-- Post-Icon -->
    <template v-if="posticon">
      <component :is="preicon" />
    </template>

    <!-- Icon-Only Button -->
    <template v-if="icon">
      <component :is="icon" />
    </template>

    <!-- Default Content: Slot or Title -->
    <template v-else>
      <slot>{{ title }}</slot>
    </template>
  </component>
</template>

<style>
/* Keeps custom background and text visible when button is disabled */
.v-btn.custom-app-btn.v-btn--disabled {
  opacity: 0.5 !important;
  pointer-events: none !important;
}

.v-btn.custom-app-btn.v-btn--disabled .v-btn__content,
.v-btn.custom-app-btn.v-btn--disabled .v-icon {
  opacity: 1 !important;
}

.v-btn.custom-app-btn.v-btn--disabled .v-btn__overlay {
  opacity: 0 !important;
}
</style>
