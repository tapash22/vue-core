import { useGetPosts } from "@/composables/useApi";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useSalesStore = defineStore("salesStore", () => {
  const selectedRegion = ref<string>("Dhaka");
  const useMockData = ref<boolean>(true);

  // Initialize your core composable hook inside the store state zone
  const postsHook = useGetPosts();

  // Action: This returns the axios promise cleanly
  function loadDashboardMetrics() {
    // If the mock switch is true, override the URL destination path
    if (useMockData.value) {
      return postsHook.execute("/mock/posts-fallback.json");
    }

    // Otherwise, hit the default flat json stream endpoint path
    return postsHook.execute("/posts");
  }

  // Getters / Mapped States (Must match exactly what the component template reads!)
  const postsData = computed(() => postsHook.data.value || []);
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
