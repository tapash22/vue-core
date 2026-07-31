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
    rounded?: string | number | boolean;
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
    rounded: 'md',
  }
);

defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

// Check if rounded is a raw number (e.g. 50 or "50")
const isNumericRounded = computed(() => {
  return (
    typeof props.rounded === 'number' ||
    (typeof props.rounded === 'string' && !isNaN(Number(props.rounded)))
  );
});

// Inline style for custom pixel values (e.g. 50 -> "50px")
const customStyle = computed(() => {
  if (isNumericRounded.value) {
    return {
      borderRadius: `${props.rounded}px !important`,
    };
  }
  return {};
});

// Generates dynamic classes for theme colors, rounded presets, and circular state
const computedClasses = computed(() => {
  const classes: string[] = ['custom-app-btn'];

  // Theme background color class
  if (
    props.color &&
    !props.color.startsWith('#') &&
    !props.color.startsWith('rgb')
  ) {
    classes.push(`bg-${props.color}`);
  }

  // Theme text color class
  if (
    props.textColor &&
    !props.textColor.startsWith('#') &&
    !props.textColor.startsWith('rgb')
  ) {
    classes.push(`text-${props.textColor}`);
  }

  // Handle Vuetify rounded preset classes (e.g., 'rounded-circle', 'rounded-pill', 'rounded-md')
  if (!isNumericRounded.value && typeof props.rounded === 'string') {
    classes.push(`rounded-${props.rounded}`);
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
    :style="customStyle"
    class="d-flex align-center justify-center pa-2 w-auto"
    @click="$emit('click', $event)"
  >
    <!-- Pre-Icon -->
    <template v-if="preicon">
      <component :is="preicon" />
    </template>

    <!-- Post-Icon -->
    <template v-if="posticon">
      <component :is="posticon" />
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
/* Forces true 1:1 circular aspect ratio when rounded="circle" */

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
