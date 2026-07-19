<script setup lang="ts">
import AppTable, { SelectOption } from '@/components/tables/AppTable.vue';
import { useSalesStore } from '@/stores/salesStore';
import { TableItem } from '@/types/table';
import { computed, onMounted, ref, watch } from 'vue';
import AppMainAppbar from './AppMainAppbar.vue';
import AppMainContainer from './AppMainContainer.vue';
import AppSidebar from './AppSidebar.vue';

const store = useSalesStore();

const drawer = ref(true);
const rail = ref(true);

const headers = [
  {
    title: 'ID',
    key: 'id',
  },
  {
    title: 'user Id',
    key: 'userId',
  },
  {
    title: 'Title',
    key: 'title',
  },
  {
    title: 'Body',
    key: 'body',
  },
];

const searchText = ref('');

const selectedOptions = ref<string[]>([]);

watch(
  () => [store.selectedRegion, store.useMockData],
  () => {
    store.loadDashboardMetrics();
  },
  { immediate: false }
);

const tableItems = computed<TableItem[]>(() =>
  store.postsData.map((post) => ({
    userId: post.userId,
    id: post.id,
    title: post.title,
    body: post.body,
  }))
);

const labels: Record<string, string> = {
  userId: 'User ID',
  id: 'Post ID',
  title: 'Title',
  body: 'Description',
};

const selectOptions = computed<SelectOption[]>(() => {
  if (!tableItems.value.length) return [];

  return Object.keys(tableItems.value[0]).map((key) => ({
    title: labels[key] ?? key,
    value: key,
  }));
});

onMounted(() => {
  if (!store.postsData.length && !store.isDashboardLoading) {
    store.loadDashboardMetrics();
  }
});
</script>

<template>
  <!-- Core Layout UI Elements -->
  <AppSidebar v-model:drawer="drawer" v-model:rail="rail" />
  <AppMainAppbar v-model:rail="rail" title="Anwar Sales Log Feed" />

  <!-- =========================
     Main Content
========================== -->
  <AppMainContainer>
    <v-progress-linear
      v-if="store.isDashboardLoading"
      indeterminate
      color="secondary"
      class="mb-4"
    />
    <app-table
      title="Dashboard"
      :headers="headers"
      :items="tableItems"
      searchable
      show-select
      select-label="Status"
      :select-options="selectOptions"
      v-model:search="searchText"
      v-model:selected-options="selectedOptions"
    >
    </app-table>
  </AppMainContainer>
</template>
