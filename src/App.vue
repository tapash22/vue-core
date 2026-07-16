<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import IconUsers from '~icons/mdi/account-group';
import IconChart from '~icons/mdi/chart-line';
import IconSetting from '~icons/mdi/cog';
import IconMenuBar from '~icons/mdi/menu';
import IconNight from '~icons/mdi/moon-waning-crescent';
import IconSettingsFilled from '~icons/mdi/settings';
import IconDashboard from '~icons/mdi/view-dashboard';
import LogoVue from '~icons/mdi/vuejs';
import IconSunny from '~icons/mdi/white-balance-sunny';
import IconClose from '~icons/mdi/window-close';
import { useAppTheme } from './composables/useAppTheme';
import { useSalesStore } from './stores/salesStore';
import { Toast } from './utils/toast';

const store = useSalesStore();
const { isDark, toggleTheme } = useAppTheme();

const drawer = ref(true);
const rail = ref(true);

const menuItems = [
  {
    title: 'Dashboard',
    value: 'dashboard',
    icon: IconDashboard,
  },
  {
    title: 'Sales',
    value: 'sales',
    icon: IconChart,
  },
  {
    title: 'Customers',
    value: 'customers',
    icon: IconUsers,
  },
  {
    title: 'Settings',
    value: 'settings',
    icon: IconSetting,
  },
];

// const rail = ref(true);

const toggleDrawer = () => {
  rail.value = !rail.value;
};
const drawerWidth = computed(() => (rail.value ? 80 : 220));
const showToast = () => {
  Toast.success('click button and show toster effect');
};

// Watch filters safely
watch(
  () => [store.selectedRegion, store.useMockData],
  () => {
    store.loadDashboardMetrics();
  },
  { immediate: false } // Ensures it doesn't run automatically on load
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
    <!-- =========================
         Navigation Drawer
    ========================== -->
    <v-navigation-drawer
      v-model="drawer"
      :width="drawerWidth"
      permanent
      class="app-drawer"
      elevation="2"
    >
      <!-- Drawer Header -->
      <div
        class="drawer-header"
        :class="{
          collapsed: rail,
          expanded: !rail,
        }"
      >
        <LogoVue class="vue-logo" />

        <span class="drawer-title" :class="{ hidden: rail }"> Vue Core </span>
      </div>

      <v-divider class="my-2" />

      <!-- Drawer Menu -->
      <v-list nav density="comfortable">
        <v-list-item
          v-for="item in menuItems"
          :key="item.value"
          rounded="lg"
          class="drawer-item"
          :ripple="false"
        >
          <div class="drawer-content" :class="{ collapsed: rail }">
            <component :is="item.icon" class="drawer-icon" />

            <span class="drawer-label" :class="{ hidden: rail }">
              {{ item.title }}
            </span>
          </div>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- =========================
         App Bar
    ========================== -->
    <v-app-bar elevation="1" class="app-header px-4 py-1">
      <template #prepend>
        <v-btn
          icon
          variant="text"
          class="theme-button"
          :ripple="false"
          @click="toggleDrawer"
        >
          <Transition name="drawer-text" mode="out-in">
            <component
              :is="rail ? IconMenuBar : IconClose"
              :key="rail"
              class="theme-icon"
            />
          </Transition>
        </v-btn>
      </template>

      <v-app-bar-title class="app-title font-weight-bold">
        Anwar Sales Log Feed
      </v-app-bar-title>

      <v-spacer />

      <template #append>
        <div class="d-flex align-center ga-3">
          <v-btn
            color="primary"
            variant="tonal"
            :ripple="false"
            @click="showToast"
          >
            Show Toast
          </v-btn>

          <v-btn
            icon
            variant="outlined"
            class="theme-button"
            :ripple="false"
            size="x-large"
            @click="toggleTheme"
          >
            <Transition name="theme-icon" mode="out-in">
              <component
                :is="isDark ? IconSunny : IconNight"
                :key="isDark"
                class="theme-icon border-btn"
              />
            </Transition>

            <v-tooltip activator="parent">
              {{ isDark ? 'Switch to Light' : 'Switch to Dark' }}
            </v-tooltip>
          </v-btn>
        </div>
      </template>
    </v-app-bar>

    <!-- =========================
         Main Content
    ========================== -->
    <v-main>
      <v-container fluid class="pa-6">
        <v-progress-linear
          v-if="store.isDashboardLoading"
          indeterminate
          color="primary"
          class="mb-6"
        />

        <v-row>
          <!-- Left Card -->
          <v-col cols="12" md="4">
            <v-card elevation="2">
              <v-card-item title="Feed Controller" />

              <v-card-text>
                <div class="d-flex align-center mb-4 ga-2">
                  <IconSettingsFilled class="drawer-icon" />
                  <span class="font-weight-medium"> Configuration </span>
                </div>

                <v-select
                  v-model="store.selectedRegion"
                  :items="['Dhaka', 'Chittagong', 'Sylhet']"
                  label="Filter Regional Cluster"
                  variant="outlined"
                />

                <v-switch
                  v-model="store.useMockData"
                  label="Force Offline Local JSON"
                  color="primary"
                  hide-details
                />
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Right Card -->
          <v-col cols="12" md="8">
            <v-card elevation="2">
              <v-card-item title="Live Active Sales Announcements" />

              <v-card-text>
                <v-alert
                  v-if="store.dashboardError"
                  type="error"
                  variant="tonal"
                  class="mb-4"
                  text="Failed to synchronize with JSONPlaceholder server streams."
                />

                <template
                  v-if="store.postsData.length && !store.isDashboardLoading"
                >
                  <v-list class="pa-0">
                    <v-list-item v-for="post in store.postsData" :key="post.id">
                      <template #prepend>
                        <v-avatar color="primary" size="42" class="mr-4">
                          {{ post.id }}
                        </v-avatar>
                      </template>

                      <v-list-item-title class="font-weight-bold">
                        {{ post.title }}
                      </v-list-item-title>

                      <v-list-item-subtitle style="white-space: pre-line">
                        {{ post.body }}
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </template>

                <div
                  v-else-if="store.isDashboardLoading"
                  class="text-center py-10"
                >
                  <v-progress-circular
                    indeterminate
                    color="primary"
                    size="52"
                  />

                  <div class="mt-4">Streaming live records...</div>
                </div>

                <div v-else class="text-center py-10">
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
