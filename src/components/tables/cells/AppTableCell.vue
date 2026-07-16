<script setup lang="ts">
import { TableItem } from '@/types/table.ts';
import AppResolveTableCell from './AppResolveTableCell.vue';
import AppTableCellFile from './AppTableCellFile.vue';
import AppTableCellFileLink from './AppTableCellFileLink.vue';

export interface AppTableCellContext {
  type: 'link' | 'chip' | 'action' | 'file' | 'file-link';

  to?: (item: TableItem) => string;

  color?: (item: TableItem) => string;

  url?: (item: TableItem) => string;

  file?: (item: TableItem) => File;
}

export type AppTableCellItem = TableItem;

export type AppTableCellValueKey = string;

withDefaults(
  defineProps<{
    context?: AppTableCellContext;
    item: AppTableCellItem;
    valueKey: AppTableCellValueKey;
  }>(),
  {}
);

function asString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}
</script>
<template>
  <app-resolve-table-cell :item="item" :value-key="valueKey">
    <template #default="{ value: resolveValue }">
      <!-- link type cell -->
      <!-- eslint-disable-next-line vue/valid-v-for -->
      <router-link
        v-if="context?.type === 'link'"
        :to="context?.to && context?.to(item)"
        class="text-subtitle-1 font-weight-medium"
      >
        {{ resolveValue }}
      </router-link>
      <!-- chip type cell -->
      <!-- eslint-disable-next-line vue/valid-v-for -->
      <v-chip
        v-else-if="context?.type === 'chip'"
        :pill="true"
        rounded="xl"
        :color="context?.color && context?.color(item)"
        class="text-subtitle-2 font-weight-medium"
      >
        {{ resolveValue }}
      </v-chip>
      <!-- action cell -->
      <!-- eslint-disable-next-line vue/require-v-for-key -->
      <span
        v-else-if="context?.type === 'action'"
        class="d-flex flex-row align-center justify-center ga-2"
      >
        <!-- action buttons goes here -->
        <slot name="actions" v-bind="{ item }" />
      </span>
      <!-- file cell -->
      <!-- eslint-disable-next-line vue/require-v-for-key -->
      <app-table-cell-file
        v-else-if="context?.type === 'file' && context?.file"
        :file="context?.file(item)"
        :title="asString(resolveValue)"
      />
      <!-- file link cell -->
      <!-- eslint-disable-next-line vue/require-v-for-key -->
      <app-table-cell-file-link
        v-else-if="context?.type === 'file-link'"
        :link="asString(resolveValue)"
      />
      <!-- normal cell -->
      <!-- eslint-disable-next-line vue/require-v-for-key -->
      <slot v-else :value="resolveValue" />
    </template>
  </app-resolve-table-cell>
</template>
