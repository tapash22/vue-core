<!-- src/components/BaseChart.vue -->
<script setup lang="ts">
import type { ChartData, ChartOptions, ChartType } from 'chart.js';
import { computed } from 'vue';
import { Chart as VueChart } from 'vue-chartjs';

// 1. Define Props with TypeScript Types
interface Props {
  type?: ChartType; // 'bar' | 'line' | 'pie' | 'doughnut' | 'radar' | 'polarArea' | 'bubble' | 'scatter'
  chartData: ChartData<ChartType>;
  chartOptions?: ChartOptions<ChartType>;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'bar',
  chartOptions: () => ({
    responsive: true,
    maintainAspectRatio: false,
  }),
});

// Merge default options with user-provided options safely
const mergedOptions = computed<ChartOptions<ChartType>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  ...props.chartOptions,
}));
</script>

<template>
  <div class="chart-wrapper">
    <VueChart
      :key="props.type"
      :type="props.type"
      :data="props.chartData"
      :options="mergedOptions"
    />
  </div>
</template>

<style scoped>
.chart-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>
