<script setup lang="ts">
import type {
  AppTableCellItem,
  AppTableCellValueKey,
} from './AppTableCell.vue';

const props = withDefaults(
  defineProps<{
    item: AppTableCellItem;
    valueKey: AppTableCellValueKey;
  }>(),
  {}
);

function resolveValue(
  obj: AppTableCellItem = props.item,
  path: AppTableCellValueKey = props.valueKey
): unknown {
  const keys = path.split('.');

  const immediateValue = obj[keys[0]];

  if (immediateValue == null) {
    return undefined;
  }

  if (keys.length === 1) {
    return immediateValue;
  }

  if (
    typeof immediateValue === 'object' &&
    immediateValue !== null &&
    !Array.isArray(immediateValue)
  ) {
    return resolveValue(
      immediateValue as AppTableCellItem,
      keys.slice(1).join('.')
    );
  }

  return undefined;
}
</script>

<template>
  <slot :value="resolveValue()" />
</template>
