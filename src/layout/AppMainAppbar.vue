<script setup lang="ts">
import AppButton from '@/components/button/AppButton.vue';
import { useAppTheme } from '@/composables/useAppTheme';
import IconMenuBar from '~icons/mdi/menu';
import IconNight from '~icons/mdi/moon-waning-crescent';
import IconSunny from '~icons/mdi/white-balance-sunny';
import IconClose from '~icons/mdi/window-close';
import { Toast } from '../utils/toast';

interface Props {
  title?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Anwar Sales Log Feed',
});

const rail = defineModel<boolean>('rail', { default: true });
const { isDark, toggleTheme } = useAppTheme();

const toggleDrawer = () => {
  rail.value = !rail.value;
};

const showToast = () => {
  Toast.success('click button and show toster effect');
};
</script>

<template>
  <v-app-bar
    elevation="2"
    class="py-1 px-4"
    style="box-shadow: 2px 2px 5px gray"
  >
    <template #prepend>
      <v-btn icon variant="text" @click="toggleDrawer" class="drawer-header">
        <component
          :is="rail ? IconMenuBar : IconClose"
          :key="String(rail)"
          class="vue-logo"
        />
      </v-btn>
    </template>

    <v-app-bar-title class="font-weight-bold">
      {{ title }}
    </v-app-bar-title>

    <template #append>
      <div class="d-flex align-middle ga-4">
        <v-btn
          color="primary"
          variant="tonal"
          size="small"
          rounded="sm"
          @click="showToast"
        >
          Show Toast
        </v-btn>
        <AppButton variant="outlined" color="transparent" @click="toggleTheme">
          <Transition name="theme-icon" mode="out-in">
            <component
              :is="isDark ? IconSunny : IconNight"
              :key="String(isDark)"
              :class="isDark ? 'text-amber-lighten-1' : 'text-indigo-darken-2'"
              class="theme-button"
            />
          </Transition>

          <v-tooltip activator="parent">
            {{ isDark ? 'Switch to Light' : 'Switch to Dark' }}
          </v-tooltip>
        </AppButton>

        <!-- <AppButton
          :icon="isDark ? IconSunny : IconNight"
          variant="outlined"
          class="theme-button"
          @click="toggleTheme"
        >
          <v-tooltip activator="parent">
            {{ isDark ? 'Switch to Light' : 'Switch to Dark' }}
          </v-tooltip>
        </AppButton> -->
      </div>
    </template>
  </v-app-bar>
</template>
