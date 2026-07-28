<script setup lang="ts">
import { type Component, computed } from 'vue';

const props = withDefaults(
  defineProps<{
    /** Title/Text inside the button */
    title?: string;
    /** Component name or registered Vuetify alias */
    component?: string;
    /** Icon name or SVG component for icon-only button */
    icon?: string | object | Component;
    /** Icon placed before text */
    preicon?: string | object | Component;
    /** Icon placed after text */
    posticon?: string | object | Component;
    /** Button color theme */
    color?: string;
    /** Text color class or hex/rgb color value */
    textColor?: string;
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'flat' | 'text' | 'elevated' | 'outlined' | 'tonal' | 'plain';
  }>(),
  {
    title: '',
    component: 'v-btn',
    color: 'primary',
    disabled: false,
    loading: false,
    type: 'button',
    variant: 'flat',
  }
);

defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const isComponentIcon = (iconProp?: string | object | Component) =>
  typeof iconProp === 'object' || typeof iconProp === 'function';

const computedTextColor = computed(() => {
  if (!props.textColor) return undefined;
  return props.textColor.startsWith('#') || props.textColor.startsWith('rgb')
    ? undefined
    : `text-${props.textColor}`;
});

const inlineTextColor = computed(() => {
  if (!props.textColor) return undefined;
  return props.textColor.startsWith('#') || props.textColor.startsWith('rgb')
    ? props.textColor
    : undefined;
});
</script>

<template>
  <component
    :is="component"
    :color="color"
    :variant="variant"
    :disabled="disabled"
    :loading="loading"
    :type="type"
    :icon="icon && typeof icon === 'string' ? icon : undefined"
    :prepend-icon="preicon && typeof preicon === 'string' ? preicon : undefined"
    :append-icon="
      posticon && typeof posticon === 'string' ? posticon : undefined
    "
    :class="['custom-app-btn', computedTextColor]"
    :style="{ color: inlineTextColor }"
    @click="$emit('click', $event)"
  >
    <!-- Handle Pre-Icon -->
    <template v-if="preicon && isComponentIcon(preicon)" #prepend>
      <v-icon>
        <component :is="preicon" />
      </v-icon>
    </template>

    <!-- Handle Post-Icon -->
    <template v-if="posticon && isComponentIcon(posticon)" #append>
      <v-icon>
        <component :is="posticon" />
      </v-icon>
    </template>

    <!-- Icon-Only -->
    <template v-if="icon && isComponentIcon(icon)">
      <v-icon>
        <component :is="icon" />
      </v-icon>
    </template>

    <!-- Slot / Title -->
    <template v-else-if="!icon">
      <slot>{{ title }}</slot>
    </template>
  </component>
</template>

<style>
/* UNSCOPED STYLE OVERRIDE FOR VUETIFY 3 INTERNAL BUTTON STATE */

/* 1. Ensure primary flat/elevated buttons keep primary background color */
.v-btn.custom-app-btn.bg-primary {
  background-color: rgb(var(--v-theme-primary)) !important;
  color: #ffffff !important;
}

/* 2. Target Vuetify's internal disabled class to prevent color wipeout */
.v-btn.custom-app-btn.v-btn--disabled {
  background-color: rgb(var(--v-theme-primary)) !important;
  color: #ffffff !important;
  opacity: 0.5 !important;
  pointer-events: none !important;
}

/* 3. Force internal content and overlay to stay visible when disabled */
.v-btn.custom-app-btn.v-btn--disabled .v-btn__content,
.v-btn.custom-app-btn.v-btn--disabled .v-btn__prepend,
.v-btn.custom-app-btn.v-btn--disabled .v-btn__append {
  color: #ffffff !important;
  opacity: 1 !important;
}

.v-btn.custom-app-btn.v-btn--disabled .v-btn__overlay {
  opacity: 0 !important;
}
</style>
