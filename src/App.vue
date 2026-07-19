<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import AppMainAppbar from './components/layout/AppMainAppbar.vue';
import AppMainContainer from './components/layout/AppMainContainer.vue';
import AppSidebar from './components/layout/AppSidebar.vue';
import AppTable from './components/tables/AppTable.vue';
import { useSalesStore } from './stores/salesStore';
import { TableItem } from './types/table.ts';

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

onMounted(() => {
  if (!store.postsData.length && !store.isDashboardLoading) {
    store.loadDashboardMetrics();
  }
});
</script>

<template>
  <v-app>
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
      <app-table title="Dashboard" :headers="headers" :items="tableItems">
      </app-table>
    </AppMainContainer>
  </v-app>
</template>
