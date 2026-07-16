<script setup lang="ts">
import { useIcons } from '@/composables/icons';

const props = withDefaults(
  defineProps<{
    pageOptions?: number[];
    pageCount: number;
  }>(),
  {
    pageOptions: () => [5, 10, 15, 20],
    pageCount: 1,
  }
);

const itemsPerPage = defineModel<number>('itemsPerPage', {
  required: true,
  default: 5,
});

const page = defineModel<number>('page', {
  required: true,
  default: 1,
});

const { getIcon } = useIcons();

function previousPage() {
  page.value = Math.max(1, page.value - 1);
}
function nextPage() {
  page.value = Math.min(page.value + 1, props.pageCount);
}
</script>

<template>
  <div class="d-flex flex-row align-center ga-10 px-5 bt-1">
    <v-spacer />
    <span class="d-flex flex-row align-center ga-1 text-subtitle-2 ga-4">
      <span class="text-subtitle-2 font-weight-medium text-disabled"
        >Rows per page</span
      >
      <span>
        <v-select
          v-model="itemsPerPage"
          :items="[
            ...pageOptions.map((n) => ({ title: n, value: n })),
            {
              title: 'All',
              value: -1,
            },
          ]"
          color="secondary"
          :flat="true"
          :hide-details="true"
          variant="plain"
          rounded="lg"
          class="font-weight-medium mb-4"
        />
      </span>
    </span>
    <span class="d-flex flex-row text-center align-center font-weight-medium">
      Showing page {{ page }} / {{ pageCount }}
    </span>
    <span class="d-flex flex-row align-center">
      <v-btn
        size="x-small"
        :slim="true"
        variant="text"
        :min-width="35"
        @click="previousPage"
        :disabled="page === 1"
        color="secondary"
      >
        <v-icon :icon="getIcon('aesl-angle-left-small')" />
      </v-btn>
      <v-btn
        size="x-small"
        :slim="true"
        variant="text"
        :min-width="35"
        @click="nextPage"
        :disabled="page === pageCount"
        color="secondary"
      >
        <v-icon :icon="getIcon('aesl-angle-right-small')" />
      </v-btn>
    </span>
  </div>
</template>
