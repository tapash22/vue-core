import { useCoreApi } from '@/composables/useApi';
import { Post } from '@/types/Post';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useSalesStore = defineStore('salesStore', () => {
  const selectedRegion = ref('Dhaka');
  const useMockData = ref(true);

  // Create API hook
  const postsHook = useCoreApi<Post[]>('/posts', 'GET');

  async function loadDashboardMetrics() {
    try {
      await postsHook.execute();
    } catch (error) {
      console.error(error);
    }
  }

  const postsData = computed(() => {
    const value = postsHook.data.value;

    if (Array.isArray(value)) {
      return value;
    }

    return [] as Post[];
  });

  const isDashboardLoading = computed(() => postsHook.isLoading.value);
  const dashboardError = computed(() => postsHook.error.value);

  return {
    selectedRegion,
    useMockData,
    loadDashboardMetrics,
    postsData,
    isDashboardLoading,
    dashboardError,
  };
});
