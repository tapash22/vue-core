<!-- src/components/BaseChart.vue -->
<script setup lang="ts">
import type { ChartData, ChartOptions, ChartType } from 'chart.js';
import { computed } from 'vue';
import { Chart as VueChart } from 'vue-chartjs';

// 1. Define Props with strict ChartType generics
interface Props {
  type?: ChartType;
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

// Merge options safely with ChartType parameter
const mergedOptions = computed<ChartOptions<ChartType>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  ...props.chartOptions,
}));
</script>

<template>
  <div class="chart-wrapper">
    <!-- Cast :data to ChartData<ChartType> directly -->
    <VueChart
      :key="props.type"
      :type="props.type"
      :data="props.chartData as ChartData<ChartType>"
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
