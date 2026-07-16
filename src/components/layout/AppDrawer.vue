<script setup lang="ts">
import { computed } from 'vue';
import IconUsers from '~icons/mdi/account-group';
import IconChart from '~icons/mdi/chart-line';
import IconSetting from '~icons/mdi/cog';
import IconDashboard from '~icons/mdi/view-dashboard';
import LogoVue from '~icons/mdi/vuejs';

// Setup two-way bindings with the parent layout
const drawer = defineModel<boolean>('drawer', { default: true });
const rail = defineModel<boolean>('rail', { default: true });

const menuItems = [
  { title: 'Dashboard', value: 'dashboard', icon: IconDashboard },
  { title: 'Sales', value: 'sales', icon: IconChart },
  { title: 'Customers', value: 'customers', icon: IconUsers },
  { title: 'Settings', value: 'settings', icon: IconSetting },
];

const drawerWidth = computed(() => (rail.value ? 80 : 220));
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :width="drawerWidth"
    permanent
    class="app-drawer"
  >
    <div class="drawer-header" :class="{ collapsed: rail }">
      <LogoVue class="vue-logo" />
      <span class="drawer-title" :class="{ hidden: rail }"> Vue Core </span>
    </div>
    <v-divider class="my-2" />

    <v-list nav density="comfortable">
      <v-list-item
        v-for="item in menuItems"
        :key="item.value"
        rounded="lg"
        class="drawer-item"
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
</template>
