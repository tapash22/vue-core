// src/data/chartData.ts
import type { ChartData, ChartOptions } from 'chart.js';
import { ref } from 'vue';

// Exporting your reactive chartData ref
export const activityChartData = ref<ChartData>({
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

// Optional: Shared responsive options
export const defaultChartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
