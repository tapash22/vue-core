<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useSalesStore } from "./stores/salesStore";

const store = useSalesStore();

// Watch filters safely
watch(
  () => [store.selectedRegion, store.useMockData],
  () => {
    store.loadDashboardMetrics();
  },
  { immediate: false }, // Ensures it doesn't run automatically on load
);

onMounted(() => {
  // If the watcher or immediate flag fired already, this safe check ensures data exists
  if (!store.postsData.length && !store.isDashboardLoading) {
    store.loadDashboardMetrics();
  }
});
</script>

<template>
  <v-app>
    <v-app-bar color="primary" elevation="2">
      <v-app-bar-title class="font-weight-bold">
        Anwar Sales Log Feed (JSONPlaceholder Engine)
      </v-app-bar-title>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-container fluid class="pa-6">
        <v-progress-linear
          v-if="store.isDashboardLoading"
          indeterminate
          color="secondary"
          class="mb-4"
        />

        <v-row>
          <v-col cols="12" md="4">
            <v-card class="pa-4" elevation="1">
              <v-card-item title="Feed Controller" />
              <v-card-text class="pt-2">
                <v-select
                  v-model="store.selectedRegion"
                  :items="['Dhaka', 'Chittagong', 'Sylhet']"
                  label="Filter Regional Cluster"
                  variant="outlined"
                />

                <v-switch
                  v-model="store.useMockData"
                  label="Force Offline Local JSON"
                  color="secondary"
                  hide-details
                />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="8">
            <v-card class="pa-4" elevation="1">
              <v-card-item title="Live Active Sales Announcements" />
              <v-card-text class="pt-4">
                <v-alert
                  v-if="store.dashboardError"
                  type="error"
                  variant="tonal"
                  text="Failed to synchronize with JSONPlaceholder server streams."
                  class="mb-4"
                />

                <v-list
                  v-if="
                    store.postsData &&
                    store.postsData.length &&
                    !store.isDashboardLoading
                  "
                  class="pa-0"
                >
                  <v-list-item
                    v-for="post in store.postsData"
                    :key="post.id"
                    class="border-b py-3"
                  >
                    <template #prepend>
                      <v-avatar
                        color="primary"
                        class="mr-4 text-white"
                        size="40"
                      >
                        <span class="text-subtitle-2 font-weight-bold"
                          >#{{ post.id }}</span
                        >
                      </v-avatar>
                    </template>

                    <v-list-item-title
                      class="font-weight-bold text-primary mb-1 text-wrap"
                    >
                      {{ post.title }}
                    </v-list-item-title>

                    <v-list-item-subtitle
                      class="text-body-2 text-grey-darken-2 text-wrap"
                      style="white-space: pre-line"
                    >
                      {{ post.body }}
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>

                <div
                  v-else-if="store.isDashboardLoading"
                  class="text-center py-12"
                >
                  <v-progress-circular
                    indeterminate
                    color="primary"
                    size="50"
                  />
                  <p class="text-grey mt-2">Streaming live records...</p>
                </div>

                <div v-else class="text-center py-12 text-grey">
                  No operational records loaded.
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
