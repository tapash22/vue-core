import { useGetPosts, type Post } from '@/composables/useApi';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useSalesStore = defineStore('salesStore', () => {
  const selectedRegion = ref<string>('Dhaka');
  const useMockData = ref<boolean>(false);

  // Initialize your core hook
  const postsHook = useGetPosts();

  async function loadDashboardMetrics() {
    try {
      // Bypasses local paths to ensure it always hits the direct endpoint
      if (useMockData.value) {
        await postsHook.execute('https://jsonplaceholder.typicode.com/posts');
      } else {
        await postsHook.execute('/posts');
      }
    } catch (err) {
      console.error('Dashboard synchronization caught error:', err);
    }
  }

  // --- SAFE PARSING GETTER ---
  const postsData = computed<Post[]>(() => {
    // Cast to unknown first so TypeScript lets us safely check its type
    const val = postsHook.data.value as unknown;

    // Safely verify if it's an array. If Vite returns HTML text, this blocks it.
    if (Array.isArray(val)) {
      return val as Post[];
    }

    // Now TypeScript will gladly let you check for strings without complaining about 'never'
    if (typeof val === 'string' && val.includes('<!DOCTYPE html>')) {
      return [];
    }

    return [];
  });

  const isDashboardLoading = computed(() => !!postsHook.isLoading.value);
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
