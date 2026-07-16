<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import IconSettingsFilled from '~icons/mdi/settings';
import AppMainAppbar from './components/layout/AppMainAppbar.vue';
import AppMainContainer from './components/layout/AppMainContainer.vue';
import AppSidebar from './components/layout/AppSidebar.vue';
import { useSalesStore } from './stores/salesStore';

const store = useSalesStore();

const drawer = ref(true);
const rail = ref(true);

watch(
  () => [store.selectedRegion, store.useMockData],
  () => {
    store.loadDashboardMetrics();
  },
  { immediate: false }
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

      <v-row>
        <v-col cols="12" md="4">
          <v-card class="pa-4" elevation="1">
            <v-card-item title="Feed Controller" />
            <v-card-text class="pt-2">
              <IconSettingsFilled
                style="
                  color: rgb(var(--v-theme-primary));
                  width: 22px;
                  height: 22px;
                "
              />
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
                v-if="store.postsData?.length && !store.isDashboardLoading"
                class="pa-0"
              >
                <v-list-item
                  v-for="post in store.postsData"
                  :key="post.id"
                  class="border-b py-3"
                >
                  <template #prepend>
                    <v-avatar class="" size="40">
                      <span class="text-subtitle-2 font-weight-bold">{{
                        post.id
                      }}</span>
                    </v-avatar>
                  </template>

                  <v-list-item-title class="font-weight-bold mb-1 text-wrap">
                    {{ post.title }}
                  </v-list-item-title>

                  <v-list-item-subtitle
                    class="text-body-2 text-wrap"
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
                <v-progress-circular indeterminate color="primary" size="50" />
                <p class="text-grey mt-2">Streaming live records...</p>
              </div>

              <div v-else class="text-center py-12 text-grey">
                No operational records loaded.
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </AppMainContainer>
  </v-app>
</template>
