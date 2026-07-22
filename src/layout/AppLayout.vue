<script setup lang="ts">
import AppBaseChart from '@/components/chart/AppBaseChart.vue';
import AppTable, { SelectOption } from '@/components/tables/AppTable.vue';
import { activityChartData, defaultChartOptions } from '@/data/chartData.ts';
import { headers } from '@/data/index.ts';
import { useSalesStore } from '@/stores/salesStore';
import { TableItem } from '@/types/table';
import { ChartType } from 'chart.js';
import { computed, onMounted, ref, watch } from 'vue';
import AppMainAppbar from './AppMainAppbar.vue';
import AppMainContainer from './AppMainContainer.vue';
import AppSidebar from './AppSidebar.vue';

const store = useSalesStore();

const currentChartType = ref<ChartType>('bar');
const drawer = ref(true);
const rail = ref(true);

const searchText = ref('');

const selectedOptions = ref<string[]>([]);

watch(
  () => [store.selectedRegion, store.useMockData],
  () => {
    store.loadDashboardMetrics();
  },
  { immediate: false }
);

// Optional helper to mutate data directly (it remains reactive!)
function updateData() {
  activityChartData.value.datasets[0].data = [80, 70, 95, 88, 72, 60];
}

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
    <div class="chart-container">
      <h2>Activity Overview</h2>

      <!-- Type Switcher -->
      <div class="controls">
        <label>Chart Type: </label>
        <select v-model="currentChartType">
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="pie">Pie</option>
          <option value="doughnut">Doughnut</option>
          <option value="radar">Radar</option>
          <option value="polarArea">Polar Area</option>
        </select>

        <button @click="updateData">Update Values</button>
      </div>

      <!-- Reusable Base Chart Component -->
      <div class="chart-box">
        <app-base-chart
          :type="currentChartType"
          :chart-data="activityChartData"
          :chart-options="defaultChartOptions"
        />
      </div>
    </div>
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

<style scoped>
.chart-container {
  max-width: 700px;
  margin: 2rem auto;
  font-family: sans-serif;
}

.controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
}

select,
button {
  padding: 0.4rem 0.8rem;
  font-size: 0.95rem;
}

.chart-box {
  height: 400px;
  padding: 1rem;
  border-radius: 8px;
  /* background-color: #fafafa;
  border: 1px solid #eaeaea; */
}
</style>
