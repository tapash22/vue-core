// src/data/chartData.ts
import type { ChartData, ChartOptions, ChartType } from 'chart.js';
import { ref } from 'vue';

// 1. Pass ChartType as the generic type parameter
export const activityChartData = ref<ChartData<ChartType>>({
  labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling'],
  datasets: [
    {
      label: 'Activity Score',
      data: [65, 59, 90, 81, 56, 55],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
      ],
      borderColor: [
        '#ff6384',
        '#36a2eb',
        '#ffce56',
        '#4bc0c0',
        '#9966ff',
        '#ff9f40',
      ],
      borderWidth: 1,
    },
  ],
});

// 2. Do the same for options
export const defaultChartOptions: ChartOptions<ChartType> = {
  responsive: true,
  maintainAspectRatio: false,
};
